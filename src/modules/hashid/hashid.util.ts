import Hashids from 'hashids'

export class HashidUtil {
    private static hashids: Hashids

    static getHashids() {
        if (!this.hashids) {
            throw new Error('Hashid Module not initial')
        }
        return this.hashids
    }

    static initial(hashids: Hashids) {
        this.hashids = hashids
    }

    static encodeEntity(data: unknown) {
        if (!this.hashids) {
            throw new Error('Hashid Module not initial')
        }

        if (typeof data === 'bigint') {
            return this.hashids.encode(data)
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
