import namor from 'namor';
import { getRandomInt } from 'utils';

const range = (len) => {
	const arr = [];
	for (let i = 0; i < len; i++) {
		arr.push(i);
	}
	return arr;
};

const newPerson = () => {
	const statusChance = Math.random();
	return {
		reference: `WEB-PAYMENT-${namor.generate().toUpperCase()}`,
		vendor_reference: namor.generate({ words: 1, numbers: 0 }),
		date: `${getRandomInt(1, 30)}/${getRandomInt(1, 12)}/${getRandomInt(2000, 2020)}`,
		status: statusChance > 0.66 ? 'success' : statusChance > 0.33 ? 'pending' : 'failed',
		vendor: namor.generate({ words: 1, numbers: 0 }),
		currency: 'NGN',
		amount: getRandomInt(100, 30000),
	};
};

export default function makeData(...lens) {
	const makeDataLevel = (depth = 0) => {
		const len = lens[depth];
		return range(len).map((d) => {
			return {
				...newPerson(),
				subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
			};
		});
	};

	return makeDataLevel();
}
