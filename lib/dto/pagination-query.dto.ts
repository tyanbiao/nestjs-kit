import { Transform, Type } from 'class-transformer'
import { IsInt, IsOptional, Min, IsArray } from 'class-validator'

export class PaginationQueryDto {
    @IsInt()
    @IsOptional()
    @Min(1)
    @Type(() => Number)
    current?: number = 1

    @IsInt()
    @Type(() => Number)
    @IsOptional()
    @Min(1)
    pageSize?: number = 10

    @IsOptional()
    @IsArray()
    @Transform(({ value }) => value.split(','), { toClassOnly: true })
    sort?: string[]
}
