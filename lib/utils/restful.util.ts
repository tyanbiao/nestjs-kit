export async function restfulJSON<T>(
    _data: T | Promise<T>
): Promise<RestfulObject<T>> {
    const data = await _data
    return {
        data: data,
        code: 0,
        message: 'success',
    }
}

export function restfulError(error: any, code = 500): RestfulObject {
    return {
        data: null,
        code,
        message: '' + error.message || 'Internal server error',
    }
}

export type RestfulObject<T = null> = {
    data: T
    code: number
    message: string
}
