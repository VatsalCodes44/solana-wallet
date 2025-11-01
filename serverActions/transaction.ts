"use server"

import { Connection, LAMPORTS_PER_SOL, Transaction, VersionedTransaction } from "@solana/web3.js";
import { ethers } from "ethers";

export async function getRecentBlockHash(){
    const connection = new Connection(`https://solana-devnet.g.alchemy.com/v2/${process.env.alchemyApiKeySol!}`, "confirmed")
    const recentBlockHash = await connection.getLatestBlockhash()
    return {recentBlockHash}
}

export async function transaction(serializeTx : {sol: number[]} | {eth: string}) {
    if ("eth" in serializeTx) {
        try {
            const provider = new ethers.JsonRpcProvider(`https://eth-sepolia.g.alchemy.com/v2/${process.env.alchemyApiKeyEth!}`)
            const txHash = await provider.send("eth_sendRawTransaction", [serializeTx.eth]);
            return {txHash};
        } 
        catch {
            return {
                error: "some error occured"
            }
        }
    }
    else if ("sol" in serializeTx) {
        try {
            const connection = new Connection(`https://solana-devnet.g.alchemy.com/v2/${process.env.alchemyApiKeySol!}`, "confirmed")
            const txBuffer = Uint8Array.from(serializeTx.sol);
            const tx = Transaction.from(txBuffer);
            const txid = await connection.sendRawTransaction(tx.serialize())
            return {
                txid
            };            
        }
        catch {
            return {
                error: "some error occured"
            }
        }
    }
    return {
        error: "some error occured"
    }
}