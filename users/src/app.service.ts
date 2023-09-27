import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class AppService {
  private readonly users: User[] = [];

  async create(body: CreateUserDto) {
    const user = { ...body, id: this.users.length + 1 };
    this.users.push(user);

    return user;
  }

  async findAll() {
    return this.users;
  }

  async findOne(id: number) {
    const user = this.users.find((u) => u.id === id);

    if (!user) throw new RpcException('User not found.');

    return user;
  }
}
