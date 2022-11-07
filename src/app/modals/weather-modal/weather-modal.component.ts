import { throwDialogContentAlreadyAttachedError } from '@angular/cdk/dialog';
import { TmplAstBoundAttribute } from '@angular/compiler';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { fromEvent, of, switchMap, take } from 'rxjs';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-weather-modal',
  templateUrl: './weather-modal.component.html',
  styleUrls: ['./weather-modal.component.scss']
})
export class WeatherModalComponent implements OnInit {
  
  weatherForm!: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) private _infos: any,
    private _fb: FormBuilder,
    private _dialogRef: MatDialogRef<WeatherModalComponent>,
    public weatherService: WeatherService
    ) { }

  ngOnInit(): void {
    // console.warn(this._infos);
    this.weatherForm = this._fb.group({
      rue: [this._infos.rue, Validators.required],
      codePostal: [this._infos.codePostal, Validators.required],
      ville: [this._infos.ville, Validators.required]
    })
  }
  /**Cette méthode est lié à un event brinding donc commence par on. Ca validera notre formulaire
   * @returns void
   */
  onSubmit(): void {
    // on stocke les valeurs du formulaire dans une constante
    const form = this.weatherForm.value;
    // On déclare les attribut pour le close:
    let now = new Date();
    let heure = now.getHours();
    // On récupère la méthode du service pour les données correspondantes de la rue, du CP et de la ville
    this.weatherService.getCoordinates(form.rue, form.codePostal, form.ville)
    // on met notre opérateur (pipe) pour trier/filtrer avec notre switchMap
    .pipe(switchMap((responseFromServerGps: any) => {
      const dataGps = {
        longitude: responseFromServerGps.features[0].geometry.coordinates[0],
        latitude: responseFromServerGps.features[0].geometry.coordinates[1]
      } 
      // switchMap retourne toujours une observable.
      // Ici, on a notre deuxième méthode de notre service lié à notre API méteo qui à pour params, la longitude et la latitude
      return this.weatherService.getWeather(
      dataGps.longitude, 
      dataGps.latitude
    )}
    ))
    // Puis on souscrit à la réponse du service du 2eme obsevable (météo)
    .subscribe((responseFromWeatherServer: any) => {
      console.log(responseFromWeatherServer);
      // On close lorsqu'on reçoit les datas
      this._dialogRef.close({ 
        temperature: responseFromWeatherServer.hourly.temperature_2m[heure], 
        rue : form.rue, 
        codePostal : form.codePostal, 
        ville: form.ville })
        // alternative de solution mais plus longue :
        // let today = new Date();
        // const d = (today.getDate().toString()).padStart(2, '0')
        // const str = `${today.getFullYear()}-${today.getMonth() + 1 }-${d}T${today.getHours()}:00`;
        // const index = responseFromWeatherServer.hourly.time.findIndex((elem:string) => elem===str)
        // console.log(responseFromWeatherServer.hourly.temperature_2m[index]);
        // console.log(str);
    })
  }


}




    // this.dataGps = responseFromServerGps
    
    // this._dialogRef.close(responseFromServerGps)

    // this._dialogRef.close(responseFromServerGps)

      // getPosition(ville:any): Observable<any>{
  //   return this._http.get(${this.urlGps}?q=${ville})
  // }
