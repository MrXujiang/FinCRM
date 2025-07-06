"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MainLayout } from "@/components/layout/main-layout"
import { useLanguage } from "@/components/language-provider"
import { Search, Plus, Package, TrendingUp, Users, DollarSign, Edit, Eye, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const products = [
  {
    id: 1,
    name: "Enterprise Investment Package",
    category: "Investment",
    description: "Comprehensive investment solution for large enterprises",
    price: 250000,
    minInvestment: 100000,
    riskLevel: "Medium",
    status: "Active",
    clients: 12,
    totalInvested: 3000000,
    performance: 8.5,
    features: ["Portfolio Management", "Risk Analysis", "24/7 Support"],
  },
  {
    id: 2,
    name: "Professional Trading Account",
    category: "Trading",
    description: "Advanced trading platform with professional tools",
    price: 50000,
    minInvestment: 25000,
    riskLevel: "High",
    status: "Active",
    clients: 28,
    totalInvested: 1400000,
    performance: 12.3,
    features: ["Real-time Trading", "Advanced Analytics", "API Access"],
  },
  {
    id: 3,
    name: "Retirement Planning Suite",
    category: "Retirement",
    description: "Long-term retirement planning and wealth management",
    price: 75000,
    minInvestment: 50000,
    riskLevel: "Low",
    status: "Active",
    clients: 45,
    totalInvested: 3375000,
    performance: 6.7,
    features: ["Tax Optimization", "Estate Planning", "Regular Reviews"],
  },
  {
    id: 4,
    name: "Startup Investment Fund",
    category: "Venture Capital",
    description: "High-growth startup investment opportunities",
    price: 500000,
    minInvestment: 250000,
    riskLevel: "Very High",
    status: "Limited",
    clients: 8,
    totalInvested: 4000000,
    performance: 15.2,
    features: ["Due Diligence", "Portfolio Diversification", "Exit Strategy"],
  },
  {
    id: 5,
    name: "Fixed Income Portfolio",
    category: "Bonds",
    description: "Stable income through diversified bond investments",
    price: 100000,
    minInvestment: 50000,
    riskLevel: "Low",
    status: "Active",
    clients: 35,
    totalInvested: 3500000,
    performance: 4.8,
    features: ["Stable Returns", "Capital Preservation", "Regular Income"],
  },
]

const categories = ["All", "Investment", "Trading", "Retirement", "Venture Capital", "Bonds"]

const statusColors = {
  Active: "bg-green-100 text-green-800",
  Limited: "bg-yellow-100 text-yellow-800",
  Inactive: "bg-red-100 text-red-800",
}

const riskColors = {
  Low: "bg-green-100 text-green-800",
  Medium: "bg-yellow-100 text-yellow-800",
  High: "bg-orange-100 text-orange-800",
  "Very High": "bg-red-100 text-red-800",
}

export default function ProductsPage() {
  const { t } = useLanguage()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">{t("products.title")}</h1>
            <p className="text-muted-foreground">{t("products.description")}</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                {t("products.addProduct")}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>{t("products.addProduct")}</DialogTitle>
                <DialogDescription>Create a new financial product or service</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="product-name">Product Name</Label>
                    <Input id="product-name" placeholder="Enter product name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="investment">Investment</SelectItem>
                        <SelectItem value="trading">Trading</SelectItem>
                        <SelectItem value="retirement">Retirement</SelectItem>
                        <SelectItem value="venture-capital">Venture Capital</SelectItem>
                        <SelectItem value="bonds">Bonds</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Enter product description" />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price</Label>
                    <Input id="price" type="number" placeholder="Enter price" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="min-investment">Min Investment</Label>
                    <Input id="min-investment" type="number" placeholder="Enter minimum" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="risk-level">Risk Level</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select risk" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="very-high">Very High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Create Product</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Product Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t("products.totalProducts")}</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{products.length}</div>
              <p className="text-xs text-muted-foreground">Available products</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t("products.activeProducts")}</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{products.filter((p) => p.status === "Active").length}</div>
              <p className="text-xs text-muted-foreground">Currently active</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{products.reduce((sum, p) => sum + p.clients, 0)}</div>
              <p className="text-xs text-muted-foreground">Across all products</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total AUM</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${(products.reduce((sum, p) => sum + p.totalInvested, 0) / 1000000).toFixed(1)}M
              </div>
              <p className="text-xs text-muted-foreground">Assets under management</p>
            </CardContent>
          </Card>
        </div>

        {/* Products Management */}
        <Card>
          <CardHeader>
            <CardTitle>Product Management</CardTitle>
            <CardDescription>Manage financial products and services</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4 mb-6">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Products Table */}
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Risk Level</TableHead>
                  <TableHead>Clients</TableHead>
                  <TableHead>Performance</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-muted-foreground">{product.description}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{product.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">${product.price.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">Min: ${product.minInvestment.toLocaleString()}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={riskColors[product.riskLevel as keyof typeof riskColors]}>
                        {product.riskLevel}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{product.clients}</p>
                        <p className="text-xs text-muted-foreground">
                          ${(product.totalInvested / 1000000).toFixed(1)}M AUM
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className={`font-medium ${product.performance >= 0 ? "text-green-600" : "text-red-600"}`}>
                        {product.performance >= 0 ? "+" : ""}
                        {product.performance}%
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={statusColors[product.status as keyof typeof statusColors]}>
                        {product.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Product
                          </DropdownMenuItem>
                          <DropdownMenuItem>Performance Report</DropdownMenuItem>
                          <DropdownMenuItem>Client List</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Product Categories */}
        <Card>
          <CardHeader>
            <CardTitle>Product Categories</CardTitle>
            <CardDescription>Overview of products by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.slice(1).map((category) => {
                const categoryProducts = products.filter((p) => p.category === category)
                const totalClients = categoryProducts.reduce((sum, p) => sum + p.clients, 0)
                const totalAUM = categoryProducts.reduce((sum, p) => sum + p.totalInvested, 0)
                const avgPerformance =
                  categoryProducts.reduce((sum, p) => sum + p.performance, 0) / categoryProducts.length

                return (
                  <div key={category} className="p-4 border rounded-lg">
                    <h3 className="font-medium mb-2">{category}</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Products:</span>
                        <span className="font-medium">{categoryProducts.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Clients:</span>
                        <span className="font-medium">{totalClients}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">AUM:</span>
                        <span className="font-medium">${(totalAUM / 1000000).toFixed(1)}M</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Avg Performance:</span>
                        <span className={`font-medium ${avgPerformance >= 0 ? "text-green-600" : "text-red-600"}`}>
                          {avgPerformance.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}
