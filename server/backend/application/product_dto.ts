import { Product } from "../domain/products/product";

interface ProductDTO {
    id: string;
    name: string;
    price: string;
    isUnique: boolean;
}

export function makeProductsDTO(products: Product[]): ProductDTO[] {
    return products.map((a) => ({
        id: a.articleId.toString(),
        name: a.title,
        price: a.price.value,
        isUnique: a.isUnique(),
    }));
}
