import Hashids from 'hashids'

export type IHashidModuleOptions = {
    hashids?: Hashids
    salt?: string
    minLength?: number
    alphabet?: string
    seps?: string
}
