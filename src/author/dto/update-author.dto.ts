import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class UpdateAuthorDto {
  @ApiProperty({ description: 'The name of the author' })
  @IsNotEmpty()
  @IsString()
  readonly name: string

  @ApiProperty({ description: 'The biography of the author' })
  @IsNotEmpty()
  @IsString()
  readonly biography: string

  @ApiProperty({ description: 'The birthDate of the author' })
  @IsNotEmpty()
  @IsString()
  readonly birthDate: Date
}
