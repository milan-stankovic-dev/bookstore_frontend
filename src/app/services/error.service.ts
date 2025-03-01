import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  displayErrorMessage(apiErr: any) {
    const errors: Array<string> = apiErr.error.errors;
    if(errors.length === 1) {
      alert(errors[0]);
    } else {
      alert('Could not complete due to multiple errors:\n' +
        errors.reduce((acc, val) => acc + `• ${val}\n`, '')
      );
    }
  }
  constructor() { }
}
