import type { Product } from "../models/product";

interface ProductList {
    products: Product[];
    total: number;
}

export class ProductService {
    async searchProducts(query: string): Promise<Product[]> {
        const response = await $fetch(`/api/search_products?query=${query}`, {
            method: "get",
        });

        return response.products;
    }

    async listProducts(pageToken?: number): Promise<ProductList> {
        const response = await $fetch(`/api/products?pageToken=${pageToken}`, {
            method: "get",
        });

        return { products: response.products, total: response.total };
    }
}
