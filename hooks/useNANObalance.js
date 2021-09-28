import { useState, useEffect } from "react";
import useNanomachines from "../hooks/useNanomachines";
import useGlobal from "../hooks/useGlobal";
import useMicroMachineManufacturingPlant from "../hooks/useMicroMachineManufacturingPlant";
import { useWallet } from "use-wallet";

const useNANObalance = () => {
    const wallet = useWallet();
    const [counter, setCounter] = useState(0);
    const [state, actions] = useGlobal([]);
    const [nbalance, setNbalance] = useState(0);
    const { warbotmanufacturer, web3, connected } =
        useMicroMachineManufacturingPlant(state.warbotmanufacturer);
    const [nanomachines] = useNanomachines(state.nanomachines);

    useEffect(() => {
        if (connected && nanomachines && state.hasNanomachines) {
            getBalance();
        }
    });
    // , [connected, nanomachines, state.hasNanomachines]

    const getBalance = async () => {
        const nbalance = await nanomachines.balanceOf(wallet.account).call();
        setNbalance(web3.utils.fromWei(nbalance, "nano"));
        setCounter(counter + 1);
    };

    return { nbalance };
};

export default useNANObalance;
