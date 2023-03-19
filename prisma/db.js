import { PrismaClient } from '@prisma/client';

const db = new PrismaClient({ errorFormat: 'minimal' });

export default db;
