import { useCallback, useEffect, useRef, useState } from "react"
import NetInfo from "@react-native-community/netinfo";
import Ping from "react-native-ping";


export const useNetwork = (): [
    isConnected: boolean, isConnectionSlow: boolean, connectionType: string
] => {
    const [isConnected, setIsConnected] = useState(true)
    const [isConnectionSlow, setIsConnectionSlow] = useState(false)
    const intervalPing = useRef(null)
    const [connectionType, setConnectionType] = useState('')

    const handleIntervalPing = () => {
        intervalPing.current = setInterval(() => {
            handlePing()
        }, 10 * 1000);
    }

    const handlePing = async () => {
        try {
            const ms = await Ping.start("8.8.8.8", { timeout: 1000 });
            setIsConnectionSlow(ms > 200)
        } catch {
            setIsConnectionSlow(true)
        }

    }

    useEffect(() => {
        handlePing()
        handleIntervalPing()
        const unsubscribe = NetInfo.addEventListener((state) => {
            setIsConnected(state.isInternetReachable)
            setConnectionType(state.type)
        });
        return () => {
            console.log('useNetwork unsubscribe');
            clearInterval(intervalPing.current)
            unsubscribe()
        }
    }, [])

    return [isConnected, isConnectionSlow, connectionType]

}