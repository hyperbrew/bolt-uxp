#!/usr/bin/env node

import * as color from "picocolors";
import { intro, note, outro, spinner } from "@clack/prompts";

main();

async function main() {
  console.clear();
  boltIntro();
}

function boltIntro() {
  console.log();
  const cbc = color.bgGreen(` create-bolt-uxp `);
  const url = color.underline("https://hyperbrew.co");
  const bru = color.gray("│   ") + color.cyan(`by Hyper Brew | ${url}`);
  intro(`${cbc} \n${bru}`);
}
