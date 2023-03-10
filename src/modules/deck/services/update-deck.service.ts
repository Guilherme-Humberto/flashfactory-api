import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { DeckEntity } from '../domain/entities/deck.entity';
import { IDeckRepository } from '../domain/repositories/deck.repository';
import { UpdateDeckDto } from '../dto/update-deck.dto';
import { DeckRepository } from '../infra/repositories/typeorm/deck.repository';

@Injectable()
export class UpdateDeckService {
  constructor(@Inject(DeckRepository) private readonly deck: IDeckRepository) {}

  public async execute(id: number, data: UpdateDeckDto): Promise<void> {
    const oldDeck = await this.deck.findOne({ id, user: { id: data.user } });

    if (!oldDeck) throw new NotFoundException('Deck not found');

    const newUser = Object.assign(oldDeck, data);

    await this.deck.update(newUser);
  }
}
