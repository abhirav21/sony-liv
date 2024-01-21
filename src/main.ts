import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './transform.interceptor';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = (await NestFactory.create(AppModule)).useGlobalInterceptors(
    new TransformInterceptor(),
  );
  const globalPrefix = 'metadata';

  setUpSwagger(`${globalPrefix}/api`, app);
  await app.listen(3000);
}
function setUpSwagger(docPrefix: string, app: any) {
  const options = new DocumentBuilder()
    .setTitle('Meta Data Apis')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options, {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  });
  SwaggerModule.setup(docPrefix, app, document);
}
bootstrap();
