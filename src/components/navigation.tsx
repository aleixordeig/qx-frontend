"use client"

import { useState } from 'react'
import Link from 'next/link'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, User, Wallet } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import detectEthereumProvider from '@metamask/detect-provider';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  const handleConnectMetamask = async () => {
    const provider = await detectEthereumProvider();

    if (provider) {
      const isFlask = (await provider.request({ method: 'web3_clientVersion' }))?.includes('flask');

      if (isFlask) {
        try {
          await provider.request({
            method: 'wallet_requestSnaps',
            params: {
              'npm:qubic-mm-snap': {},
            },
          });
          console.log('Qubic MetaMask Snap installed successfully!');
        } catch (error) {
          console.error('Failed to install Qubic MetaMask Snap:', error);
        }
      } else {
        console.error('Please install MetaMask Flask!');
      }
    } else {
      console.error('MetaMask provider not found!');
    }

    setIsOpen(false);
  }

  const handleConnectWalletConnect = () => {
    // Implement WalletConnect connection logic here
    console.log("Connecting with WalletConnect")
    setIsOpen(false)
  }

  return (
    <nav className="bg-gray-900 text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Left side */}
        <div className="flex items-center space-x-6">
          <span className="text-2xl font-bold">
            QX
          </span>
          <div className="hidden md:flex space-x-4">
          <Link href="/" className="hover:text-gray-300 transition-colors">
              Assets
            </Link>
            <Link href="/tokens" className="hover:text-gray-300 transition-colors">
              Tokens
            </Link>
          </div>
        </div>
        
        {/* Middle - Search box */}
        <div className="hidden">
          <div className="relative">
            <Input
              type="search"
              placeholder="Search assets"
              className="w-full bg-gray-800 text-white border-gray-700 focus:border-gray-600"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="hidden md:inline-flex bg-blue-500 text-white">
                Connect Wallet
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Connect Wallet</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <Button onClick={handleConnectMetamask} className="flex items-center justify-center gap-2">
                  Connect with Metamask
                </Button>
                <Button onClick={handleConnectWalletConnect} className="flex items-center justify-center gap-2">
                  <Wallet className="w-6 h-6" />
                  Connect with WalletConnect
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </nav>
  )
}