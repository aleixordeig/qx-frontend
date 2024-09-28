import Link from 'next/link'
import { Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Navigation from "@/components/navigation"

export default function Component() {
  return (
    <>
      <Navigation />
      <div className="container mx-auto p-4">
        <main>
          <div className="flex items-center space-x-4 mb-8">
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by volume" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="24h">Last 24 hours</SelectItem>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="1m">Last 1 month</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((asset) => (
              <div key={asset} className="border rounded-lg p-4 shadow-sm">
                <h2 className="text-xl font-semibold mb-2">Asset {asset}</h2>
                <p className="text-gray-600 mb-4">
                  Description of Asset {asset}...
                </p>
                <div className="flex justify-between items-center">
                  <span className="font-bold">$XXX.XX</span>
                  <Button>View Details</Button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </>
  )
}