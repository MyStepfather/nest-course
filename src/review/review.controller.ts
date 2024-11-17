import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Patch,
	Post,
} from '@nestjs/common';
import { ReviewModel } from './review.model';

@Controller('review')
export class ReviewController {
	@HttpCode(201)
	@Post('create')
	async create(@Body() dto: Omit<ReviewModel, '_id'>) {}

	@Get(':id')
	async get(@Param('id') id: string) {}

	@Get('byProduct/:productId')
	getByProductId(@Param('productId') id: string) {}

	@Delete(':id')
	async delete(@Param('id') id: string) {}

	@Patch(':id')
	async patch(@Param('id') id: string, @Body() dto: ReviewModel) {}
}
