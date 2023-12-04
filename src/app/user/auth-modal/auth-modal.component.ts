import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { Modal } from 'src/app/shared/helpers/enums';

@Component({
  selector: 'app-auth-modal',
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.css'],
})
export class AuthModalComponent implements OnInit, OnDestroy {
  ModalEnum = Modal;
  constructor(private modal: ModalService) {}

  ngOnInit(): void {
    this.modal.register(this.ModalEnum.Auth);
  }

  ngOnDestroy(): void {
    this.modal.unregister(this.ModalEnum.Auth);
  }
}
