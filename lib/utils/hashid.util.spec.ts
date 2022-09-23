import { encodeHashId } from './hashid.util'

describe('测试 hashid', () => {
    it('should return a string', () => {
        const hashid = encodeHashId(1)
        console.log(hashid)
        console.log(encodeHashId(1))
        expect(typeof hashid).toBe('string')
    })
})
