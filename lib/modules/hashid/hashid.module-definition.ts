import { ConfigurableModuleBuilder } from '@nestjs/common'
import { IHashidModuleOptions } from './hashid.interface'

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
    new ConfigurableModuleBuilder<IHashidModuleOptions>().build()
