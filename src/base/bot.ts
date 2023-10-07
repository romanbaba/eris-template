import { Bot } from '@/modules/client.ts';

export const bot = new Bot();

export async function start() {
	bot.init();
}