import type Eris from 'eris';

export interface ConfigData {
  id: string;
  token: string;
  developers: string[];
  intents: Eris.ClientOptions['intents'];
  restOffset: number;
  largeThreshold: number;
}