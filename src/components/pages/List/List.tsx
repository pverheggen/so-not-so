import { FigureRow } from 'components';
import { useRouter } from 'contexts';
import { TextFigureData } from 'types';
import classes from './List.module.css';
import { reseed } from 'utils';

const List = () => {
  const { push } = useRouter();
  const figures: TextFigureData[] = new Array(40)
    .fill(undefined)
    .map((_, i) => ({
      type: 'text',
      text: `${i + 1}`,
    }));

  return (
    <div>
      <FigureRow
        selectable
        figures={figures}
        onClick={(figureIndex) => {
          reseed(figureIndex);
          push('play');
        }}
        s={{
          classNames: classes.row,
        }}
      />
    </div>
  );
};

export { List };
