import fs from "fs";

//* Use to decode UDT WS messages for use in udt-connect.ts

// Add WS message as base 64 string here
const test =
  "AgAAAEUAAQJuh0AAgAaNbH8AAAF/AAABNrHo5otloBFg78VaUBgA/fFtAACBfgDWeyJjb21tYW5kIjoiZGlkQWRkUnVudGltZUNsaWVudCIsImlkIjoxLCJhcHAiOnsiYXBwSWQiOiJQUyIsImFwcE5hbWUiOiJBZG9iZSBQaG90b3Nob3AiLCJhcHBWZXJzaW9uIjoiMjcuNC4wIiwiY29tbWFuZCI6InJlcGx5IiwicmVxdWVzdElkIjoxLCJzdXBwb3J0ZWRGZWF0dXJlcyI6eyJkZWJ1Z1NjcmlwdHMiOnRydWV9LCJ1eHBWZXJzaW9uIjoidXhwLTkuMi4wLXV4cCJ9fQ==";

function decodePacket(base64: string) {
  const packet = Buffer.from(base64, "base64");

  // Skip 4-byte loopback header
  let offset = 4;

  // IPv4 header length
  const ipHeaderLen = (packet[offset] & 0x0f) * 4;
  offset += ipHeaderLen;

  // TCP header length
  const tcpHeaderLen = ((packet[offset + 12] >> 4) & 0x0f) * 4;
  offset += tcpHeaderLen;

  // WebSocket frame
  const ws = packet.slice(offset);

  const opcode = ws[0] & 0x0f;
  const masked = (ws[1] & 0x80) !== 0;

  let payloadLen = ws[1] & 0x7f;
  let ptr = 2;

  if (payloadLen === 126) {
    payloadLen = ws.readUInt16BE(ptr);
    ptr += 2;
  } else if (payloadLen === 127) {
    payloadLen = Number(ws.readBigUInt64BE(ptr));
    ptr += 8;
  }

  let mask;

  if (masked) {
    mask = ws.slice(ptr, ptr + 4);
    ptr += 4;
  }

  const payload = ws.slice(ptr, ptr + payloadLen);

  let decoded = Buffer.alloc(payload.length);

  if (masked) {
    for (let i = 0; i < payload.length; i++) {
      decoded[i] = payload[i] ^ mask[i % 4];
    }
  } else {
    payload.copy(decoded);
  }

  return {
    opcode,
    text: decoded.toString("utf8"),
  };
}
const res = decodePacket(test);
// Log output
console.log(res);

// saves to JSON file
fs.writeFileSync(
  "./scripts/decoded.json",
  JSON.stringify(JSON.parse(res.text), null, "\t"),
);
