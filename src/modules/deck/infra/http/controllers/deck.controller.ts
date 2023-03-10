import { DeckEntity } from '@modules/deck/domain/entities/deck.entity';
import { CreateDeckDto } from '@modules/deck/dto/create-deck.dto';
import { UpdateDeckDto } from '@modules/deck/dto/update-deck.dto';
import { CreateDeckService } from '@modules/deck/services/create-deck.service';
import { DeleteDeckService } from '@modules/deck/services/delete-deck.service';
import { FindAllDeckService } from '@modules/deck/services/findAll-deck.service';
import { FindByIdDeckService } from '@modules/deck/services/findById-deck.service';
import { UpdateDeckService } from '@modules/deck/services/update-deck.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import { CustomRequest } from '@shared/interfaces';
import { Pagination } from 'nestjs-typeorm-paginate';

@Controller('deck')
export class DeckController {
  constructor(
    private readonly createService: CreateDeckService,
    private readonly updateService: UpdateDeckService,
    private readonly findAllService: FindAllDeckService,
    private readonly findByIdService: FindByIdDeckService,
    private readonly deleteService: DeleteDeckService,
  ) {}

  @Get('/list')
  async findAll(
    @Query('page') page: string,
    @Query('limit') limit: string,
  ): Promise<Pagination<DeckEntity> | DeckEntity[]> {
    return await this.findAllService.execute({
      limit: limit || null,
      page: page || null,
    });
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<DeckEntity> {
    return await this.findByIdService.execute(Number(id));
  }

  @Post('/create')
  async create(
    @Body() data: CreateDeckDto,
    @Req() request: CustomRequest,
  ): Promise<DeckEntity> {
    return await this.createService.execute({
      ...data,
      user: request.user.id,
    });
  }

  @Put('/update/:id')
  async update(
    @Param('id') id: string,
    @Body() data: UpdateDeckDto,
    @Req() request: CustomRequest,
  ): Promise<string> {
    await this.updateService.execute(Number(id), {
      ...data,
      user: request.user.id,
    });
    return 'updated';
  }

  @Delete('/delete/:id')
  async delete(@Param('id') id: string): Promise<string> {
    await this.deleteService.execute(Number(id));
    return 'deleted';
  }
}
