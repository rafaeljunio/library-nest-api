import { Module } from '@nestjs/common'
import { AuthorController } from './author.controller'
import { AuthorService } from './author.service'
import { MongooseModule } from '@nestjs/mongoose'
import { AuthorSchema } from './schemas/author.schema'
import { AuthModule } from '../auth/auth.module'

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: 'Author', schema: AuthorSchema }]),
  ],
  controllers: [AuthorController],
  providers: [AuthorService],
})
export class AuthorModule {}
