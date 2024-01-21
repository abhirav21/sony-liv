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

@Controller('metadata')
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Post()
  postData(@Body() metaDataObj: any) {
    return this.appService.ingestData(metaDataObj);
  }

  @Put(':id')
  updateData(@Param('id') id: string, @Body() metaDataObj: any, @Role() role) {
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
