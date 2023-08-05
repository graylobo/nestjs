import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Board } from './board.entity';
import { BoardStatus } from './boards-status.enum';
import { CreateBoardDTO } from './dto/create-board.dto';
import { User } from 'src/auth/user.entity';

export class BoardRepository extends Repository<Board> {
  constructor(@InjectRepository(Board) private dataSource: DataSource) {
    super(Board, dataSource.manager); // 변경
    // super(Board, dataSource.createEntityManager()) // 삭제
  }
  async createBoard(
    createBoardDto: CreateBoardDTO,
    user: User,
  ): Promise<Board> {
    const { title, description } = createBoardDto;

    const board = this.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
      user,
    });

    await this.save(board);
    return board;
  }
}
