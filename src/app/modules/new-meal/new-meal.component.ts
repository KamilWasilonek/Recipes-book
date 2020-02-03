import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MealsListService } from 'src/app/shared/services/meals-list.service';


@Component({
  selector: 'app-new-meal',
  templateUrl: './new-meal.component.html',
  styleUrls: ['./new-meal.component.scss'],
})
export class NewMealComponent implements OnInit {
  constructor(private mealsService: MealsListService, private fb: FormBuilder) {}
  myForm: FormGroup;

  selectedFile: File = null;

  ngOnInit() {
    this.myForm = this.fb.group({
      image: ['', Validators.required],
      name: ['', Validators.required],
      desc: ['', Validators.required],
    });
  }

  onFileSelect(event) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit(form) {
    console.log(this.selectedFile);
    const newMeal = {
      image: this.selectedFile,
      name: form.controls.name.value,
      desc: form.controls.desc.value,
    };

    this.mealsService.addMeal(newMeal);
  }
}
