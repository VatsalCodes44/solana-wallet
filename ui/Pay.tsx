"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Keypair, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js"
import { useState } from "react"
import bs58 from "bs58"
import { getRecentBlockHash, transaction } from "@/serverActions/transaction"

type walletType = {
  pubKey: string,
  pvtKey: string
}


export function Pay({chain, senderWallet}: {chain: "sol" | "eth", senderWallet: walletType | undefined}) {
    
  const [recieverAddress, setRecieverAddress] = useState<string>("")
  const [amount, setAmount] = useState<number>(0)
  
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button className="w-xl">Send {chain == "sol" ? "SOL" : "ETH"}</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Send {chain == "sol" ? "SOL" : "ETH"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="Address">Address</Label>
              <Input onChange={(e) => {
                setRecieverAddress(e.target.value)
              }} id="Address" name="Address" type="text" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="Amount">Amount</Label>
              <Input onChange={(e) => {
                  const value = parseFloat(e.target.value)
                  console.log(isNaN(value) ? 0 : value)
                setAmount(isNaN(value) ? 0 : value)
              }} id="Amount" name="Amount" type="text" />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={async () => {
               if (amount != 0 && recieverAddress != "") {
                if (chain == "eth"){

                }
                else {
                    const tx = new Transaction()
                    const fromPubkey= new PublicKey(senderWallet!.pubKey)
                    const toPubkey= new PublicKey(recieverAddress)
                    const sendSolInstruction = SystemProgram.transfer({
                     fromPubkey,
                     toPubkey,
                     lamports: amount * LAMPORTS_PER_SOL
                    })
                    tx.add(sendSolInstruction)
                    tx.feePayer = fromPubkey;
                    const keyPair = Keypair.fromSecretKey(bs58.decode(senderWallet!.pvtKey))
                    tx.recentBlockhash = (await getRecentBlockHash()).recentBlockHash.blockhash
                    tx.sign(keyPair)
                    const serializeTx = tx.serialize()
                    const txArray = Array.from(serializeTx);
                    transaction(chain,txArray)
                }
               }
            }} type="submit">Send</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
