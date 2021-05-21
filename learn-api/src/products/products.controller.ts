import { Product } from './entities/product';
import { ProductsService } from './products.service';
import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";

@Controller('Products')
export class ProductsController {

    constructor(private readonly productsService: ProductsService) { }

    @Get()
    getProducts(): Promise<Product[]> {
        return this.productsService.getProducts()
    }
    @Get(':id')
    getProduct(@Param('id') id: string): Promise<Product> {
        return this.productsService.getProduct(id)
    }

    @Post()
    addProduct(@Body() product: Product): Promise<Product> {

        return this.productsService.addProduct(product)
    }

    @Patch()
    updateProduct(@Body() product: Product) {
        return this.productsService.updateProduct(product)
    }

    @Delete(':id')
    deleteProduct(@Param('id') id: string) {

        return this.productsService.deleteProduct(id)
    }
}