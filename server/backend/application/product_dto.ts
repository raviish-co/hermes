import { Product } from "../domain/catalog/product";

interface ProductDTO {
    id: string;
    name: string;
    price: string;
    isUnique: boolean;
}

export function makeProductsDTO(products: Product[]): ProductDTO[] {
    return products.map((a) => ({
        id: a.productId.toString(),
        name: a.name,
        price: a.price.value,
        isUnique: a.isUnique(),
    }));
}
