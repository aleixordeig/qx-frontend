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

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  const handleConnectMetamask = () => {
    // Implement Metamask connection logic here
    console.log("Connecting with Metamask")
    setIsOpen(false)
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
        <div className="flex-1 px-4">
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