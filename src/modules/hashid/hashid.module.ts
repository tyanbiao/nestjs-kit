import { Module } from '@nestjs/common'
import { HashidService } from './hashid.service'
import { ConfigurableModuleClass } from './hashid.module-definition'

@Module({
    providers: [HashidService],
    exports: [HashidService],
})
export class HashidModule extends ConfigurableModuleClass {}
