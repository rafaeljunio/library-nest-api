import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common'
import { BookService } from './book.service'
import type { Book } from './schemas/book.schema'
import { CreateBookDto } from './dto/create-book.dto'
import type { UpdateBookDto } from './dto/update-book.dto'

import { ParsedUrlQuery } from 'node:querystring'
import { AuthGuard } from '@nestjs/passport'
import { RolesGuard } from '../../src/auth/roles-guard'
import { Roles } from '../../src/auth/roles'

@Controller('books')
@UseGuards(AuthGuard(), RolesGuard)
export class BookController {
  constructor(private bookService: BookService) {}

  @Get()
  @Roles('admin', 'user')
  async getAllBooks(@Query() query: ParsedUrlQuery): Promise<Book[]> {
    return this.bookService.findAll(query)
  }

  @Post()
  @Roles('admin')
  async createBook(@Body() book: CreateBookDto): Promise<Book> {
    return this.bookService.create(book)
  }

  @Get(':id')
  @Roles('admin', 'user')
  async getBook(@Param('id') id: string): Promise<Book> {
    return this.bookService.findById(id)
  }

  @Put(':id')
  @Roles('admin')
  async updateBook(
    @Param('id') id: string,
    @Body() book: UpdateBookDto,
  ): Promise<Book> {
    return this.bookService.updateById(id, book)
  }

  @Delete(':id')
  @Roles('admin')
  async deleteBook(@Param('id') id: string): Promise<{ deleted: boolean }> {
    return this.bookService.deleteById(id)
  }
}
