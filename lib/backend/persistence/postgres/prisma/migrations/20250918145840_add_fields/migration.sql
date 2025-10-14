/*
  Warnings:

  - Added the required column `user_id` to the `goods_issue_notes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `goods_receipt_notes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `goods_return_note` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `stock_of_products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."goods_issue_notes" ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."goods_receipt_notes" ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."goods_return_note" ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."stock_of_products" ADD COLUMN     "consignment_price" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "status" TEXT NOT NULL;
