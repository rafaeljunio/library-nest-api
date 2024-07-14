import { Test, TestingModule } from '@nestjs/testing'
import { AuthorService } from './author.service'
import { Author } from './schemas/author.schema'
import { getModelToken } from '@nestjs/mongoose'
import mongoose, { Model } from 'mongoose'
import { BadRequestException, NotFoundException } from '@nestjs/common'
import { User } from '../auth/schemas/user.schema'
import { CreateAuthorDto } from './dto/create-author.dto'

describe('AuthorService', () => {
  let authorService: AuthorService
  let model: Model<Author>

  const mockAuthor = {
    _id: '66904ff4c8f56f618558010d',
    name: 'New Author',
    biography: 'Author biography',
    birthDate: new Date('1980-10-10'),
  }

  const mockAuthorService = {
    find: jest.fn(),
    create: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthorService,
        {
          provide: getModelToken(Author.name),
          useValue: mockAuthorService,
        },
      ],
    }).compile()

    authorService = module.get<AuthorService>(AuthorService)
    model = module.get<Model<Author>>(getModelToken(Author.name))
  })

  describe('findAll', () => {
    it('should return an array of authors', async () => {
      const query = { page: '1', keyword: 'test' }

      jest.spyOn(model, 'find').mockImplementation(
        () =>
          ({
            limit: () => ({
              skip: jest.fn().mockResolvedValue([mockAuthor]),
            }),
          }) as any,
      )

      const result = await authorService.findAll(query)

      expect(model.find).toHaveBeenCalledWith({
        name: { $regex: 'test', $options: 'i' },
      })

      expect(result).toEqual([mockAuthor])
    })
  })

  describe('create', () => {
    it('should create and return a author', async () => {
      const newAuthor = {
        name: 'New Author',
        biography: 'Author biography',
        birthDate: new Date('1980-10-10'),
      }

      jest
        .spyOn(model, 'create')
        .mockImplementationOnce(() => Promise.resolve(mockAuthor as any))

      const result = await authorService.create(newAuthor as CreateAuthorDto)

      expect(result).toEqual(mockAuthor)
    })
  })

  describe('findById', () => {
    it('should find and return a author by ID', async () => {
      jest.spyOn(model, 'findById').mockResolvedValue(mockAuthor)

      const result = await authorService.findById(mockAuthor._id)

      expect(model.findById).toHaveBeenCalledWith(mockAuthor._id)
      expect(result).toEqual(mockAuthor)
    })

    it('should throw BadRequestException if invalid ID is provided', async () => {
      const id = 'invalid-id'

      const isValidObjectIDMock = jest
        .spyOn(mongoose, 'isValidObjectId')
        .mockReturnValue(false)

      await expect(authorService.findById(id)).rejects.toThrow(
        BadRequestException,
      )

      expect(isValidObjectIDMock).toHaveBeenCalledWith(id)
      isValidObjectIDMock.mockRestore()
    })

    it('should throw NotFoundException if author is not found', async () => {
      jest.spyOn(model, 'findById').mockResolvedValue(null)

      await expect(authorService.findById(mockAuthor._id)).rejects.toThrow(
        NotFoundException,
      )

      expect(model.findById).toHaveBeenCalledWith(mockAuthor._id)
    })
  })

  describe('updateById', () => {
    it('should update and return a author', async () => {
      const updatedAuthor = { ...mockAuthor, name: 'Updated name' }
      const author = { name: 'Updated name' }

      jest.spyOn(model, 'findByIdAndUpdate').mockResolvedValue(updatedAuthor)

      const result = await authorService.updateById(
        mockAuthor._id,
        author as any,
      )

      expect(model.findByIdAndUpdate).toHaveBeenCalledWith(
        mockAuthor._id,
        author,
        {
          new: true,
          runValidators: true,
        },
      )

      expect(result.name).toEqual(author.name)
    })
  })

  describe('deleteById', () => {
    it('should delete and return a author', async () => {
      jest.spyOn(model, 'findByIdAndDelete').mockResolvedValue(mockAuthor)

      const result = await authorService.deleteById(mockAuthor._id)

      expect(model.findByIdAndDelete).toHaveBeenCalledWith(mockAuthor._id)

      expect(result).toEqual({ deleted: true })
    })
  })
})
