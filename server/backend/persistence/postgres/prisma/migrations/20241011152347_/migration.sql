-- CreateTable
CREATE TABLE "categories" (
    "category_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "variations" TEXT,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("category_id")
);

-- CreateTable
CREATE TABLE "departments" (
    "department_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "departments_pkey" PRIMARY KEY ("department_id")
);

-- CreateTable
CREATE TABLE "sections" (
    "section_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "sections_pkey" PRIMARY KEY ("section_id")
);

-- CreateTable
CREATE TABLE "products" (
    "product_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "category_id" TEXT,
    "section_id" TEXT,
    "tags" TEXT,
    "fulltext" TEXT NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("product_id")
);

-- CreateTable
CREATE TABLE "product_variations" (
    "id" SERIAL NOT NULL,
    "variation_id" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,

    CONSTRAINT "product_variations_pkey" PRIMARY KEY ("id")
);

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
CREATE TABLE "purposes" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "notes" TEXT NOT NULL,
    "details" TEXT,
    "note_id" TEXT NOT NULL,

    CONSTRAINT "purposes_pkey" PRIMARY KEY ("id")
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
CREATE UNIQUE INDEX "categories_category_id_key" ON "categories"("category_id");

-- CreateIndex
CREATE UNIQUE INDEX "departments_department_id_key" ON "departments"("department_id");

-- CreateIndex
CREATE UNIQUE INDEX "sections_section_id_key" ON "sections"("section_id");

-- CreateIndex
CREATE UNIQUE INDEX "products_product_id_key" ON "products"("product_id");

-- CreateIndex
CREATE UNIQUE INDEX "goods_receipt_notes_note_id_key" ON "goods_receipt_notes"("note_id");

-- CreateIndex
CREATE UNIQUE INDEX "goods_receipt_note_lines_line_id_key" ON "goods_receipt_note_lines"("line_id");

-- CreateIndex
CREATE UNIQUE INDEX "goods_issue_notes_note_id_key" ON "goods_issue_notes"("note_id");

-- CreateIndex
CREATE UNIQUE INDEX "goods_issue_note_lines_line_id_key" ON "goods_issue_note_lines"("line_id");

-- CreateIndex
CREATE UNIQUE INDEX "purposes_note_id_key" ON "purposes"("note_id");

-- CreateIndex
CREATE UNIQUE INDEX "goods_return_note_noteId_key" ON "goods_return_note"("noteId");

-- CreateIndex
CREATE UNIQUE INDEX "goods_return_lines_line_id_key" ON "goods_return_lines"("line_id");

-- CreateIndex
CREATE UNIQUE INDEX "stock_of_products_stock_id_key" ON "stock_of_products"("stock_id");

-- CreateIndex
CREATE UNIQUE INDEX "stock_of_products_product_id_key" ON "stock_of_products"("product_id");

-- CreateIndex
CREATE UNIQUE INDEX "sequences_name_key" ON "sequences"("name");

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("category_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_section_id_fkey" FOREIGN KEY ("section_id") REFERENCES "sections"("section_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_variations" ADD CONSTRAINT "product_variations_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "goods_receipt_note_lines" ADD CONSTRAINT "goods_receipt_note_lines_note_id_fkey" FOREIGN KEY ("note_id") REFERENCES "goods_receipt_notes"("note_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "goods_receipt_note_lines" ADD CONSTRAINT "goods_receipt_note_lines_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "goods_issue_note_lines" ADD CONSTRAINT "goods_issue_note_lines_note_id_fkey" FOREIGN KEY ("note_id") REFERENCES "goods_issue_notes"("note_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "goods_issue_note_lines" ADD CONSTRAINT "goods_issue_note_lines_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purposes" ADD CONSTRAINT "purposes_note_id_fkey" FOREIGN KEY ("note_id") REFERENCES "goods_issue_notes"("note_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "goods_return_note" ADD CONSTRAINT "goods_return_note_goods_issue_note_id_fkey" FOREIGN KEY ("goods_issue_note_id") REFERENCES "goods_issue_notes"("note_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "goods_return_lines" ADD CONSTRAINT "goods_return_lines_note_id_fkey" FOREIGN KEY ("note_id") REFERENCES "goods_return_note"("noteId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "goods_return_lines" ADD CONSTRAINT "goods_return_lines_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stock_of_products" ADD CONSTRAINT "stock_of_products_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;
