import { Test, TestingModule } from '@nestjs/testing'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { Role } from './schemas/user.schema'

describe('AuthController', () => {
  let authService: AuthService
  let authController: AuthController

  let jwtToken = 'jwtToken'

  const mockAuthService = {
    signUp: jest.fn().mockResolvedValueOnce(jwtToken),
    login: jest.fn().mockResolvedValueOnce(jwtToken),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile()

    authService = module.get<AuthService>(AuthService)
    authController = module.get<AuthController>(AuthController)
  })

  it('should be defined', () => {
    expect(authController).toBeDefined()
  })

  describe('signUp', () => {
    it('should register a new user', async () => {
      const signUpDto = {
        name: 'John Doe',
        email: 'user@email.com',
        password: 'password123',
        role: Role.USER,
      }

      const result = await authController.signUp(signUpDto)

      expect(authService.signUp).toHaveBeenCalled()
      expect(result).toEqual(jwtToken)
    })
  })

  describe('login', () => {
    it('should login user', async () => {
      const loginDto = {
        email: 'user@email.com',
        password: 'password123',
      }

      const result = await authController.login(loginDto)
      expect(authService.login).toHaveBeenCalled()
      expect(result).toEqual(jwtToken)
    })
  })
})
