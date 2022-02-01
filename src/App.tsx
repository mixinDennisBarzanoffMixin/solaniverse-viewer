import Wallet from "./pages/Wallet/Wallet";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Layout from './components/Layout';
import Viewer from './pages/Viewer';
import Market from './pages/Market';
import Inventory from './pages/Inventory';
import NoPage from './pages/NoPage';
import {Provider, KeepAlive} from 'react-keep-alive';

function App() {

    return (
        <>
        <Provider include="viewer">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                    <Route path="viewer" element={<KeepAlive name="viewer"><Viewer /></KeepAlive>} />
                    <Route path="market" element={<Market />} />
                    <Route index element={<Inventory />} />
                    <Route path="inventory" element={<Wallet />} />
                    <Route path="*" element={<NoPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </Provider>
        </>
    );
}

export default App;
