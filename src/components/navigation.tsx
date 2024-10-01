"use client"

import { useState, useEffect } from 'react'
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
import { generateKeyPair } from '@/utils/privateKey';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(false); // Add state for connection status

  useEffect(() => {
    checkConnectionStatus();
  }, []);

  const checkConnectionStatus = async () => {
    const provider = await detectEthereumProvider();
    if (provider) {
      const accounts = await provider.request({ method: 'eth_accounts' });
      if (accounts.length > 0) {
        console.log('Wallet is already connected:', accounts);
        setIsConnected(true);
      } else {
        console.log('Wallet is not connected');
      }
    } else {
      console.error('MetaMask provider not found!');
    }
  };

  const handleConnectMetamask = async () => {
    const provider = await detectEthereumProvider();

    if (provider) {
      const isFlask = (await provider.request({ method: 'web3_clientVersion' }))?.includes('flask');

      if (isFlask) {
        try {
          await provider.request({
            method: 'wallet_requestSnaps',
            params: {
              'npm:@qubic-lib/qubic-mm-snap': {},
            },
          });
          console.log('Qubic MetaMask Snap installed successfully!');

          // Generate key pair
          const keyPair = await generateKeyPair(0);
          console.log('Generated Key Pair:', keyPair);

          // Set connection status to true
          setIsConnected(true);
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
  };

  const getPublicId = async () => {
    const provider = await detectEthereumProvider();

    if (provider) {
      try {
        const publicId = await provider.request({
          method: 'wallet_invokeSnap',
          params: {
            snapId: 'npm:@qubic-lib/qubic-mm-snap',
            request: {
              method: 'getPublicId',
              params: {
                accountIdx: 0,
                confirm: true,
              },
            },
          },
        });
        console.log('Public ID:', publicId);
      } catch (error) {
        console.error('Failed to get public ID:', error);
      }
    } else {
      console.error('MetaMask provider not found!');
    }
  };

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
          {isConnected ? (
            <>
              <span className="text-green-500">Wallet Connected</span>
              <button
                onClick={getPublicId}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                Get Public ID
              </button>
            </>
          ) : (
            <button
              onClick={handleConnectMetamask}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Connect Wallet
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}