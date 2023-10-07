import type Eris from 'eris';

export interface ConfigData {
  token: string;
  developers: string[];
  intents: Eris.ClientOptions['intents'];
  restOffset: number;
  largeThreshold: number;
}