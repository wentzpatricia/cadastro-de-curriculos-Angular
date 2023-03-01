import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './component/form/form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CampoControlErroComponent } from './component/campo-control-erro/campo-control-erro.component';
import { FormRoutingModule } from './form-routing.module';
import { NgxMaskModule, IConfig } from 'ngx-mask';
export const options: Partial<null | IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
  declarations: [FormComponent, CampoControlErroComponent],
  imports: [
    NgxMaskModule.forRoot({
      dropSpecialCharacters: false,
    }),
    CommonModule,
    FormRoutingModule,
    ReactiveFormsModule,
  ],
})
export class FormModule {}
