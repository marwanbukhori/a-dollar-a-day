import { NestApplicationOptions } from '@nestjs/common';

const config: NestApplicationOptions = {
  logger: ['error', 'warn', 'log'],
};

export default config;
