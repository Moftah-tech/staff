import DashboardLayoutBasic from "./components/sidemenu";
import {Provider} from "react-redux";
import Store from "./components/state/store.ts";

function App() {

    return (
        <Provider store={Store}>
            <DashboardLayoutBasic/>
        </Provider>
    )
}

export default App
