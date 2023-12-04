import { Component, OnInit } from '@angular/core';
import { ModalService } from '../services/modal.service';
import { Modal } from '../shared/helpers/enums';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  constructor(private modal: ModalService) {}

  ngOnInit(): void {}

  openModal($event: Event) {
    $event.preventDefault();

    this.modal.toggleModal(Modal.Auth);
  }
}
