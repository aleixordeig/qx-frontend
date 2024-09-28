import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Navigation from "@/components/navigation"
import Link from "next/link"
import { Filter } from 'lucide-react' // Add this import

// Fetch assets from the API endpoint
async function fetchAssets() {
  const res = await fetch('http://localhost:3000/api/assets')
  if (!res.ok) {
    throw new Error('Failed to fetch assets')
  }
  return res.json()
}

export default async function Component() {
  const assets = await fetchAssets()

  return (
    <>
      <Navigation />
      <div className="container mx-auto p-4">
        <main>
          <h1 className="text-3xl font-bold mb-4">Marketplace of Assets</h1>
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
            <Button variant="outline" disabled>
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {assets.map((asset: any) => (
              <Link key={asset.name} href={`/asset/${encodeURIComponent(asset.name)}`}>
                <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
                  <h2 className="text-xl font-semibold mb-2">{asset.name}</h2>
                  <div className="flex justify-between items-center">
                    <span className="font-bold">$10b</span>
                    <Button>View Details</Button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </main>
      </div>
    </>
  )
}