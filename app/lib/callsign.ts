export function generateCallsign(): string {
  return `OP-${Math.floor(1000 + Math.random() * 9000)}`;
}
