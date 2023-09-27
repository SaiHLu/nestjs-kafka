import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: ['localhost:9092', 'localhost:9093', 'localhost:9094'],
        },
        consumer: {
          groupId: 'user-consumer',
        },
      },
    },
  );

  await app.listen();
}
bootstrap();
