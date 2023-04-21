import { IsArray } from 'class-validator';
import { PageMetaDto } from './page-meta.dto';

export class PageDto<T> {
  @IsArray()
  readonly data: any;

  readonly meta: PageMetaDto;

  constructor(data: any, meta: PageMetaDto) {
    this.data = data;
    this.meta = meta;
  }
}
