"use client"

import Navigation from "@/components/navigation"
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowDownUp, Settings } from 'lucide-react'

const tokens = [
  { symbol: 'QUBIC', name: 'QUBIC', balance: '1000' },
  { symbol: 'USDC', name: 'USD Coin', balance: '1000' },
  { symbol: 'DAI', name: 'Dai', balance: '1000' },
  { symbol: 'CBF', name: 'Dai', balance: '1000' },
]

export default function TokenSwap() {
  const [inputToken, setInputToken] = useState(tokens[0])
  const [outputToken, setOutputToken] = useState(tokens[1])
  const [inputAmount, setInputAmount] = useState('')
  const [outputAmount, setOutputAmount] = useState('')

  const handleSwap = () => {
    // Implement swap logic here
    console.log('Swap initiated')
  }

  const handleInputChange = (value: string) => {
    setInputAmount(value)
    // In a real application, you would calculate the output amount based on the exchange rate
    setOutputAmount((parseFloat(value) * 1.5).toFixed(6))
  }

  return (
    <>
      <Navigation />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Swap</h2>
            <Button variant="ghost" size="icon">
              <Settings className="h-6 w-6" />
            </Button>
          </div>
          
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-xl">
              <div className="flex justify-between mb-2">
                <label htmlFor="input-amount" className="text-sm font-medium text-gray-500">From</label>
                <span className="text-sm text-gray-500">Balance: {inputToken.balance}</span>
              </div>
              <div className="flex space-x-2">
                <Input
                  id="input-amount"
                  type="number"
                  placeholder="0.0"
                  value={inputAmount}
                  onChange={(e) => handleInputChange(e.target.value)}
                  className="text-2xl font-semibold"
                />
                <Select onValueChange={(value) => setInputToken(tokens.find(t => t.symbol === value) || tokens[0])}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder={inputToken.symbol} />
                  </SelectTrigger>
                  <SelectContent>
                    {tokens.map((token) => (
                      <SelectItem key={token.symbol} value={token.symbol}>
                        {token.symbol}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-center">
              <Button variant="ghost" size="icon" onClick={() => {
                const temp = inputToken;
                setInputToken(outputToken);
                setOutputToken(temp);
              }}>
                <ArrowDownUp className="h-6 w-6" />
              </Button>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl">
              <div className="flex justify-between mb-2">
                <label htmlFor="output-amount" className="text-sm font-medium text-gray-500">To</label>
                <span className="text-sm text-gray-500">Balance: {outputToken.balance}</span>
              </div>
              <div className="flex space-x-2">
                <Input
                  id="output-amount"
                  type="number"
                  placeholder="0.0"
                  value={outputAmount}
                  readOnly
                  className="text-2xl font-semibold"
                />
                <Select onValueChange={(value) => setOutputToken(tokens.find(t => t.symbol === value) || tokens[1])}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder={outputToken.symbol} />
                  </SelectTrigger>
                  <SelectContent>
                    {tokens.map((token) => (
                      <SelectItem key={token.symbol} value={token.symbol}>
                        {token.symbol}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="text-sm text-gray-500 space-y-1">
              <div className="flex justify-between">
                <span>Exchange rate</span>
                <span>1 {inputToken.symbol} = 1.5 {outputToken.symbol}</span>
              </div>
              <div className="flex justify-between">
                <span>Price impact</span>
                <span>0.05%</span>
              </div>
            </div>

            <Button className="w-full" size="lg" onClick={handleSwap}>
              Swap
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}