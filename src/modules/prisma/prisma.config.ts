import { Prisma } from '@prisma/client';

export type LogLevel = 'info' | 'query' | 'warn' | 'error';
export type LogDefinition = {
    level: LogLevel;
    emit: 'stdout' | 'event';
};

export const PRISMA_LOG_CONFIG: (Prisma.LogLevel | Prisma.LogDefinition)[] = [
    { level: 'warn', emit: 'stdout' },
    { level: 'info', emit: 'stdout' },
    { level: 'error', emit: 'stdout' },
    { level: 'query', emit: 'stdout' },
];

export const PRISMA_CLIENT_OPTIONS: Prisma.Subset<Prisma.PrismaClientOptions, Prisma.PrismaClientOptions> = {
    log: PRISMA_LOG_CONFIG,
};