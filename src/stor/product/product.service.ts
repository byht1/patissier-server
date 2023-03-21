import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId, SortOrder } from 'mongoose';
import { Stor, StorColumnName, StorDocument } from 'src/db-schemas/stor.schema';
import { CreatePictureDto, CreateProductDto, GetProductsQueryParams } from './dto';
import { EStireName, StoreFirebase } from 'src/firebase';
import { ECategory, ETypeSortProducts } from './type';
import { ObjectSortOrder } from 'src/type';
import { queryRegexGenerator } from 'src/stor/product/helpers';
import { inputPickSelect } from 'src/classValidator/helpers';

@Injectable()
export class ProductService {
  constructor(@InjectModel(Stor.name) private storModel: Model<StorDocument>, private firebaseStore: StoreFirebase) {}

  async createProduct(createProductData: CreateProductDto, { picture }: CreatePictureDto) {
    const { price, similar_products, category } = createProductData;
    const pictureUrlPromise = this.firebaseStore.uploadFileArray(picture, EStireName.STOR);
    const similarProductsPromise = similar_products
      ? this.checkProductById(similar_products, category)
      : this.getRandomItemsByCategory(category);

    const [pictureUrl, similarProducts] = await Promise.all([pictureUrlPromise, similarProductsPromise]);

    const newProduct = await this.storModel.create({
      ...createProductData,
      picture: pictureUrl,
      price: +price,
      similar_products: similarProducts,
    });

    return newProduct;
  }

  async getProducts(searchParams: GetProductsQueryParams) {
    const { page = '1', limit = '9', sort, category, search, searchInput = 'title', id, select } = searchParams;

    const selectList = select?.split(',') as StorColumnName[];
    const inputPick = selectList ? inputPickSelect(selectList) : {};
    const findSort = this.findSortedProducts(sort);
    const paramsQuery = queryRegexGenerator([category, search], ['category', searchInput]);

    const query: Record<string, any> = { ...paramsQuery };
    if (id) {
      query['_id'] = id.split(',');
    }

    const productsList = await this.storModel
      .find(query)
      .skip((+page - 1) * +limit)
      .limit(+limit)
      .sort(findSort)
      .select(inputPick);

    return productsList;
  }

  async getProductsFindById(id: string | string[], select?: StorColumnName[]): Promise<StorDocument[]> {
    const idList = typeof id === 'string' ? id.split(',') : id;
    const inputPick = select ? inputPickSelect(select) : {};
    return await this.storModel.find({ _id: idList }).select(inputPick);
  }

  async countRecordsByCategory() {
    const categoryCounts = await this.storModel.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
        },
      },
    ]);

    return [...categoryCounts].sort((a, b) => a._id.localeCompare(b._id));
  }

  private findSortedProducts(sortType: string | undefined): ObjectSortOrder {
    let sortField = 'orders';
    let sortOrder: SortOrder = -1;

    if (sortType) {
      switch (sortType) {
        case ETypeSortProducts.MAX_MIN:
          sortField = 'price';
          sortOrder = -1;
          break;
        case ETypeSortProducts.MIN_MAX:
          sortField = 'price';
          sortOrder = 1;
          break;
        case ETypeSortProducts.NEW:
          sortField = 'createdAt';
          sortOrder = -1;
          break;
        case ETypeSortProducts.OLD:
          sortField = 'createdAt';
          sortOrder = 1;
          break;
        default:
          sortField = 'orders';
          sortOrder = -1;
          break;
      }
    }

    return { [sortField]: sortOrder };
  }

  private async getRandomItemsByCategory(category: ECategory): Promise<ObjectId[]> {
    const randomItems = await this.storModel
      .aggregate([{ $match: { category } }, { $sample: { size: 3 } }, { $project: { _id: 1 } }])
      .exec();
    return randomItems;
  }

  private async checkProductById(productId: ObjectId[] | string[], category: ECategory) {
    const checkProductPromise = productId.map(async id => this.storModel.findById(id));
    const checkProduct = await Promise.all(checkProductPromise);

    if (!checkProduct.length) {
      return await this.getRandomItemsByCategory(category);
    }

    return checkProduct;
  }
}
