import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { ValidarCamposService } from '../validar-campos.service';

@Component({
  selector: 'dio-input-date',
  templateUrl: './input-date.component.html',
  styleUrls: ['./input-date.component.scss']
})
export class InputDateComponent{

  @Input() formGroup: FormGroup;
  @Input() titulo: string;
  @Input() controlName: string;

  constructor(public validacao: ValidarCamposService){}

  get formControl(): AbstractControl {
    return this.formGroup.controls[this.controlName];
  }
}
