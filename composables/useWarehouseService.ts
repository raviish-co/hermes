import { WarehouseService } from "~/lib/backend/application/warehouse_service";
import { useItemStockRepository } from "~/composables/useItemStockRepository";

const srv = new WarehouseService(useItemStockRepository());

export const useWarehouseService = () => srv;
