'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Eye, TrendingUp, DollarSign } from 'lucide-react'
import Navigation from "@/components/navigation"

export default function AssetPage({ params }: { params: { id: string } }) {
  const [price, setPrice] = useState('')
  const [offerPrice, setOfferPrice] = useState('')

  const handleList = () => {
    console.log(`Listing asset for ${price}`)
    // Implement listing logic here
  }

  const handleBuy = () => {
    console.log('Buying asset')
    // Implement buy logic here
  }

  const handleMakeOffer = () => {
    console.log(`Making offer for ${offerPrice}`)
    // Implement offer logic here
  }

  return (
    <>
      <Navigation />
      <div className="container mx-auto p-4">
        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
          <h1 className="text-3xl font-bold mb-2">Asset {params.id}</h1>
          <div className="flex items-center text-gray-600 mb-4">
            <Eye className="w-5 h-5 mr-2" />
            <span>1,234 views</span>
          </div>
          <div className="mb-4">
            <Label htmlFor="list-price">List for sale (if you own the asset)</Label>
            <div className="flex mt-1">
              <Input
                id="list-price"
                type="number"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="mr-2"
              />
              <Button onClick={handleList}>List</Button>
            </div>
          </div>
          <div className="mb-4">
            <h2 className="text-2xl font-semibold mb-2">Current Price: $1,000</h2>
            <div className="flex space-x-2">
              <Button onClick={handleBuy}>Buy Now</Button>
              <Input
                type="number"
                placeholder="Offer amount"
                value={offerPrice}
                onChange={(e) => setOfferPrice(e.target.value)}
                className="max-w-[150px]"
              />
              <Button variant="outline" onClick={handleMakeOffer}>Make Offer</Button>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
          <h3 className="text-xl font-semibold mb-4">Price History & Volume</h3>
          <div className="flex items-center mb-2">
            <TrendingUp className="w-5 h-5 mr-2 text-green-500" />
            <span className="text-green-500 font-semibold">+5.2%</span>
            <span className="ml-2 text-gray-600">in the last 24 hours</span>
          </div>
          <div className="flex items-center">
            <DollarSign className="w-5 h-5 mr-2 text-blue-500" />
            <span className="font-semibold">Volume: $50,000</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-4">Listing (Sell Orders)</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Price</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>$1,000</TableCell>
                  <TableCell>1</TableCell>
                  <TableCell>$1,000</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>$1,050</TableCell>
                  <TableCell>1</TableCell>
                  <TableCell>$1,050</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-4">Listing (Buy Orders)</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Price</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>$950</TableCell>
                  <TableCell>1</TableCell>
                  <TableCell>$950</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>$900</TableCell>
                  <TableCell>2</TableCell>
                  <TableCell>$1,800</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
        <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold mb-4">Order Activity</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>From</TableHead>
                <TableHead>To</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Sale</TableCell>
                <TableCell>$1,000</TableCell>
                <TableCell>1</TableCell>
                <TableCell>0x1234...5678</TableCell>
                <TableCell>0x8765...4321</TableCell>
                <TableCell>2023-09-28 12:34:56</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Offer</TableCell>
                <TableCell>$950</TableCell>
                <TableCell>1</TableCell>
                <TableCell>0x2468...1357</TableCell>
                <TableCell>-</TableCell>
                <TableCell>2023-09-28 11:22:33</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  )
}