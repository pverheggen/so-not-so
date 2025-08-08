import { useRouter } from 'contexts';
import { reseed } from 'utils';
import { ButtonGrid, SvgFigure } from 'components';
import classes from './List.module.css';
import { bob } from 'utils/puzzle/allSymbols';

const List = () => {
  const { push } = useRouter();
  const buttons = new Array(40).fill(undefined).map((_, i) => ({
    text: `${i + 1}`,
  }));

  return (
    <div className={classes.list}>
      <div className={classes.bob}>
        <SvgFigure figure={{ type: 'svg', path: [bob] }} />
      </div>
      <ButtonGrid
        buttons={buttons}
        onClick={(figureIndex) => {
          reseed(figureIndex * 100003);
          push('play');
        }}
      />
    </div>
  );
};

export { List };
