import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpException,
	HttpStatus,
	Param,
	Patch,
	Post,
	UseGuards,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewService } from './review.service';
import { REVIEW_NOT_FOUND } from './review.constants';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { UserEmail } from '../decorators/user-email.decorator';

@Controller('review')
export class ReviewController {
	constructor(private readonly reviewService: ReviewService) {}

	@UseGuards(JwtAuthGuard)
	@UsePipes(new ValidationPipe())
	@HttpCode(201)
	@Post('create')
	async create(@Body() dto: CreateReviewDto) {
		return await this.reviewService.create(dto);
	}

	@Get(':id')
	async get(@Param('id') id: string) {
		await this.reviewService.getById(id);
	}

	@UseGuards(JwtAuthGuard)
	@Get('byProduct/:productId')
	async getByProductId(
		@Param('productId') productId: string,
		@UserEmail() email: string,
	) {
		console.log(email);
		await this.reviewService.findByProductId(productId);
	}

	@Delete(':id')
	async delete(@Param('id') id: string) {
		const deletedDoc = await this.reviewService.delete(id);
		if (!deletedDoc) {
			throw new HttpException(REVIEW_NOT_FOUND, HttpStatus.NOT_FOUND);
		}
	}

	@Patch(':id')
	async patch(
		@Param('id') id: string,
		@Body() dto: Partial<CreateReviewDto>,
	) {
		const updatedDoc = await this.reviewService.update(id, dto);
		if (!updatedDoc)
			throw new HttpException(REVIEW_NOT_FOUND, HttpStatus.NOT_FOUND);
	}
}
