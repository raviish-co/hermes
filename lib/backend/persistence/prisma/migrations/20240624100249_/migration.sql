/*
  Warnings:

  - You are about to drop the `Purpose` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Sequence` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Stock` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Purpose" DROP CONSTRAINT "Purpose_note_id_fkey";

-- DropForeignKey
ALTER TABLE "Stock" DROP CONSTRAINT "Stock_product_id_fkey";

-- DropTable
DROP TABLE "Purpose";

-- DropTable
DROP TABLE "Sequence";

-- DropTable
DROP TABLE "Stock";

-- CreateTable
CREATE TABLE "purposes" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "notes" TEXT NOT NULL,
    "details" TEXT,
    "note_id" TEXT NOT NULL,

    CONSTRAINT "purposes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stock_of_products" (
    "stock_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "good_quantities" INTEGER NOT NULL DEFAULT 0,
    "bad_quantities" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "stock_of_products_pkey" PRIMARY KEY ("stock_id")
);

-- CreateTable
CREATE TABLE "sequences" (
    "name" TEXT NOT NULL,
    "value" INTEGER NOT NULL,

    CONSTRAINT "sequences_pkey" PRIMARY KEY ("name")
);

-- CreateIndex
CREATE UNIQUE INDEX "purposes_note_id_key" ON "purposes"("note_id");

-- CreateIndex
CREATE UNIQUE INDEX "stock_of_products_stock_id_key" ON "stock_of_products"("stock_id");

-- CreateIndex
CREATE UNIQUE INDEX "stock_of_products_product_id_key" ON "stock_of_products"("product_id");

-- CreateIndex
CREATE UNIQUE INDEX "sequences_name_key" ON "sequences"("name");

-- AddForeignKey
ALTER TABLE "purposes" ADD CONSTRAINT "purposes_note_id_fkey" FOREIGN KEY ("note_id") REFERENCES "goods_issue_notes"("note_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stock_of_products" ADD CONSTRAINT "stock_of_products_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;
