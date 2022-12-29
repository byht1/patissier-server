import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Catalog, CatalogDocument } from 'src/db-schemas/catalog.schema';
import { CreateCatalogDto } from './dto/create-catalog.dto';
import { SearchCatalogDto } from './dto/search-catalog.dto';

@Injectable()
export class CatalogService {
  constructor(
    @InjectModel(Catalog.name) private catalogModule: Model<CatalogDocument>,
  ) {}

  async getCatalogBy(dto: SearchCatalogDto) {
    const find =
      dto.category === 'all'
        ? {}
        : {
            category: { $regex: dto.category, $options: 'i' },
          };

    const catalog = await this.catalogModule.find(find);
    return catalog;
  }

  async createCatalog(dto: CreateCatalogDto) {
    const catalog = await this.catalogModule.create({
      ...dto,
      url: 'https://cdn.shopify.com/s/files/1/0603/8251/1357/files/001-Local-Pre-Orders-Big-Bear-Bakery_500x.jpg?v=1658394719',
    });
    return catalog;
  }
}
