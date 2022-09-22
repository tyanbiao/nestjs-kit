import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common'

type QueryParams = { [key: string]: string | string[] }

@Injectable()
export class QueryTransformPipe implements PipeTransform {
    transform(value: QueryParams, _metadata: ArgumentMetadata) {
        const outgoingQuery: {
            [key: string]: string | string[] | QueryParams
        } = {}
        for (const key in value) {
            if (!value.hasOwnProperty(key)) {
                continue
            }
            if (!key.includes('.')) {
                outgoingQuery[key] = value[key]
                continue
            }
            const keys = key.split('.')
            const v = value[key]
            let tem: any = outgoingQuery
            for (let i = 0; i < keys.length; i++) {
                const k = keys[i]
                if (i === keys.length - 1) {
                    tem[k] = v
                }
                if (tem[k] === undefined) {
                    tem[k] = {}
                }
                tem = tem[k]
            }
        }
        return outgoingQuery
    }
}
