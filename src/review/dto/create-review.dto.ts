import { IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateReviewDto {
	@IsString()
	name: string;

	@IsString()
	title: string;

	@IsString()
	description: string;

	@Min(1, { message: 'Рейтинг не может быть менее, чем 1' })
	@Max(5, { message: 'Рейтинг не может быть более, чем 5' })
	@IsNumber()
	rating: number;

	@IsNumber()
	productId: string;
}
