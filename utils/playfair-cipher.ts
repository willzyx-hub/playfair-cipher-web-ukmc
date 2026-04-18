// I and J is combined into one
const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

function replaceLetterJ(letters: string): string {
    return letters.split('')
        .map(letter => letter === 'J' ? 'I' : letter)
        .join('');
}

export function generateGrid(cipherKey: string) {
    const uniqueKeyArray = [... new Set(replaceLetterJ(cipherKey))];
    const unusedLetterArray = LETTERS.filter(letter => !uniqueKeyArray.includes(letter));

    const sortedLetterArray = [...uniqueKeyArray, ...unusedLetterArray];

    let finalGrid: Record<string, [number, number]> = {};
    let positionLetter = 0;

    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            finalGrid[sortedLetterArray[positionLetter]] = [i, j];
            positionLetter++;
        }
    }
    console.log(finalGrid)

    return finalGrid;
}