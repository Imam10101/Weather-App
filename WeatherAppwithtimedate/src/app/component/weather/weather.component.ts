import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { WeatherService } from '../../service/weather.service';
import { RouterLink } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
  providers: [DatePipe]
})
export class WeatherComponent implements OnInit {
  searchForm!: FormGroup;
  weather: any;
  currentDate!: string;

  constructor(private fb: FormBuilder, private service: WeatherService, private datePipe: DatePipe) {}

  ngOnInit() {
    this.searchForm = this.fb.group({
      city: [null, Validators.required]
    });
  }

  searchWeather() {
    console.log(this.searchForm.value);
    this.service.searchWeatherByCity(this.searchForm.get(['city'])!.value).subscribe((resp) => {
      console.log(resp);
      this.weather = resp.data;

      // Update the current date and time
      const now = new Date();
      this.currentDate = `${this.datePipe.transform(now, 'EEEE')}, ${this.datePipe.transform(now, 'MMMM d, y')} ${this.datePipe.transform(now, 'h:mm a')}`;
    });
  }
}
