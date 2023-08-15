import { differenceInDays } from 'date-fns'


const FIRST_DAY = new Date(2023, 7, 1);

function createRowFromGuess(guess) {
    const emojiFromStr = (str) => {
        return `${str === "green" ? '🟩' : str === 'yellow' ? '🟨' : '⬛'}`
    }

    return "\n" + emojiFromStr(guess.season) + emojiFromStr(guess.weather) + emojiFromStr(guess.location) + emojiFromStr(guess.time) + ((guess.correct) ? "🟩" : "⬛");
}

export default function guessesToString(guesses, numGuess, fishResults, daily, hardmode){

    const lines = guesses.map((guess, i) => ((i < numGuess) ? createRowFromGuess(guess) : ""));

    console.log(FIRST_DAY, new Date(), differenceInDays(new Date(), FIRST_DAY));

    return `Pufferdle ${daily ? `#${differenceInDays(new Date(), FIRST_DAY)}` : "Random"} ${numGuess}/6${hardmode ? "*" : ""}` +
    `\n${fishResults.caught ? "🎣" : ""}${fishResults.treasure ? "👑" : ""}${fishResults.perfect ? "⭐" : ""}` +
    lines.join("");
}