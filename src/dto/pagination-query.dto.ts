import { ApiPropertyOptional } from '@nestjs/swagger'
import { Transform, Type } from 'class-transformer'
import { IsInt, IsOptional, Min, IsArray } from 'class-validator'

export class PaginationQueryDto {
    @ApiPropertyOptional({
        description: '当前页，从1开始',
        example: 1,
        default: 1,
    })
    @IsInt()
    @IsOptional()
    @Min(1)
    @Type(() => Number)
    current?: number = 1

    @IsInt()
    @Type(() => Number)
    @IsOptional()
    @ApiPropertyOptional({
        description: '每页数量，默认10',
        example: 10,
        default: 10,
    })
    @Min(1)
    pageSize?: number = 10

    @ApiPropertyOptional({
        type: String,
        description: '排序字段，+表示升序，-表示降序，多个字段用逗号分隔',
        example: '-createdAt',
    })
    @IsOptional()
    @IsArray()
    @Transform(({ value }) => value.split(','), { toClassOnly: true })
    sort?: string[]
}
