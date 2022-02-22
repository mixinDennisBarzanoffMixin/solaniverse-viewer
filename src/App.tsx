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
import { createTheme, ThemeProvider } from "@material-ui/core";
import { WalletDialogProvider } from "@solana/wallet-adapter-material-ui";

const theme = createTheme({
    palette: {
        type: 'dark',
    },
    overrides: {
        MuiButtonBase: {
            root: {
                justifyContent: 'flex-start',
            },
        },
        MuiButton: {
            root: {
                textTransform: undefined,
                padding: '12px 16px',
            },
            startIcon: {
                marginRight: 8,
            },
            endIcon: {
                marginLeft: 8,
            },
        },
    },
});

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
            <ThemeProvider theme={theme}>
                <WalletProvider wallets={wallets}>
                    <WalletDialogProvider>
                        <PlanetConfigProvider>
                            <ConnectionProvider endpoint={endpoint}>
                                <WalletModalProvider>
                                    <BrowserRouter>
                                        <Layout />
                                    </BrowserRouter>
                                </WalletModalProvider>
                            </ConnectionProvider>
                        </PlanetConfigProvider>
                    </WalletDialogProvider>
                </WalletProvider>
            </ThemeProvider>
        </>
    );
}

export default App;
