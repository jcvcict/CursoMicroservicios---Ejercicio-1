import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { get } from 'http';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  //@Post()
  @MessagePattern({cmd: 'create'})
  create(@Payload() createProductDto: CreateProductDto) {
    console.log(createProductDto);
    return this.productsService.create(createProductDto);
  }

  
 
  //@Get('')
  @MessagePattern({cmd: 'find_all'})
  findAll() {
    return this.productsService.findAll();
  }

  //@Get('eliminatodos')
  @MessagePattern({cmd: 'remove_all'})
  removeAll() {
    return this.productsService.removeAll();
  }

  //@Get('init')
  @MessagePattern({cmd: 'init_database'})
  inicializar(){
    return this.productsService.inicializarBaseDatos();
  }


  //@Get('busca/:id')
  @MessagePattern({cmd: 'find_product'})
  findOne(@Payload('id',ParseIntPipe) id: number) {
    return this.productsService.findOne(+id);
  }

  //@Patch('actualiza/:id')
  @MessagePattern({cmd: 'update_product'})
  update(@Payload() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+updateProductDto.id, updateProductDto);
  }

  //@Delete('elimina/:id')
  @MessagePattern({cmd: 'remove_product'})
  remove(@Payload('id',ParseIntPipe) id: number) {
    return this.productsService.remove(+id);
  }

  /*Cuidado porque el orden de los get influye*/

  

}
