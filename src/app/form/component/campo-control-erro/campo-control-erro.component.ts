import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { CustomValidationService } from '../../service/custom-validation.service';

@Component({
  selector: 'app-campo-control-erro',
  templateUrl: './campo-control-erro.component.html',
  styleUrls: ['./campo-control-erro.component.scss'],
})
export class CampoControlErroComponent {
  @Input() control!: AbstractControl | null;
  @Input() label!: string;

  constructor(private customValidationService: CustomValidationService) {}

  get errorMessage() {
    for (const propertyName in this.control?.errors) {
      if (
        this.control?.errors.hasOwnProperty(propertyName) &&
        this.control.touched
      ) {
        return this.customValidationService.getErrorMsg(
          this.label,
          propertyName,
          this.control.errors[propertyName]
        );
      }
    }
    return null;
  }
}
