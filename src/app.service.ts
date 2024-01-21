import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateMetaDataDto } from './dtos/post-metedata.dto';
import { HttpService } from '@nestjs/axios';
import { v4 as uuidv4 } from 'uuid';
import { UpdateMetaDataDto } from './dtos/update-metadata.dto';
import { Roles } from './dtos/role.enum';
const TAG = 'metaDataService';
@Injectable()
export class AppService {
  private db;
  constructor(private readonly httpService: HttpService) {
    //initialize in memory db
    this.db = {};
    //ingest some data
    this.ingestData({
      url: 'https://run.mocky.io/v3/48314576-ff23-405f-a8fa-d6643fa7d06e',
    });
  }

  async ingestData(createMetaData: CreateMetaDataDto) {
    try {
      if (createMetaData?.url) {
        console.log('are we here ?');
        const res = await this.httpget(createMetaData?.url);
        if (res) {
          this.createRecords(res);
        }
      } else {
        this.createRecords(createMetaData);
      }
    } catch (e) {
      console.error(TAG, e);
    }
  }

  createRecords(data) {
    if (Array.isArray(data)) {
      data.map((metaObj) => {
        const id: string = uuidv4();
        this.db[id] = metaObj;
      });
    } else {
      const id: string = uuidv4();
      this.db[id] = data;
    }
    console.log(JSON.stringify(this.db));
  }

  async httpget(url): Promise<any> {
    return this.httpService
      .get(url)
      .toPromise()
      .then((res) => {
        return Promise.resolve(res?.data);
      })
      .catch((e) => {
        console.error(TAG, e);
        return Promise.reject(e);
      });
  }

  isAuthorizedToChange(role) {
    //if role is admin or editor then only let the user update or delete
    console.log([Roles.Admin, Roles.Editor].indexOf(role) > -1);
    if ([Roles.Admin, Roles.Editor].indexOf(role) > -1) {
      return true;
    }
    return false;
  }

  updateMetaData(id, updateMetaData: UpdateMetaDataDto, role) {
    if (!this.db?.[id]) {
      throw new BadRequestException('metadata id doesnt exist');
    }
    if (this.isAuthorizedToChange(role)) {
      this.db[id] = {
        ...this.db[id],
        ...updateMetaData,
      };
    } else {
      console.info(TAG);
      throw new BadRequestException(
        'You are not authorized to modify metaData!',
      );
    }
  }

  deleteMetaData(id, role) {
    if (!this.db?.[id]) {
      throw new BadRequestException('metadata id doesnt exist');
    }
    if (this.isAuthorizedToChange(role)) {
      delete this.db[id];
    } else {
      console.info(TAG);
      throw new BadRequestException(
        'You are not authorized to delete metaData!',
      );
    }
  }

  getAllData(role) {
    const roleBasedData = Object.keys(this.db).map((metaDatakey) => {
      return this.checkRoleAndReturnData(metaDatakey, role);
    });
    return roleBasedData;
  }

  getById(id, role) {
    if (!this.db?.[id]) {
      throw new BadRequestException();
    }
    return this.checkRoleAndReturnData(id, role);
  }

  findKeyByName(name) {
    return Object.keys(this.db).find((key) => this.db[key]?.title === name);
  }

  getByName(searchValue, role) {
    const key = this.findKeyByName(searchValue.trim());
    if (key) {
      return this.checkRoleAndReturnData(key, role);
    } else {
      console.error(TAG, 'Name not found');
      throw new BadRequestException();
    }
  }

  /*
  Return only the data applicable to a role.
  Assuming Viewer will always see title and releasedata
  */
  returnDataForRole(metaDataObj, rolePropeties) {
    const defaultProperties = ['title', 'release_date'];
    const returnObj = {};
    defaultProperties.map((property) => {
      returnObj[property] = metaDataObj[property];
    });
    if (rolePropeties.length) {
      rolePropeties.map((property) => {
        returnObj[property] = metaDataObj[property];
      });
    }
    return returnObj;
  }

  /*
  Check if role matches with the request role. 
  if role doesnt exist in the request, assume it a viewer
  */
  checkRoleAndReturnData(id, role) {
    let dataToReturn;
    if (this.db[id]?.['access_control']?.[role]) {
      dataToReturn = this.returnDataForRole(
        this.db[id],
        this.db[id]['access_control'][role],
      );
    } else {
      dataToReturn = this.returnDataForRole(this.db[id], []);
    }
    return this.transformData(dataToReturn, { id });
  }

  transformData(data, extaProps) {
    return {
      ...extaProps,
      ...data,
    };
  }
}
