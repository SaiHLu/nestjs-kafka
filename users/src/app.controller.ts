import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDto } from './dto/create-user.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('create_user')
  async create(@Payload() createUserDto: CreateUserDto) {
    return this.appService.create(createUserDto);
  }

  @MessagePattern('get_users')
  async findAll() {
    console.log('get all users');
    return this.appService.findAll();
  }

  @MessagePattern('get_user')
  async findOne(@Payload('id') id: string) {
    console.log('id: ', id);
    return this.appService.findOne(+id);
  }
}
