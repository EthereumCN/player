import React, { useCallback, useMemo, useState } from "react";
import Onboard from "bnc-onboard";
import { Web3Provider } from "@ethersproject/providers";
import { Web3Context } from "./web3";
import Notify from "bnc-notify";

const NetworkId = 1;
const rpcUrl = "https://kovan.infura.io/v3/cea9deb6467748b0b81b920b005c10c1";
const dappId = "40d1d82f-13f7-444a-ba2d-c2e3e44ce423";

const wallets = [
  { walletName: "metamask" },
  {
    walletName: "walletConnect",
    infuraKey: "cea9deb6467748b0b81b920b005c10c1",
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

  const notify = useMemo(
    () =>
      Notify({
        dappId: "",
        networkId: NetworkId,
        desktopPosition: "topRight",
      }),
    []
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
        notify,
        activate,
        deactivate,
        pending,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
}
