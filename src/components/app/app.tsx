import HomePage from '../../pages/home-page/home-page';

type AppProps = {
  placeCount: number;
  blockName: string;
};

const App = ({placeCount, blockName}: AppProps): JSX.Element => (
  <HomePage placeCount={placeCount} blockName={blockName} />
);

export default App;
