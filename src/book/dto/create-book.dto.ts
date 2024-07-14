import { ApiProperty } from '@nestjs/swagger'
import { IsDefined, IsMongoId, IsNotEmpty, IsString } from 'class-validator'

export class CreateBookDto {
  @ApiProperty({ description: 'The title of the book' })
  @IsNotEmpty()
  @IsString()
  readonly title: string

  @ApiProperty({ description: 'The description of the book' })
  @IsNotEmpty()
  @IsString()
  readonly description: string

  @ApiProperty({ description: 'The publication date of the book' })
  @IsNotEmpty()
  @IsString()
  readonly publicationDate: Date

  @ApiProperty({ description: 'The author Id  of the book' })
  @IsDefined()
  @IsMongoId()
  readonly authorId: string
}
