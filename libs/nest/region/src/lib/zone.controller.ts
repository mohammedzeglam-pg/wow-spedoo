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
import { NestRegionService } from './zone.service';
import { JwtAuthGuard, Role, Roles, RolesGuard } from '@wow-spedoo/nest/auth';
import {
  AddLocationDto,
  AddManyLocationDto,
  AddZoneDto,
  IdTransformerDto,
  UpdateZoneDto,
} from '@wow-spedoo/nest/dto';

@Controller('zone')
export class NestRegionController {
  private readonly logger = new Logger(NestRegionController.name);
  constructor(private zoneService: NestRegionService) {}

  // city
  @Roles(Role.ADMIN, Role.MANAGER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('city')
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
  @Patch('city/:id')
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
  @Post('regoin')
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
  @Patch('regoin/:id')
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
  @Get('region')
  async allZones() {
    return this.zoneService.allZones();
  }
  @Roles(Role.ADMIN, Role.MANAGER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('location')
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
  @Post('location/many')
  async addManyLocation(@Body() addManyLocationDto: AddManyLocationDto) {
    try {
      return await this.zoneService.addManyLocation(addManyLocationDto);
    } catch (err) {
      this.logger.error(err);
      throw new HttpException(err.code, HttpStatus.CONFLICT);
    }
  }
  @Roles(Role.ADMIN, Role.MANAGER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch('location/:id')
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
