import Home from "pages/Home";
import RecordSales from "pages/RecordSales";
import Dashboard from "pages/Dashboard";

import { BrowserRouter, Route, Switch } from "react-router-dom";

const Routes = () => {
    return (
        <div>
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact>
                        <Home />
                    </Route>
                    <Route path="/dashboard">
                        <Dashboard />
                    </Route>
                    <Route path="/recordByStore">
                        <RecordSales />
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>
    );

}
export default Routes;