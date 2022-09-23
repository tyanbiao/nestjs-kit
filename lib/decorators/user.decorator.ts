import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import type { Request } from 'express'

export const User = createParamDecorator(
    (key: string, ctx: ExecutionContext) => {
        const k = key?.trim()
        const request: Request = ctx.switchToHttp().getRequest()

        const user = (request as any).user as { [k: string]: any }
        if (k && k.length > 0) {
            return user?.[k]
        }

        return user
    }
)
