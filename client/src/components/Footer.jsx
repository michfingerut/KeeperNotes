import { FooterStyle, FooterP } from '../styles/styles';

function Footer() {
  const year = new Date().getFullYear();

  return (
    <FooterStyle>
      <FooterP>Copyrights © {year}</FooterP>
    </FooterStyle>
  );
}
export default Footer;
