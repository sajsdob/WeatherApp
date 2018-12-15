import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';


@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  cityName = '';
  countryCode = '';
  constructor(private http: HttpClient) { }


  getWeather() {
     return this.http.get(`http://api.openweathermap.org/data/2.5/weather?q=${this.cityName},${this.countryCode}&APPID=2bfdd7ade4a7269949294a30207a1c19`)
  }
}
