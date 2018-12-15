import { Component } from '@angular/core';
import { CitiesService } from './cities.service';
import { WeatherService } from './weather.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'WeatherApp';


  //CITIES
  public cities= [];
  public found: any;
  cityName = '';
  public test: any;
  public chosen: any;

  //WEATHER
  public weatherInfo: any;
  public temp: number;
  public icon: string;
  public weatherDescription: string;

  // ngIFs CONDITIONS
  public noSuchCity: boolean = false;
  public emptyInput: boolean = true;
  public list: boolean = true;

  //CLOCK
  public minutes: string;
  public hours: string;
  public date: string;

  constructor(private getCities: CitiesService, private getWeather: WeatherService){}

  ngOnInit(){
     this.minutes = `${new Date().getMinutes()}`;
     this.hours = `${new Date().getHours()}`;
     if(this.minutes.length == 1){
       this.minutes = '0' + this.minutes
     };

     this.date = this.hours + ':'+ this.minutes;

     this.getCities.getData().subscribe(data=>{
       data.map(city=> {
         this.cities.push(city);
       });
     });
  };


  //GENERATING LIST OF CITIES WITH THE SAME NAME TO PICK FROM + INPUT VALIDATION
  search() {
       this.found = this.cities.filter(city => city.name.toUpperCase() == this.cityName.toUpperCase());

       if (this.found.length < 1) {
         this.noSuchCity = true;
         this.chosen = '';
         this.list = true;
         this.emptyInput = true;
       }

       else if(this.cityName.length < 1) {
         this.noSuchCity = false;
         this.emptyInput = false;
         this.found=[];
         this.chosen = '';
       }
       else {
         this.chosen = '';
         this.emptyInput = true;
         this.noSuchCity = false;
       }
  }


  //PICKING THE FINAL CITY
  final(i){

    this.chosen = this.found[i];
    this.found = null;
    this.getWeather.cityName = this.chosen.name;
    this.getWeather.countryCode = this.chosen.country;
    this.getWeather.getWeather().subscribe(data => {
      this.temp = Math.round(data.main.temp - 273.15);
      this.icon = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`
      this.weatherDescription = data.weather[0].description;
    })
  };
}
