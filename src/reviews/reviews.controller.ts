import { Controller, Post, Get, Query, Body } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Review } from 'src/db-schemas/reviews.schema';
import { CreateReviewDto } from './dto/create-review.dto';
import { SearchReviewsDto } from './dto/search-reviews.dto';
import { ReviewsService } from './reviews.service';

@ApiTags('Reviews')
@Controller('reviews')
export class ReviewsController {
  constructor(private reviewService: ReviewsService) {}

  @ApiQuery({
    name: 'category',
    required: false,
    description: 'category values that need to be considered for filter',
  })
  @ApiOperation({ summary: 'Get array Review by category' })
  @ApiResponse({ status: 200, type: [Review] })
  @Get()
  getReviewByCategory(@Query() dto: SearchReviewsDto) {
    return this.reviewService.getReviewByCategory(dto);
  }

  @ApiOperation({ summary: 'Create Review' })
  @ApiResponse({ status: 200, type: [Review] })
  @Post()
  CreateReview(@Body() dto: CreateReviewDto) {
    return this.reviewService.createReview(dto);
  }
}
