import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { AppValidationPipe } from './common/pipes/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.useGlobalPipes(new AppValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new ResponseInterceptor());

  const config = new DocumentBuilder()
    .setTitle('Quran API')
    .setDescription(
      'Full REST API for Quran text, audio, and search. Built with NestJS + SQLite.',
    )
    .setVersion('1.0')
    .addTag('Surahs', 'List and retrieve the 114 surahs')
    .addTag('Ayahs', 'Retrieve ayahs by surah with pagination')
    .addTag('Audio', 'Audio URLs and streaming proxy')
    .addTag('Search', 'Full-text search across Arabic and English text')
    .addTag('Font Settings', 'Available Arabic fonts and default size settings')
    .addTag('Health', 'Service health')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  addGlobalResponses(document);
  SwaggerModule.setup('/api/docs', app, document, {
    jsonDocumentUrl: '/api/docs-json',
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

function addGlobalResponses(document: OpenAPIObject): void {
  document.components ??= {};
  document.components.responses = {
    ...document.components.responses,
    BadRequest: {
      description: 'Bad request',
    },
    NotFound: {
      description: 'Resource not found',
    },
    InternalServerError: {
      description: 'Internal server error',
    },
  };

  for (const pathItem of Object.values(document.paths)) {
    for (const operation of Object.values(pathItem ?? {})) {
      if (!operation || !isOperationObject(operation)) {
        continue;
      }

      operation.responses ??= {};
      operation.responses[400] ??= {
        $ref: '#/components/responses/BadRequest',
      };
      operation.responses[404] ??= { $ref: '#/components/responses/NotFound' };
      operation.responses[500] ??= {
        $ref: '#/components/responses/InternalServerError',
      };
    }
  }
}

type SwaggerOperation = {
  responses?: Record<string | number, unknown>;
};

function isOperationObject(value: unknown): value is SwaggerOperation {
  return typeof value === 'object' && value !== null && 'responses' in value;
}
