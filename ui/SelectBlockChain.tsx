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

export function SelectBlockChain({setChain}: {setChain:  React.Dispatch<React.SetStateAction<"sol" | "eth">>}) {
  return (
    <Select defaultValue="sol" onValueChange={(v) => {
      setChain(p => {
        return v == "sol" || v == "eth" ? v : p
      })
    }}>
      <SelectTrigger className="w-xl">
        <SelectValue placeholder="Solana" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="eth" >Ethereum</SelectItem>
          <SelectItem value="sol">Solana</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
