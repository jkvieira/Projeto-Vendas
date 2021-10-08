import Footer from "components/Footer";
import NavBar from "components/NavBar";
import ImgEfect from "assets/img/main.svg";

const Home = () => {
    return (
        <>
            <NavBar />
            <div className="main-container">
                <div className="container">
                    <h1>Spring & React</h1>
                    <h2>Protótipo Controle de Vendas </h2>
                    <img src={ImgEfect} alt="Vendas" height="250" />
                    <br />
                </div>
            </div>
            <Footer />
        </>
    );

}
export default Home;