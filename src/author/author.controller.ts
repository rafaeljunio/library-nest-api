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
import { AuthorService } from './author.service'
import type { Author } from './schemas/author.schema'
import { CreateAuthorDto } from './dto/create-author.dto'
import type { UpdateAuthorDto } from './dto/update-author.dto'

import { ParsedUrlQuery } from 'node:querystring'
import { AuthGuard } from '@nestjs/passport'
import { RolesGuard } from '../auth/roles-guard'
import { Roles } from '../auth/roles'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'

@Controller('authors')
@ApiTags('authors')
@ApiBearerAuth()
@UseGuards(AuthGuard(), RolesGuard)
export class AuthorController {
  constructor(private authorService: AuthorService) {}

  @Get()
  @Roles('admin', 'user')
  @ApiOperation({ summary: 'List all authors' })
  async getAllAuthors(@Query() query: ParsedUrlQuery): Promise<Author[]> {
    return this.authorService.findAll(query)
  }

  @Post()
  @Roles('admin')
  @ApiOperation({ summary: 'Create a author' })
  async createAuthor(@Body() author: CreateAuthorDto): Promise<Author> {
    return this.authorService.create(author)
  }

  @Get(':id')
  @Roles('admin', 'user')
  @ApiOperation({ summary: 'Get author by Id' })
  async getAuthor(@Param('id') id: string): Promise<Author> {
    return this.authorService.findById(id)
  }

  @Put(':id')
  @Roles('admin')
  @ApiOperation({ summary: 'Update author' })
  async updateAuthor(
    @Param('id') id: string,
    @Body() author: UpdateAuthorDto,
  ): Promise<Author> {
    return this.authorService.updateById(id, author)
  }

  @Delete(':id')
  @Roles('admin')
  @ApiOperation({ summary: 'Delete author by Id' })
  async deleteAuthor(@Param('id') id: string): Promise<{ deleted: boolean }> {
    return this.authorService.deleteById(id)
  }
}
