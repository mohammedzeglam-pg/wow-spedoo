import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ZoneService } from './zone.service';
import { JwtAuthGuard, Role, Roles, RolesGuard } from '@wow-spedoo/auth';
import {
  AddLocationDto,
  AddZoneDto,
  IdTransformerDto,
  UpdateZoneDto,
} from '@wow-spedoo/dto';

@Controller('zone')
export class ZoneController {
  private readonly logger = new Logger(ZoneController.name);
  constructor(private zoneService: ZoneService) {}

  // city
  @Roles(Role.ADMIN, Role.MANAGER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('city/add')
  async addCity(@Body('name') name: string) {
    try {
      return await this.zoneService.addCity(name);
    } catch (err) {
      this.logger.error(err);
      throw new HttpException(err.code, HttpStatus.CONFLICT);
    }
  }
  @Roles(Role.ADMIN, Role.MANAGER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch('city/edit/:id')
  async updateCity(@Param() id: IdTransformerDto, @Body('name') name: string) {
    try {
      return await this.zoneService.updateCityName(id, name);
    } catch (err) {
      this.logger.error(err);
      throw new HttpException(err.code, HttpStatus.CONFLICT);
    }
  }

  @Roles(Role.ADMIN, Role.MANAGER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('regoin/add')
  async addZone(@Body() addZoneDto: AddZoneDto) {
    try {
      return await this.zoneService.addZone(addZoneDto);
    } catch (err) {
      this.logger.error(err);
      throw new HttpException(err.code, HttpStatus.CONFLICT);
    }
  }

  @Roles(Role.ADMIN, Role.MANAGER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch('regoin/edit/:id')
  async updateZone(
    @Param() id: IdTransformerDto,
    @Body() updateZoneDto: UpdateZoneDto,
  ) {
    try {
      return await this.zoneService.updateZone(id, updateZoneDto);
    } catch (err) {
      this.logger.error(err);
      throw new HttpException(err.code, HttpStatus.CONFLICT);
    }
  }

  @Roles(Role.ADMIN, Role.MANAGER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('location/add')
  async addLocation(@Body() addLocationDto: AddLocationDto) {
    try {
      return await this.zoneService.addLocation(addLocationDto);
    } catch (err) {
      this.logger.error(err);
      throw new HttpException(err.code, HttpStatus.CONFLICT);
    }
  }

  @Roles(Role.ADMIN, Role.MANAGER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch('location/edit')
  async updateLocation(
    @Param() id: IdTransformerDto,
    @Body() addLocationDto: AddLocationDto,
  ) {
    try {
      return await this.zoneService.updateLocation(id, addLocationDto);
    } catch (err) {
      this.logger.error(err);
      throw new HttpException(err.code, HttpStatus.CONFLICT);
    }
  }

  @Get('')
  async getAllZones() {
    try {
      return await this.zoneService.getAllZones();
    } catch (err) {
      this.logger.error(err);
      throw new HttpException(err.code, HttpStatus.NOT_FOUND);
    }
  }
}
