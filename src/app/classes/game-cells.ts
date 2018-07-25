import { Helper } from '../other/helper';

export class GameCells {
    private cells: boolean[][];

    private boardHeight: number;
    private boardWidth: number;

    private livingCells = 0;

    private neighboursNum = 0;

    constructor(boardHeight: number, boardWidth: number) {
        this.boardHeight = boardHeight;
        this.boardWidth = boardWidth;

        this.initCells();
    }

    calculate(): void {
        const newCells = [];
        let newLivingCells = 0;
        for (let i = 0; i < this.boardHeight; i++) {
            newCells[i] = [];
            for (let j = 0; j < this.boardWidth; j++) {
                const currentCell = this.cells[i][j];
                this.calculateNumberOfNeighbours(i, j);
                const newCell = this.getNewCellValue(currentCell);
                newCells[i][j] = newCell;

                if (newCell) {
                    newLivingCells++;
                }
            }
        }
        this.livingCells = newLivingCells;
        this.cells = newCells;
    }

    toggleCell(y: number, x: number): void {
        this.cells[y][x] = !this.cells[y][x];
        if (this.cells[y][x]) {
            this.livingCells++;
        } else {
            this.livingCells--;
        }
    }

    clearCells(): void {
        for (let i = 0; i < this.boardHeight; i++) {
            this.cells[i] = [];
            for (let j = 0; j < this.boardWidth; j++) {
                this.cells[i][j] = false;
            }
        }
        this.livingCells = 0;
    }

    resetCells(): void {
        this.initCells();
    }

    setSize(boardHeight: number, boardWidth: number): void {
        this.boardHeight = boardHeight;
        this.boardWidth = boardWidth;

        this.resetCells();
    }

    set currentCells(cells: boolean[][]) {
        this.cells = cells;
        this.boardHeight = this.cells.length;
        this.boardWidth = this.cells[0].length;
    }

    get currentCells(): boolean[][] {
        return this.cells;
    }

    get livingCellsCounter(): number {
        return this.livingCells;
    }

    get currentBoardHeight(): number {
        return this.boardHeight;
    }

    get currentBoardWidth(): number {
        return this.boardWidth;
    }

    private initCells(): void {
        this.livingCells = 0;
        this.cells = [];
        for (let i = 0; i < this.boardHeight; i++) {
            this.cells[i] = [];
            for (let j = 0; j < this.boardWidth; j++) {
                const newValue = this.getCellInitialValue();
                this.cells[i][j] = newValue;

                if (newValue) {
                    this.livingCells++;
                }
            }
        }
    }

    private getCellInitialValue(): boolean {
        const randomNumber = Helper.getRandomInt(0, 1);
        return randomNumber > 0;
    }

    private calculateNumberOfNeighbours(y: number, x: number): void {
        this.neighboursNum = 0;
        const xLimit = this.boardWidth - 1;
        const yLimit = this.boardHeight - 1;

        // 3    2   8
        // 1    0   4
        // 7    5   6

        // 1
        if (x > 0) {
            this.calculateNeighboursNum(x - 1, y);
        }

        // 2
        if (y > 0) {
            this.calculateNeighboursNum(x, y - 1);
        }

        // 3
        if (x > 0 && y > 0) {
            this.calculateNeighboursNum(x - 1, y - 1);
        }

        // 4
        if (x < xLimit) {
            this.calculateNeighboursNum(x + 1, y);
        }

        // 5
        if (y < yLimit) {
            this.calculateNeighboursNum(x, y + 1);
        }

        // 6
        if (x < xLimit && y < yLimit) {
            this.calculateNeighboursNum(x + 1, y + 1);
        }

        // 7
        if (x > 0 && y < yLimit) {
            this.calculateNeighboursNum(x - 1, y + 1);
        }

        // 8
        if (y > 0 && x < xLimit) {
            this.calculateNeighboursNum(x + 1, y - 1);
        }
    }

    private calculateNeighboursNum(x: number, y: number): void {
        const cell = this.cells[y][x];
        if (cell) {
            this.neighboursNum++;
        }
    }

    private getNewCellValue(cell: boolean): boolean {
        const lonelinessLimit = 2;
        const clutterLimit = 3;
        const bringMeToLifeValue = 3;

        if (cell) {
            return this.neighboursNum === lonelinessLimit || this.neighboursNum === clutterLimit;
        }

        if (!cell && this.neighboursNum === bringMeToLifeValue) {
            return true;
        }

        return false;
    }

}
