/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "meetings" DROP CONSTRAINT "meetings_todoId_fkey";

-- DropForeignKey
ALTER TABLE "todos" DROP CONSTRAINT "todos_userId_fkey";

-- AlterTable
ALTER TABLE "meetings" ALTER COLUMN "todoId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "todos" ALTER COLUMN "userId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- AddForeignKey
ALTER TABLE "todos" ADD CONSTRAINT "todos_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meetings" ADD CONSTRAINT "meetings_todoId_fkey" FOREIGN KEY ("todoId") REFERENCES "todos"("id") ON DELETE SET NULL ON UPDATE CASCADE;
