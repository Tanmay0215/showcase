import rateLimiter from '../config/upstash';
import { Request, Response, NextFunction } from 'express';

const rateLimit = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // Bypass rate limiting in development mode
    // Set NODE_ENV to 'development' manually if not set
    const nodeEnv = process.env.NODE_ENV || 'development';
    if (nodeEnv === 'development') {
        console.log(`🚀 Rate limiting bypassed in development mode for ${req.method} ${req.path}`);
        return next();
    }

    try {
        const { success } = await rateLimiter.limit(req.ip || '127.0.0.1');
        if (!success) {
            res.status(429).json({
                message: 'Rate limit exceeded. Please try again later.',
            });
        }
        next();
    }
    catch (error) {
        console.error('Rate limiter error:', error);
        next(error);
    }
}

export default rateLimit;