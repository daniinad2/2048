import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TileGameComponent } from './tile-game/tile-game.component';
import { GameBoardComponent } from './tile-game/game-board/game-board.component';
import { GameTileComponent } from './tile-game/game-board/game-tile/game-tile.component';
import { HeaderComponent } from './tile-game/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    TileGameComponent,
    GameBoardComponent,
    GameTileComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
