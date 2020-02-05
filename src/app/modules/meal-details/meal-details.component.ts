import { Component, OnInit, OnDestroy } from '@angular/core';
import { MealsListService } from 'src/app/shared/services/meals-list.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Meal } from 'src/app/shared/models/meal';

@Component({
  selector: 'app-meal-details',
  templateUrl: './meal-details.component.html',
  styleUrls: ['./meal-details.component.scss'],
})
export class MealDetailsComponent implements OnInit {
  routeSubscription: Subscription;

  meal: Meal;

  constructor(private mealsService: MealsListService, private route: ActivatedRoute) {}

  ngOnInit() {}
}
