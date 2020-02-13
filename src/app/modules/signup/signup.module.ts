import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { SharedModule } from 'src/app/shared/shared.module';
import { SignupComponent } from '../signup/signup.component';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuardService } from 'src/app/shared/guards/can-deactivate-guard.service';

const routes: Routes = [
  {
    path: '',
    component: SignupComponent,
    canDeactivate: [CanDeactivateGuardService],
  },
];

@NgModule({
  declarations: [SignupComponent],
  imports: [RouterModule.forChild(routes), SharedModule, HttpClientModule],
})
export class SignupModule {}
