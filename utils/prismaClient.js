const { PrismaClient } = require("../generated/prisma");

// Singleton pattern to avoid multiple instances
const prisma = new PrismaClient();

module.exports = prisma;
