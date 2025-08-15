export type BoardDimensionOption = {
	label: string;
	rows: number;
	columns: number;
};

export enum Difficulty {
	Easy = "Novice",
	Medium = "Competitor",
	Hard = "Expert",
	Expert = "Grandmaster",
}
