import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.service';

const start = async () => {
  try {
    const PORT = process.env.PORT || 5000;
    const app = await NestFactory.create(AppModule, { cors: true });

    //tesr

    const config = new DocumentBuilder()
      .setTitle('Bakery')
      .setDescription('Documentation REST API')
      .setVersion('0.0.1')
      .addServer('http://localhost:5000')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/docs', app, document);

    await app.listen(PORT, () =>
      console.log(`server start http://localhost:${PORT}`),
    );
  } catch (error) {
    console.error(error);
  }
};

// gs://music-db-11801.appspot.com

start();
