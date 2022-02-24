import {createTheme, ThemeProvider} from '@material-ui/core';
import { WalletDialogProvider } from '@solana/wallet-adapter-material-ui';
import { FC } from 'react';

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

const MaterialThemeProvider: FC = (props) => {
    return <ThemeProvider theme={theme} >
        <WalletDialogProvider>
            {props.children}
        </WalletDialogProvider>
    </ThemeProvider>
}

export default MaterialThemeProvider;