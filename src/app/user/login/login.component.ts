import { Component, ViewChild, enableProdMode } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NgForm } from '@angular/forms';
import { ModalService } from 'src/app/services/modal.service';
import { Modal } from 'src/app/shared/helpers/enums';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  @ViewChild('loginForm') loginForm!: NgForm;
  credentials = {
    email: '',
    password: '',
  };

  inSubmission: boolean = false;
  showAlert: boolean = false;
  loginMsg: string = '';
  alertColor: string = 'blue';

  constructor(private auth: AngularFireAuth, private modal: ModalService) {}

  async login() {
    this.showAlert = true;
    this.loginMsg = 'Please wait! We are logging you in.';
    this.alertColor = 'blue';
    this.inSubmission = true;

    try {
      await this.auth.signInWithEmailAndPassword(
        this.credentials.email,
        this.credentials.password
      );
    } catch (e) {
      this.loginMsg = 'Something went wrong!';
      this.alertColor = 'red';
      this.inSubmission = false;
      return;
    } finally {
      this.credentials = { email: '', password: '' };
      this.loginForm.reset();
    }

    this.inSubmission = false;
    this.loginMsg = 'Successfully logged in!';
    this.alertColor = 'green';
    setTimeout(
      () => (
        (this.showAlert = false),
        this.modal.isModalOpen(Modal.Auth)
          ? this.modal.toggleModal(Modal.Auth)
          : ''
      ),
      4000
    );
  }
}
