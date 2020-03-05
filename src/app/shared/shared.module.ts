import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { Excerpt } from './pipes/excerpt';
import { MoveOnHoverDirective } from './directives/move-on-hover.directive';
import { FormSeparatorComponent } from './components/form-separator/form-separator.component';
import { FormSpinnerComponent } from './components/form-spinner/form-spinner.component';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { SearchPipe } from './pipes/search.pipe';

@NgModule({
  declarations: [
    SpinnerComponent,
    Excerpt,
    MoveOnHoverDirective,
    FormSeparatorComponent,
    FormSpinnerComponent,
    SearchPipe
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp({
      apiKey: 'AIzaSyCZ0qGNaAIpGREceduHRTn-Ya7xr1SK3KE',
      authDomain: 'meal-14623.firebaseapp.com',
      databaseURL: 'https://meal-14623.firebaseio.com',
      projectId: 'meal-14623',
      storageBucket: 'meal-14623.appspot.com',
      messagingSenderId: '73472121731',
      appId: '1:73472121731:web:b74bb7d90c80ead8b734b6',
    }),
    AngularFireStorageModule,
  ],
  exports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    SpinnerComponent,
    Excerpt,
    MoveOnHoverDirective,
    FormSeparatorComponent,
    FormSpinnerComponent,
    SearchPipe
  ],
})
export class SharedModule {}
