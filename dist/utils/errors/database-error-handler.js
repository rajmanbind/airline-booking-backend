"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleDatabaseError = handleDatabaseError;
const app_error_1 = require("./app-error");
const http_status_codes_1 = require("http-status-codes");
const config_1 = require("../../config");
/**
 * Centralized database error handler for Sequelize errors
 * Converts Sequelize errors to AppError with appropriate status codes and user-friendly messages
 * Security: Logs full error details but sends sanitized messages to clients
 */
function handleDatabaseError(error, operation = 'operation') {
    // Handle validation errors (model-level validations)
    if (error && error.name === 'SequelizeValidationError') {
        const explanations = [];
        error.errors.forEach((err) => {
            // Log full validation error details for debugging
            config_1.Logger.warn(`Validation error during ${operation}:`, {
                field: err.path,
                value: err.value,
                type: err.type,
                message: err.message
            });
            // Send user-friendly message to client
            explanations.push(err.message);
        });
        throw new app_error_1.AppError(explanations, http_status_codes_1.StatusCodes.BAD_REQUEST);
    }
    // Handle unique constraint violations (e.g., duplicate entries)
    if (error && error.name === 'SequelizeUniqueConstraintError') {
        // Log full error details (includes table, column names - sensitive info)
        config_1.Logger.warn(`Unique constraint violation during ${operation}:`, {
            table: error.table,
            fields: error.fields,
            value: error.errors?.[0]?.value,
            sql: error.sql // Full SQL logged for debugging
        });
        // Send generic message to client (no database structure exposed)
        throw new app_error_1.AppError(['A record with this information already exists'], http_status_codes_1.StatusCodes.CONFLICT);
    }
    // Handle foreign key constraint violations
    if (error && error.name === 'SequelizeForeignKeyConstraintError') {
        // Log full error with table/column info
        config_1.Logger.error(`Foreign key constraint error during ${operation}:`, {
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
        throw new app_error_1.AppError([message], http_status_codes_1.StatusCodes.BAD_REQUEST);
    }
    // Handle database errors (syntax, data type mismatches, etc.)
    if (error && error.name === 'SequelizeDatabaseError') {
        // Log EVERYTHING for debugging (SQL, error codes, stack trace)
        config_1.Logger.error(`Database error during ${operation}:`, {
            code: error.parent?.code,
            errno: error.parent?.errno,
            sqlState: error.parent?.sqlState,
            sqlMessage: error.parent?.sqlMessage,
            sql: error.sql
        });
        // Send generic user-friendly messages based on error type
        if (error.parent?.code === 'ER_DATA_TOO_LONG') {
            throw new app_error_1.AppError(['One or more values exceed the maximum length'], http_status_codes_1.StatusCodes.BAD_REQUEST);
        }
        if (error.parent?.code === 'ER_BAD_NULL_ERROR') {
            throw new app_error_1.AppError(['Required information is missing'], http_status_codes_1.StatusCodes.BAD_REQUEST);
        }
        if (error.parent?.code === 'ER_TRUNCATED_WRONG_VALUE') {
            throw new app_error_1.AppError(['Invalid data format provided'], http_status_codes_1.StatusCodes.BAD_REQUEST);
        }
        // Generic message for any other database error
        throw new app_error_1.AppError(['Unable to process your request. Please check your input and try again'], http_status_codes_1.StatusCodes.BAD_REQUEST);
    }
    // Handle connection/timeout errors
    if (error && (error.name === 'SequelizeConnectionError' || error.name === 'SequelizeTimeoutError')) {
        // Log connection details for ops team
        config_1.Logger.error(`Database connection error during ${operation}:`, {
            name: error.name,
            message: error.message,
            host: error.parent?.config?.host // Safe to log for ops
        });
        // Generic message to client
        throw new app_error_1.AppError(['Service temporarily unavailable. Please try again in a moment'], http_status_codes_1.StatusCodes.SERVICE_UNAVAILABLE);
    }
    // Handle NOT_FOUND errors from repository layer (custom AppErrors)
    if (error && error.statusCode === http_status_codes_1.StatusCodes.NOT_FOUND) {
        throw error; // Already sanitized AppError
    }
    // Handle other AppErrors (pass through - already user-friendly)
    if (error instanceof app_error_1.AppError) {
        throw error;
    }
    // Generic fallback for unexpected errors
    // Log full error details for debugging
    config_1.Logger.error(`Unexpected error during ${operation}:`, {
        name: error?.name,
        message: error?.message,
        stack: error?.stack
    });
    // Send generic message to client (never expose internal error details)
    throw new app_error_1.AppError(['An unexpected error occurred. Please try again later'], http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
}
