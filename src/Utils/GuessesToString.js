import { differenceInDays } from 'date-fns'


const FIRST_DAY = new Date(2023, 8, 1);

function createRowFromGuess(guess) {
    const emojiFromStr = (str) => {
        return `${str === "green" ? '🟩' : str === 'yellow' ? '🟨' : '⬛'}`
    }

    return "\n" + emojiFromStr(guess.season) + emojiFromStr(guess.weather) + emojiFromStr(guess.location) + emojiFromStr(guess.time) + ((guess.correct) ? "🟩" : "⬛");
}

export default function guessesToString(guesses, numGuess, fishResults, daily, day, hardmode){

    const lines = guesses.map((guess, i) => ((i < numGuess) ? createRowFromGuess(guess) : ""));

    return `Pufferdle ${daily ? `#${differenceInDays(FIRST_DAY, new Date())}` : "Random"}${hardmode ? "*" : ""} ${numGuess}/6 ` +
    `${fishResults.caught ? "🎣" : ""}${fishResults.treasure ? "👑" : ""}${fishResults.perfect ? "⭐" : ""}` +
    lines.join("");
}