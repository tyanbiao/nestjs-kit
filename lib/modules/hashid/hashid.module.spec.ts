import { Test, TestingModule } from '@nestjs/testing'
import { HashidModule } from './hashid.module'
import { HashidService } from './hashid.service'
import { HashidUtil } from './hashid.util'

describe('HashidModuel', () => {
    let service: HashidService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                HashidModule.registerAsync({
                    useFactory() {
                        return {
                            salt: 'TestingModule',
                            alphabet: '0123456789abcdef',
                            minLength: 6,
                        }
                    },
                }),
            ],
        }).compile()

        service = module.get<HashidService>(HashidService)
    })

    it('should be defined', () => {
        expect(service).toBeDefined()
    })

    it('should return', () => {
        const getHashids = jest.fn(() => HashidUtil.getHashids())
        getHashids()
        expect(getHashids).toReturn()
    })

    it('should encode number', () => {
        const id = service.encode(1)
        console.log(id)
        expect(id).toEqual(HashidUtil.getHashids().encode(1))
    })

    it('should decode a hashid', () => {
        expect(service.decode(HashidUtil.getHashids().encode(1))).toEqual(1)
    })

    it('should be encode', () => {
        const d = {
            id: BigInt(12),
            post: {
                id: BigInt(11),
            },
        }
        const encoded = service.encodeEntity(d) as any
        expect(encoded.id).toEqual(service.encode(12))
    })
})
