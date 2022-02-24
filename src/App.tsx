import {BrowserRouter} from 'react-router-dom';
import Layout from './components/Layout';
import { useMemo } from "react";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import {
    getLedgerWallet,
    getPhantomWallet,
    getSlopeWallet,
    getSolletExtensionWallet,
    getSolletWallet,
    getSolflareWallet,
} from '@solana/wallet-adapter-wallets';
import {rpcHost, WALLET_NETWORK} from "./config";
import { PlanetConfigProvider } from "./providers/planet_config_provider";

function App() {
    const network = WALLET_NETWORK;
    const endpoint = rpcHost;

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
                <WalletProvider wallets={wallets}>
                        <PlanetConfigProvider>
                            <ConnectionProvider endpoint={endpoint}>
                                <WalletModalProvider>
                                    <BrowserRouter>
                                        <Layout />
                                    </BrowserRouter>
                                </WalletModalProvider>
                            </ConnectionProvider>
                        </PlanetConfigProvider>
                </WalletProvider>
        </>
    );
}

export default App;
