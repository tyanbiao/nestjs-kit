import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { CustomInterceptor } from './custom.interceptor'

export interface RestfullResponse<T> {
    data: T
    code: number
    message: string
}

@Injectable()
export class RestfulInterceptor<T>
    extends CustomInterceptor
    implements NestInterceptor<T, RestfullResponse<T>>
{
    intercept(
        context: ExecutionContext,
        next: CallHandler
    ): Observable<RestfullResponse<T>> {
        if (this.shouldIgnore(context, RestfulInterceptor.name)) {
            return next.handle()
        }
        return next
            .handle()
            .pipe(map((data) => ({ data, code: 0, message: 'success' })))
    }
}
