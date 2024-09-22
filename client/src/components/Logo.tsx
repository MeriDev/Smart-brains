import { Tilt } from 'react-tilt';
import brain from '../assets/Brain.svg';

const Logo = () => {
  return (
    <div>
      <Tilt options={{ max: 55 }} style={{ height: 150, width: 150 }}>
        <div className="p-3">
          <img src={brain} alt="smart brain logo" />
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;
