import { Grid, Tile } from 'components/atoms';
import 'App.css';

function App() {
  return (
    <Grid rows={6} columns={4} style={{ width: '98rem', height: '147rem' }}>
      <Tile>
        <div
          style={{
            gridRowStart: 2,
            gridColumnStart: 3,
            border: '1px solid #eee',
          }}
        ></div>
        <div
          style={{
            gridRowStart: 3,
            gridColumnStart: 3,
            border: '1px solid #eee',
          }}
        ></div>
      </Tile>
      <Tile>
        <div
          style={{
            gridRowStart: 1,
            gridColumnStart: 1,
            border: '1px solid #eee',
          }}
        ></div>
        <div
          style={{
            gridRowStart: 4,
            gridColumnStart: 4,
            border: '1px solid #eee',
          }}
        ></div>
      </Tile>
      <Tile />
      <Tile />
      <Tile />
      <Tile />
      <Tile />
      <Tile />
      <Tile />
      <Tile />
      <Tile />
      <Tile />
      <Tile />
      <Tile />
      <Tile />
      <Tile />
      <Tile />
      <Tile />
    </Grid>
  );
}

export default App;
