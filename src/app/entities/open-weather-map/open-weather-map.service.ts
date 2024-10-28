import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EntityService } from '../entity/entity.service';
import { UtilsService } from 'src/app/shared/utils/utils.service';
import { environment } from 'src/environments/environment';
import { IOpenWeatherMap } from 'src/app/models/open-weather-map.model';

@Injectable({
  providedIn: 'root'
})
export class OpenWeatherMapService extends EntityService<IOpenWeatherMap> {

  protected override entityUrl: string;

constructor(
  protected override http: HttpClient,
  protected override utilsService: UtilsService,
  ) { 
    super(http, utilsService);
    this.entityUrl = `${environment.openweathermapUrl}?appid=${environment.openweathermapApiKey}`;
  }

}
