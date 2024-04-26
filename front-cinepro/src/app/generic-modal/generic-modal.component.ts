import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-generic-modal',
  templateUrl: './generic-modal.component.html',
  styleUrls: ['./generic-modal.component.css']
})
export class GenericModalComponent {
  @Input() modalTitle: string = ''; // Titre du modal
  @Input() formFields: { label: string, formControlName: string }[] = []; // Champs de formulaire
  @Input() modalId: string = 'genericModal'; // Déclarez et initialisez la propriété modalId
  @Output() formSubmit: EventEmitter<any> = new EventEmitter(); // Événement de soumission du formulaire
  formGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    // Initialiser le formulaire avec les champs dynamiques
    this.formGroup = this.formBuilder.group({});
    this.formFields.forEach(field => {
      this.formGroup.addControl(field.formControlName, this.formBuilder.control('', Validators.required));
    });
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      this.formSubmit.emit(this.formGroup.value);
    }
  }
}
