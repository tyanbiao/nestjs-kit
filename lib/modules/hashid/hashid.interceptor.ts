import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common'
import { map, Observable } from 'rxjs'
import { CustomInterceptor } from '../../interceptors/custom.interceptor'
import { HashidUtil } from './hashid.util'

@Injectable()
export class HashidInterceptor<T>
    extends CustomInterceptor
    implements NestInterceptor<T, any>
{
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        if (this.shouldIgnore(context, HashidInterceptor.name)) {
            return next.handle()
        }
        return next.handle().pipe(map((data) => HashidUtil.encodeEntity(data)))
    }
}
