import type { ClientEvents } from 'eris';

export abstract class Event {
	name: Categories = 'hello';
	once: boolean = false;
  abstract run(...params: any): Promise<any> | any;
}

export type Categories = keyof ClientEvents;