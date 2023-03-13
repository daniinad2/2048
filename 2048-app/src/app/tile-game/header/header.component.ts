import { Component } from '@angular/core'
import { Subscription } from 'rxjs'
import { ModalService } from '../services/modal.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  score = 0
  best = 50300

  scoreChanged: Subscription

  constructor(private modalService: ModalService) {
    this.scoreChanged = this.modalService.scoreChanged.subscribe((score: number) => {
      this.score = score
    })
  }

  openModalMenu() {
    this.modalService.open()
  }

  openLeaderboard() {
    alert('Leaderboard funcionality not implemented yet!')
  }
}
