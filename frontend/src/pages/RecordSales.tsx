import Footer from "components/Footer";
import Form from "components/Form";
import NavBar from "components/NavBar";

const RecordSales = () => {
    return (
        <>
            <NavBar />
            <div className="main-container">
                <div className="container" >
                    <h1>Cadastro de Vendas</h1>
                    <br />
                    <Form />
                    <h2>Os dados serão enviados ao clicar no botão</h2>
                    <br />
                </div>
            </div>
            <Footer />
        </>
    );

}
export default RecordSales;