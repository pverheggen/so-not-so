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

export interface FigureRowData {
  key: number;
  figures: GridFigureTraits[];
}
