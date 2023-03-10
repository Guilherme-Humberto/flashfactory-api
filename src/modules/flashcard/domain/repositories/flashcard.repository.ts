import { CreateFlashcardDto } from '@modules/flashcard/dto/create-flashcard.dto';
import { UpdateFlashcardDto } from '@modules/flashcard/dto/update-flashcard.dto';
import { FlashcardEntity } from '../entities/flashcard.entity';

export interface IFlashcardRepository {
  create(data: CreateFlashcardDto): Promise<FlashcardEntity>;
  update(data: UpdateFlashcardDto): Promise<FlashcardEntity>;
  delete(id: number, deckId: number): Promise<void>;
  findAll(deckId: number): Promise<FlashcardEntity[]>;
  findOne(where: object): Promise<FlashcardEntity>;
}
