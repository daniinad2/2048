import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private display: BehaviorSubject<boolean> =
    new BehaviorSubject(false)

  public newGameEvent = new Subject<boolean>()
  public saveGameEvent = new Subject<boolean>()

  public scoreChanged = new Subject<number>()

  watch(): Observable<boolean> {
    return this.display.asObservable()
  }

  open() {
    this.display.next(true)
  }

  close() {
    this.display.next(false)
  }

  newGame() {
    this.newGameEvent.next(true)
  }

  saveGame() {
    this.saveGameEvent.next(true)
  }

  scoreUpdate(score: number) {
    this.scoreChanged.next(score)
  }

}
