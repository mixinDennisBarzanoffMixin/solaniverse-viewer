import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import * as anchor from "@project-serum/anchor";

const WALLET_NETWORK = WalletAdapterNetwork.Mainnet;

const candyMachineId = new anchor.web3.PublicKey(
    process.env.REACT_APP_CANDY_MACHINE_ID!
);
  
const network = process.env.REACT_APP_SOLANA_NETWORK as WalletAdapterNetwork;

const rpcHost = process.env.REACT_APP_SOLANA_RPC_HOST!;
const connection = new anchor.web3.Connection(rpcHost);

const txTimeout = 30000; // milliseconds (confirm this works for your project)

export {WALLET_NETWORK, candyMachineId, network, rpcHost, connection, txTimeout}