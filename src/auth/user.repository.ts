import { Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { User } from './user.entity';
import { CustomRepository } from 'src/database/typeorm-ex.decorator';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

@CustomRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(authCredentialDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialDto;
    const user = this.create({ username, password });

    try {
      await this.save(user);
    } catch (error) {
      console.log(error);
      switch (error.code) {
        case '23505':
          throw new ConflictException('이미존재함');
        default:
          throw new InternalServerErrorException('뷁');
      }
    }
  }
}
