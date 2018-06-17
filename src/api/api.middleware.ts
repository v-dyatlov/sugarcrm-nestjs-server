import { Injectable, NestMiddleware, MiddlewareFunction } from '@nestjs/common';
import * as cors from 'cors'

@Injectable()
export class ApiMiddleware implements NestMiddleware {
    resolve(...args: any[]): MiddlewareFunction {
        return (req, res, next) => {
            cors({}, req, res, next);
        };
    }
}