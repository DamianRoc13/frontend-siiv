import { Component, OnInit } from '@angular/core';
import { BackcomService } from '../backcom.service';
import { Consumption } from '../backcom.model'; 
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    NzCardModule,
    NzListModule,
    NzIconModule,
    ReactiveFormsModule
  ],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: Consumption[] = [];
  isModalVisible = false;
  modalTitle = '';
  productForm: FormGroup;

  constructor(
    private consumptionService: BackcomService,
    private fb: FormBuilder
  ) {
    this.productForm = this.fb.group({
      name: [null, Validators.required],
      version: [null, [Validators.required, Validators.min(0)]],
      price: [null, [Validators.required, Validators.min(0)]],
      description: [null, Validators.required],
      createdAt: [null, Validators.required],
      updatedAt: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.consumptionService.getProductConsumption().subscribe({
      next: (response: Consumption[]) => {
        this.products = response;
        console.log('Products data:', this.products);
      },
      error: (error: any) => {
        console.error('Error loading products:', error);
      }
    });
  }

  // Métodos para agregar, actualizar, eliminar productos...
}