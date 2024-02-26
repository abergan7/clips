import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { RegisterValidators } from '../validators/register-validators';
import { EmailTaken } from '../validators/email-taken';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  name = new FormControl('', [Validators.required, Validators.minLength(3)]);
  email = new FormControl(
    '',
    [Validators.required, Validators.email],
    this.emailTaken.validate
  );
  age = new FormControl('', [
    Validators.required,
    Validators.min(18),
    Validators.max(120),
  ]);
  password = new FormControl('', [
    Validators.required,
    Validators.pattern(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
    ),
  ]);
  confirmPassword = new FormControl('', [Validators.required]);
  phoneNumber = new FormControl('', [
    Validators.required,
    Validators.minLength(13),
    Validators.minLength(13),
  ]);

  inSubmission: boolean = false;
  showAlert: boolean = false;
  alertMsg: string = 'Please wait your account is being created!';
  alertColor: string = 'blue';

  registerForm: FormGroup = new FormGroup(
    {
      name: this.name,
      email: this.email,
      age: this.age,
      password: this.password,
      confirmPassword: this.confirmPassword,
      phoneNumber: this.phoneNumber,
    },
    [RegisterValidators.match('password', 'confirmPassword')]
  );

  constructor(private auth: AuthService, private emailTaken: EmailTaken) {}

  async register() {
    this.showAlert = true;
    this.alertMsg = 'Please wait...';
    this.alertColor = 'blue';
    this.inSubmission = true;

    try {
      await this.auth.createUser(this.registerForm.value);
    } catch (e) {
      this.alertMsg = 'Un unexpected error occurred';
      this.alertColor = 'red';
      this.inSubmission = false;

      return;
    }

    this.inSubmission = false;
    this.alertMsg = 'Your account was created';
    this.alertColor = 'green';
  }
}
