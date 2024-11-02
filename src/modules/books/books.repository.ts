import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from 'src/modules/books/book.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BooksRepository {
  constructor(
    @InjectRepository(Book)
    private readonly booksORMRepository: Repository<Book>,
  ) {}

  async save(book: Book): Promise<Book[]> {
    return this.booksORMRepository.find();
  }

  async findOneOrNotFoundFail(id: number): Promise<Book> {
    const result = await this.booksORMRepository.findOne({ where: { id } });

    if (!result) {
      throw new NotFoundException('Book not found');
    }
    return result;
  }

  async remove(id: number): Promise<void> {
    await this.booksORMRepository.delete(id);
  }
}
