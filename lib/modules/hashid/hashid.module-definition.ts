import { ConfigurableModuleBuilder } from '@nestjs/common'
import { IHashidModuleOptions } from './hashid.interface'

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
    new ConfigurableModuleBuilder<IHashidModuleOptions>()
        .setClassMethodName('forRoot')
        .setExtras({ isGlobal: true }, (definition, extras) => ({
            ...definition,
            global: extras.isGlobal,
        }))
        .build()
