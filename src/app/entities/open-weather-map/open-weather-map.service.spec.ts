/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { OpenWeatherMapService } from './open-weather-map.service';

describe('Service: OpenWeatherMap', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OpenWeatherMapService]
    });
  });

  it('should ...', inject([OpenWeatherMapService], (service: OpenWeatherMapService) => {
    expect(service).toBeTruthy();
  }));
});
