import Link from 'next/link'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, User } from 'lucide-react'

export default function Navigation() {
  return (
    <nav className="bg-gray-900 text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Left side */}
        <div className="flex items-center space-x-6">
          <Link href="/" className="text-2xl font-bold">
            QX
          </Link>
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
          <Button variant="outline" className="hidden md:inline-flex bg-blue-500 text-white">
            Connect Wallet
          </Button>
        </div>
      </div>
    </nav>
  )
}