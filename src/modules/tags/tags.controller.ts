import { Controller, Post, Body, Res, Req, UseGuards } from '@nestjs/common';
import { TagsTableService } from '../../dbTables/tags/tagsTable.service';
import { AddTagsDto } from '../../dto/tags.dto';
import { AuthenticatedGuard } from '../../auth/guards/authenticated.guard';

@Controller('/api/v2/tags')
export class TagsController {
  constructor(private readonly tags: TagsTableService) {}
  @Post()
  async add(@Body() addTagsDto: AddTagsDto, @Res() res, @Req() req) {
    await this.tags.save(addTagsDto);
    res.sendStatus(202);
  }
}
