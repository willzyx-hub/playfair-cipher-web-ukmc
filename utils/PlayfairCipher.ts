export class PlayfairCipher {
    matrix: string[][];

    constructor(key: string) {
        this.matrix = this.generateMatrix(key);
    }

    generateMatrix(key: string) {
        key = key.toUpperCase().replace(/J/g, 'I');
        let seen = new Set();
        let matrix = [];

        for (let char of key) {
            if (/[A-Z]/.test(char) && !seen.has(char)) {
                seen.add(char);
                matrix.push(char);
            }
        };


        // Add remaining letter
        for (let i = 65; i <= 90; i++) {
            let char = String.fromCharCode(i);
            if (char === 'J') continue;
            if (!seen.has(char)) {
                seen.add(char);
                matrix.push(char);
            }
        }

        let grid = [];
        for (let i = 0; i < 5; i++) {
            grid.push(matrix.slice(i * 5, i * 5 + 5));
        }
        return grid;
    }

    findPosition(char: string) {
        if (char === 'J') char = 'I';

        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                if (this.matrix[i][j] === char) {
                    return [i, j];
                }
            }
        }

        return [-1, -1]; // For safety TS
    }

    prepareText(text: string) {
        text = text.toUpperCase().replace(/J/g, 'I').replace(/[^A-Z]/g, '');
        let pairs = [];

        for (let i = 0; i < text.length; i += 2) {
            let a = text[i];
            let b = text[i + 1];

            if (a === b) {
                pairs.push([a, 'X']);
                i--;
            } else {
                if (b) {
                    pairs.push([a, b]);
                } else {
                    pairs.push([a, 'X']);
                }
            }
        }

        return pairs;
    }

    process(text: string, mode: 'encrypt' | 'decrypt' = 'encrypt') {
        let pairs = this.prepareText(text);
        let steps = [];
        let result = '';

        for (let [a, b] of pairs) {
            let [r1, c1] = this.findPosition(a);
            let [r2, c2] = this.findPosition(b);

            let outA, outB, rule;

            if (r1 === r2) {
                rule = 'Same Row';
                if (mode === 'encrypt') {
                    outA = this.matrix[r1][(c1 + 1) % 5];
                    outB = this.matrix[r2][(c2 + 1) % 5];
                } else {
                    outA = this.matrix[r1][(c1 + 4) % 5];
                    outB = this.matrix[r2][(c2 + 4) % 5];
                }
            } else if (c1 === c2) {
                rule = 'Same Column';
                if (mode === 'encrypt') {
                    outA = this.matrix[(r1 + 1) % 5][c1];
                    outB = this.matrix[(r2 + 1) % 5][c2];
                } else {
                    outA = this.matrix[(r1 + 4) % 5][c1];
                    outB = this.matrix[(r2 + 4) % 5][c2];
                }
            } else {
                rule = 'Rectangle';
                outA = this.matrix[r1][c2];
                outB = this.matrix[r2][c1];
            }

            result += outA + outB;

            steps.push({
                input: a + b,
                output: outA + outB,
                rule,
                position: [
                    [r1, c1],
                    [r2, c2]
                ],
            })
        }

        return {result, steps};
    }
}