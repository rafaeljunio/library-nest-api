import {
  IsDate,
  IsDefined,
  IsEmpty,
  IsMongoId,
  IsNotEmpty,
  IsString,
} from 'class-validator'

export class CreateBookDto {
  @IsNotEmpty()
  @IsString()
  readonly title: string

  @IsNotEmpty()
  @IsString()
  readonly description: string

  @IsNotEmpty()
  @IsString()
  readonly publicationDate: Date

  @IsDefined()
  @IsMongoId()
  readonly authorId: string
}
