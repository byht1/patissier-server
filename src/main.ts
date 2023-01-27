import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

const start = async () => {
  try {
    const PORT = process.env.PORT || 5000;
    const app = await NestFactory.create(AppModule, { cors: true });

    const config = new DocumentBuilder()
      .setTitle('Bakery')
      .setDescription('Documentation REST API')
      .setVersion('1.0.11')
      .addServer(`http://localhost:${PORT}`)
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/docs', app, document);

    await app.listen(PORT, () =>
      console.log(`server start http://localhost:${PORT}/docs`),
    );
  } catch (error) {
    console.error(error);
  }
};

start();
