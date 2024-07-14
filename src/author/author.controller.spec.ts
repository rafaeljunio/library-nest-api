import { Test, TestingModule } from '@nestjs/testing'
import { AuthorService } from './author.service'
import { AuthorController } from './author.controller'
import { PassportModule } from '@nestjs/passport'
import type { CreateAuthorDto } from './dto/create-author.dto'
import type { UpdateAuthorDto } from './dto/update-author.dto'

describe('AuthorController', () => {
  let authorService: AuthorService
  let authorController: AuthorController

  const mockAuthor = {
    _id: '66904ff4c8f56f618558010d',
    name: 'New Author',
    biography: 'Author biography',
    birthDate: new Date('1980-10-10'),
  }

  const mockAuthorService = {
    findAll: jest.fn().mockResolvedValue([mockAuthor]),
    create: jest.fn(),
    findById: jest.fn().mockResolvedValueOnce(mockAuthor),
    updateById: jest.fn(),
    deleteById: jest.fn().mockResolvedValueOnce({ deleted: true }),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
      controllers: [AuthorController],
      providers: [
        {
          provide: AuthorService,
          useValue: mockAuthorService,
        },
      ],
    }).compile()

    authorService = module.get<AuthorService>(AuthorService)
    authorController = module.get<AuthorController>(AuthorController)
  })

  it('should be defined', () => {
    expect(authorController).toBeDefined()
  })

  describe('getAllAuthors', () => {
    it('should get all authors', async () => {
      const result = await authorController.getAllAuthors({
        page: '1',
        keyword: 'test',
      })

      expect(authorService.findAll).toHaveBeenCalled()
      expect(result).toEqual([mockAuthor])
    })
  })

  describe('createAuthor', () => {
    it('should create a new author', async () => {
      const newAuthor = {
        name: 'New Author',
        biography: 'Author biography',
        birthDate: new Date('1980-10-10'),
      }

      mockAuthorService.create = jest.fn().mockResolvedValueOnce(mockAuthor)

      const result = await authorController.createAuthor(
        newAuthor as CreateAuthorDto,
      )

      expect(authorService.create).toHaveBeenCalled()
      expect(result).toEqual(mockAuthor)
    })
  })

  describe('getAuthorById', () => {
    it('should get a author by ID', async () => {
      const result = await authorController.getAuthor(mockAuthor._id)

      expect(authorService.findById).toHaveBeenCalled()
      expect(result).toEqual(mockAuthor)
    })
  })

  describe('updateAuthor', () => {
    it('should update author by its ID', async () => {
      const updatedAuthor = { ...mockAuthor, title: 'Updated name' }
      const author = { name: 'Updated name' }

      mockAuthorService.updateById = jest
        .fn()
        .mockResolvedValueOnce(updatedAuthor)

      const result = await authorController.updateAuthor(
        mockAuthor._id,
        author as UpdateAuthorDto,
      )

      expect(authorService.findById).toHaveBeenCalled()
      expect(result).toEqual(updatedAuthor)
    })
  })

  describe('deleteAuthor', () => {
    it('should delete a author by ID', async () => {
      const result = await authorController.deleteAuthor(mockAuthor._id)

      expect(authorService.deleteById).toHaveBeenCalled()
      expect(result).toEqual({ deleted: true })
    })
  })
})
