export type Color = 'light' | 'medium' | 'dark';
export type Shape = 'circle' | 'square' | 'triangle';

export interface ColorTrait {
  color: Color;
}
export interface ShapeTrait {
  shape: Shape;
}

export type Traits = ColorTrait & ShapeTrait;
export type TraitPredicate = ColorTrait | ShapeTrait;
export type SymbolTraits = Traits | undefined;
export type GridFigureTraits = SymbolTraits[];

export interface GridFigureData {
  type: 'grid';
  traits: GridFigureTraits;
}

export type SvgPathSegment = string;

export interface SvgFigureData {
  type: 'svg';
  path: SvgPathSegment[];
}

export interface TextFigureData {
  type: 'text';
  text: string;
}

export type FigureData = GridFigureData | SvgFigureData | TextFigureData;

export type FigureRowData = {
  key: number;
  passIndex: number;
  figures: FigureData[];
};

export type Rule<T> = (data: T) => boolean;

export type FigureRule = Rule<GridFigureTraits>;

export interface GeneratedData<T> {
  svg: SvgFigureData;
  data: T;
}

export type FigureGenerator<T> = () => GeneratedData<T>;

export interface PuzzleData {
  svg: SvgFigureData;
  pass: boolean;
}

export type PuzzleGenerator = () => PuzzleData;
