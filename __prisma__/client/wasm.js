
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
} = require('@prisma/client/runtime/index-browser.js')


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

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.NotFoundError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`NotFoundError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

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
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
