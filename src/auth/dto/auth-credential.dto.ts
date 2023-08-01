import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class AuthCredentialsDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(4, { message: '최소4이상' })
  @MaxLength(20)
  @Matches(/^[a-zA-z0-9]*$/, {
    message: '영어랑 숫자만 ㄱ',
  })
  password: string;
}
