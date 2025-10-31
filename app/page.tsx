"use client"
import { SelectBlockChain } from "@/ui/SelectBlockChain";
import { SelectWallet } from "@/ui/SelectWallet";
import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { useEffect, useState } from "react";
import nacl from "tweetnacl";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import bs58 from "bs58"
import {ethers} from "ethers"
import axios from "axios";
import { getBalance } from "@/serverActions/getBalance";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pay } from "@/ui/Pay";

const createEthereumWallet = (mnemonic: string, i: number) => {
  const seed = mnemonicToSeedSync(mnemonic);
  const hdNode = ethers.HDNodeWallet.fromSeed(seed);

  const derivationPath = `m/44'/501'/${i}'/0'/0/0`
  const child = hdNode.derivePath(derivationPath);  
  console.log("eth")
  return {
    pubKey: child.publicKey,
    pvtKey: child.address
  }
}

const createSolanaWallet = (mnemonic: string, i: number) => {
  const seed = mnemonicToSeedSync(mnemonic);
  const path = `m/44'/501'/${i}'/0'`;
  const privateKeyderivedSeed = derivePath(path, seed.toString("hex")).key;
  const secret = nacl.sign.keyPair.fromSeed(privateKeyderivedSeed).secretKey;
  console.log("sol")
  return {
    pubKey: Keypair.fromSecretKey(secret).publicKey.toBase58(),
    pvtKey: bs58.encode(secret)
  }
}

type walletType = {
  pubKey: string,
  pvtKey: string
}
export default function Home() {
  const [mnemonic, setMnemonic] = useState<string>("")
  const [solanaWallets, setSolanaWallets] = useState<walletType[]>([])
  const [solWalletCount, setSolWalletCount] = useState(1)
  const [ethWallets, setEthWallets] = useState<walletType[]>([])
  const [ethWalletCount, setEthWalletCount] = useState(1)
  const [chain, setChain] = useState<"eth" | "sol">("sol")
  const [selectedWallet, setSelectedWallet] = useState<walletType>()
  const [balance, setbalance] = useState<number>(0)
  useEffect(() => {
    if (selectedWallet){ 
      getBalance(chain,selectedWallet.pubKey).then((res) => {
        setbalance(res.balance)
      })
    }
  }, [selectedWallet, setSelectedWallet])
  return (
    <div className="h-screen">
      <div className={`${mnemonic=="" ? "" : "hidden"} h-full flex justify-center items-center`}>
        <button className={` hover:cursor-pointer border-input data-placeholder:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4`}
        onClick={() => {
          const phrase = generateMnemonic(128);
          setMnemonic(phrase);
          const solWallet = createSolanaWallet(phrase,solWalletCount)
          setSolanaWallets(p => [...p, solWallet]);
          setEthWallets(p => [...p, createEthereumWallet(phrase, ethWalletCount)])
          setSelectedWallet(solWallet)

        }}>Generate Seed Phrase</button>
      </div>
      <div className={`${mnemonic=="" ? "hidden" : ""} h-full w-full py-5 flex flex-col justify-center`}>
        <div>
          <div onClick={async () => {
            await navigator.clipboard.writeText(mnemonic)
          }}
          className={`${mnemonic=="" ? "hidden" : ""} mb-5 hover:cursor-pointer mx-auto border-input data-placeholder:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 w-xl items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4`}>
            <div className="grid grid-cols-4">
              {mnemonic.split(" ").map((word) => {
                return (
                  <div key={word} className="col-span-1 w-24 bg-stone-700 px-2 py-1 m-2 text-center rounded-xl">
                    {word}
                  </div>
                )
              })}
            </div>
            <div className="px-2">
              click anywhere to copy
            </div>
          </div>
        </div>

        <div className="flex justify-center pb-5">
          <SelectBlockChain setChain= {setChain}/>
        </div>
        <div className="flex justify-center pb-5">
          <SelectWallet wallets={chain == "sol" ? solanaWallets : ethWallets} setWallets={chain == "sol" ? setSolanaWallets : setEthWallets} walletCount={chain == "sol" ? solWalletCount : ethWalletCount} setWalletCount={chain == "sol" ? setSolWalletCount : setEthWalletCount} generateWallet={chain == "sol" ? createSolanaWallet : createEthereumWallet} mnemonic= {mnemonic} setSelectedWallet={setSelectedWallet} />
        </div>
        <div className="flex justify-center pb-5">
          <div className="flex justify-center items-center text-4xl">
            {balance} {chain == "sol" ? "SOL" : "ETH"} 
          </div>
        </div>
        <div className="flex justify-center pb-5">
          <div className="w-xl flex justify-center gap-2">
            <Pay chain={chain} senderWallet={selectedWallet}/>
          </div>
        </div>
      </div>
    </div>
  );
}
