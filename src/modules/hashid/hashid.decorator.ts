import {
    BadRequestException,
    createParamDecorator,
    ExecutionContext,
} from '@nestjs/common'
import type { Request } from 'express'
import { HashidUtil } from './hashid.util'
import { Transform } from 'class-transformer'

export const HashidParam = createParamDecorator<string>(
    (key: string, ctx: ExecutionContext) => {
        const k = key?.trim()
        const request: Request = ctx.switchToHttp().getRequest()

        if (k && k.length > 0) {
            if (!HashidUtil.getHashids().isValidId(request.params[k])) {
                throw new BadRequestException(
                    `The provided id ${request.params[k]} is invalide`
                )
            }
            return HashidUtil.getHashids().decode(request.params[key])[0]
        }

        const obj: { [name: string]: bigint | number } = {}

        for (const k in request.params) {
            if (HashidUtil.getHashids().isValidId(request.params[k])) {
                obj[k] = HashidUtil.getHashids().decode(request.params[k])[0]
            }
        }
        return obj
    }
)

export const ParseHashid = () =>
    Transform(({ value }) => HashidUtil.getHashids().decode(value)[0])
