import classes from './ButtonGrid.module.css';
import { IButtonGridProps } from './types';
import { createStyle } from 'utils';
import { Button } from 'components/atoms/Button';

const ButtonGrid = ({ buttons, onClick, s }: IButtonGridProps) => {
  return (
    <div {...createStyle(classes.grid, s)}>
      {buttons.map(({ text }, ibutton) => (
        <Button
          key={ibutton}
          s={{ classNames: classes.button }}
          onClick={() => {
            onClick?.(ibutton);
          }}
        >
          {text}
        </Button>
      ))}
    </div>
  );
};

export { ButtonGrid };
