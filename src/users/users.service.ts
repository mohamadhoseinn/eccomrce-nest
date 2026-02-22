import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

  async findOne(id: number) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException(`کاربر ${id} پیدا نشد!`);
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      await this.userRepository.update(id, {
        display_name: updateUserDto.display_name,
        role: updateUserDto.role,
      });
      return this.findOne(id);
    } catch {
      throw new BadRequestException('هنگام بروزرسانی خطایی رخ داد!');
    }
  }

  async remove(id: number) {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      return new NotFoundException(`کاربر ${id} پیدا نشد!`);
    }
  }
}
