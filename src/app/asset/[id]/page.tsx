'use client'

import { useState, useEffect } from 'react'
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
  const [sellOrders, setSellOrders] = useState([])
  const [buyOrders, setBuyOrders] = useState([])
  const [latestPrice, setLatestPrice] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPrice, setCurrentPrice] = useState<number | null>(null) // New state for current price

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchLatestStats()
        await fetchSellOrders(params.id)
        await fetchBuyOrders(params.id)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [params.id])

  const fetchSellOrders = async (name: string) => {
    try {
      const response = await fetch(`/api/sellOrders?name=${name}`)
      const data = await response.json()
      console.log('Sell Orders:', data); // Log the data to verify
      setSellOrders(data)
      if (data.length > 0) {
        const firstOrder = data[0]
        setCurrentPrice(firstOrder.price * firstOrder.numberOfShares * latestPrice)
      }
    } catch (error) {
      console.error('Error fetching sell orders:', error)
    }
  }

  const fetchBuyOrders = async (name: string) => {
    try {
      const response = await fetch(`/api/buyOrders?name=${name}`)
      const data = await response.json()
      console.log('Buy Orders:', data); // Log the data to verify
      setBuyOrders(data)
    } catch (error) {
      console.error('Error fetching buy orders:', error)
    }
  }

  const fetchLatestStats = async () => {
    try {
      const response = await fetch('/api/latestStats')
      const data = await response.json()
      setLatestPrice(data.price)
    } catch (error) {
      console.error('Error fetching latest stats:', error)
    }
  }

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
          <h2 className="text-2xl font-semibold mb-2">Current Price: $</h2> {/* Updated to use currentPrice */}

          
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-4">Listing (Sell Orders)</h3>
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>{error}</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Price</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sellOrders.map((order: { entityId: string; price: number; numberOfShares: number }) => (
                    <TableRow key={order.entityId}>
                      <TableCell>{order.price} Qubics</TableCell>
                      <TableCell>{order.numberOfShares}</TableCell>
                      <TableCell>${order.price * order.numberOfShares * latestPrice} USD</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-4">Listing (Buy Orders)</h3>
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>{error}</p>
            ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Price</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Total</TableHead>
                </TableRow>
              </TableHeader>
                <TableBody>
                  {buyOrders.map((order: { entityId: string; price: number; numberOfShares: number }) => (
                    <TableRow key={order.entityId}>
                      <TableCell>{order.price} Qubics</TableCell>
                      <TableCell>{order.numberOfShares}</TableCell>
                      <TableCell>${order.price * order.numberOfShares * latestPrice} USD</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
            </Table>
              )}
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
                <TableCell>AAAA</TableCell>
                <TableCell>BBBB</TableCell>
                <TableCell>2023-09-28 12:34:56</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Offer</TableCell>
                <TableCell>$950</TableCell>
                <TableCell>1</TableCell>
                <TableCell>AAAA</TableCell>
                <TableCell>BBBB</TableCell>
                <TableCell>2023-09-28 11:22:33</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  )
}