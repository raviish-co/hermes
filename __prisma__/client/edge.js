
Object.defineProperty(exports, "__esModule", { value: true });

const {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  NotFoundError,
  getPrismaClient,
  sqltag,
  empty,
  join,
  raw,
  Decimal,
  Debug,
  objectEnumValues,
  makeStrictEnum,
  Extensions,
  warnOnce,
  defineDmmfProperty,
  Public,
  getRuntime
} = require('@prisma/client/runtime/edge.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.16.1
 * Query Engine version: 34ace0eb2704183d2c05b60b52fba5c43c13f303
 */
Prisma.prismaVersion = {
  client: "5.16.1",
  engine: "34ace0eb2704183d2c05b60b52fba5c43c13f303"
}

Prisma.PrismaClientKnownRequestError = PrismaClientKnownRequestError;
Prisma.PrismaClientUnknownRequestError = PrismaClientUnknownRequestError
Prisma.PrismaClientRustPanicError = PrismaClientRustPanicError
Prisma.PrismaClientInitializationError = PrismaClientInitializationError
Prisma.PrismaClientValidationError = PrismaClientValidationError
Prisma.NotFoundError = NotFoundError
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = sqltag
Prisma.empty = empty
Prisma.join = join
Prisma.raw = raw
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = Extensions.getExtensionContext
Prisma.defineExtension = Extensions.defineExtension

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */
exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.CategoryScalarFieldEnum = {
  categoryId: 'categoryId',
  name: 'name',
  description: 'description',
  variations: 'variations'
};

exports.Prisma.DepartmentScalarFieldEnum = {
  departmentId: 'departmentId',
  name: 'name'
};

exports.Prisma.SectionScalarFieldEnum = {
  sectionId: 'sectionId',
  name: 'name'
};

exports.Prisma.ProductScalarFieldEnum = {
  productId: 'productId',
  name: 'name',
  price: 'price',
  categoryId: 'categoryId',
  sectionId: 'sectionId',
  tags: 'tags',
  fulltext: 'fulltext'
};

exports.Prisma.ProductVariationsScalarFieldEnum = {
  id: 'id',
  variationId: 'variationId',
  value: 'value',
  productId: 'productId'
};

exports.Prisma.GoodsReceiptNoteScalarFieldEnum = {
  noteId: 'noteId',
  entryDate: 'entryDate'
};

exports.Prisma.GoodsReceiptNoteLineScalarFieldEnum = {
  noteId: 'noteId',
  lineId: 'lineId',
  productId: 'productId',
  goodQuantities: 'goodQuantities',
  badQuantities: 'badQuantities',
  comments: 'comments'
};

exports.Prisma.GoodsIssueNoteScalarFieldEnum = {
  noteId: 'noteId',
  issuedAt: 'issuedAt',
  returnDate: 'returnDate',
  status: 'status',
  total: 'total',
  securityDeposit: 'securityDeposit',
  fulltext: 'fulltext'
};

exports.Prisma.GoodsIssueNoteLineScalarFieldEnum = {
  noteId: 'noteId',
  lineId: 'lineId',
  productId: 'productId',
  name: 'name',
  price: 'price',
  goodQuantities: 'goodQuantities',
  badQuantities: 'badQuantities',
  goodQuantitiesReturned: 'goodQuantitiesReturned',
  badQuantitiesReturned: 'badQuantitiesReturned',
  netTotal: 'netTotal',
  comments: 'comments',
  variations: 'variations'
};

exports.Prisma.PurposeScalarFieldEnum = {
  id: 'id',
  description: 'description',
  notes: 'notes',
  details: 'details',
  noteId: 'noteId'
};

exports.Prisma.GoodsReturnNoteScalarFieldEnum = {
  noteId: 'noteId',
  goodsIssueNoteId: 'goodsIssueNoteId',
  securityDepositWithheld: 'securityDepositWithheld',
  issuedAt: 'issuedAt'
};

exports.Prisma.GoodsReturnNoteLineScalarFieldEnum = {
  noteId: 'noteId',
  lineId: 'lineId',
  description: 'description',
  productId: 'productId',
  goodQuantities: 'goodQuantities',
  badQuantities: 'badQuantities',
  variations: 'variations',
  comments: 'comments'
};

exports.Prisma.StockScalarFieldEnum = {
  stockId: 'stockId',
  productId: 'productId',
  goodQuantities: 'goodQuantities',
  badQuantities: 'badQuantities'
};

exports.Prisma.SequenceScalarFieldEnum = {
  name: 'name',
  value: 'value'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.NullableJsonNullValueInput = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};

exports.Prisma.JsonNullValueFilter = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull,
  AnyNull: Prisma.AnyNull
};


