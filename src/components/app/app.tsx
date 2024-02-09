import HomePage from '../../pages/home-page/home-page';
import Header from '../header/header';

type AppProps = {
  placeCount: number;
  blockName: string;
};

const App = ({placeCount, blockName}: AppProps): JSX.Element => (
  <div className="page page--gray page--main">
    <Header />
    <main className="page__main page__main--index">
      <HomePage placeCount={placeCount} blockName={blockName} />
    </main>
  </div>
);

export default App;
