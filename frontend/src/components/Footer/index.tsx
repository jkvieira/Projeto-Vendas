import './styles.css';
import {ReactComponent as YouTubeIcom} from "assets/img/youtube.svg";
import {ReactComponent as LinkedinIcom} from "assets/img//linkedin.svg";

function Footer(){
    return(
       <footer className="main-footer">
           App desenvolvido por Júlia Krüger a partir de exemplos e eventos realizados pela DevSuperior
           <hr/>
          <div>
              <a href="https://www.youtube.com/c/DevSuperior" target="_new">
                  <YouTubeIcom />
                  </a>         
                  <a href="https://www.linkedin.com/in/julia-kruger-202b287a/" target="_new">
                      <LinkedinIcom />
                  </a>     
              </div>
       </footer>
    )
}

export default Footer;