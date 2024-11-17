import { Prop, Schema } from '@nestjs/mongoose';

export enum TopLevelCategory {
	Courses,
	Services,
	Books,
	Products,
}

@Schema({ timestamps: true, _id: true })
export class TopPageModel {
	@Prop()
	firstCategory: TopLevelCategory;
	secondCategory: string;
	title: string;
	category: string;
	hh?: {
		count: number;
		juniorSalary: number;
		middleSalary: number;
		seniorSalary: number;
	};
	advantages: {
		title: string;
		description: string;
		seoText: string;
		tagsTitle: string;
		tags: string[];
	}[];
}
