import BarChart from "components/BarChart";
import DataTable from "components/DataTable";
import DonutChart from "components/DonutChart";
import Footer from "components/Footer";
import NavBar from "components/NavBar";



const Dashboard = () => {
  return (
    <>
      <NavBar />
      <div className="main-container">
        <div className="container">
          <h1>Dashboard de Vendas</h1>
          <br />
          <BarChart />
          <br />
          <DonutChart />
          <br />
          <DataTable />
          <h2>Tabela customizada organizada por ordem de data</h2>
          <br />
        </div>
        <br />
      </div>
      <Footer />
    </>
  );
}

export default Dashboard;
