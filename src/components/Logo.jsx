import logo from '../assets/imgs/logo.png';
import '../styles/Logo.css';

export default function Logo({onClickBack}) {
  return (
    <div className="logo" onClick={onClickBack}>
      <img src={logo} alt="logo image" />
    </div>
  )
}