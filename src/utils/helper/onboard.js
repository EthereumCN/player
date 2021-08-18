import React, { useCallback, useMemo, useState } from "react";
import Onboard from "bnc-onboard";
import { Web3Provider } from "@ethersproject/providers";
import { Web3Context } from "./web3";

const NetworkId = 1;
const rpcUrl = "https://mainnet.infura.io/v3/0d5c59884b174b8e878c0789b6daf2d1";
const dappId = "adc2d87f-63d6-4219-8649-f709eb1603d0";

const wallets = [
  { walletName: "metamask" },
  {
    walletName: "walletConnect",
    infuraKey: "0d5c59884b174b8e878c0789b6daf2d1",
  },
  // {
  //   walletName: "ledger",
  //   rpcUrl,
  // },
  // { walletName: "coinbase" },
  // { walletName: "status" },
  // {
  //   walletName: "lattice",
  //   appName: "Yearn Finance",
  //   rpcUrl,
  // },
  // { walletName: "walletLink", rpcUrl },
  // { walletName: "torus" },
  // { walletName: "authereum", disableNotifications: true },
  // { walletName: "trust", rpcUrl },
  // { walletName: "opera" },
  // { walletName: "operaTouch" },
  // { walletName: "imToken", rpcUrl },
  // { walletName: "meetone" },
];

export default function Web3ContextProvider({ children }) {
  const [active, setActive] = useState(false);
  const [library, setLibrary] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [provider, setProvider] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const [network, setNetwork] = useState(false);
  const [pending, setPending] = useState(false);

  const onboard = useMemo(
    () =>
      Onboard({
        dappId: dappId,
        networkId: NetworkId,
        walletSelect: {
          wallets,
        },
        subscriptions: {
          wallet: (wallet) => {
            if (wallet.provider) {
              setActive(true);
              setProvider(wallet.provider);
              setLibrary(new Web3Provider(wallet.provider));
              window.localStorage.setItem("selectedWallet", wallet.name);
            } else {
              setActive(false);
              setProvider(undefined);
              setLibrary(undefined);
            }
          },
          address: (address) => {
            setAccount(address);
          },
          balance: (balance) => {
            setBalance(balance);
          },
          network: (network) => {
            setNetwork(network);
          },
        },
      }),
    [setActive, setProvider, setLibrary, setAccount, setBalance, setNetwork]
  );



  const activate = useCallback(() => {
    setPending(true);
    onboard
      .walletSelect()
      .catch(console.error)
      .then((res) => res && onboard.walletCheck)
      .then(setActive)
      .then(() => setPending(false));
  }, [onboard, setActive]);

  const deactivate = useCallback(() => {
    setPending(true);
    onboard.walletReset();
    window.localStorage.removeItem("selectedWallet");
    setPending(false);
  }, [onboard, setActive]);

  return (
    <Web3Context.Provider
      value={{
        active,
        library,
        account,
        provider,
        balance,
        onboard,
        network,
        activate,
        deactivate,
        pending,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
}
