import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({ providedIn: 'root' })
export class GameService {

    public scoreChanged = new Subject<number>()
    public highscoreChanged = new Subject<number>()

    scoreUpdate(score: number) {
        this.scoreChanged.next(score)
    }
    highscoreUpdate(highscore: number) {
        this.highscoreChanged.next(highscore == null ? 0 : highscore)
    }
}