import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId, SortOrder } from 'mongoose';
import { Product, ECategory, StorColumnName, ProductDocument } from 'src/db-schemas/product.schema';
import { CreatePictureDto, CreateProductDto, GetAllProductsQueryParams } from '../dto';
import { EStireName, FirebaseStorageManager } from 'src/firebase';
import { ETypeSortProducts } from '../type';
import { ObjectSortOrder, TRegSearch } from 'src/type';
import { queryRegexGenerator } from 'src/store/product/helpers';
import { selectField, selectFieldFromDb } from 'src/helpers';

//;

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    private firebaseStorageManager: FirebaseStorageManager,
  ) {}

  async createProduct(createProductData: CreateProductDto, { picture }: CreatePictureDto) {
    const { price, similar_products, category } = createProductData;
    const pictureUrlPromise = this.firebaseStorageManager.uploadFileArray(picture, EStireName.STORE);
    const similarProductsPromise = similar_products
      ? this.checkProductById(similar_products, category)
      : this.getRandomItemsByCategory(category);

    const [pictureUrl, similarProducts] = await Promise.all([pictureUrlPromise, similarProductsPromise]);

    const newProduct = await this.productModel.create({
      ...createProductData,
      picture: pictureUrl,
      price: +price,
      similar_products: similarProducts,
    });

    return newProduct;
  }

  async getAllProducts(searchParams: GetAllProductsQueryParams) {
    const {
      page = '1',
      limit = '3',
      sort,
      category,
      search,
      searchInput = 'title',
      id,
      pick_field,
      omit_field,
    } = searchParams;

    const findSort = this.findSortedProducts(sort);
    const paramsQuery = queryRegexGenerator([category, search], ['category', searchInput]);
    const select = selectField({ pick_field, omit_field });

    const query: Record<string, TRegSearch | string[]> = { ...paramsQuery };
    if (id) {
      query['_id'] = id.split(',');
    }

    const skip = (+page - 1) * +limit;

    const productsListPromise = this.productModel.find(query).select(select).skip(skip).limit(+limit).sort(findSort);
    const totalProductPromise = this.productModel.countDocuments(query).exec();
    const [productsList, totalProduct] = await Promise.all([productsListPromise, totalProductPromise]);

    if (id) {
      const checkId = Array.isArray(query?._id) ? query?._id.length : 0;
      const isCheckSimilarProducts =
        checkId === 1 && (select['similar_products'] === undefined || select['similar_products'] !== 0);

      if (isCheckSimilarProducts) {
        return await this.checkProductsListForSimilar(productsList);
      }
    }

    return { products: productsList, limit: totalProduct };
  }

  async getProductsFindById(id: string | string[], select?: StorColumnName[]): Promise<ProductDocument[]> {
    const idList = typeof id === 'string' ? id.split(',') : id;
    const inputPick = select ? selectFieldFromDb(select) : {};
    return await this.productModel.find({ _id: idList }).select(inputPick);
  }

  async productOrders(id: ObjectId) {
    await this.productModel.findByIdAndUpdate(id, { $inc: { orders: 1 } });
  }

  async countRecordsByCategory() {
    const categoryCounts = await this.productModel.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
        },
      },
    ]);

    return [...categoryCounts].sort((a, b) => a._id.localeCompare(b._id));
  }
  private async checkProductsListForSimilar(productsList: ProductDocument[]) {
    const update = [];
    const checkProductsListForSimilar = productsList.map(async product => {
      const similarProducts = product.similar_products.length;
      if (similarProducts !== 3) {
        const notEnough = 3 - similarProducts;

        for (let i = 1; i <= notEnough; i += 1) {
          const similar = (await this.getRandomItemsByCategory(product.category, 1)) as any;
          product.similar_products.push(similar[0]);
        }
      }
      const funcUpdateSimilarProducts = this.productModel.findByIdAndUpdate(product._id, {
        similar_products: product.similar_products,
      });

      update.push(funcUpdateSimilarProducts);
      return product;
    });

    const productsListUpdate = await Promise.all(checkProductsListForSimilar);
    await Promise.all(update);

    return productsListUpdate;
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

  private async getRandomItemsByCategory(category: ECategory, number = 3): Promise<ObjectId[]> {
    const randomItems = await this.productModel
      .aggregate([{ $match: { category } }, { $sample: { size: number } }, { $project: { _id: 1 } }])
      .exec();
    return randomItems;
  }

  private async checkProductById(productId: ObjectId[] | string[], category: ECategory) {
    const checkProductPromise = productId.map(async id => this.productModel.findById(id));
    const checkProduct = await Promise.all(checkProductPromise);

    if (!checkProduct.length) {
      return await this.getRandomItemsByCategory(category);
    }

    return checkProduct;
  }
}
