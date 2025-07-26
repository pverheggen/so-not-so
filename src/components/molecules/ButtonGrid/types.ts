import { IStyleProps } from 'utils';

export interface IButtonGridProps {
  buttons: {
    text: string;
  }[];
  onClick?: (buttonIndex: number) => void;
  s?: IStyleProps;
}
