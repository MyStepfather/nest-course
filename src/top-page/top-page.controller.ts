import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	NotFoundException,
	Param,
	Patch,
	Post,
	UseGuards,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { TopPageModel } from './top-page.model';
import { FindTopPageDto } from './dto/find-top-page.dto';
import { CreateTopPageDto } from './dto/create-top-page.dto';
import { TopPageService } from './top-page.service';
import { TOP_PAGE_NOT_FOUND } from './top-page.constants';
import { IdValidationPipe } from 'src/pipes/id-validation.pipe';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('top-page')
export class TopPageController {
	constructor(private readonly topPageService: TopPageService) {}

	@UseGuards(JwtAuthGuard)
	@UsePipes(new ValidationPipe())
	@HttpCode(201)
	@Post('create')
	async create(@Body() dto: CreateTopPageDto) {
		return this.topPageService.create(dto);
	}

	@Get(':id')
	async get(@Param('id', IdValidationPipe) id: string) {
		const result = await this.topPageService.getById(id);
		if (!result) throw new NotFoundException(TOP_PAGE_NOT_FOUND);
		return result;
	}

	@Get('byAlias/:alias')
	async findByAlias(@Param('alias') alias: string) {
		const result = this.topPageService.findByAlias(alias);
		if (!result) throw new NotFoundException(TOP_PAGE_NOT_FOUND);
		return result;
	}

	@Delete(':id')
	async delete(@Param('id', IdValidationPipe) id: string) {
		const result = await this.topPageService.deleteById(id);
		if (!result) throw new NotFoundException(TOP_PAGE_NOT_FOUND);
		return result;
	}

	@Patch(':id')
	async patch(
		@Param('id', IdValidationPipe) id: string,
		@Body() dto: CreateTopPageDto,
	) {
		const result = await this.topPageService.updateById(id, dto);
		if (!result) throw new NotFoundException(TOP_PAGE_NOT_FOUND);
		return result;
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('find')
	async find(@Body() dto: FindTopPageDto) {
		return this.topPageService.findByCategory(dto.firstCategory);
	}
}
