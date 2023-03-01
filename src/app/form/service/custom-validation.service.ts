import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { isCPF, isDate, isPhone } from 'brazilian-values';

@Injectable({
  providedIn: 'root',
})
export class CustomValidationService {
  cpfValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (isCPF(control.value)) {
        return null;
      }
      return { cpfInvalid: true };
    };
  }

  birthDateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (isDate(control.value)) {
        return null;
      }

      return { dateInvalid: true };
    };
  }

  numberValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (isPhone(control.value)) {
        return null;
      }
      return { phoneInvalid: true };
    };
  }

  reset(registerForm: FormGroup) {
    registerForm.reset();
  }

  touched(registerForm: FormGroup, campo: string): boolean | undefined {
    return (
      !registerForm.get(campo)?.valid &&
      (registerForm.get(campo)?.touched || registerForm.get(campo)?.dirty)
    );
  }

  getErrorMsg(fieldName: string, validatorName: string, validatorValue?: any) {
    const config: any = {
      required: `${fieldName} é um campo obrigatório.`,
      minlength: `${fieldName} precisa ter no mínimo ${validatorValue.requiredLength} caracteres.`,
      maxlength: `${fieldName} precisa ter no máximo ${validatorValue.requiredLength} caracteres.`,
      pattern: `${fieldName} não pode conter apenas números ou caracteres especiais. `,
      email: `${fieldName} é inválido.`,
      cpfInvalid: `CPF inválido.`,
      phoneInvalid: `Telefone inválido.`,
      dateInvalid: `Data de nascimento inválida.`,
    };
    return config[validatorName];
  }
}
