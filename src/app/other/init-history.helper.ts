export class InitHistoryHelper {
    height: number;
    width: number;

    indexes: string[];

    setData(height: number, width: number, indexes: string): void {
        this.height = height;
        this.width = width;

        this.indexes = this.prepareIndexes(indexes);

    }

    getData(): boolean[][] {
        const data = [];
        for (let i = 0; i < this.height; i++) {
            data[i] = [];
            for (let j = 0; j < this.width; j++) {
                data[i][j] = false;
            }
        }

        for (const index of this.indexes) {
            const splitted = index.split(',');
            const yPosition = splitted[1];
            const xPosition = splitted[0];
            data[yPosition][xPosition] = true;
        }

        return data;
    }

    private prepareIndexes(rawIndexes: string): string[] {
        const test = rawIndexes.replace(/[()\s]/g, '');

        return test.split(';');
    }
}
