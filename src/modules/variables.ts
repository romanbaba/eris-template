import { Collection } from '@discordjs/collection';
import { REST } from '@discordjs/rest';

export const rest = new REST({ version: '10' }).setToken(process.env['TOKEN'] ?? '');
export const cooldownedUsers: Collection<string, number> = new Collection();