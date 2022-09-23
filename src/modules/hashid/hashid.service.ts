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
        return this.options.hashids.decode(hashid)[0]
    }

    isValidId(hashid: string) {
        return this.options.hashids.isValidId(hashid)
    }

    encodeEntity(data: unknown) {
        if (typeof data === 'bigint') {
            return this.encode(data)
        }
        if (typeof data === 'object') {
            if (Array.isArray(data)) {
                for (let i = 0; i < data.length; i++) {
                    data[i] = this.encodeEntity(data[i])
                }
                return data
            }
            for (const k in data) {
                data[k] = this.encodeEntity(data[k])
            }
            return data
        }
        return data
    }
}
