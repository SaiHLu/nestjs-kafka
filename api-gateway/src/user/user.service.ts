import {
  Inject,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService implements OnModuleInit, OnModuleDestroy {
  private readonly users: User[] = [];

  constructor(
    @Inject('USER_SERVICE') private readonly userClient: ClientKafka,
  ) {}

  async onModuleInit() {
    this.userClient.subscribeToResponseOf('get_users');
    this.userClient.subscribeToResponseOf('get_user');
    this.userClient.subscribeToResponseOf('create_user');
    await this.userClient.connect();
  }

  async onModuleDestroy() {
    await this.userClient.close();
  }

  async create(body: CreateUserDto) {
    return lastValueFrom(
      this.userClient.send('create_user', JSON.stringify(body)),
    );
  }

  async findAll() {
    this.userClient.emit('user', JSON.stringify({ message: 'LOL' }));
    return lastValueFrom(this.userClient.send('get_users', {}));
  }

  async findOne(id: number) {
    const user = await lastValueFrom(
      this.userClient.send('get_user', JSON.stringify({ id })),
    );

    return user;
  }
}
