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
  status = '';
  isError: boolean;

  selectedFile: File = null;

  ngOnInit() {
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
    this.status = '';
    const currentUser = JSON.parse(localStorage.getItem('userDetails'));
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
        this.status = 'Meal has been created';
      },
      err => {
        this.isError = true;
        this.status = 'Meal can not be added, Try later';
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
