/*
  Warnings:

  - You are about to drop the column `name` on the `product_variations` table. All the data in the column will be lost.
  - Added the required column `variation_id` to the `product_variations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "product_variations" DROP COLUMN "name",
ADD COLUMN     "variation_id" TEXT NOT NULL;
