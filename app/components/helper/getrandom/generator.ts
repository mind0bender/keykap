"use server";
import wordlist from "../wordlist.json";

const DEFAULT_MIN_WORD_COUNT: number = 16;
const DEFAULT_MAX_WORD_COUNT: number = 32;

function getRandomSentence(
  wordCount: number = Math.floor(
    Math.random() * (DEFAULT_MAX_WORD_COUNT - DEFAULT_MIN_WORD_COUNT) +
      1 +
      DEFAULT_MIN_WORD_COUNT
  )
): string {
  console.log(wordCount);

  let randomWords: string[] = [];
  for (let i: number = 0; i < wordCount; i++) {
    randomWords.push(wordlist[Math.floor(Math.random() * wordlist.length)]);
  }
  return randomWords.join(" ");
}

export default getRandomSentence;
