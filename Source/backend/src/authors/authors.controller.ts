import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { AuthorsService } from './authors.service';

@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Get()
  getAllAuthors() {
    return this.authorsService.getAllAuthors();
  }

  @Get(':id')
  getAuthorById(@Param('id') id: string) {
    return this.authorsService.getAuthorById(Number(id));
  }

  @Post()
  createAuthor(@Body() author: any) {
    return this.authorsService.createAuthor(author);
  }

  @Patch(':id')
  updateAuthor(@Param('id') id: string, @Body() author: any) {
    return this.authorsService.updateAuthor(Number(id), author);
  }

  @Delete(':id')
  deleteAuthor(@Param('id') id: string) {
    return this.authorsService.deleteAuthor(Number(id));
  }
}