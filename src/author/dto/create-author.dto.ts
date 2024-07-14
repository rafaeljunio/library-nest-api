import { IsNotEmpty, IsString } from 'class-validator'

export class CreateAuthorDto {
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
