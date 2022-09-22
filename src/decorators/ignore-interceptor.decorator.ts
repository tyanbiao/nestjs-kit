import { SetMetadata } from '@nestjs/common'
import { IGNORED_INTERCEPTORS } from '../constants/nestjs-context.constant'

export const IgnoreInterceptors = (...interceptors: string[]) =>
    SetMetadata(IGNORED_INTERCEPTORS, interceptors)
