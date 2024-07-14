import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { SignUpDto } from './dto/signup.dto'
import { LoginDto } from './dto/login.dto'
import { Public } from './public'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

@Controller('auth')
@ApiTags('users')
@Public()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  @ApiOperation({ summary: 'Sign UP' })
  signUp(@Body() signUpDto: SignUpDto): Promise<{ token: string }> {
    return this.authService.signUp(signUpDto)
  }

  @Post('/login')
  @ApiOperation({ summary: 'Login' })
  login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
    return this.authService.login(loginDto)
  }
}
