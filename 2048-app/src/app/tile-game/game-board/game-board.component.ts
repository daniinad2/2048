import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss']
})
export class GameBoardComponent implements OnInit {
  board: number[][] = [[0, 2, 4, 8], [16, 32, 64, 128], [256, 512, 1024, 2048], [0, 0, 0, 0]]

  ngOnInit(): void {

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
