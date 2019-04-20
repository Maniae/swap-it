export const generateLayout = (rows: number, columns: number, difficulty: number) => {
	const swaps = Math.floor((rows + columns) / 2) + difficulty;
	let layout: (0 | 1)[][] = [];
	for (let i = 0; i < rows; i++) {
		layout.push([]);
		for (let j = 0; j < columns; j++) {
			layout[i].push(1);
		}
	}
	for (let i = 0; i < swaps; i++) {
		const cell = Math.floor(Math.random() * (rows * columns));
		const row = Math.floor(cell / columns);
		const column = cell % columns;
		layout = swapLayoutCell(row, column, layout);
	}
	return layout;
};

export const swapLayoutCell = (row: number, column: number, layout: (0 | 1)[][]) => {
	const newLayout = [...layout.map(row => [...row])];

	swapCellIfExist(row, column, newLayout);
	swapCellIfExist(row + 1, column, newLayout);
	swapCellIfExist(row - 1, column, newLayout);
	swapCellIfExist(row, column + 1, newLayout);
	swapCellIfExist(row, column - 1, newLayout);

	return newLayout;
};

const swapCellIfExist = (row: number, column: number, layout: number[][]) => {
	if (layout[row] !== undefined && layout[row][column] !== undefined) {
		layout[row][column] = 1 - layout[row][column];
	}
};
