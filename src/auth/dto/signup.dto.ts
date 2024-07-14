import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator'
import { Role } from '../schemas/user.schema'
import { ApiProperty } from '@nestjs/swagger'

export class SignUpDto {
  @ApiProperty({ description: 'The name of the user' })
  @IsNotEmpty()
  @IsString()
  readonly name: string

  @ApiProperty({ description: 'The email of the user' })
  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter correct email' })
  readonly email: string

  @ApiProperty({ description: 'The password of the user' })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  readonly password: string

  @ApiProperty({ description: 'The role of the user', enum: Role })
  @IsNotEmpty()
  @IsEnum(Role)
  readonly role: Role
}
