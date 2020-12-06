import { Component, Input } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { ValidarCamposService } from '../validar-campos.service';

@Component({
  selector: 'dio-input-textarea',
  templateUrl: './input-textarea.component.html',
  styleUrls: ['./input-textarea.component.scss']
})
export class InputTextareaComponent{

  @Input() formGroup: FormGroup;
  @Input() titulo: string;
  @Input() controlName: string;

  constructor(public validacao: ValidarCamposService){}

  get formControl(): AbstractControl {
    return this.formGroup.controls[this.controlName];
  }

}
