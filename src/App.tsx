import Wallet from "./pages/Wallet/Wallet";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Layout from './components/Layout';
import Viewer from './pages/Viewer';
import Market from './pages/Market';
import Inventory from './pages/Inventory';
import NoPage from './pages/NoPage';
import {Provider, KeepAlive} from 'react-keep-alive';
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { useMemo } from "react";
import { clusterApiUrl } from "@solana/web3.js";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import {
    getLedgerWallet,
    getPhantomWallet,
    getSlopeWallet,
    getSolletExtensionWallet,
    getSolletWallet,
    getTorusWallet,
    getSolflareWallet,
} from '@solana/wallet-adapter-wallets';
import { WALLET_NETWORK } from "./config";
import { PlanetConfigProvider } from "./providers/planet_config_provider";

function App() {
    const network = WALLET_NETWORK;

    // You can also provide a custom RPC endpoint.
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);

    // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking and lazy loading --
    // Only the wallets you configure here will be compiled into your application, and only the dependencies
    // of wallets that your users connect to will be loaded.
    const wallets = useMemo(
        () => [
            getLedgerWallet(),
            getPhantomWallet(),
            getSlopeWallet(),
            getSolletExtensionWallet(),
            getSolletWallet(),
            // getTorusWallet({options: {clientId: ''}}),
            getSolflareWallet(),
        ],
        [network]
    );



    return (
        <>
            <PlanetConfigProvider>
                <ConnectionProvider endpoint={endpoint}>
                    <WalletProvider wallets={wallets} autoConnect>
                        <WalletModalProvider>
                            <Provider include="viewer">
                                <BrowserRouter>
                                    <Routes>
                                        <Route path="/" element={<Layout />}>
                                            <Route path="viewer" element={<Viewer />} />
                                            <Route path="market" element={<Market />} />
                                            <Route index element={<Inventory />} />
                                            <Route path="inventory" element={<Wallet />} />
                                            <Route path="*" element={<NoPage />} />
                                        </Route>
                                    </Routes>
                                </BrowserRouter>
                            </Provider>
                        </WalletModalProvider>
                    </WalletProvider>
                </ConnectionProvider>
            </PlanetConfigProvider>
        </>
    );
}

export default App;
