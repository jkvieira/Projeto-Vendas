import Routes from "Routes";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
    <Routes />
    <ToastContainer  position={"top-center"} autoClose={8000} closeOnClick={true} />
    </>
  );
}

export default App;
