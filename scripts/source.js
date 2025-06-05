import fs from "fs";
import { SourceMapConsumer } from "source-map";

async function findOriginalPosition(mapFilePath, line, column) {
  const rawSourceMap = JSON.parse(fs.readFileSync(mapFilePath, "utf8"));
  const consumer = await new SourceMapConsumer(rawSourceMap);

  const pos = consumer.originalPositionFor({
    line,
    column,
    bias: SourceMapConsumer.LEAST_UPPER_BOUND,
  });

  console.log(pos);

  consumer.destroy();
}

findOriginalPosition("./dist/assets/index-CzTXQK2G.js.map", 1, 13);
// findOriginalPosition("./dist/assets/index-CzTXQK2G.js.map", 1, 1);
