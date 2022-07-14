import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { Test, TestingModule } from '@nestjs/testing'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { UsersService } from './users/users.service'

describe('AuthController', () => {
  let controller: AuthController
  let service: AuthService

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
        controllers: [AuthController],
        providers: [AuthService, UsersService, JwtService, ConfigService],
      }).compile()

    service = moduleRef.get<AuthService>(AuthService)
    controller = moduleRef.get<AuthController>(AuthController)
  })

  it('controller should be defined', () => {
    expect(controller).toBeDefined()
  })
  it('service should be defined', () => {
    expect(service).toBeDefined()
  })
})
