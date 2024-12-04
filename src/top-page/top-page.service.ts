import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TopLevelCategory, TopPageModel } from './top-page.model';
import { Model } from 'mongoose';
import { CreateTopPageDto } from './dto/create-top-page.dto';
import { TOP_PAGE_NOT_FOUND } from './top-page.constants';
import { FindTopPageDto } from './dto/find-top-page.dto';

@Injectable()
export class TopPageService {
	constructor(
		@InjectModel(TopPageModel.name)
		private readonly topPageModel: Model<TopPageModel>,
	) {}

	async create(dto: CreateTopPageDto) {
		return await this.topPageModel.create(dto);
	}

	async getById(id: string): Promise<TopPageModel | null> {
		return await this.topPageModel.findById(id).exec();
	}

	async findByAlias(alias: string): Promise<TopPageModel | null> {
		return this.topPageModel.findOne({ category: alias }).exec();
	}

	async deleteById(id: string) {
		return await this.topPageModel.findByIdAndDelete(id).exec();
	}

	async updateById(id: string, dto: TopPageModel) {
		return await this.topPageModel
			.findByIdAndUpdate(id, dto, { new: true })
			.exec();
	}

	async findByCategory(
		firstCategory: TopLevelCategory,
	): Promise<TopPageModel[]> {
		return this.topPageModel
			.find({ firstCategory }, { alias: 1, secondCategory: 1, title: 1 })
			.exec();
	}
}
