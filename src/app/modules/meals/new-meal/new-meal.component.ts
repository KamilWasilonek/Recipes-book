import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MealsService } from 'src/app/shared/services/meals/meals.service';

@Component({
  selector: 'app-new-meal',
  templateUrl: './new-meal.component.html',
  styleUrls: ['./new-meal.component.scss'],
})
export class NewMealComponent implements OnInit {
  constructor(private mealsService: MealsService, private fb: FormBuilder) {}
  newMealForm: FormGroup;
  creationStatus = null;
  isError: boolean;

  selectedFile: File = null;

  ngOnInit() {
    this.createNewMealForm();
  }

  createNewMealForm() {
    this.newMealForm = this.fb.group({
      image: ['', Validators.required],
      name: ['', Validators.required],
      desc: ['', Validators.required],
      timeOfPreparation: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    });
  }

  onFileSelect(event) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    this.creationStatus = null;
    const currentUser = JSON.parse(localStorage.getItem('user'));
    const newMeal = {
      image: this.selectedFile,
      name: this.name.value,
      desc: this.desc.value,
      timeOfPreparation: this.timeOfPreparation.value,
      author: {
        _id: currentUser._id,
        name: currentUser.name,
        surname: currentUser.surname,
      },
    };

    this.mealsService.addMeal(newMeal).subscribe(
      () => {
        this.isError = false;
        this.creationStatus = 'Meal has been created';
        this.newMealForm.reset();
        Object.keys(this.newMealForm.controls).forEach(key => {
          this.newMealForm.controls[key].setErrors(null);
        });
      },
      err => {
        this.isError = true;
        this.creationStatus = 'Meal can not be added, Try later';
      }
    );
  }

  get image() {
    return this.newMealForm.get('image');
  }
  get name() {
    return this.newMealForm.get('name');
  }
  get desc() {
    return this.newMealForm.get('desc');
  }
  get timeOfPreparation() {
    return this.newMealForm.get('timeOfPreparation');
  }
}
