import type { ConfigData } from '@/types.ts';
import { readFileSync } from 'fs';
import { load } from 'js-yaml';

export const configFilePath = './src/config.yaml';

function loadConfig(): unknown {
	const fileString = readFileSync(configFilePath, { encoding: 'utf-8' });
	return load(fileString);
}

export function getConfig(): ConfigData {
	const yamlData = loadConfig() as ConfigData;
	return yamlData;
}
