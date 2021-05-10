import { Parallax, Background } from 'react-parallax';
import background from './../../assets/images/background-1.png';

const Aliens = () => {
  return (
    <Parallax strength={200}>  
        <Background className="custom-bg">
            <img src={background} alt="fill murray" />
        </Background>
    </Parallax>
  )
};

export default Aliens;