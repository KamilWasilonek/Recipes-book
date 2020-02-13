import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { Excerpt } from './pipes/excerpt';
import { MoveOnHoverDirective } from './directives/move-on-hover.directive';
import { FormSeparatorComponent } from './components/form-separator/form-separator.component';
import { FormSpinnerComponent } from './components/form-spinner/form-spinner.component';
import { HeaderComponent } from '../core/header/header.component';
import { SidenavListComponent } from '../core/sidenav-list/sidenav-list.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    SpinnerComponent,
    Excerpt,
    MoveOnHoverDirective,
    FormSeparatorComponent,
    FormSpinnerComponent,
  ],
  imports: [CommonModule, MaterialModule, ReactiveFormsModule, HttpClientModule],
  exports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    SpinnerComponent,
    Excerpt,
    MoveOnHoverDirective,
    FormSeparatorComponent,
    FormSpinnerComponent,
  ],
})
export class SharedModule {}
