import { ChatModalComponent } from './../../modals/chat-modal/chat-modal.component';
import { WeatherModalComponent } from 'src/app/modals/weather-modal/weather-modal.component';
import { DirectoryModalComponent } from 'src/app/modals/directory-modal/directory-modal.component';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { MatRadioModule } from '@angular/material/radio';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatChipsModule } from '@angular/material/chips';

import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';




@NgModule({
  declarations: [
    DirectoryModalComponent,
    WeatherModalComponent,
    ChatModalComponent,
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatAutocompleteModule,
    MatDividerModule,
    MatDialogModule,
    MatListModule,
    MatButtonModule,
    MatChipsModule,
    FormsModule,
    MatSnackBarModule,
    MatCardModule,
    MatTabsModule,
    MatRadioModule,
    PickerModule,
    MatSlideToggleModule,
    MatBadgeModule,
  

  ],
  exports: [
    CommonModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatAutocompleteModule,
    MatDividerModule,
    MatDialogModule,
    MatListModule,
    MatButtonModule,
    MatChipsModule,
    FormsModule,
    MatSnackBarModule,
    MatCardModule,
    MatTabsModule,
    MatRadioModule,
    PickerModule,
    MatSlideToggleModule,
    MatBadgeModule,
    DirectoryModalComponent,
    WeatherModalComponent,
    ChatModalComponent,
  

  ]

})
export class SharedModule { }
