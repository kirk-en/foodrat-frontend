import foodRatLogo from '../../assets/concept-art/foodrat-mascot.jpg'
import './Footer.scss'

const Footer = () => {
return (
  <footer className='footer'>
    <img className='footer__logo' src={foodRatLogo} alt="a cute rat chewing on a letter C grade restaurant sign" />
  </footer>
)
}

export default Footer;