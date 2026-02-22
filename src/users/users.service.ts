import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import userRoleEnum from './enums/userRoleEnum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserctDto: CreateUserDto): Promise<User> {
    try {
      const newUser = this.userRepository.create(createUserctDto);
      return await this.userRepository.save(newUser);
    } catch {
      throw new BadRequestException('هنگام ایجاد کاربر جدید خطایی رخ داد');
    }
  }

  async findAll(role?: userRoleEnum, limit: number = 10, page: number = 1) {
    const query = this.userRepository.createQueryBuilder('users');
    if (role) {
      query.where('role = :x', { x: role });
    }
    query.skip((page - 1) * limit).take(limit);

    return await query.getMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