exports.Prisma.ModelName = {
  Category: 'Category',
  Department: 'Department',
  Section: 'Section',
  Product: 'Product',
  ProductVariations: 'ProductVariations',
  GoodsReceiptNote: 'GoodsReceiptNote',
  GoodsReceiptNoteLine: 'GoodsReceiptNoteLine',
  GoodsIssueNote: 'GoodsIssueNote',
  GoodsIssueNoteLine: 'GoodsIssueNoteLine',
  Purpose: 'Purpose',
  GoodsReturnNote: 'GoodsReturnNote',
  GoodsReturnNoteLine: 'GoodsReturnNoteLine',
  Stock: 'Stock',
  Sequence: 'Sequence'
};
/**
 * Create the Client
 */
const config = {
  "generator": {
    "name": "client",
    "provider": {
      "fromEnvVar": null,
      "value": "prisma-client-js"
    },
    "output": {
      "value": "/Users/kindalus/workspace/src/raviish-co/hermes/node_modules/@prisma/client",
      "fromEnvVar": null
    },
    "config": {
      "engineType": "library"
    },
    "binaryTargets": [
      {
        "fromEnvVar": null,
        "value": "darwin-arm64",
        "native": true
      }
    ],
    "previewFeatures": [],
    "sourceFilePath": "/Users/kindalus/workspace/src/raviish-co/hermes/lib/backend/persistense/prisma/schema.prisma"
  },
  "relativeEnvPaths": {
    "rootEnvPath": null,
    "schemaEnvPath": "../../../.env"
  },
  "relativePath": "../../../lib/backend/persistense/prisma",
  "clientVersion": "5.16.1",
  "engineVersion": "34ace0eb2704183d2c05b60b52fba5c43c13f303",
  "datasourceNames": [
    "db"
  ],
  "activeProvider": "postgresql",
  "postinstall": false,
  "inlineDatasources": {
    "db": {
      "url": {
        "fromEnvVar": "NUXT_DATABASE_URL",
        "value": null
      }
    }
  },
  "inlineSchema": "generator client {\n  provider = \"prisma-client-js\"\n}\n\ndatasource db {\n  provider = \"postgresql\"\n  url      = env(\"NUXT_DATABASE_URL\")\n}\n\nmodel Category {\n  categoryId  String    @id @unique @map(\"category_id\")\n  name        String\n  description String?\n  variations  String?\n  products    Product[]\n\n  @@map(\"categories\")\n}\n\nmodel Department {\n  departmentId String @id @unique @map(\"department_id\")\n  name         String\n\n  @@map(\"departments\")\n}\n\nmodel Section {\n  sectionId String    @id @unique @map(\"section_id\")\n  name      String\n  products  Product[]\n\n  @@map(\"sections\")\n}\n\nmodel Product {\n  productId        String                 @id @unique @map(\"product_id\")\n  name             String\n  price            Float\n  categoryId       String?                @map(\"category_id\")\n  sectionId        String?                @map(\"section_id\")\n  category         Category?              @relation(fields: [categoryId], references: [categoryId])\n  section          Section?               @relation(fields: [sectionId], references: [sectionId])\n  tags             String?\n  variations       ProductVariations[]\n  receiptNoteLines GoodsReceiptNoteLine[]\n  issueNoteLines   GoodsIssueNoteLine[]\n  returnLines      GoodsReturnNoteLine[]\n  stock            Stock?\n  fulltext         String\n\n  @@map(\"products\")\n}\n\nmodel ProductVariations {\n  id          Int     @id @default(autoincrement())\n  variationId String  @map(\"variation_id\")\n  value       String\n  product     Product @relation(fields: [productId], references: [productId])\n  productId   String  @map(\"product_id\")\n\n  @@map(\"product_variations\")\n}\n\nmodel GoodsReceiptNote {\n  noteId    String                 @id @unique @map(\"note_id\")\n  entryDate DateTime               @map(\"entry_date\")\n  lines     GoodsReceiptNoteLine[]\n\n  @@map(\"goods_receipt_notes\")\n}\n\nmodel GoodsReceiptNoteLine {\n  note           GoodsReceiptNote @relation(fields: [noteId], references: [noteId])\n  noteId         String           @map(\"note_id\")\n  lineId         String           @id @unique @map(\"line_id\")\n  product        Product          @relation(fields: [productId], references: [productId])\n  productId      String           @map(\"product_id\")\n  goodQuantities Int              @default(0) @map(\"good_quantities\")\n  badQuantities  Int              @default(0) @map(\"bad_quantities\")\n  comments       String?\n\n  @@map(\"goods_receipt_note_lines\")\n}\n\nmodel GoodsIssueNote {\n  noteId           String               @id @unique @map(\"note_id\")\n  issuedAt         DateTime             @map(\"issued_at\")\n  returnDate       DateTime             @map(\"return_date\")\n  status           String\n  total            Float\n  securityDeposit  Float                @map(\"security_deposit\")\n  fulltext         String\n  purpose          Purpose?\n  lines            GoodsIssueNoteLine[]\n  goodsReturnNotes GoodsReturnNote[]\n\n  @@map(\"goods_issue_notes\")\n}\n\nmodel GoodsIssueNoteLine {\n  note                   GoodsIssueNote @relation(fields: [noteId], references: [noteId])\n  noteId                 String         @map(\"note_id\")\n  lineId                 String         @id @unique @map(\"line_id\")\n  product                Product        @relation(fields: [productId], references: [productId])\n  productId              String         @map(\"product_id\")\n  name                   String\n  price                  Float\n  goodQuantities         Int            @default(0) @map(\"good_quantities\")\n  badQuantities          Int            @default(0) @map(\"bad_quantities\")\n  goodQuantitiesReturned Int            @default(0) @map(\"good_quantities_returned\")\n  badQuantitiesReturned  Int            @default(0) @map(\"bad_quantities_returned\")\n  netTotal               Float          @map(\"net_total\")\n  comments               String?\n  variations             Json?\n\n  @@map(\"goods_issue_note_lines\")\n}\n\nmodel Purpose {\n  id          Int            @id @default(autoincrement())\n  description String\n  notes       String\n  details     String?\n  note        GoodsIssueNote @relation(fields: [noteId], references: [noteId])\n  noteId      String         @unique @map(\"note_id\")\n\n  @@map(\"purposes\")\n}\n\nmodel GoodsReturnNote {\n  noteId                  String                @id @unique\n  goodsIssueNote          GoodsIssueNote        @relation(fields: [goodsIssueNoteId], references: [noteId])\n  goodsIssueNoteId        String                @map(\"goods_issue_note_id\")\n  securityDepositWithheld Int                   @map(\"security_deposity_with_held\")\n  issuedAt                DateTime              @map(\"issued_at\")\n  lines                   GoodsReturnNoteLine[]\n\n  @@map(\"goods_return_note\")\n}\n\nmodel GoodsReturnNoteLine {\n  note           GoodsReturnNote @relation(fields: [noteId], references: [noteId])\n  noteId         String          @map(\"note_id\")\n  lineId         String          @id @unique @map(\"line_id\")\n  description    String\n  product        Product         @relation(fields: [productId], references: [productId])\n  productId      String          @map(\"product_id\")\n  goodQuantities Int             @default(0) @map(\"good_quantities\")\n  badQuantities  Int             @default(0) @map(\"bad_quantities\")\n  variations     Json?\n  comments       String?\n\n  @@map(\"goods_return_lines\")\n}\n\nmodel Stock {\n  stockId        String  @id @unique @map(\"stock_id\")\n  product        Product @relation(fields: [productId], references: [productId])\n  productId      String  @unique @map(\"product_id\")\n  goodQuantities Int     @default(0) @map(\"good_quantities\")\n  badQuantities  Int     @default(0) @map(\"bad_quantities\")\n\n  @@map(\"stock_of_products\")\n}\n\nmodel Sequence {\n  name  String @id @unique\n  value Int\n\n  @@map(\"sequences\")\n}\n",
  "inlineSchemaHash": "39393170aaebf5568538445cb4bb5ca112aa204b53b648cf60a9b58561b4a468",
  "copyEngine": true
}
config.dirname = '/'

