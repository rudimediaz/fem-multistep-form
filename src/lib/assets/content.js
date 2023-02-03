import { v4 as generateId } from 'uuid';
import arcadeLogo from './icon-arcade.svg';
import advancedLogo from './icon-advanced.svg';
import proLogo from './icon-pro.svg';

export const indicatorLabels = ['Your Info', 'Select Plan', 'Add-ons', 'Summary'];

export const fieldContents = [
	{ title: 'Personal info', desc: 'Please provide your name, email address, and phone number.' },
	{ title: 'Select your plan', desc: 'You have the option of monthly or yearly billing.' },
	{ title: 'Pick add-ons', desc: 'Add-ons help enhance your gaming experience.' },
	{ title: 'Finishing up', desc: 'Double-check everything looks OK before confirming.' }
];

/**
 * @typedef {Object} PlanData
 * @property {string} id
 * @property {string} name
 * @property {number} price
 * @property {string} logoURL
 */

/**
 * @typedef { Omit<PlanData, 'price'> & {price : string} } PlanDataDisplay
 */

/** @type {PlanData[]} */
export const plans = [
	{
		id: generateId(),
		name: 'Arcade',
		price: 9,
		logoURL: arcadeLogo
	},
	{
		id: generateId(),
		name: 'Advanced',
		price: 12,
		logoURL: advancedLogo
	},
	{
		id: generateId(),
		name: 'Pro',
		price: 15,
		logoURL: proLogo
	}
];

/**
 * @typedef {Object} Addon
 * @property {string} id
 * @property {string} name
 * @property {string} description
 * @property {number} price
 */

/**
 * @typedef { Omit<Addon, 'price'> & {price : string} } AddonDataDisplay
 */

/** @type {Addon[]} */
export const addons = [
	{
		id: generateId(),
		name: 'Online Service',
		description: 'Access to multiplayer games',
		price: 1
	},
	{
		id: generateId(),
		name: 'Larger storage',
		description: 'Extra 1TB of cloud save',
		price: 2
	},
	{
		id: generateId(),
		name: 'Customizable Profile',
		description: 'Custom theme on your profile',
		price: 2
	}
];
