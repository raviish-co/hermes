export interface DashboardModel {
    totalExpiredGoodsIssueNotes: number;
    totalOutOfStockItems: number;
    totalInStockItems: number;
    totalInventoryValue: number;
    percentageOfItemsInStock: {
        goodPercentage: number;
        badPercentage: number;
    };
}
