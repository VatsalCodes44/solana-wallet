"use server"

import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import axios from "axios"
export async function getBalance(chain : "eth" | "sol", pubKey: string) {
    if (chain == "eth") {
        try {
            const res = await axios.post(`https://eth-sepolia.g.alchemy.com/v2/${process.env.alchemyApiKeyEth!}`, 
            {
                "jsonrpc": "2.0",
                "id": 1,
                "method": "eth_getBalance",
                "params": [pubKey, "latest"]  
            })
            return {
                balance: parseInt(res.data.result,16)/ 1e18
            };
        } catch (err) {
            return {
                balance: 0
            };
        }
    }
    else {
        const connection = new Connection(`https://solana-devnet.g.alchemy.com/v2/${process.env.alchemyApiKeySol!}`, "confirmed")
        let balance = await connection.getBalance(new PublicKey(pubKey))
        return {
            balance: balance / LAMPORTS_PER_SOL
        };
    }
}