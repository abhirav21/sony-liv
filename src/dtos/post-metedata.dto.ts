import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateMetaDataDto {
  @ApiPropertyOptional({ default: 'Transformers' })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({ default: 'nice movie' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ default: '' })
  @IsString()
  @IsOptional()
  release_date?: string;

  @ApiPropertyOptional({ default: JSON.stringify(['Action', 'Sci-Fi']) })
  @IsOptional()
  genres?: [];

  @ApiPropertyOptional({ default: JSON.stringify(['Keanu Reeves']) })
  @IsOptional()
  cast?: [];

  @ApiPropertyOptional({ default: '' })
  @IsOptional()
  crew?: any;

  @ApiPropertyOptional({
    default: JSON.stringify({
      access_control: {
        Admin: ['description', 'genres', 'cast', 'crew'],
        Editor: ['description', 'genres', 'cast', 'crew'],
      },
    }),
  })
  access_control?: any;

  @ApiPropertyOptional({ default: '' })
  @IsString()
  @IsOptional()
  url?: any;
}
