import { Test, TestingModule } from '@nestjs/testing'
import { HashidModule } from './hashid.module'
import { HashidService } from './hashid.service'
import Hashids from 'hashids'

describe('HashidModuel', () => {
    let service: HashidService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                HashidModule.registerAsync({
                    useFactory() {
                        return {
                            hashids: new Hashids(),
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

    it('should encode number', () => {
        expect(service.encode(1)).toEqual(new Hashids().encode(1))
    })

    it('should decode a hashid', () => {
        expect(service.decode(new Hashids().encode(1))).toEqual(1)
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
