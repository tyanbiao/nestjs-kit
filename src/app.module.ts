import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { HashidModule } from './modules/hashid/hashid.module'

@Module({
    imports: [HashidModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
