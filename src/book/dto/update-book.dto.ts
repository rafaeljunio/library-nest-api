import {
  IsDate,
  IsEmpty,
  IsMongoId,
  IsNotEmpty,
  IsString,
} from 'class-validator'

export class UpdateBookDto {
  @IsNotEmpty()
  @IsString()
  readonly title: string

  @IsNotEmpty()
  @IsString()
  readonly description: string

  @IsNotEmpty()
  @IsDate()
  readonly publicationDate: Date

  @IsEmpty({ message: 'You cannot pass author id' })
  @IsMongoId()
  readonly authorId: string
}
