import { Collection } from '@discordjs/collection';
import { REST } from '@discordjs/rest';
import { getConfig } from './configLoader.ts';

export const rest = new REST({ version: '10' }).setToken(getConfig().token);
export const cooldownedUsers: Collection<string, number> = new Collection();