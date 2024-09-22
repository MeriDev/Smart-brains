import Provider from './context/context';

import Navigation from './components/Navigation';
import Logo from './components/Logo';
import FaceRegonition from './components/FaceRegonition';
import ImageLinkForm from './components/ImageLinkForm';
import Rank from './components/Rank';
import ParticlesEffect from './components/ParticlesEffect';

function App() {
  return (
    <Provider>
      <>
        <main className=" main">
          {/* particles effect */}
          <ParticlesEffect />

          <div className="flex justify-between ">
            <Logo />
            <Navigation />
          </div>
          <Rank />
          <ImageLinkForm />
          <FaceRegonition />
        </main>
      </>
    </Provider>
  );
}

export default App;
