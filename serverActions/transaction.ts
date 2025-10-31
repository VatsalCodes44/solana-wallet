"use server"

import { Connection, LAMPORTS_PER_SOL, Transaction, VersionedTransaction } from "@solana/web3.js";

export async function getRecentBlockHash(){
    const connection = new Connection(`https://solana-devnet.g.alchemy.com/v2/${process.env.alchemyApiKey!}`, "confirmed")
    const recentBlockHash = await connection.getLatestBlockhash()
    return {recentBlockHash}
}

export async function transaction(chain : "eth" | "sol", serializeTx: number[]) {
    if (chain == "eth") {
        // similarly for ethereum  
    }
    else {
        const connection = new Connection(`https://solana-devnet.g.alchemy.com/v2/${process.env.alchemyApiKey!}`, "confirmed")
        const txBuffer = Uint8Array.from(serializeTx);
        const tx = Transaction.from(txBuffer);
        const txid = await connection.sendRawTransaction(tx.serialize())
        return {
            txid
        };
    }
}