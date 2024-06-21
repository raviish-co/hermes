-- CreateTable
CREATE TABLE "goods_receipt_notes" (
    "note_id" TEXT NOT NULL,
    "entry_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "goods_receipt_notes_pkey" PRIMARY KEY ("note_id")
);

-- CreateTable
CREATE TABLE "goods_receipt_note_lines" (
    "note_id" TEXT NOT NULL,
    "line_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "good_quantities" INTEGER NOT NULL DEFAULT 0,
    "bad_quantities" INTEGER NOT NULL DEFAULT 0,
    "comments" TEXT,

    CONSTRAINT "goods_receipt_note_lines_pkey" PRIMARY KEY ("line_id")
);

-- CreateTable
CREATE TABLE "goods_issue_notes" (
    "note_id" TEXT NOT NULL,
    "issued_at" TIMESTAMP(3) NOT NULL,
    "return_date" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "security_deposit" DOUBLE PRECISION NOT NULL,
    "fulltext" TEXT NOT NULL,

    CONSTRAINT "goods_issue_notes_pkey" PRIMARY KEY ("note_id")
);

-- CreateTable
CREATE TABLE "goods_issue_note_lines" (
    "note_id" TEXT NOT NULL,
    "line_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "good_quantities" INTEGER NOT NULL DEFAULT 0,
    "bad_quantities" INTEGER NOT NULL DEFAULT 0,
    "good_quantities_returned" INTEGER NOT NULL DEFAULT 0,
    "bad_quantities_returned" INTEGER NOT NULL DEFAULT 0,
    "net_total" DOUBLE PRECISION NOT NULL,
    "comments" TEXT,
    "variations" JSONB,

    CONSTRAINT "goods_issue_note_lines_pkey" PRIMARY KEY ("line_id")
);

-- CreateTable
CREATE TABLE "Purpose" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "notes" TEXT NOT NULL,
    "details" TEXT,
    "note_id" TEXT NOT NULL,

    CONSTRAINT "Purpose_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "goods_return_note" (
    "noteId" TEXT NOT NULL,
    "goods_issue_note_id" TEXT NOT NULL,
    "security_deposity_with_held" INTEGER NOT NULL,
    "issued_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "goods_return_note_pkey" PRIMARY KEY ("noteId")
);

-- CreateTable
CREATE TABLE "goods_return_lines" (
    "note_id" TEXT NOT NULL,
    "line_id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "good_quantities" INTEGER NOT NULL DEFAULT 0,
    "bad_quantities" INTEGER NOT NULL DEFAULT 0,
    "variations" JSONB,
    "comments" TEXT,

    CONSTRAINT "goods_return_lines_pkey" PRIMARY KEY ("line_id")
);

-- CreateTable
CREATE TABLE "Stock" (
    "stock_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "good_quantities" INTEGER NOT NULL DEFAULT 0,
    "bad_quantities" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Stock_pkey" PRIMARY KEY ("stock_id")
);

-- CreateTable
CREATE TABLE "Sequence" (
    "name" TEXT NOT NULL,
    "value" INTEGER NOT NULL,

    CONSTRAINT "Sequence_pkey" PRIMARY KEY ("name")
);

-- CreateIndex
CREATE UNIQUE INDEX "goods_receipt_notes_note_id_key" ON "goods_receipt_notes"("note_id");

-- CreateIndex
CREATE UNIQUE INDEX "goods_receipt_note_lines_line_id_key" ON "goods_receipt_note_lines"("line_id");

-- CreateIndex
CREATE UNIQUE INDEX "goods_issue_notes_note_id_key" ON "goods_issue_notes"("note_id");

-- CreateIndex
CREATE UNIQUE INDEX "goods_issue_note_lines_line_id_key" ON "goods_issue_note_lines"("line_id");

-- CreateIndex
CREATE UNIQUE INDEX "Purpose_note_id_key" ON "Purpose"("note_id");

-- CreateIndex
CREATE UNIQUE INDEX "goods_return_note_noteId_key" ON "goods_return_note"("noteId");

-- CreateIndex
CREATE UNIQUE INDEX "goods_return_note_goods_issue_note_id_key" ON "goods_return_note"("goods_issue_note_id");

-- CreateIndex
CREATE UNIQUE INDEX "goods_return_lines_line_id_key" ON "goods_return_lines"("line_id");

-- CreateIndex
CREATE UNIQUE INDEX "Stock_stock_id_key" ON "Stock"("stock_id");

-- CreateIndex
CREATE UNIQUE INDEX "Stock_product_id_key" ON "Stock"("product_id");

-- CreateIndex
CREATE UNIQUE INDEX "Sequence_name_key" ON "Sequence"("name");

-- AddForeignKey
ALTER TABLE "goods_receipt_note_lines" ADD CONSTRAINT "goods_receipt_note_lines_note_id_fkey" FOREIGN KEY ("note_id") REFERENCES "goods_receipt_notes"("note_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "goods_receipt_note_lines" ADD CONSTRAINT "goods_receipt_note_lines_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "goods_issue_note_lines" ADD CONSTRAINT "goods_issue_note_lines_note_id_fkey" FOREIGN KEY ("note_id") REFERENCES "goods_issue_notes"("note_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "goods_issue_note_lines" ADD CONSTRAINT "goods_issue_note_lines_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Purpose" ADD CONSTRAINT "Purpose_note_id_fkey" FOREIGN KEY ("note_id") REFERENCES "goods_issue_notes"("note_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "goods_return_note" ADD CONSTRAINT "goods_return_note_goods_issue_note_id_fkey" FOREIGN KEY ("goods_issue_note_id") REFERENCES "goods_issue_notes"("note_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "goods_return_lines" ADD CONSTRAINT "goods_return_lines_note_id_fkey" FOREIGN KEY ("note_id") REFERENCES "goods_return_note"("noteId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "goods_return_lines" ADD CONSTRAINT "goods_return_lines_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stock" ADD CONSTRAINT "Stock_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;
