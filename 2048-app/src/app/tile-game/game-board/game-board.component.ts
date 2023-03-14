import { Component, HostListener, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GameService } from '../services/game-service.service';
import { ModalService } from '../services/modal.service';

type FreeTile = {
  x: number
  y: number
}

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss']
})
export class GameBoardComponent implements OnInit {
  //board: number[][] = [[0, 2, 4, 8], [16, 32, 64, 128], [256, 512, 1024, 2048], [0, 0, 0, 0]]
  static readonly ROW_LENGTH = 4
  static readonly COL_LENGTH = 4
  board: number[][] = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]
  freeTiles: FreeTile[] = []
  userScore = 0

  newGameEvent: Subscription
  saveGameEvent: Subscription

  constructor(private modalService: ModalService, private gameService: GameService) {
    this.newGameEvent = this.modalService.newGameEvent.subscribe(() => {
      this.initGame()
    })

    this.saveGameEvent = this.modalService.saveGameEvent.subscribe(() => {
      this.saveGameToLocalStorage()
    })
  }

  ngOnInit(): void {
    this.initGame()
  }

  initGame() {
    //const retrivedBoard = localStorage.getItem('GameBoardSate')
    //const retrievedFreeTiles = localStorage.getItem('FreeTiles')

    /*if (retrivedBoard != null && retrievedFreeTiles != null && !isItNewGame) {
      console.log("Board: " + JSON.parse(retrivedBoard))
      console.log("Freetiles: " + JSON.parse(retrievedFreeTiles))
    }*/
    //else {

    const highscoreFromStorage = localStorage.getItem('UserHighScore')
    if (highscoreFromStorage != null) {
      this.gameService.highscoreUpdate(+highscoreFromStorage)
    }
    else {
      this.gameService.highscoreUpdate(0)
    }

    this.board = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]
    this.initTakenTileArray()
    this.spawnRandomValueOnBoard()
    this.spawnRandomValueOnBoard()
    this.userScore = 0
    localStorage.removeItem('GameBoardSate')
    localStorage.removeItem('FreeTiles')
    //}
  }

  saveGameToLocalStorage() {
    /*localStorage.setItem('GameBoardSate', JSON.stringify(this.board))
    localStorage.setItem('FreeTiles', JSON.stringify(this.freeTiles))*/
    console.warn('Save funcionality not implemented yet!')
    alert('Save funcionality not implemented yet!')
  }

  initTakenTileArray() {
    for (let i = 0; i < GameBoardComponent.ROW_LENGTH; i++) {
      for (let j = 0; j < GameBoardComponent.COL_LENGTH; j++) {
        const tileInfo = { x: i, y: j }
        this.freeTiles.push(tileInfo)
      }
    }
  }

  spawnRandomValueOnBoard() {
    const randomIndexes: FreeTile = this.getRandomIndexes()
    this.board[randomIndexes.x][randomIndexes.y] = this.getRandomValue()
  }

  getRandomIndexes(): FreeTile {
    const index = Math.floor(Math.random() * (this.freeTiles.length - 1))
    const randomIndexes = this.freeTiles[index]
    this.freeTiles.splice(index, 1)
    return randomIndexes
  }

  getRandomValue(): number {
    if (Math.random() < 0.4) {
      return 4
    } else {
      return 2
    }
  }

  checkGameOver() {
    let noMoreMove = true

    if (this.freeTiles.length == 0) {
      if (this.board[0][0] == this.board[0][1] || this.board[0][0] == this.board[1][0]) {
        noMoreMove = false
      }
      if (
        this.board[0][GameBoardComponent.COL_LENGTH - 1] == this.board[0][GameBoardComponent.COL_LENGTH - 2] ||
        this.board[0][GameBoardComponent.COL_LENGTH - 1] == this.board[1][GameBoardComponent.COL_LENGTH - 1]) {
        noMoreMove = false
      }
      if (
        this.board[GameBoardComponent.ROW_LENGTH - 1][0] == this.board[GameBoardComponent.ROW_LENGTH - 1][1] ||
        this.board[GameBoardComponent.ROW_LENGTH - 1][0] == this.board[GameBoardComponent.COL_LENGTH - 2][0]) {
        noMoreMove = false
      }
      if (
        this.board[GameBoardComponent.ROW_LENGTH - 1][GameBoardComponent.COL_LENGTH - 1] == this.board[GameBoardComponent.ROW_LENGTH - 1][GameBoardComponent.COL_LENGTH - 2] ||
        this.board[GameBoardComponent.ROW_LENGTH - 1][GameBoardComponent.COL_LENGTH - 1] == this.board[GameBoardComponent.ROW_LENGTH - 2][GameBoardComponent.COL_LENGTH - 1]) {
        noMoreMove = false
      }

      if (noMoreMove == true) {
        for (let row = 1; row < GameBoardComponent.ROW_LENGTH - 1; row++) {
          for (let col = 1; col < GameBoardComponent.COL_LENGTH - 1; col++) {
            if (this.board[row][col] == this.board[row][col - 1]) {
              noMoreMove = false
            } else if (this.board[row][col] == this.board[row][col + 1]) {
              noMoreMove = false
            } else if (this.board[row][col] == this.board[row + 1][col]) {
              noMoreMove = false
            } else if (this.board[row][col] == this.board[row][col - 1]) {
              noMoreMove = false
            }
          }
        }
      }
    }
    else {
      noMoreMove = false
    }
    if (noMoreMove == true) {
      localStorage.setItem('UserHighScore', JSON.stringify(this.userScore))
      alert('Game over!')
      this.initGame()
    }
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    let movedATile = false
    switch (event.key) {
      case 'ArrowUp':
        movedATile = this.moveTilesUp()
        if (movedATile == true) {
          this.spawnRandomValueOnBoard()
        }
        break
      case 'ArrowRight':
        movedATile = this.moveTilesRight()
        if (movedATile == true) {
          this.spawnRandomValueOnBoard()
        }
        break
      case 'ArrowDown':
        movedATile = this.moveTilesDown()
        if (movedATile == true) {
          this.spawnRandomValueOnBoard()
        }
        break
      case 'ArrowLeft':
        movedATile = this.moveTilesLeft()
        if (movedATile == true) {
          this.spawnRandomValueOnBoard()
        }
        break
    }
    this.checkGameOver()
  }

  addToFreeTile() {
    const newArray: FreeTile[] = []
    for (let row = 0; row < GameBoardComponent.ROW_LENGTH; row++) {
      for (let col = 0; col < GameBoardComponent.COL_LENGTH; col++) {
        if (this.board[row][col] == 0) {
          newArray.push({ x: row, y: col })
        }
      }
    }
    this.freeTiles = newArray
  }

  moveTilesUp(): boolean {
    let movedATile = false
    for (let col = 0; col < GameBoardComponent.COL_LENGTH; col++) {
      let isMerged = false
      for (let i = 0; i < 3; i++) {
        for (let row = 1; row < GameBoardComponent.ROW_LENGTH; row++) {
          if (this.board[row - 1][col] == 0 && this.board[row][col] != 0) {
            this.board[row - 1][col] = this.board[row][col]
            this.board[row][col] = 0
            this.addToFreeTile()
            movedATile = true
          } else if (this.board[row][col] != 0 && this.board[row][col] == this.board[row - 1][col]) {
            if (isMerged == false) {
              this.board[row - 1][col] = this.board[row - 1][col] * 2
              this.board[row][col] = 0
              this.addToFreeTile()
              this.userScore += this.board[row - 1][col]
              this.gameService.scoreUpdate(this.userScore)
              isMerged = true
              movedATile = true
            }
          }
        }
      }
    }
    return movedATile
  }

  moveTilesDown(): boolean {
    let movedATile = false
    for (let col = 0; col < GameBoardComponent.COL_LENGTH; col++) {
      let isMerged = false
      for (let i = 0; i < 3; i++) {
        for (let row = GameBoardComponent.ROW_LENGTH - 2; row >= 0; row--) {
          if (this.board[row + 1][col] == 0 && this.board[row][col] != 0) {
            this.board[row + 1][col] = this.board[row][col]
            this.board[row][col] = 0
            this.addToFreeTile()
            movedATile = true
          } else if (this.board[row][col] != 0 && this.board[row][col] == this.board[row + 1][col]) {
            if (isMerged == false) {
              this.board[row + 1][col] = this.board[row + 1][col] * 2
              this.board[row][col] = 0
              this.addToFreeTile()
              this.userScore += this.board[row + 1][col]
              this.gameService.scoreUpdate(this.userScore)
              isMerged = true
              movedATile = true
            }
          }
        }
      }
    }
    return movedATile
  }

  moveTilesRight(): boolean {
    let movedATile = false
    for (let row = 0; row < GameBoardComponent.ROW_LENGTH; row++) {
      let isMerged = false
      for (let i = 0; i < 3; i++) {
        for (let col = GameBoardComponent.COL_LENGTH - 2; col >= 0; col--) {
          if (this.board[row][col] != 0 && this.board[row][col + 1] == 0) {
            this.board[row][col + 1] = this.board[row][col]
            this.board[row][col] = 0
            this.addToFreeTile()
            movedATile = true
          } else if (this.board[row][col] != 0 && this.board[row][col] == this.board[row][col + 1]) {
            if (isMerged == false) {
              this.board[row][col + 1] = this.board[row][col + 1] * 2
              this.board[row][col] = 0
              this.addToFreeTile()
              this.userScore += this.board[row][col + 1]
              this.gameService.scoreUpdate(this.userScore)
              isMerged = true
              movedATile = true
            }
          }
        }
      }
    }
    return movedATile
  }
  moveTilesLeft(): boolean {
    let movedATile = false
    for (let row = 0; row < GameBoardComponent.ROW_LENGTH; row++) {
      let isMerged = false
      for (let i = 0; i < 3; i++) {
        for (let col = 0; col < GameBoardComponent.COL_LENGTH - 1; col++) {
          if (this.board[row][col + 1] != 0 && this.board[row][col] == 0) {
            this.board[row][col] = this.board[row][col + 1]
            this.board[row][col + 1] = 0
            this.addToFreeTile()
            movedATile = true
          } else if (this.board[row][col + 1] != 0 && this.board[row][col] == this.board[row][col + 1]) {
            if (isMerged == false) {
              this.board[row][col] = this.board[row][col] * 2
              this.board[row][col + 1] = 0
              this.addToFreeTile()
              this.userScore += this.board[row][col]
              this.gameService.scoreUpdate(this.userScore)
              isMerged = true
              movedATile = true
            }
          }
        }
      }
    }
    return movedATile
  }

  getTileColor(tile: number) {
    const cssClass = ['board-tile']
    if (tile == 2) {
      return [...cssClass, 'board-tile--two']
    } else if (tile == 4) {
      return [...cssClass, 'board-tile--four']
    } else if (tile == 8) {
      return [...cssClass, 'board-tile--eight']
    } else if (tile == 16) {
      return [...cssClass, 'board-tile--sixteen']
    } else if (tile == 32) {
      return [...cssClass, 'board-tile--thirtytwo']
    } else if (tile == 64) {
      return [...cssClass, 'board-tile--sixtyfour']
    } else if (tile == 128) {
      return [...cssClass, 'board-tile--onetwentyeight']
    } else if (tile == 256) {
      return [...cssClass, 'board-tile--twofiftysix']
    } else if (tile == 512) {
      return [...cssClass, 'board-tile--fivetwelve']
    } else if (tile == 1024) {
      return [...cssClass, 'board-tile--tenhundredtwentyfour']
    } else if (tile == 2048) {
      return [...cssClass, 'board-tile--twentyhundredfortyeight']
    } else {
      return [...cssClass, 'board-tile--zero']
    }



  }

}
