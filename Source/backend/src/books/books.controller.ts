import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  getAllBooks() {
    return this.booksService.getAllBooks();
  }

  @Get(':id')
  getBookById(@Param('id') id: string) {
    return this.booksService.getBookById(Number(id));
  }

  @Post()
  createBook(@Body() book: any) {
    return this.booksService.createBook(book);
  }

  @Patch(':id/quantity')
  updateBookQuantity(
    @Param('id') id: string,
    @Body('quantity') quantity: number,
  ) {
    return this.booksService.updateBookQuantity(Number(id), Number(quantity));
  }

  @Delete(':id')
  deleteBook(@Param('id') id: string) {
    return this.booksService.deleteBook(Number(id));
  }
}