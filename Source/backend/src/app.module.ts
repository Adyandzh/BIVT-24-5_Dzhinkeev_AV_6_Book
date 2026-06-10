import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { AuthorsModule } from './authors/authors.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '12345',
      database: 'books_coursework',
      autoLoadEntities: true,
      synchronize: false,
    }),
    BooksModule,
    AuthorsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}