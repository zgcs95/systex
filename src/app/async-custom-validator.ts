import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { Observable, of } from "rxjs";
import { emails } from "./member";

export class AsyncCustomValidator {
    static emails = emails;
    static setEmails(newEmails: string[]): void {
        this.emails = newEmails;
    }
    static AsyncCheckExistEmail(): AsyncValidatorFn {
        return (control: AbstractControl): Observable<ValidationErrors | null> => {
            let result: Observable<ValidationErrors | null> = of(null);
            let value = control.value;
            let emails = this.emails
            if (emails.find(m => m == value)) {
                result = of({
                    "CheckExistEmail": {
                        actualValue: value,
                        requiredValue: 'This email has been registerd by other user'
                    }
                })
            }
            return result;
        }
    }
}



