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
import { Eye, TrendingUp, DollarSign, ListPlus, ShoppingCart, Tag } from 'lucide-react'
import Navigation from "@/components/navigation"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function AssetPage({ params }: { params: { id: string } }) {
  const [price, setPrice] = useState('')
  const [offerPrice, setOfferPrice] = useState('')
  const [sellOrders, setSellOrders] = useState([])
  const [buyOrders, setBuyOrders] = useState([])
  const [latestPrice, setLatestPrice] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPrice, setCurrentPrice] = useState(0) // New state for current price
  const [tradeActivity, setTradeActivity] = useState([]) // New state for trade activity

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchAndCalculateCurrentPrice(params.id)
        await fetchBuyOrders(params.id)
        const activity = await fetchTradeActivity(params.id) // Fetch trade activity
        setTradeActivity(activity) // Set trade activity
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
      const response = await fetch(`/api/sellOrders/${name}`);
      const data = await response.json();
      console.log('Sell Orders:', data);
      setSellOrders(data);
      return data;
    } catch (error) {
      console.error('Error fetching sell orders:', error);
      return [];
    }
  };

  const fetchBuyOrders = async (name: string) => {
    try {
      const response = await fetch(`/api/buyOrders/${name}`);
      const data = await response.json();
      console.log('Buy Orders:', data);
      setBuyOrders(data);
    } catch (error) {
      console.error('Error fetching buy orders:', error);
    }
  };

  const fetchLatestStats = async () => {
    try {
      const response = await fetch('/api/latestStats')
      const data = await response.json()
      setLatestPrice(data.price)
      return data.price
    } catch (error) {
      console.error('Error fetching latest stats:', error)
      return 0
    }
  }

  const fetchAndCalculateCurrentPrice = async (name: string) => {
    try {
      const [latestPrice, sellOrders] = await Promise.all([
        fetchLatestStats(),
        fetchSellOrders(name)
      ])
      if (sellOrders.length > 0) {
        setCurrentPrice(sellOrders[0].price * latestPrice) // Multiply first sell order's price by latest price
      }
    } catch (error) {
      console.error('Error calculating current price:', error)
    }
  }

  const fetchTradeActivity = async (name: string) => {
    try {
      const response = await fetch(`/api/tradeActivity/${name}`);
      const data = await response.json();
      console.log('Trade Activity:', data);
      return data;
    } catch (error) {
      console.error('Error fetching trade activity:', error);
      return [];
    }
  };
  

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
          <h2 className="text-2xl font-semibold mb-4">Buy now: ${currentPrice?.toFixed(2) || 'N/A'} USD</h2>
          <p className="text-lg font-semibold">Price in Qubic: {currentPrice ? 
            (currentPrice / latestPrice >= 1e9 ? `${(currentPrice / latestPrice / 1e9).toFixed(2)} Billion` :
            currentPrice / latestPrice >= 1e6 ? `${(currentPrice / latestPrice / 1e6).toFixed(2)} Million` :
            currentPrice / latestPrice >= 1e3 ? `${(currentPrice / latestPrice / 1e3).toFixed(2)} Thousand` :
            (currentPrice / latestPrice).toFixed(2)) : 'N/A'}</p>
          {/* Hide the cards of list for sale, buy now, make offer */}
          {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>List for Sale</CardTitle>
                <CardDescription>Set a price to list your asset</CardDescription>
              </CardHeader>
              <CardContent>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full" disabled>
                      <ListPlus className="mr-2 h-4 w-4" /> List Asset
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>List Asset for Sale</DialogTitle>
                      <DialogDescription>
                        Enter the price at which you want to list your asset.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="list-price" className="text-right">
                          Price
                        </Label>
                        <Input
                          id="list-price"
                          type="number"
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                          className="col-span-3"
                        />
                      </div>
                    </div>
                    <Button onClick={handleList} disabled>List Asset</Button>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Buy Now</CardTitle>
                <CardDescription>Purchase this asset immediately</CardDescription>
              </CardHeader>
              <CardContent>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full" disabled>
                      <ShoppingCart className="mr-2 h-4 w-4" /> Buy Now
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Confirm Purchase</DialogTitle>
                      <DialogDescription>
                        You are about to purchase this asset at the current price.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                      <p className="text-lg font-semibold">Price: ${currentPrice?.toFixed(2) || 'N/A'}</p>
                    </div>
                    <Button onClick={handleBuy} disabled>Confirm Purchase</Button>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Make Offer</CardTitle>
                <CardDescription>Place a bid on this asset</CardDescription>
              </CardHeader>
              <CardContent>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full" disabled>
                      <Tag className="mr-2 h-4 w-4" /> Make Offer
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Make an Offer</DialogTitle>
                      <DialogDescription>
                        Enter the amount you want to offer for this asset.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="offer-amount" className="text-right">
                          Offer
                        </Label>
                        <Input
                          id="offer-amount"
                          type="number"
                          value={offerPrice}
                          onChange={(e) => setOfferPrice(e.target.value)}
                          className="col-span-3"
                        />
                      </div>
                    </div>
                    <Button onClick={handleMakeOffer} disabled>Submit Offer</Button>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </div> */}
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
                    <TableHead>Qubic</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sellOrders.map((order: { entityId: string; price: number; numberOfShares: number }) => (
                    <TableRow key={order.entityId}>
                      <TableCell>{order.price} Qubics</TableCell>
                      <TableCell>{order.numberOfShares}</TableCell>
                      <TableCell>${(order.price * order.numberOfShares * latestPrice).toFixed((order.price * order.numberOfShares * latestPrice) % 1 === 0 ? 0 : 2)} USD</TableCell>
                      <TableCell>
                        <Button onClick={handleBuy} disabled>
                          <ShoppingCart className="mr-2 h-4 w-4" /> Buy Now
                        </Button>
                      </TableCell>
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
                  <TableHead>Qubic</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Total</TableHead>
                </TableRow>
              </TableHeader>
                <TableBody>
                  {buyOrders.map((order: { entityId: string; price: number; numberOfShares: number }) => (
                    <TableRow key={order.entityId}>
                      <TableCell>{order.price} Qubics</TableCell>
                      <TableCell>{order.numberOfShares}</TableCell>
                      <TableCell>${(order.price * order.numberOfShares * latestPrice).toFixed((order.price * order.numberOfShares * latestPrice) % 1 === 0 ? 0 : 2)} USD</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
            </Table>
              )}
          </div>
        </div>
        {/* Hide the price and volume section */}
        {/* <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
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
        </div> */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold mb-4">Order Activity</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Price (Qubic) per share</TableHead>
                <TableHead>Number of Shares</TableHead>
                <TableHead>Transaction Hash</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tradeActivity.map((trade: any) => (
                <TableRow key={trade.transactionHash}>
                  <TableCell>{new Date(trade.tickTime).toLocaleDateString()}</TableCell>
                  <TableCell>
                    {trade.price >= 1e9
                      ? `${(trade.price / 1e9).toFixed(2)} Billion`
                      : trade.price >= 1e6
                      ? `${(trade.price / 1e6).toFixed(2)} Million`
                      : trade.price >= 1e3
                      ? `${(trade.price / 1e3).toFixed(2)} Thousand`
                      : trade.price}
                  </TableCell>
                  <TableCell>{trade.numberOfShares}</TableCell>
                  <TableCell>
                    <a href={`https://explorer.qubic.org/network/tx/${trade.transactionHash}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                      Explorer link transaction
                    </a>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  )
}
