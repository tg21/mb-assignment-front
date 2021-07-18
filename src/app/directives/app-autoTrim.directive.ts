import { Directive, HostListener, Input, Optional } from "@angular/core";
import { FormControlDirective, FormControlName } from "@angular/forms";

//this directive is used to auto trim string fields in forms
@Directive({
    selector: '[formControl], [formControlName]',
  })
  export class AppAutoTrimDirective {
    @Input() type: string = 'text';
  
    constructor(@Optional() private formControlDir: FormControlDirective, 
                @Optional() private formControlName: FormControlName) {}
  
    @HostListener('blur')
    @HostListener('keydown.enter')
    trimValue() {
      const control = this.formControlDir?.control || this.formControlName?.control;
      if (typeof control.value === 'string' && this.type !== 'password') {
        control.setValue(control.value.trim());
      }
    }
  }