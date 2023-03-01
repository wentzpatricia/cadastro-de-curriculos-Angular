import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Form } from '../../model/form';
import { FormService } from '../../service/form.service';
import { CustomValidationService } from '../../service/custom-validation.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  public registerForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private formService: FormService,
    private customValidationService: CustomValidationService
  ) {}

  ngOnInit() {
    const regName = new RegExp('[a-zA-Z]');

    this.registerForm = this.formBuilder.group({
      firstname: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.pattern(regName),
        ],
      ],
      lastname: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.pattern(regName),
        ],
      ],
      cpf: [
        '',
        [Validators.required, this.customValidationService.cpfValidator()],
      ],
      birthDate: [
        '',
        [
          Validators.required,
          this.customValidationService.birthDateValidator(),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      telephone: [
        '',
        [Validators.required, this.customValidationService.numberValidator],
      ],
      sex: '',
      experience: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  onSubmit() {
    const curriculum: Form = this.registerForm.value;
    if (this.registerForm.valid) {
      this.formService.addCurriculum(curriculum);
      alert('Currículo cadastrado com sucesso!');
      this.resetForm();
      this.router.navigate(['/']);
    }
  }

  resetForm() {
    this.customValidationService.reset(this.registerForm);
  }

  verifyTouched(campo: string): boolean | undefined {
    return this.customValidationService.touched(this.registerForm, campo);
  }

  aplyCssError(campo: string) {
    return {
      'has-error': this.verifyTouched(campo),
      'has-feedback': this.verifyTouched(campo),
    };
  }
}
