import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class BooksService {
  constructor(private dataSource: DataSource) {}

  async getAllBooks() {
    return this.dataSource.query(`
      SELECT * FROM view_books_full
      ORDER BY book_id;
    `);
  }

  async getBookById(id: number) {
    const result = await this.dataSource.query(
      `
      SELECT * FROM view_books_full
      WHERE book_id = $1;
      `,
      [id],
    );

    return result[0];
  }

  async createBook(book: any) {
    await this.dataSource.query(
      `
      CALL add_book($1, $2, $3, $4, $5, $6, $7);
      `,
      [
        book.title,
        book.author_id,
        book.genre_id,
        book.publisher_id,
        book.publication_year,
        book.price,
        book.quantity,
      ],
    );

    return {
      message: 'Книга успешно добавлена',
    };
  }

  async updateBookQuantity(id: number, quantity: number) {
    await this.dataSource.query(
      `
      CALL update_book_quantity($1, $2);
      `,
      [id, quantity],
    );

    return {
      message: 'Количество экземпляров книги изменено',
    };
  }

  async deleteBook(id: number) {
    await this.dataSource.query(
      `
      CALL delete_book($1);
      `,
      [id],
    );

    return {
      message: 'Книга успешно удалена',
    };
  }
}