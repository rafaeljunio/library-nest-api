import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Author } from './schemas/author.schema'
import * as mongoose from 'mongoose'

import { ParsedUrlQuery } from 'node:querystring'
import { User } from '../auth/schemas/user.schema'

@Injectable()
export class AuthorService {
  constructor(
    @InjectModel(Author.name)
    private authorModel: mongoose.Model<Author>,
  ) {}

  async findAll(query: ParsedUrlQuery): Promise<Author[]> {
    const resPerPage = 2
    const currentPage = Number(query.page) || 1
    const skip = resPerPage * (currentPage - 1)

    const keyword = query.keyword
      ? {
          name: {
            $regex: query.keyword,
            $options: 'i',
          },
        }
      : {}

    const authors = await this.authorModel
      .find({ ...keyword })
      .limit(resPerPage)
      .skip(skip)

    return authors
  }

  async create(author: Author): Promise<Author> {
    const res = await this.authorModel.create(author)
    return res
  }

  async findById(id: string): Promise<Author> {
    const isValidId = mongoose.isValidObjectId(id)

    if (!isValidId) {
      throw new BadRequestException('Please enter correct id.')
    }

    const author = await this.authorModel.findById(id)

    if (!author) {
      throw new NotFoundException('Author not found')
    }

    return author
  }

  async updateById(id: string, author: Author): Promise<Author> {
    return await this.authorModel.findByIdAndUpdate(id, author, {
      new: true,
      runValidators: true,
    })
  }

  async deleteById(id: string): Promise<{ deleted: boolean }> {
    await this.authorModel.findByIdAndDelete(id)
    return { deleted: true }
  }
}
