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

export type SvgPathSegment =
  | ['M', x: number, y: number]
  | ['l', dx: number, dy: number];

export interface SvgFigureData {
  type: 'svg';
  path: SvgPathSegment[];
}

export type FigureData = GridFigureData | SvgFigureData;

export type FigureRowData = {
  key: number;
  passIndex: number;
  figures: FigureData[];
};

export type FigureRule = (figure: GridFigureTraits) => boolean;
