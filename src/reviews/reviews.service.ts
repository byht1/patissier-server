import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Review, ReviewDocument } from 'src/db-schemas/reviews.schema';
import { CreateReviewDto } from './dto/create-review.dto';
import { SearchReviewsDto } from './dto/search-reviews.dto';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(Review.name) private reviewModule: Model<ReviewDocument>,
  ) {}

  async getReviewByCategory(dto: SearchReviewsDto) {
    const find = !dto.category
      ? {}
      : dto.category === 'курси'
      ? { category: { $ne: 'Товар' } }
      : {
          category: { $regex: dto.category, $options: 'i' },
        };

    const reviews = await this.reviewModule.find(find).sort({ date: -1 });
    return reviews;
  }

  async createReview(dto: CreateReviewDto) {
    const review = await this.reviewModule.create({
      ...dto,
      name: 'Оксана',
      date: new Date(),
      avatar:
        'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png',
    });
    return review;
  }
}
