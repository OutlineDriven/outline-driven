import { styleText } from 'node:util';

export function print(msg: string): void {
  console.log(msg);
}

export function printError(msg: string): void {
  console.error(styleText('red', `error: ${msg}`));
}

export function printSuccess(msg: string): void {
  console.log(styleText('green', msg));
}

export function printMuted(msg: string): void {
  console.log(styleText('gray', msg));
}
