import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './transform.interceptor';

async function bootstrap() {
  const app = (await NestFactory.create(AppModule)).useGlobalInterceptors(
    new TransformInterceptor(),
  );
  await app.listen(3000);
}
bootstrap();
