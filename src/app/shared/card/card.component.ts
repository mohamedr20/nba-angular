import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
