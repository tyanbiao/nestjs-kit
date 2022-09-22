import {
    CallHandler,
    ExecutionContext,
    Injectable,
    Logger,
    NestInterceptor,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Observable } from 'rxjs'
import { IGNORED_INTERCEPTORS } from '../constants/nestjs-context.constant'

@Injectable()
export abstract class CustomInterceptor implements NestInterceptor {
    private logger = new Logger(CustomInterceptor.name)
    constructor(readonly reflector: Reflector) {}
    abstract intercept(
        context: ExecutionContext,
        next: CallHandler<any>
    ): Observable<any> | Promise<Observable<any>>

    shouldIgnore(context: ExecutionContext, name: string): boolean {
        const interceptors = this.reflector.getAllAndOverride<string[]>(
            IGNORED_INTERCEPTORS,
            [context.getHandler(), context.getClass()]
        )
        if (interceptors && interceptors.length > 0) {
            return interceptors.includes(name)
        }
        return false
    }
}
