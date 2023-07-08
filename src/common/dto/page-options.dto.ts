import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { Order } from '../constants/order.constants';

export class PageOptionsDto {
  @IsEnum(Order)
  @IsOptional()
  readonly order?: Order = Order.ASC;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  page?: number = 1;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  @IsOptional()
  limit?: number = 10;

  @IsString()
  @IsOptional()
  @Type(() => String)
  readonly search?: string;

  @IsString()
  @IsOptional()
  @Type(() => String)
  readonly type?: string;

  @IsString()
  @IsOptional()
  @Type(() => String)
  readonly modality?: string;

  @IsString()
  @IsOptional()
  @Type(() => String)
  readonly country?: string;

  @IsString()
  @IsOptional()
  @Type(() => String)
  readonly category?: string;

  @IsString()
  @IsOptional()
  @Type(() => String)
  readonly source?: string;

  get skip(): number {
    if (this.page && this.limit) {
      return (this.page - 1) * this.limit;
    }

    return 10;
  }
}
