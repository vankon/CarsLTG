import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'base-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class AppBaseLayoutComponent implements OnInit {

  constructor(
  ) {
  }

  ngOnInit(): void {

  }

  onActivate(e: Event, scrollContainer: any) {
    scrollContainer.scrollTop = 0;
  }
}
