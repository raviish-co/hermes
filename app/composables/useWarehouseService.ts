import { WarehouseService } from "@backend/application/warehouse_service";
import { useItemStockRepository } from "@app/composables/useItemStockRepository";

const srv = new WarehouseService(useItemStockRepository());

export const useWarehouseService = () => srv;
