/*
  Warnings:

  - You are about to drop the column `consignment_price` on the `stock_of_products` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `stock_of_products` table. All the data in the column will be lost.
  - Added the required column `consignment_value` to the `stock_of_products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."goods_receipt_note_lines" ADD COLUMN     "consignment_value" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "item_stock_type" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "public"."stock_of_products" DROP COLUMN "consignment_price",
DROP COLUMN "status",
ADD COLUMN     "consignment_value" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "item_stock_type" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "total_value_of_outputs" DOUBLE PRECISION NOT NULL DEFAULT 0;
