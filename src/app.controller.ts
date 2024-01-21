import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Role } from './decorator';
import { ApiHeader } from '@nestjs/swagger';
import { Roles } from './dtos/role.enum';
import { CreateMetaDataDto } from './dtos/post-metedata.dto';
import { UpdateMetaDataDto } from './dtos/update-metadata.dto';

@Controller('metadata')
@ApiHeader({
  name: 'role',
  example: Roles.Admin,
  required: true,
})
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Post()
  postData(@Body() metaDataObj: CreateMetaDataDto, @Role() role) {
    return this.appService.ingestData(metaDataObj, role);
  }

  @Put(':id')
  updateData(
    @Param('id') id: string,
    @Body() metaDataObj: UpdateMetaDataDto,
    @Role() role,
  ) {
    return this.appService.updateMetaData(id, metaDataObj, role);
  }

  @Delete(':id')
  deleteData(@Param('id') id: string, @Role() role) {
    return this.appService.deleteMetaData(id, role);
  }

  @Get(':id')
  getData(@Param('id') id: string, @Role() role) {
    return this.appService.getById(id, role);
  }

  @Get('/name/:name')
  getByName(@Param('name') name: string, @Role() role) {
    return this.appService.getByName(name, role);
  }

  @Get()
  getAll(@Role() role) {
    return this.appService.getAllData(role);
  }
}
