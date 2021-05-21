import { randomUUID } from 'crypto';
import { Injectable, NotFoundException } from "@nestjs/common";
import { Product } from "./entities/product";


@Injectable()
export class ProductsService {
    products: Product[] = []


    getProducts(): Promise<Product[]> {
        
        return Promise.resolve(this.products)
    }

    getProduct(id: string): Promise<Product> {

        return Promise.resolve(this.findProduct(id)[0])
    }

    addProduct(product: Product): Promise<Product> {

        if (!product.id) {
            product.id = randomUUID()
        }

        this.products.push(product)
        return Promise.resolve(product)
    }

    updateProduct(product: Product): Product {
        let [myProduct, index] = this.findProduct(product.id)

        //Percorre todos os campos que existem no product 
        for (let field in product) {
            // campo valido é alterado no produto que esta salvo no banco
            if (product[field])
                myProduct[field] = product[field]
        }

        this.products[index] = { ...myProduct }

        return this.products[index]
    }

    deleteProduct(id: string) {
        let index = this.findProduct(id)[1]
        this.products.splice(index, 1)
    }

    private findProduct(id: string): [Product, number] {
        let index = this.products.findIndex((p) => p.id === id)
        let product = this.products[index]

        if (!product) {
            throw new NotFoundException('Could not find product')
        }
        return [product, index]
    }
}