import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent implements OnInit {
  constructor() {}

  @Input() value = 100;
  @Input() diameter = 100;
  @Input() mode = 'indeterminate';
  @Input() strokeWidth = 10;
  @Input() overlay = true;
  @Input() color = 'primary';

  ngOnInit() {}
}
