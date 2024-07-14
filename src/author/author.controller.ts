import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common'
import { AuthorService } from './author.service'
import type { Author } from './schemas/author.schema'
import { CreateAuthorDto } from './dto/create-author.dto'
import type { UpdateAuthorDto } from './dto/update-author.dto'

import { ParsedUrlQuery } from 'node:querystring'
import { AuthGuard } from '@nestjs/passport'

@Controller('authors')
export class AuthorController {
  constructor(private authorService: AuthorService) {}

  @Get()
  async getAllAuthors(@Query() query: ParsedUrlQuery): Promise<Author[]> {
    return this.authorService.findAll(query)
  }

  @Post()
  @UseGuards(AuthGuard())
  async createAuthor(@Body() author: CreateAuthorDto): Promise<Author> {
    return this.authorService.create(author)
  }

  @Get(':id')
  async getAuthor(@Param('id') id: string): Promise<Author> {
    return this.authorService.findById(id)
  }

  @Put(':id')
  async updateAuthor(
    @Param('id') id: string,
    @Body() author: UpdateAuthorDto,
  ): Promise<Author> {
    return this.authorService.updateById(id, author)
  }

  @Delete(':id')
  async deleteAuthor(@Param('id') id: string): Promise<{ deleted: boolean }> {
    return this.authorService.deleteById(id)
  }
}
