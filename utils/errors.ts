import {NextFunction, Response, Request} from 'express'
import {HttpStatusCode} from '../types/types'

class ValidationError extends Error {}

const handleError = (err: Error, req: Request, res: Response, next: NextFunction): void => {
    
    console.error(err);
    
    res
        .status(err instanceof ValidationError ? HttpStatusCode.NotFound : HttpStatusCode.InternalServerError)
        .render('error', {
            message: err instanceof ValidationError ? err.message : `We're setPriority, try in a while.`,
        });
};

export {
    handleError,
    ValidationError,
};
