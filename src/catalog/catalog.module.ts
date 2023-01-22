import { Module } from '@nestjs/common';
import { CatalogController } from './catalog.controller';
import { CatalogService } from './catalog.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Catalog, CatalogSchema } from 'src/db-schemas/catalog.schema';

@Module({
  controllers: [CatalogController],
  providers: [CatalogService],
  imports: [
    MongooseModule.forFeature([{ name: Catalog.name, schema: CatalogSchema }]),
  ],
})
export class CatalogModule {}
