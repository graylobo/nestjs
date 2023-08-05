import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Board } from './board.entity';
import { BoardRepository } from './board.repository';
import { BoardStatus } from './boards-status.enum';
import { CreateBoardDTO } from './dto/create-board.dto';
import { User } from 'src/auth/user.entity';

@Injectable()
export class BoardsService {
  constructor(private boardRepository: BoardRepository) {}

  async createBoard(
    createBoardDto: CreateBoardDTO,
    user: User,
  ): Promise<Board> {
    return await this.boardRepository.createBoard(createBoardDto, user);
  }
  async getAllBoards(user: User): Promise<Board[]> {
    const query = this.boardRepository.createQueryBuilder('board');
    query.where('board.userId = :userId', { userId: user.id });
    const boards = await query.getMany();
    return boards;
  }

  async getBoardById(id: number): Promise<Board> {
    const found = await this.boardRepository.findOne({ where: { id } });

    if (!found) {
      throw new NotFoundException('못찾음: ' + id);
    }
    return found;
  }
  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    const board = await this.getBoardById(id);
    board.status = status;
    await this.boardRepository.save(board);
    console.log('아디', id, '상태', status);
    return board;
  }

  async deleteBoard(id: number, user: User): Promise<void> {
    const board = await this.boardRepository.findOne({
      where: {
        id,
      },
    });

    if (!board) {
      throw new NotFoundException(`Board with ID "${id}" not found`);
    }

    if (Number(board.userId) !== user.id) {
      throw new UnauthorizedException(
        'You are not authorized to delete this board',
      );
    }

    const result = await this.boardRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException('Board not found');
    }
  }
}
