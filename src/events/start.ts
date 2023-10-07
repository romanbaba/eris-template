import { bot } from '@/base/bot.ts';
import { Event, type Categories } from '@/classes/event.ts';
import consola from 'consola';
import { ActivityType } from 'discord-api-types/v10';

export default class Listener extends Event {
	override name: Categories = 'ready';

	override run() {
		consola.success('Bot logged in to Discord.');
		bot.editStatus('online', { name: '@romanizm', type: ActivityType.Playing });
	}
}