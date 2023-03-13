import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-menu-modal',
  templateUrl: './menu-modal.component.html',
  styleUrls: ['./menu-modal.component.scss']
})
export class MenuModalComponent implements OnInit {
  display: Observable<boolean> | undefined

  constructor(private modalService: ModalService) { }

  ngOnInit() {
    this.display = this.modalService.watch();
  }

  closeMenuModal() {
    this.modalService.close()
  }

  newGame() {
    this.modalService.newGame()
    this.closeMenuModal()
  }

  saveGame() {
    this.modalService.saveGame()
    this.closeMenuModal()
  }
}
