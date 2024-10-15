import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class ProductsService extends PrismaClient implements OnModuleInit {
  
  private readonly logger = new Logger('ProductsService'); // Para mostrar los mensajes en el LOG.
  
  async onModuleInit() {
    await this.$connect();
    this.logger.log('Database Connected');
  }
  
  async create(createProductDto: CreateProductDto) {
    try {
      return await this.product.create({ data: createProductDto });
    } catch (error) {
      this.logger.error('Error creating product:', error);
      throw error;
    }
  }

  async findAll() {
    return (await this.product.findMany()).sort((prod1, prod2) => prod1.id - prod2.id);
  }

  async removeAll(){
    return await this.product.deleteMany();
  }

  async findOne(id: number) {
    return await this.product.findFirst({ where: { id } });
  }

  async update(id: number, updateProductDto: UpdateProductDto) {

    const {id: _ ,...data} = updateProductDto;

    return await this.product.update({ where: { id }, data: data });
  }

  async remove(id: number) {
    return await this.product.delete({ where: { id } });
  }

  async inicializarBaseDatos() {
    for (const producto of INICIALIZAR_BASEDATOS_PRODUCTOS) {
      try {
        await this.product.create({ data: producto });
      } catch (error) {
        this.logger.error(`Error inserting product ${producto.name}:`, error);
      }
    }
    return 'Base de Datos Inicializada';
  }
}

const INICIALIZAR_BASEDATOS_PRODUCTOS: CreateProductDto[] = [
  { name: 'Teclado', price: 75.25 },
  { name: 'Mouse', price: 150.0 },
  { name: 'Monitor', price: 150.0 },
  { name: 'Audífonos', price: 50.0 },
  { name: 'Laptop', price: 1000.0 },
  { name: 'Smartphone', price: 800.0 },
  { name: 'Tablet', price: 300.0 },
  { name: 'Impresora', price: 200.0 },
  { name: 'Altavoces', price: 150.0 },
  { name: 'Cámara', price: 400.0 },
  { name: 'Televisor', price: 700.0 },
  { name: 'Router', price: 80.0 },
  { name: 'Reproductor Blu-ray', price: 180.0 },
  { name: 'Teclado inalámbrico', price: 60.0 },
  { name: 'Mouse inalámbrico', price: 80.0 },
  { name: 'Webcam', price: 70.0 },
  { name: 'Tarjeta de video', price: 250.0 },
  { name: 'Memoria RAM', price: 120.0 },
  { name: 'Disco duro externo', price: 150.0 },
  { name: 'Tarjeta madre', price: 350.0 },
  { name: 'Procesador', price: 300.0 },
  { name: 'Gabinete para PC', price: 80.0 },
  { name: 'Fuente de poder', price: 100.0 },
  { name: 'Router inalámbrico', price: 50.0 },
  { name: 'Adaptador Wi-Fi USB', price: 30.0 },
  { name: 'Cargador portátil', price: 40.0 },
  { name: 'Batería de repuesto', price: 50.0 },
  { name: 'Mochila para laptop', price: 40.0 },
  { name: 'Estuche para tablet', price: 20.0 },
  { name: 'Cable HDMI', price: 10.0 },
  { name: 'Adaptador de corriente', price: 20.0 },
  { name: 'Soporte para monitor', price: 30.0 },
  { name: 'Base para laptop', price: 25.0 },
  { name: 'Teclado numérico', price: 15.0 },
  { name: 'Mouse ergonómico', price: 35.0 },
  { name: 'Auriculares con micrófono', price: 50.0 },
  { name: 'Control remoto universal', price: 20.0 },
  { name: 'Base para smartphone', price: 15.0 },
  { name: 'Adaptador de audio Bluetooth', price: 25.0 },
  { name: 'Lector de tarjetas de memoria', price: 15.0 },
  { name: 'Cable USB-C', price: 10.0 },
  { name: 'Cable Lightning', price: 10.0 },
  { name: 'Cable VGA', price: 10.0 },
  { name: 'Cable DisplayPort', price: 10.0 },
  { name: 'Cable de red Ethernet', price: 10.0 },
  { name: 'Bolsa para laptop', price: 25.0 },
  { name: 'Almohadilla para mouse', price: 15.0 },
];