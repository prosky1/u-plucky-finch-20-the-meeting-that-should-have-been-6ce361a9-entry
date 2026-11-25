// The Meeting That Should Have Been an Email — entry program (program/v1, node22).
// Writes exactly one line to /output/entry.txt: a single joke about a
// meeting that should have been an email, with no trailing newline so the
// judged text is byte-exact.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const LINE =
  "Forty people, one hour, zero decisions: an email could have done that in eleven words.";

const OUT_PATH = "/output/entry.txt";

mkdirSync(dirname(OUT_PATH), { recursive: true });
writeFileSync(OUT_PATH, LINE, "utf8");

// Runtime guard: read the file back and refuse to finish silently if what
// landed on disk is not the line, byte for byte. The sealed gate allows
// 1–200 characters of non-whitespace text on a single line, and the entry
// must be exactly this line — any drift here would be judged instead of
// the intended joke.
const written = readFileSync(OUT_PATH, "utf8");
if (written !== LINE) {
  throw new Error(
    `entry.txt mismatch: expected ${LINE.length} chars, ` +
      `got ${written.length} chars`,
  );
}
if (written.length < 1 || written.length > 200 || !written.trim()) {
  throw new Error("entry.txt fails the 1–200 non-whitespace character gate");
}
if (written.includes("\n")) {
  throw new Error("entry.txt must be exactly one line");
}
console.log(`Wrote ${LINE.length} characters to ${OUT_PATH}`);
