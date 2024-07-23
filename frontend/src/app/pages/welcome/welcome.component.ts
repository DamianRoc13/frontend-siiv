import { Component, OnInit } from '@angular/core';
import { ProductComponent } from '../../product/product.component';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [ProductComponent],
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

}