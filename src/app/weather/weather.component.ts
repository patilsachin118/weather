import { Component, OnInit } from '@angular/core';
import { RestService } from '../services/rest.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LocalstorageService } from '../services/localstorage.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

  public form: FormGroup;
  public searchText: string = '';
  public weatherDetails: any;

  constructor(private formBuilder: FormBuilder,
    private localstorageService: LocalstorageService,
    private restService: RestService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      searchText: [null, [Validators.required]],
    });
  }

  getWeatherInfo(city) {
    this.weatherDetails = null;
    let path = "http://api.openweathermap.org/data/2.5/weather?appid=094aa776d64c50d5b9e9043edd4ffd00&q=" + city;
    this.restService.getCall(path).subscribe(res => {
      this.weatherDetails = res;
      this.localstorageService.setItem(city.toLowerCase().trim(), res)
    },
    err =>{
      console.log(err);
    }
    );
  }

  submit() {
    if (this.form.valid) {
      if (this.localstorageService.getItem(this.searchText, undefined)) {
        this.weatherDetails = this.localstorageService.getItem(this.searchText, null)
        return;
      } else {
        this.getWeatherInfo(this.searchText);
      }

    }
  }

}
