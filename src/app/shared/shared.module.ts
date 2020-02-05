import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { Excerpt } from './pipes/excerpt';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MoveOnHoverDirective } from './directives/move-on-hover.directive';

@NgModule({
  declarations: [SpinnerComponent, Excerpt, MoveOnHoverDirective],
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
  exports: [MaterialModule, ReactiveFormsModule, SpinnerComponent, Excerpt, MoveOnHoverDirective],
})
export class SharedModule {}
