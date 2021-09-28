import { useState, useEffect } from "react";
import useMicroMachines from "../hooks/useMicroMachines";
import useGlobal from "../hooks/useGlobal";
import useMicroMachineManufacturingPlant from "../hooks/useMicroMachineManufacturingPlant";
import { useWallet } from "use-wallet";

const useMMACbalance = () => {
    const wallet = useWallet();
    const [counter, setCounter] = useState(0);
    const [state, actions] = useGlobal([]);
    const [balance, setBalance] = useState(0);
    const { warbotmanufacturer, web3, connected } =
        useMicroMachineManufacturingPlant(state.warbotmanufacturer);
    const [micromachines] = useMicroMachines(state.micromachines);

    useEffect(() => {
        if (connected && micromachines && state.hasMicromachines) {
            getBalance();
        }
    });
    // , [connected, micromachines, state.hasMicromachines]

    const getBalance = async () => {
        const balance = await micromachines.balanceOf(wallet.account).call();
        setBalance(web3.utils.fromWei(balance, "nano"));
        setCounter(counter + 1);
    };

    return { balance };
};

export default useMMACbalance;
