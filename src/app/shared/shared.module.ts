import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { Excerpt } from './pipes/excerpt';

@NgModule({
  declarations: [SpinnerComponent, Excerpt],
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
  exports: [MaterialModule, ReactiveFormsModule, SpinnerComponent, Excerpt],
})
export class SharedModule {}
