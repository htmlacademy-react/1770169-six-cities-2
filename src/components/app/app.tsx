import HomePage from '../../pages/home-page/home-page';

type AppProps = {
  placeCount: number;
};

const App = ({placeCount}: AppProps): JSX.Element => (
  <HomePage placeCount={placeCount} />
);

export default App;
