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
}
