import Hashids from 'hashids'

export type NumberLike = number | bigint

const hashids = new Hashids()

export const encodeHashId = (num: NumberLike) => {
    return hashids.encode(num)
}

export const decodeHashId = (num: string) => {
    return hashids.decode(num)
}
