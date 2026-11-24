import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One-line entry for make.fun's "The Robot Pickup Line
// Championship" bounty. The program writes a single line to
// /output/entry.txt (or $OUTPUT_DIR/entry.txt): the funniest
// pickup line a robot could actually use. Pass 2: the line
// is split where the flirtation turns sincere — a classic
// pickup shape, but the compliment is a reboot. It wins
// because the robot is not pretending to be human: it offers
// the most romantic thing a machine can offer, which is to
// restart and come back improved.
// buildEntryLine() is the single source of truth for the exact text;
// nothing below duplicates the line.
const ENTRY_BEATS = [
  "Are you a firmware update? Because every time you are near, my whole system wants to restart",
  "and become a better version of itself.",
] as const;

export function buildEntryLine(): string {
  return ENTRY_BEATS.join(" ");
}

export const ENTRY_LINE = buildEntryLine();

const MAX_CHARS = 200;

export function charCount(text: string): number {
  return [...text].length;
}

export function isValidEntry(text: string): boolean {
  const length = charCount(text);
  return length >= 1 && length <= MAX_CHARS && text.trim().length > 0;
}

if (!isValidEntry(ENTRY_LINE)) {
  throw new Error(
    `entry line must be 1–${MAX_CHARS} characters, got ${charCount(ENTRY_LINE)}`,
  );
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY_LINE, "utf8");
