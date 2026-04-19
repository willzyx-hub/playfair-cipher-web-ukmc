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

        for (let [inputFirstLetter, inputSecondLetter] of pairs) {
            let [inputIndexR1, inputIndexC1] = this.findPosition(inputFirstLetter);
            let [inputIndexR2, inputIndexC2] = this.findPosition(inputSecondLetter);

            let rule, outputFirstLetter, outputSecondLetter, outputIndexR1, outputIndexR2, outputIndexC1, outputIndexC2;

            if (inputIndexR1 === inputIndexR2) {
                rule = 'Same Row';
                const addition = mode === 'encrypt' ? 1 : 4;

                outputIndexC1 = (inputIndexC1 + addition) % 5;
                outputIndexC2 = (inputIndexC2 + addition) % 5;
                outputIndexR1 = outputIndexR2 = inputIndexR1;

                outputFirstLetter = this.matrix[outputIndexR1][outputIndexC1];
                outputSecondLetter = this.matrix[outputIndexR2][outputIndexC2];
            } else if (inputIndexC1 === inputIndexC2) {
                rule = 'Same Column';

                const addition = mode === 'encrypt' ? 1 : 4;

                outputIndexR1 = (inputIndexR1 + addition) % 5;
                outputIndexR2 = (inputIndexR2 + addition) % 5;
                outputIndexC1 = outputIndexC2 = inputIndexC1;

                outputFirstLetter = this.matrix[outputIndexR1][outputIndexC1];
                outputSecondLetter = this.matrix[outputIndexR2][outputIndexC2];
            } else {
                rule = 'Rectangle';

                outputIndexR1 = inputIndexR1;
                outputIndexC1 = inputIndexC2;
                outputIndexR2 = inputIndexR2;
                outputIndexC2 = inputIndexC1;

                outputFirstLetter = this.matrix[outputIndexR1][outputIndexC1];
                outputSecondLetter = this.matrix[outputIndexR2][outputIndexC2];
            }

            result += outputFirstLetter + outputSecondLetter;

            steps.push({
                input: inputFirstLetter + inputSecondLetter,
                output: outputFirstLetter + outputSecondLetter,
                inputPosition: [
                    [inputIndexR1, inputIndexC1],
                    [inputIndexR2, inputIndexC2]
                ],
                outputPosition: [
                    [outputIndexR1, outputIndexC1],
                    [outputIndexR2, outputIndexC2],
                ],
                rule,
            })
        }

        return { result, steps };
    }
}