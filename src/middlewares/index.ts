import { Express, Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { ServerConfig, Logger } from '../config';
import validateCreateRequest from './airplane-middleware';

export function applySecurity(app: Express) {
	// Basic security headers
	app.use(helmet());

	// CORS - restrict in production via CORS_ALLOWED_ORIGINS env if desired
	const corsOptions = {
		origin: ServerConfig.NODE_ENV === 'production' ? (process.env.CORS_ALLOWED_ORIGINS || '*') : '*',
		optionsSuccessStatus: 200,
	};
	app.use(cors(corsOptions));

	// Rate limiting
	const limiter = rateLimit({
		windowMs: Number(process.env.RATE_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
		max: Number(process.env.RATE_MAX) || 100, // limit each IP
		standardHeaders: true,
		legacyHeaders: false,
	});
	app.use(limiter);
}

// Central error handler
export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
	try {
		Logger.error(`Unhandled error: ${err && err.stack ? err.stack : err}`);
	} catch (e) {
		// ignore logger errors
	}
	const status = err && err.status ? err.status : 500;
	const message = err && err.message ? err.message : 'Internal Server Error';
	res.status(status).json({ message });
}

export default { applySecurity, errorHandler, validateCreateRequest};
