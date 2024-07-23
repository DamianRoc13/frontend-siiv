import { Component, OnInit } from '@angular/core';
import { BackcomService } from '../backcom.service';
import { Version } from '../backcom.model'; 
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzTableModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzModalModule,
    ReactiveFormsModule
  ],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  versions: Version[] = [];
  versionForm: FormGroup;
  editMode = false;
  currentversionId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private backcomService: BackcomService
  ) {
    this.versionForm = this.fb.group({
      name: ['', Validators.required],
      versions: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.getversions();
  }

  getversions() {
    this.backcomService.getversion().subscribe({
      next: (data) => {
        this.versions = data;
      },
    });
  }

  onSubmit(): void {
    if (this.versionForm.valid) {
      if (this.editMode) {
        this.updateversion();
      } else {
        this.addversion();
      }
    }
  }

  addversion(): void {
    const newVersion: Version = this.versionForm.value;
    newVersion.id = null;

    this.backcomService.createversion(newVersion).subscribe({
      next: (data) => {
        this.versions.push(data);
        this.versionForm.reset();
        this.getversions(); 
      },
    });
  }

  editversion(version: Version): void {
    this.editMode = true;
    this.currentversionId = version.id;
    this.versionForm.patchValue({
      name: version.name,
      version: version.version,
      price: version.price,
      description: version.description
    });
  }

  updateversion(): void {
    if (this.currentversionId !== null) {
      const updatedversion: Version = {
        ...this.versionForm.value,
        id: this.currentversionId
      };

      this.backcomService.updateversion(updatedversion).subscribe({
        next: (data) => {
          const index = this.versions.findIndex(b => b.id === data.id);
          if (index !== -1) {
            this.versions[index] = data;
          }
          this.versionForm.reset();
          this.editMode = false;
          this.currentversionId = null;
          this.getversions(); 
        },
      });
    }
  }

  deleteversion(version: Version): void {
    if (version.id !== null) {
      this.backcomService.deleteversion(version.id).subscribe({
        next: () => {
          this.versions = this.versions.filter(b => b.id !== version.id);
        },
      });
    }
  }
}
