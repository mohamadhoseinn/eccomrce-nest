import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpStatus,
  Res,
  Query,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { type Response } from 'express';
import userRoleEnum from './enums/userRoleEnum';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    const createUser = await this.usersService.create(createUserDto);

    return res.status(HttpStatus.CREATED).json({
      statusCode: HttpStatus.CREATED,
      data: createUser,
      message: 'کاربر جدید با موقیت ساخته شد',
    });
  }

  @Get()
  async findAll(
    @Res() res: Response,
    @Query('role') role?: userRoleEnum,
    @Query('limit') limit: number = 10,
    @Query('page') page: number = 1,
  ) {
    const users = await this.usersService.findAll(role, limit, page);

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: users,
      message: 'لیست کاربران با موفقیت دریافت شد',
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const user = await this.usersService.findOne(+id);

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: user,
      message: ' کاربر با موفقیت دریافت شد',
    });
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Res() res: Response,
  ) {
    const user = await this.usersService.update(+id, updateUserDto);

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: user,
      message: 'کاربر با موفقیت بروزرسانی شد',
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    await this.usersService.remove(+id);
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: null,
      message: 'کاربر مود نظر با موفقیت حذف شد',
    });
  }
}
