import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type walletType = {
  pubKey: string,
  pvtKey: string
}
export function SelectWallet({wallets, setWallets, walletCount, setWalletCount, generateWallet, mnemonic, setSelectedWallet}: {wallets: walletType[], setWallets:React.Dispatch<React.SetStateAction<walletType[]>>, walletCount: number, setWalletCount: React.Dispatch<React.SetStateAction<number>>,  mnemonic: string, setSelectedWallet:  React.Dispatch<React.SetStateAction<walletType | undefined>>, generateWallet: (mnemonic: string, i: number) => walletType }) {
  return (
    <Select defaultValue="0" onValueChange={(v) => {
        setSelectedWallet(wallets[parseInt(v)])
    }}>
      <SelectTrigger className="w-xl">
        <SelectValue placeholder={wallets.length > 0 ? wallets[0].pubKey : ""} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
            {wallets.map((wallet,i) => {
                return (
                    <SelectItem key={i} value={i.toString()}>{wallet.pubKey}</SelectItem>
                )
            })}
            <div onClick={() => {
                const newWallet = generateWallet(mnemonic, walletCount+1)
                setWalletCount(p=>p+1)
                setWallets(p => [...p, newWallet])
            }} className="text-center hover:cursor-pointer hover:underline hover:underline-offset-2">
                + Add new wallet
            </div>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
