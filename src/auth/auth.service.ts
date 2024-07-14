import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { User } from './schemas/user.schema'
import { Model } from 'mongoose'
import * as bcrypt from 'bcryptjs'
import { JwtService } from '@nestjs/jwt'
import type { LoginDto } from './dto/login.dto'

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto): Promise<{ token: string }> {
    const { name, email, password, role } = signUpDto

    const hashedPassword = await bcrypt.hash(password, 10)

    try {
      const user = await this.userModel.create({
        name,
        email,
        password: hashedPassword,
        role,
      })

      const token = this.jwtService.sign({ id: user._id, roles: user.role })

      return { token }
    } catch (error) {
      if (error?.code === 11000) {
        throw new ConflictException('Email already exists')
      }
    }
  }

  async login(loginDto: LoginDto): Promise<{ token: string }> {
    const { email, password } = loginDto

    const user = await this.userModel.findOne({ email })

    if (!user) {
      throw new UnauthorizedException('Invalid email or password')
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password)

    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid email or password')
    }

    const token = this.jwtService.sign({ id: user._id, roles: user.role })

    return { token }
  }
}