config.runtimeDataModel = JSON.parse("{\"models\":{\"Category\":{\"dbName\":\"categories\",\"fields\":[{\"name\":\"categoryId\",\"dbName\":\"category_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"description\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"variations\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"products\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Product\",\"relationName\":\"CategoryToProduct\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Department\":{\"dbName\":\"departments\",\"fields\":[{\"name\":\"departmentId\",\"dbName\":\"department_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Section\":{\"dbName\":\"sections\",\"fields\":[{\"name\":\"sectionId\",\"dbName\":\"section_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"products\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Product\",\"relationName\":\"ProductToSection\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Product\":{\"dbName\":\"products\",\"fields\":[{\"name\":\"productId\",\"dbName\":\"product_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"price\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"categoryId\",\"dbName\":\"category_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sectionId\",\"dbName\":\"section_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"category\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Category\",\"relationName\":\"CategoryToProduct\",\"relationFromFields\":[\"categoryId\"],\"relationToFields\":[\"categoryId\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"section\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Section\",\"relationName\":\"ProductToSection\",\"relationFromFields\":[\"sectionId\"],\"relationToFields\":[\"sectionId\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"tags\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"variations\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ProductVariations\",\"relationName\":\"ProductToProductVariations\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"receiptNoteLines\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"GoodsReceiptNoteLine\",\"relationName\":\"GoodsReceiptNoteLineToProduct\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"issueNoteLines\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"GoodsIssueNoteLine\",\"relationName\":\"GoodsIssueNoteLineToProduct\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"returnLines\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"GoodsReturnNoteLine\",\"relationName\":\"GoodsReturnNoteLineToProduct\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"stock\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Stock\",\"relationName\":\"ProductToStock\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"fulltext\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"ProductVariations\":{\"dbName\":\"product_variations\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"variationId\",\"dbName\":\"variation_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"value\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"product\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Product\",\"relationName\":\"ProductToProductVariations\",\"relationFromFields\":[\"productId\"],\"relationToFields\":[\"productId\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"productId\",\"dbName\":\"product_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"GoodsReceiptNote\":{\"dbName\":\"goods_receipt_notes\",\"fields\":[{\"name\":\"noteId\",\"dbName\":\"note_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entryDate\",\"dbName\":\"entry_date\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"lines\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"GoodsReceiptNoteLine\",\"relationName\":\"GoodsReceiptNoteToGoodsReceiptNoteLine\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"GoodsReceiptNoteLine\":{\"dbName\":\"goods_receipt_note_lines\",\"fields\":[{\"name\":\"note\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"GoodsReceiptNote\",\"relationName\":\"GoodsReceiptNoteToGoodsReceiptNoteLine\",\"relationFromFields\":[\"noteId\"],\"relationToFields\":[\"noteId\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"noteId\",\"dbName\":\"note_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"lineId\",\"dbName\":\"line_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"product\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Product\",\"relationName\":\"GoodsReceiptNoteLineToProduct\",\"relationFromFields\":[\"productId\"],\"relationToFields\":[\"productId\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"productId\",\"dbName\":\"product_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"goodQuantities\",\"dbName\":\"good_quantities\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"badQuantities\",\"dbName\":\"bad_quantities\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"comments\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"GoodsIssueNote\":{\"dbName\":\"goods_issue_notes\",\"fields\":[{\"name\":\"noteId\",\"dbName\":\"note_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"issuedAt\",\"dbName\":\"issued_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"returnDate\",\"dbName\":\"return_date\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"status\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"total\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"securityDeposit\",\"dbName\":\"security_deposit\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"fulltext\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"purpose\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Purpose\",\"relationName\":\"GoodsIssueNoteToPurpose\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"lines\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"GoodsIssueNoteLine\",\"relationName\":\"GoodsIssueNoteToGoodsIssueNoteLine\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"goodsReturnNotes\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"GoodsReturnNote\",\"relationName\":\"GoodsIssueNoteToGoodsReturnNote\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"GoodsIssueNoteLine\":{\"dbName\":\"goods_issue_note_lines\",\"fields\":[{\"name\":\"note\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"GoodsIssueNote\",\"relationName\":\"GoodsIssueNoteToGoodsIssueNoteLine\",\"relationFromFields\":[\"noteId\"],\"relationToFields\":[\"noteId\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"noteId\",\"dbName\":\"note_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"lineId\",\"dbName\":\"line_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"product\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Product\",\"relationName\":\"GoodsIssueNoteLineToProduct\",\"relationFromFields\":[\"productId\"],\"relationToFields\":[\"productId\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"productId\",\"dbName\":\"product_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"price\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"goodQuantities\",\"dbName\":\"good_quantities\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"badQuantities\",\"dbName\":\"bad_quantities\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"goodQuantitiesReturned\",\"dbName\":\"good_quantities_returned\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"badQuantitiesReturned\",\"dbName\":\"bad_quantities_returned\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"netTotal\",\"dbName\":\"net_total\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"comments\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"variations\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Json\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Purpose\":{\"dbName\":\"purposes\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"description\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"notes\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"details\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"note\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"GoodsIssueNote\",\"relationName\":\"GoodsIssueNoteToPurpose\",\"relationFromFields\":[\"noteId\"],\"relationToFields\":[\"noteId\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"noteId\",\"dbName\":\"note_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"GoodsReturnNote\":{\"dbName\":\"goods_return_note\",\"fields\":[{\"name\":\"noteId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"goodsIssueNote\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"GoodsIssueNote\",\"relationName\":\"GoodsIssueNoteToGoodsReturnNote\",\"relationFromFields\":[\"goodsIssueNoteId\"],\"relationToFields\":[\"noteId\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"goodsIssueNoteId\",\"dbName\":\"goods_issue_note_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"securityDepositWithheld\",\"dbName\":\"security_deposity_with_held\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"issuedAt\",\"dbName\":\"issued_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"lines\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"GoodsReturnNoteLine\",\"relationName\":\"GoodsReturnNoteToGoodsReturnNoteLine\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"GoodsReturnNoteLine\":{\"dbName\":\"goods_return_lines\",\"fields\":[{\"name\":\"note\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"GoodsReturnNote\",\"relationName\":\"GoodsReturnNoteToGoodsReturnNoteLine\",\"relationFromFields\":[\"noteId\"],\"relationToFields\":[\"noteId\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"noteId\",\"dbName\":\"note_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"lineId\",\"dbName\":\"line_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"description\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"product\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Product\",\"relationName\":\"GoodsReturnNoteLineToProduct\",\"relationFromFields\":[\"productId\"],\"relationToFields\":[\"productId\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"productId\",\"dbName\":\"product_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"goodQuantities\",\"dbName\":\"good_quantities\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"badQuantities\",\"dbName\":\"bad_quantities\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"variations\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Json\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"comments\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Stock\":{\"dbName\":\"stock_of_products\",\"fields\":[{\"name\":\"stockId\",\"dbName\":\"stock_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"product\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Product\",\"relationName\":\"ProductToStock\",\"relationFromFields\":[\"productId\"],\"relationToFields\":[\"productId\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"productId\",\"dbName\":\"product_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"goodQuantities\",\"dbName\":\"good_quantities\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"badQuantities\",\"dbName\":\"bad_quantities\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Sequence\":{\"dbName\":\"sequences\",\"fields\":[{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"value\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false}},\"enums\":{},\"types\":{}}")
defineDmmfProperty(exports.Prisma, config.runtimeDataModel)
config.engineWasm = undefined

config.injectableEdgeEnv = () => ({
  parsed: {
    NUXT_DATABASE_URL: typeof globalThis !== 'undefined' && globalThis['NUXT_DATABASE_URL'] || typeof process !== 'undefined' && process.env && process.env.NUXT_DATABASE_URL || undefined
  }
})

if (typeof globalThis !== 'undefined' && globalThis['DEBUG'] || typeof process !== 'undefined' && process.env && process.env.DEBUG || undefined) {
  Debug.enable(typeof globalThis !== 'undefined' && globalThis['DEBUG'] || typeof process !== 'undefined' && process.env && process.env.DEBUG || undefined)
}

const PrismaClient = getPrismaClient(config)
exports.PrismaClient = PrismaClient
Object.assign(exports, Prisma)

