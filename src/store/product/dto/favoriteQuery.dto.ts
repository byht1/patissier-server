import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { errorMessageDto } from 'src/classValidator';

export enum EActionFavorite {
  ADD = 'add',
  DELETE = 'delete',
}

export class FavoriteQueryDto {
  @ApiProperty({
    description: `Вказує на тип операції<br />
     <b>Доступні поля для вводу:</b> ${Object.values(EActionFavorite).join(', ')}<br />`,
    default: EActionFavorite.ADD,
  })
  @IsString({ message: errorMessageDto.notString })
  @IsEnum(EActionFavorite, { message: `Повинне мати одне із значень ${Object.values(EActionFavorite).join(', ')}` })
  readonly action: EActionFavorite;
}
