export interface IFigureRowProps {
  figures?: boolean[][];
  onClick?: (figureIndex: number) => void;
  selectable?: boolean;
}
