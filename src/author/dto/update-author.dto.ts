import { IsNotEmpty, IsString } from 'class-validator'

export class UpdateAuthorDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string

  @IsNotEmpty()
  @IsString()
  readonly biography: string

  @IsNotEmpty()
  @IsString()
  readonly birthDate: Date
}
