// const array = [4, 51, 53, 30, 25, 215, 123, 55, 98];
// const sortedArray = array.sort((a, b) => a - b);
// console.log(sortedArray)

const array = [];
for (let i = 1; i <= 100000000; ++i) {
	array.push(i);
}

const binarySearch = (list: number[], target: number): number | null => {
	let low = 0;
	let high = list.length - 1;

	while (low <= high) {
		const mid = Math.floor((low + high) / 2);
		if (list[mid] === target) {
			return mid;
		}
		if (list[mid] < target) {
			low = mid + 1;
		} else {
			high = mid - 1;
		}
	}
	return null;
};

const linearSearch = (array: number[], target: number) => {
	let start: number = 0;
	while (start !== target) {
		if (array[start] === target) return start;
		if (array[start] < target) start++;
	}
};

console.time('linear');
console.log(linearSearch(array, 94646454));
console.timeEnd('linear');

console.time('binary');
console.log(binarySearch(array, 94646454));
console.timeEnd('binary');
