import { Express, Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { ServerConfig, Logger } from '../config';
import { ErrorResponse } from '../utils/common';
import { AppError } from '../utils/errors/app-error';
import { StatusCodes } from 'http-status-codes';

function applySecurity(app: Express) {
	// Basic security headers with enhanced configuration
	app.use(helmet({
		contentSecurityPolicy: ServerConfig.NODE_ENV === 'production',
		hsts: {
			maxAge: 31536000,
			includeSubDomains: true,
			preload: true
		}
	}));

	// CORS - restrict in production
	const allowedOrigins = ServerConfig.NODE_ENV === 'production' 
		? (process.env.CORS_ALLOWED_ORIGINS?.split(',') || [])
		: '*';
	
	const corsOptions = {
		origin: allowedOrigins,
		optionsSuccessStatus: 200,
		credentials: true,
		maxAge: 86400 // Cache preflight for 24 hours
	};
	app.use(cors(corsOptions));

	// Production-ready rate limiting with multiple tiers
	
	// 1. Global rate limiter (all requests)
	const globalLimiter = rateLimit({
		windowMs: 15 * 60 * 1000, // 15 minutes
		max: ServerConfig.NODE_ENV === 'production' ? 1000 : 10000, // Higher in dev for testing
		standardHeaders: true,
		legacyHeaders: false,
		message: 'Too many requests from this IP, please try again later',
		skipSuccessfulRequests: false,
	});
	app.use(globalLimiter);

	// 2. Stricter limit for write operations (POST, PUT, DELETE)
	const writeLimiter = rateLimit({
		windowMs: 15 * 60 * 1000, // 15 minutes  
		max: ServerConfig.NODE_ENV === 'production' ? 100 : 1000,
		standardHeaders: true,
		legacyHeaders: false,
		message: 'Too many write requests, please slow down',
		skip: (req) => ['GET', 'HEAD', 'OPTIONS'].includes(req.method),
	});
	app.use('/api', writeLimiter);
}

/**
 * Production-ready centralized error handler
 * Handles different error types and provides appropriate responses
 */
function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
	// Generate unique request ID for tracking
	const requestId = req.headers['x-request-id'] || `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

	// Log error with full context for debugging
	const errorLog = {
		requestId,
		method: req.method,
		url: req.originalUrl,
		ip: req.ip,
		userAgent: req.get('user-agent'),
		error: {
			name: err?.name,
			message: err?.message,
			stack: err?.stack,
			statusCode: err?.statusCode,
		},
		body: ServerConfig.NODE_ENV !== 'production' ? req.body : undefined,
	};

	Logger.error('Request error:', errorLog);

	// Determine status code
	let statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
	let message = 'An unexpected error occurred';
	let errors: string[] = [];

	// Handle custom AppError
	if (err instanceof AppError) {
		statusCode = err.statusCode;
		message = Array.isArray(err.explanation) ? err.explanation[0] : err.explanation;
		errors = Array.isArray(err.explanation) ? err.explanation : [err.explanation];
	}
	// Handle validation errors
	else if (err.name === 'ValidationError') {
		statusCode = StatusCodes.BAD_REQUEST;
		message = 'Validation failed';
		errors = err.errors ? Object.values(err.errors).map((e: any) => e.message) : [err.message];
	}
	// Handle JWT errors
	else if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
		statusCode = StatusCodes.UNAUTHORIZED;
		message = 'Invalid or expired token';
		errors = [err.message];
	}
	// Handle Sequelize/Database errors (should be caught by handleDatabaseError)
	else if (err.name && err.name.startsWith('Sequelize')) {
		statusCode = StatusCodes.BAD_REQUEST;
		message = 'Database operation failed';
		// Don't expose database details in production
		errors = ServerConfig.NODE_ENV === 'production' 
			? ['Invalid request data']
			: [err.message];
	}
	// Handle rate limit errors
	else if (err.status === 429) {
		statusCode = StatusCodes.TOO_MANY_REQUESTS;
		message = 'Too many requests';
		errors = [err.message || 'Rate limit exceeded'];
	}
	// Handle other HTTP errors
	else if (err.statusCode || err.status) {
		statusCode = err.statusCode || err.status;
		message = err.message || message;
		errors = [err.message];
	}
	// Unknown errors
	else {
		// In production, don't leak error details
		if (ServerConfig.NODE_ENV === 'production') {
			message = 'Internal server error';
			errors = ['Something went wrong. Please try again later.'];
		} else {
			message = err.message || message;
			errors = [err.message || 'Unknown error'];
		}
	}

	// Build error response
	const errorResponse = {
		success: false,
		message,
		error: {
			statusCode,
			explanation: errors,
			// Include request ID for tracking/support
			requestId,
			// Include timestamp
			timestamp: new Date().toISOString(),
			// Only include stack trace in development
			...(ServerConfig.NODE_ENV !== 'production' && err.stack ? { stack: err.stack } : {}),
		}
	};

	// Send response
	res.status(statusCode).json(errorResponse);
}

// Auth rate limiter - export for use in route files
export const authLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: ServerConfig.NODE_ENV === 'production' ? 5 : 50,
	skipSuccessfulRequests: true, // Don't count successful logins
	message: 'Too many login attempts, please try again after 15 minutes',
});

export { applySecurity, errorHandler };
