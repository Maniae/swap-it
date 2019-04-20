import * as React from "react";
import styled from "styled-components";
import { GameBoard } from "./gameBoard";

export const App = () => (
	<Container>
		<GameBoard />
	</Container>
);

const Container = styled.div`
	align-self: stretch;
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: center;
`;
