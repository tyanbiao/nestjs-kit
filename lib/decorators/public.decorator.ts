import { SetMetadata } from '@nestjs/common'
import { IS_PUBLIC } from '../constants/nestjs-context.constant'

export const Public = () => SetMetadata(IS_PUBLIC, true)
