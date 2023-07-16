import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { throws } from 'assert';
import { Board } from './boards.model';
import { CreateBoardDTO } from './dto/create-board.dto';

@Controller('boards')
export class BoardsController {
  constructor(private boardService: BoardsService) {}
  @Get()
  getAllBoard(): Board[] {
    return this.boardService.getAllBoards();
  }

  @Post()
  createBoard(@Body() createBoardDTO: CreateBoardDTO): Board {
    return this.boardService.createBoard(createBoardDTO);
  }

  @Get('/:id')
  getBoardById2(@Param('id') id: string): Board {
    console.log(id);
    return this.boardService.getBoardById(id);
  }
}
