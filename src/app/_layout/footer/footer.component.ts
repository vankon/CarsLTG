import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class AppFooterComponent implements OnInit {
  currentDate: Date;

  constructor() {
    this.currentDate = new Date();
  }

  ngOnInit() {
  }

}
