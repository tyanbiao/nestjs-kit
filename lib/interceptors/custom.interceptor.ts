import { ExecutionContext, Inject } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { IGNORED_INTERCEPTORS } from '../constants/nestjs-context.constant'

export abstract class CustomInterceptor {
    constructor(@Inject(Reflector.name) private reflector: Reflector) {}

    shouldIgnore(context: ExecutionContext, name: string): boolean {
        const interceptors = this.reflector.getAllAndOverride<string[]>(
            IGNORED_INTERCEPTORS,
            [context.getHandler(), context.getClass()]
        )
        return (
            interceptors &&
            interceptors.length > 0 &&
            interceptors.includes(name)
        )
    }
}
