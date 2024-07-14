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
import { RolesGuard } from '../auth/roles-guard'
import { Roles } from '../auth/roles'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'

@Controller('books')
@ApiTags('books')
@ApiBearerAuth()
@UseGuards(AuthGuard(), RolesGuard)
export class BookController {
  constructor(private bookService: BookService) {}

  @Get()
  @Roles('admin', 'user')
  @ApiOperation({ summary: 'List all books' })
  async getAllBooks(@Query() query: ParsedUrlQuery): Promise<Book[]> {
    return this.bookService.findAll(query)
  }

  @Post()
  @Roles('admin')
  @ApiOperation({ summary: 'Create a book' })
  async createBook(@Body() book: CreateBookDto): Promise<Book> {
    return this.bookService.create(book)
  }

  @Get(':id')
  @Roles('admin', 'user')
  @ApiOperation({ summary: 'Get a book by Id' })
  async getBook(@Param('id') id: string): Promise<Book> {
    return this.bookService.findById(id)
  }

  @Put(':id')
  @Roles('admin')
  @ApiOperation({ summary: 'Update book' })
  async updateBook(
    @Param('id') id: string,
    @Body() book: UpdateBookDto,
  ): Promise<Book> {
    return this.bookService.updateById(id, book)
  }

  @Delete(':id')
  @Roles('admin')
  @ApiOperation({ summary: 'Delete book by Id' })
  async deleteBook(@Param('id') id: string): Promise<{ deleted: boolean }> {
    return this.bookService.deleteById(id)
  }
}
