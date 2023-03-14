import { Component } from '@angular/core'
import { Subscription } from 'rxjs'
import { GameService } from '../services/game-service.service'
import { ModalService } from '../services/modal.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  score = 0
  best = 0

  scoreChanged: Subscription
  highscoreChanged: Subscription

  constructor(private modalService: ModalService, private gameService: GameService) {
    this.scoreChanged = this.gameService.scoreChanged.subscribe((score: number) => {
      this.score = score
    })

    this.highscoreChanged = this.gameService.highscoreChanged.subscribe((highscore: number) => {
      this.best = highscore
    })
  }

  openModalMenu() {
    this.modalService.open()
  }

  openLeaderboard() {
    alert('Leaderboard funcionality not implemented yet!')
  }
}
