import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // CORS
  app.enableCors()

  // Prefix (localhost:3000/listapi/)
  const globalPrefix = 'listapi'
  app.setGlobalPrefix(globalPrefix)

  const options = new DocumentBuilder()
    .setTitle('List-App Backend')
    .setDescription('Application to list some items to buy.')
    .setVersion('1.0')
    .addTag('List-App')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT', name: 'JWT', description: 'Enter JWT token', in: 'header' }, 'access_token')
    .build()
    
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('api', app, document)

  await app.listen(3000)
}
bootstrap()