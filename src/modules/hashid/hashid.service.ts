import { Inject, Injectable, OnModuleInit } from '@nestjs/common'
import { IHashidModuleOptions } from './hashid.interface'
import { MODULE_OPTIONS_TOKEN } from './hashid.module-definition'
import Hashids from 'hashids'
import { HashidUtil } from './hashid.util'

@Injectable()
export class HashidService implements OnModuleInit {
    hashids: Hashids
    constructor(
        @Inject(MODULE_OPTIONS_TOKEN)
        private readonly options: IHashidModuleOptions
    ) {
        if (options.hashids) {
            this.hashids = options.hashids
        } else {
            const { salt, minLength, alphabet, seps } = options
            this.hashids = new Hashids(salt, minLength, alphabet, seps)
        }
        HashidUtil.initial(this.hashids)
    }

    onModuleInit() {
        HashidUtil.initial(this.hashids)
    }

    encode(id: bigint | number) {
        return this.hashids.encode(id)
    }

    decode(hashid: string) {
        return this.hashids.decode(hashid)[0]
    }

    isValidId(hashid: string) {
        return this.hashids.isValidId(hashid)
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
