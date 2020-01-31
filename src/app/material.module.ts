import { NgModule } from '@angular/core';

import {
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatInputModule,
  MatFormFieldModule,
  MatTabsModule,
  MatSidenavModule,
  MatListModule,
  MatDialogModule,
  MatSliderModule,
  MatSelectModule,
  MatProgressSpinnerModule,
} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatTabsModule,
    MatSidenavModule,
    MatListModule,
    MatDialogModule,
    MatSliderModule,
    MatSelectModule,
    MatProgressSpinnerModule,
  ],
  exports: [
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatTabsModule,
    MatSidenavModule,
    MatListModule,
    MatDialogModule,
    MatSliderModule,
    MatSelectModule,
    MatProgressSpinnerModule,
  ],
})
export class MaterialModule {}
