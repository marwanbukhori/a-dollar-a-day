import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as path from 'path';
async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    // Enable CORS
    app.enableCors();
    // Global validation pipe
    app.useGlobalPipes(new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
    }));
    // Serve static frontend files from the 'frontend/dist' directory
    app.useStaticAssets(path.join(__dirname, '..', 'frontend/dist'));
    // Handle API routes with prefix
    app.setGlobalPrefix('api');
    // Serve Vue frontend for all non-API routes
    app.use((req, res, next) => {
        if (!req.path.startsWith('/api')) {
            return res.sendFile(path.join(__dirname, '..', 'frontend/dist/index.html'));
        }
        next();
    });
    await app.listen(3000);
    console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
//# sourceMappingURL=main.js.map