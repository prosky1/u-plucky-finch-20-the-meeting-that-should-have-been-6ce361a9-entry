import { mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { dirname } from "node:path";

const OUTPUT_PATH = "/output/entry.txt";
const JOKE = "The meeting's only output was another meeting, which is how calendars reproduce.";

function assertSingleLineWithinLimit(text: string): void {
  const chars = [...text].length;
  if (text.trim().length === 0) throw new Error("entry must not be whitespace only");
  if (chars < 1 || chars > 200) {
    throw new Error(`entry length out of range (1-200): ${chars}`);
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  // Guard against accidental trailing spaces creeping into the shipped line.
  if (text !== text.trim()) throw new Error("entry must not have surrounding whitespace");
}

function emitEntry(): void {
  assertSingleLineWithinLimit(JOKE);
  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  writeFileSync(OUTPUT_PATH, JOKE, "utf8");
  const roundTripped = readFileSync(OUTPUT_PATH, "utf8");
  if (roundTripped !== JOKE) {
    throw new Error("output round-trip mismatch");
  }
}

emitEntry();
