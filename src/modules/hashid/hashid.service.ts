import { Inject, Injectable } from '@nestjs/common'
import { IHashidModuleOptions } from './hashid.interface'
import { MODULE_OPTIONS_TOKEN } from './hashid.module-definition'

@Injectable()
export class HashidService {
    constructor(
        @Inject(MODULE_OPTIONS_TOKEN)
        private readonly options: IHashidModuleOptions
    ) {}

    encode(id: bigint | number) {
        return this.options.hashids.encode(id)
    }

    decode(hashid: string) {
        return this.options.hashids.decode(hashid)
    }

    isValidId(hashid: string) {
        return this.options.hashids.isValidId(hashid)
    }
}
