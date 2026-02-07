import { AppError } from './app-error';
import { StatusCodes } from 'http-status-codes';
import { Logger } from '../../config';

/**
 * Centralized database error handler for Sequelize errors
 * Converts Sequelize errors to AppError with appropriate status codes and user-friendly messages
 * Security: Logs full error details but sends sanitized messages to clients
 */
export function handleDatabaseError(error: any, operation: string = 'operation'): never {
  // Handle validation errors (model-level validations)
  if (error && error.name === 'SequelizeValidationError') {
    const explanations: string[] = [];
    error.errors.forEach((err: any) => {
      // Log full validation error details for debugging
      Logger.warn(`Validation error during ${operation}:`, {
        field: err.path,
        value: err.value,
        type: err.type,
        message: err.message
      });
      // Send user-friendly message to client
      explanations.push(err.message);
    });
    throw new AppError(explanations, StatusCodes.BAD_REQUEST);
  }

  // Handle unique constraint violations (e.g., duplicate entries)
  if (error && error.name === 'SequelizeUniqueConstraintError') {
    // Log full error details (includes table, column names - sensitive info)
    Logger.warn(`Unique constraint violation during ${operation}:`, {
      table: error.table,
      fields: error.fields,
      value: error.errors?.[0]?.value,
      sql: error.sql // Full SQL logged for debugging
    });
    
    // Send generic message to client (no database structure exposed)
    throw new AppError(
      ['A record with this information already exists'],
      StatusCodes.CONFLICT
    );
  }

  // Handle foreign key constraint violations
  if (error && error.name === 'SequelizeForeignKeyConstraintError') {
    // Log full error with table/column info
    Logger.error(`Foreign key constraint error during ${operation}:`, {
      table: error.table,
      constraint: error.index,
      parent: error.parent?.code,
      sql: error.sql
    });
    
    const isDelete = error.parent?.code === 'ER_ROW_IS_REFERENCED_2';
    // Generic user-friendly messages (no table/column names)
    const message = isDelete
      ? 'Cannot delete: This record is being used by other data'
      : 'Invalid data: The referenced item does not exist';
    throw new AppError([message], StatusCodes.BAD_REQUEST);
  }

  // Handle database errors (syntax, data type mismatches, etc.)
  if (error && error.name === 'SequelizeDatabaseError') {
    // Log EVERYTHING for debugging (SQL, error codes, stack trace)
    Logger.error(`Database error during ${operation}:`, {
      code: error.parent?.code,
      errno: error.parent?.errno,
      sqlState: error.parent?.sqlState,
      sqlMessage: error.parent?.sqlMessage,
      sql: error.sql
    });
    
    // Send generic user-friendly messages based on error type
    if (error.parent?.code === 'ER_DATA_TOO_LONG') {
      throw new AppError(['One or more values exceed the maximum length'], StatusCodes.BAD_REQUEST);
    }
    if (error.parent?.code === 'ER_BAD_NULL_ERROR') {
      throw new AppError(['Required information is missing'], StatusCodes.BAD_REQUEST);
    }
    if (error.parent?.code === 'ER_TRUNCATED_WRONG_VALUE') {
      throw new AppError(['Invalid data format provided'], StatusCodes.BAD_REQUEST);
    }
    
    // Generic message for any other database error
    throw new AppError(
      ['Unable to process your request. Please check your input and try again'],
      StatusCodes.BAD_REQUEST
    );
  }

  // Handle connection/timeout errors
  if (error && (error.name === 'SequelizeConnectionError' || error.name === 'SequelizeTimeoutError')) {
    // Log connection details for ops team
    Logger.error(`Database connection error during ${operation}:`, {
      name: error.name,
      message: error.message,
      host: error.parent?.config?.host // Safe to log for ops
    });
    
    // Generic message to client
    throw new AppError(
      ['Service temporarily unavailable. Please try again in a moment'],
      StatusCodes.SERVICE_UNAVAILABLE
    );
  }

  // Handle NOT_FOUND errors from repository layer (custom AppErrors)
  if (error && error.statusCode === StatusCodes.NOT_FOUND) {
    throw error; // Already sanitized AppError
  }

  // Handle other AppErrors (pass through - already user-friendly)
  if (error instanceof AppError) {
    throw error;
  }

  // Generic fallback for unexpected errors
  // Log full error details for debugging
  Logger.error(`Unexpected error during ${operation}:`, {
    name: error?.name,
    message: error?.message,
    stack: error?.stack
  });
  
  // Send generic message to client (never expose internal error details)
  throw new AppError(
    ['An unexpected error occurred. Please try again later'],
    StatusCodes.INTERNAL_SERVER_ERROR
  );
}
