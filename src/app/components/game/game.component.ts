import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';

import { Observable, Subscription } from 'rxjs';
import * as lodash from 'lodash';

import { AppSettings } from '../../app.settings';
import * as SavedGames from '../../other/initial-history.data';
import { KeyCodes } from '../../consts/key-codes.const';
import { GameCells } from '../../classes/game-cells';

@Component({
    selector: 'game-of-life',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, OnDestroy {

    gameCells: GameCells;

    boardMinimumSize: number = AppSettings.boardMinimumSize;

    intervalInMiliseconds = 200;
    newIntervalInMiliseconds: number;

    boardHeight: number = AppSettings.boardHeight;
    boardWidth: number = AppSettings.boardWidth;
    newBoardHeight: number;
    newBoardWidth: number;

    stepsNum = 0;
    isAuto: boolean;

    savedGames: GameCells[];

    private intervalSubscription: Subscription;
    private hPressed: boolean;

    @HostListener('document:keydown', ['$event'])
    keyDownEvent(event: KeyboardEvent) {
        const keyCode = event.keyCode;
        if (this.hPressed && keyCode >= KeyCodes.oneNumber && keyCode <= KeyCodes.nineNumber) {
            this.hNumberCombinationClick(keyCode);
        }

        if (keyCode === KeyCodes.cLetter) {
            this.cLetterClick();
        }

        if (keyCode === KeyCodes.hLetter) {
            this.hPressed = true;
        }

        if (keyCode === KeyCodes.nLetter) {
            this.nLetterClick();
        }

        if (keyCode === KeyCodes.rLetter) {
            this.rLetterClick();
        }

        if (keyCode === KeyCodes.sLetter) {
            this.sLetterClick();
        }

    }
    @HostListener('document:keyup', ['$event'])
    keyUpEvent(event: KeyboardEvent) {
        if (event.keyCode === KeyCodes.hLetter) {
            this.hPressed = false;
        }
    }

    ngOnInit() {
        this.newIntervalInMiliseconds = this.intervalInMiliseconds;
        this.gameCells = new GameCells(this.boardHeight, this.boardWidth);

        this.newBoardHeight = this.boardHeight;
        this.newBoardWidth = this.boardWidth;

        this.initSavedGames();
    }

    nextStep(): void {
        this.gameCells.calculate();
        this.stepsNum++;
    }

    cellClick(y: number, x: number): void {
        this.gameCells.toggleCell(y, x);
    }

    autoStart(): void {
        this.isAuto = true;
        this.intervalSubscription = Observable.interval(this.intervalInMiliseconds)
            .subscribe(() => {
                this.nextStep();
            });
    }

    autoStop(): void {
        this.unsubscribe();
    }

    clearGame(): void {
        this.gameCells.clearCells();
    }

    resetGame(): void {
        this.stepsNum = 0;
        this.autoStop();
        this.gameCells.setSize(this.boardHeight, this.boardWidth);
    }

    saveIntervalClick(): void {
        const isRunningAutoMode = this.isAuto;
        this.autoStop();

        this.intervalInMiliseconds = this.newIntervalInMiliseconds;

        if (isRunningAutoMode) {
            this.autoStart();
        }
    }

    saveBoardSize(): void {
        if (this.newBoardHeight < this.boardMinimumSize || this.newBoardWidth < this.boardMinimumSize) {
            return;
        }

        this.boardHeight = this.newBoardHeight;
        this.boardWidth = this.newBoardWidth;

        this.resetGame();
    }

    saveGame(): void {
        this.savedGames.push(lodash.cloneDeep(this.gameCells));
    }

    deleteSavedGame(index: number): void {
        this.savedGames.splice(index, 1);
    }

    loadSavedGame(index: number): void {
        const savedGame = this.savedGames[index];
        this.autoStop();
        lodash.assign(this.gameCells, savedGame);
        this.boardHeight = savedGame.currentBoardHeight;
        this.boardWidth = savedGame.currentBoardWidth;
        this.newBoardHeight = savedGame.currentBoardHeight;
        this.newBoardWidth = savedGame.currentBoardWidth;
    }

    private initSavedGames(): void {
        const GameWithGun = new GameCells(5, 5);
        GameWithGun.currentCells = SavedGames.GosperGliderGunData;

        const pulsar = new GameCells(5, 5);
        pulsar.currentCells = SavedGames.pulsarData;
        this.savedGames = [GameWithGun, pulsar];
    }

    private unsubscribe(): void {
        if (this.intervalSubscription && !this.intervalSubscription.closed) {
            this.intervalSubscription.unsubscribe();
            this.isAuto = false;
        }
    }

    private sLetterClick(): void {
        if (this.isAuto) {
            this.autoStop();
        } else {
            this.autoStart();
        }
    }

    private rLetterClick(): void {
        this.resetGame();
    }

    private nLetterClick(): void {
        this.nextStep();
    }

    private cLetterClick(): void {
        this.clearGame();
    }

    private hNumberCombinationClick(keyCode: number): void {
        const index = keyCode - KeyCodes.oneNumber;
        if (index < this.savedGames.length) {
            this.loadSavedGame(index);
        }
    }

    ngOnDestroy(): void {
        this.unsubscribe();
    }

}
