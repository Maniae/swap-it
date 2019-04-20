import styled from "styled-components";
import * as React from "react";
import { swapLayoutCell, generateLayout } from "./gameService";

export const GameBoard = () => {
	const [layout, setLayout] = React.useState<(0 | 1)[][]>([]);
	const [initialLayout, setInitialLayout] = React.useState<(0 | 1)[][]>([]);
	const [rows, setRows] = React.useState(4);
	const [columns, setColumns] = React.useState(4);
	const [difficulty, setDifficulty] = React.useState(4);
	const [swaps, setSwaps] = React.useState(0);
	const [victory, setVictory] = React.useState(false);

	const newLayout = () => {
		const newLayout = generateLayout(rows, columns, difficulty);
		setLayout(newLayout);
		setInitialLayout(newLayout);
		setVictory(false);
		setSwaps(0);
	};

	React.useEffect(() => {
		newLayout();
	}, [rows, columns, difficulty]);

	React.useEffect(() => {
		const queryParams = location.search;
		if (queryParams) {
			const level = queryParams.split("?level=")[1];
			if (level) {
				setLayout(JSON.parse(level));
				setInitialLayout(JSON.parse(level));
				setSwaps(0);
				setVictory(false);
			}
		}
	}, [location.search]);

	React.useEffect(() => {
		if (!layout.length) {
			return;
		}
		for (const row of layout) {
			if (!row.length) {
				return;
			}
			for (const v of row) {
				if (!v) {
					return;
				}
			}
		}
		alert(`Victory ! Swaps: ${swaps}`);
		setVictory(true);
	}, [layout]);

	return (
		<Container>
			<Options>
				<Container>
					<Label htmlFor="rows">Rows</Label>
					<NumberInput
						id="rows"
						name="rows"
						type="number"
						onChange={e => setRows(Math.floor(+e.currentTarget.value))}
						value={rows}
					/>
				</Container>
				<Container>
					<Label htmlFor="columns">Columns</Label>
					<NumberInput
						id="columns"
						name="columns"
						type="number"
						onChange={e => setColumns(Math.floor(+e.currentTarget.value))}
						value={columns}
					/>
				</Container>
				<Container>
					<Label htmlFor="difficulty">Difficulty</Label>
					<NumberInput
						id="difficulty"
						name="difficulty"
						type="number"
						onChange={e => setDifficulty(Math.floor(+e.currentTarget.value))}
						value={difficulty}
					/>
				</Container>
			</Options>
			<div>Swaps : {swaps}</div>
			<BoardWrapper>
				{layout.map((row, rowIndex) => (
					<BoardRow key={rowIndex}>
						{row.map((v, i) => (
							<Cell
								key={`${rowIndex}${i}`}
								onClick={() => {
									setSwaps(swaps + 1);
									setLayout(swapLayoutCell(rowIndex, i, layout));
								}}
								value={v}
								disabled={victory}
							/>
						))}
					</BoardRow>
				))}
			</BoardWrapper>
			<Button
				onClick={() => {
					setLayout(initialLayout);
					setSwaps(0);
					setVictory(false);
				}}
			>
				RESTART
			</Button>
			<Button onClick={() => newLayout()} style={{ marginTop: 0 }}>
				NEW
			</Button>
			<Button
				onClick={() => {
					const el = document.createElement("textarea");
					el.value = `${location.host}?level=${JSON.stringify(initialLayout)}`;
					document.body.appendChild(el);
					el.select();
					document.execCommand("copy");
					document.body.removeChild(el);
					alert("Level copied in Clipboard !");
				}}
			>
				SHARE
			</Button>
		</Container>
	);
};
const Container = styled.div`
	display: flex;
	align-self: stretch;
	flex-direction: column;
	align-items: center;
`;
const Options = styled.div`
	display: flex;
	align-self: stretch;
	margin: 20px 0;
	justify-content: space-between;
`;
const NumberInput = styled.input`
	width: 40px;
`;
const Label = styled.label``;
const BoardWrapper = styled.div`
	display: flex;
	flex-direction: column;
	user-select: none;
	margin: 5px;
`;

const BoardRow = styled.div`
	display: flex;
	flex-direction: row;
`;

const Cell = styled.button<{ value: number }>`
	padding: 5;
	margin: 1;
	width: 50px;
	height: 50px;
	background-color: ${({ value }) => (value ? "#24fe72" : "#e2e2e2")};
	border: none;
	transition: background-color 0.1s linear, filter 0.1s linear;
	outline: none;

	&:hover {
		filter: brightness(0.8);
	}
`;
const Button = styled.button`
	margin: 50px 0;
	padding: 10px 15px;
	border: none;
	background-color: #24fe72;
	color: #2b2b2b;
	font-weight: 600;
	cursor: pointer;
	outline: none;
	transition: filter 0.1s linear;
	font-size: 16px;
	min-width: 120px;

	&:hover {
		filter: brightness(1.4);
	}
`;
