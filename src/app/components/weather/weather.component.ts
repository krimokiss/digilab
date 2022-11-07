import { WeatherService } from 'src/app/services/weather.service';
import { TestService } from './../../services/test.service';
import { DialogRef } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { WeatherModalComponent } from 'src/app/modals/weather-modal/weather-modal.component';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {
  lat !: number
  lng !: number
  meteo = {
    rue: 'Place Charles de Gaulles',
    codePostal: 74300,
    ville: 'Cluses',
    temperature: 20
  }


  constructor(private _dialog: MatDialog,
              private testService: TestService,
              private weatherService: WeatherService) { }

  ngOnInit(): void {
  }
  getUserLocation() {
    if (navigator.geolocation) {
     navigator.geolocation.getCurrentPosition(position => {
         this.lat = position.coords.latitude;
         this.lng = position.coords.longitude;
         
        //  this.testService.meteo(this.lat, this.lng).subscribe((DataMeteo:any)=>{
        //   console.log(DataMeteo);
          
        //  })
         this.testService.getLocation(this.lat, this.lng).subscribe((dataAddress) => {
            // console.warn(dataAddress);
            this.meteo.rue = dataAddress.features[0].properties.name
            this.meteo.codePostal = dataAddress.features[0].properties.postcode
            this.meteo.ville = dataAddress.features[0].properties.city
         })
         this.weatherService.getWeather(this.lng, this.lat).subscribe((dataWeather)=>{
          // console.log(dataWeather);
          let now = new Date();
          let heure = now.getHours();
         
          this.meteo.temperature = dataWeather.hourly.temperature_2m[heure]
         })
       });
 }else {
    console.log("User not allow")

 }
}
  /** Cette méthode nous permet d'ouvrir la modale afin de rentrer une adresse personnalisée
   * Dans .open, on y met l'animation puis les datas que l'on veut.
   * AU .afterClose(), on lui transmet les résultats de la modale dans notre object météo, avec les nouvelles infos.
   * @returns void
   */
  newAdress(): void {

    const modalWeather = this._dialog.open(WeatherModalComponent,{
      enterAnimationDuration:'400ms', 
      exitAnimationDuration:'400ms',
      width: '500px',
      data: {rue: this.meteo.rue, codePostal: this.meteo.codePostal, ville: this.meteo.ville}
    });

    modalWeather.afterClosed().subscribe((resultFromModal: any) => {
      // console.log(resultFromModal);
      this.meteo = resultFromModal
      // returnLocForm = resultFromModal
      
    })
  }


}
