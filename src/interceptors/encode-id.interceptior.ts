import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { CustomInterceptor } from './custom.interceptor'

@Injectable()
export class EncodeIdInterceptor<T>
    extends CustomInterceptor
    implements NestInterceptor<T, any>
{
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        if (this.shouldIgnore(context, EncodeIdInterceptor.name)) {
            return next.handle()
        }
        return next.handle()
    }
}
