"use server"

import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import axios from "axios"
export async function getBalance(chain : "eth" | "sol", pubKey: string) {
    if (chain == "eth") {
        const res = await axios.post(`https://eth-mainnet.g.alchemy.com/v2/${process.env.alchemyApiKey!}`, {
          "jsonrpc": "2.0",
            "id": 1,
            "method": "getBalance",
            "params": [pubKey, "latest"]  
        })
        return {
            balance: parseInt(res.data.result,16)/ 1e18
        };
    }
    else {
        const connection = new Connection(`https://solana-devnet.g.alchemy.com/v2/${process.env.alchemyApiKey!}`, "confirmed")
        let balance = await connection.getBalance(new PublicKey(pubKey))
        return {
            balance: balance / LAMPORTS_PER_SOL
        };
    }
}