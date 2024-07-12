import { Test, TestingModule } from '@nestjs/testing'
import { BookService } from './book.service'
import { Category } from './schemas/book.schema'
import { BookController } from './book.controller'
import { PassportModule } from '@nestjs/passport'
import type { CreateBookDto } from './dto/create-book.dto'
import type { UpdateBookDto } from './dto/update-book.dto'

describe('BookController', () => {
  let bookService: BookService
  let bookController: BookController

  const mockBook = {
    _id: '66904ff4c8f56f618558010d',
    user: '669035b047406fa0da8ba059',
    title: 'New Book',
    description: 'Book Description',
    author: 'Author 1',
    price: 100,
    category: Category.FANTASY,
  }

  const mockUser = {
    _id: '61c0ccf11d7bf83d153d7c06',
    name: 'Ghulam',
    email: 'ghulam1@gmail.com',
  }

  const mockBookService = {
    findAll: jest.fn().mockResolvedValue([mockBook]),
    create: jest.fn(),
    findById: jest.fn().mockResolvedValueOnce(mockBook),
    updateById: jest.fn(),
    deleteById: jest.fn().mockResolvedValueOnce({ deleted: true }),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
      controllers: [BookController],
      providers: [
        {
          provide: BookService,
          useValue: mockBookService,
        },
      ],
    }).compile()

    bookService = module.get<BookService>(BookService)
    bookController = module.get<BookController>(BookController)
  })

  it('should be defined', () => {
    expect(bookController).toBeDefined()
  })

  describe('getAllBooks', () => {
    it('should get all books', async () => {
      const result = await bookController.getAllBooks({
        page: '1',
        keyword: 'test',
      })

      expect(bookService.findAll).toHaveBeenCalled()
      expect(result).toEqual([mockBook])
    })
  })

  describe('createBook', () => {
    it('should create a new book', async () => {
      const newBook = {
        title: 'New Book',
        description: 'Book Description',
        author: 'Author',
        price: 100,
        category: Category.FANTASY,
      }

      mockBookService.create = jest.fn().mockResolvedValueOnce(mockBook)

      const result = await bookController.createBook(
        newBook as CreateBookDto,
        mockUser,
      )

      expect(bookService.create).toHaveBeenCalled()
      expect(result).toEqual(mockBook)
    })
  })

  describe('getBookById', () => {
    it('should get a book by ID', async () => {
      const result = await bookController.getBook(mockBook._id)

      expect(bookService.findById).toHaveBeenCalled()
      expect(result).toEqual(mockBook)
    })
  })

  describe('updateBook', () => {
    it('should update book by its ID', async () => {
      const updatedBook = { ...mockBook, title: 'Updated name' }
      const book = { title: 'Updated name' }

      mockBookService.updateById = jest.fn().mockResolvedValueOnce(updatedBook)

      const result = await bookController.updateBook(
        mockBook._id,
        book as UpdateBookDto,
      )

      expect(bookService.findById).toHaveBeenCalled()
      expect(result).toEqual(updatedBook)
    })
  })

  describe('deleteBook', () => {
    it('should delete a book by ID', async () => {
      const result = await bookController.deleteBook(mockBook._id)

      expect(bookService.deleteById).toHaveBeenCalled()
      expect(result).toEqual({ deleted: true })
    })
  })
})
