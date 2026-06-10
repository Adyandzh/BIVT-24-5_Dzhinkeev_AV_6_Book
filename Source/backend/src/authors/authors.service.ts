import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class AuthorsService {
  constructor(private dataSource: DataSource) {}

  async getAllAuthors() {
    return this.dataSource.query(`
      SELECT *
      FROM authors
      ORDER BY id;
    `);
  }

  async getAuthorById(id: number) {
    const result = await this.dataSource.query(
      `
      SELECT *
      FROM authors
      WHERE id = $1;
      `,
      [id],
    );

    return result[0];
  }

  async createAuthor(author: any) {
    await this.dataSource.query(
      `
      INSERT INTO authors (full_name, country, birth_year)
      VALUES ($1, $2, $3);
      `,
      [author.full_name, author.country, author.birth_year],
    );

    return {
      message: 'Автор успешно добавлен',
    };
  }

  async updateAuthor(id: number, author: any) {
    await this.dataSource.query(
      `
      UPDATE authors
      SET full_name = $1,
          country = $2,
          birth_year = $3
      WHERE id = $4;
      `,
      [author.full_name, author.country, author.birth_year, id],
    );

    return {
      message: 'Автор успешно изменён',
    };
  }

  async deleteAuthor(id: number) {
    await this.dataSource.query(
      `
      DELETE FROM authors
      WHERE id = $1;
      `,
      [id],
    );

    return {
      message: 'Автор успешно удалён',
    };
  }
}