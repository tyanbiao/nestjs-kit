import {
    Catch,
    ArgumentsHost,
    ExceptionFilter,
    HttpStatus,
    HttpException,
} from '@nestjs/common'
import { restfulError } from '../utils/restful.util'

@Catch()
export class ExceptionsFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const response = host.switchToHttp().getResponse()
        let status = HttpStatus.INTERNAL_SERVER_ERROR
        const data = restfulError(exception, status)
        console.error(exception)
        if (exception instanceof HttpException) {
            status = exception.getStatus()
            data.code = status
            const payload = exception.getResponse()
            data.message = exception.message
            if (typeof payload === 'string') {
                data.message = `${data.message}: ${payload}`
            } else if (typeof payload === 'object') {
                const t = payload as {
                    statusCode?: number
                    message?: string
                    error?: string
                    code?: number
                }
                data.code = t?.code ?? data.code
                if (t?.message) {
                    const summary = t?.error ? t.error + ' ' : ''
                    data.message = `${summary}${t.message}`
                }
            }
        }
        response.status(status).json(data)
    }
}
