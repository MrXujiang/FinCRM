"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MainLayout } from "@/components/layout/main-layout"
import { useLanguage } from "@/components/language-provider"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Search, Download, Filter, CreditCard, TrendingUp, Clock, CheckCircle, AlertCircle } from "lucide-react"

const transactions = [
  {
    id: "TXN-001",
    client: "TechCorp Inc.",
    type: "Buy",
    asset: "AAPL",
    quantity: 1000,
    price: 150.25,
    amount: 150250,
    fee: 25.5,
    status: "Completed",
    date: "2024-01-15 09:30:00",
    broker: "Alice Johnson",
  },
  {
    id: "TXN-002",
    client: "Global Solutions Ltd.",
    type: "Sell",
    asset: "MSFT",
    quantity: 500,
    price: 380.75,
    amount: 190375,
    fee: 32.15,
    status: "Completed",
    date: "2024-01-15 10:45:00",
    broker: "Bob Smith",
  },
  {
    id: "TXN-003",
    client: "Innovation Partners",
    type: "Buy",
    asset: "GOOGL",
    quantity: 200,
    price: 2750.5,
    amount: 550100,
    fee: 87.5,
    status: "Pending",
    date: "2024-01-15 11:20:00",
    broker: "Carol Davis",
  },
  {
    id: "TXN-004",
    client: "StartupXYZ",
    type: "Sell",
    asset: "TSLA",
    quantity: 300,
    price: 245.8,
    amount: 73740,
    fee: 18.75,
    status: "Failed",
    date: "2024-01-15 14:15:00",
    broker: "David Wilson",
  },
  {
    id: "TXN-005",
    client: "TechCorp Inc.",
    type: "Buy",
    asset: "AMZN",
    quantity: 150,
    price: 3200.25,
    amount: 480037.5,
    fee: 95.25,
    status: "Processing",
    date: "2024-01-15 15:30:00",
    broker: "Alice Johnson",
  },
]

const transactionVolume = [
  { date: "Jan 10", volume: 2500000, count: 45 },
  { date: "Jan 11", volume: 3200000, count: 52 },
  { date: "Jan 12", volume: 2800000, count: 38 },
  { date: "Jan 13", volume: 4100000, count: 67 },
  { date: "Jan 14", volume: 3600000, count: 58 },
  { date: "Jan 15", volume: 5200000, count: 73 },
]

const statusColors = {
  Completed: "bg-green-100 text-green-800",
  Processing: "bg-blue-100 text-blue-800",
  Pending: "bg-yellow-100 text-yellow-800",
  Failed: "bg-red-100 text-red-800",
}

const typeColors = {
  Buy: "bg-green-100 text-green-800",
  Sell: "bg-red-100 text-red-800",
}

export default function TransactionsPage() {
  const { t } = useLanguage()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.asset.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || transaction.status.toLowerCase() === statusFilter
    const matchesType = typeFilter === "all" || transaction.type.toLowerCase() === typeFilter
    return matchesSearch && matchesStatus && matchesType
  })

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">{t("transactions.title")}</h1>
            <p className="text-muted-foreground">{t("transactions.description")}</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              {t("common.export")}
            </Button>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Advanced Filter
            </Button>
          </div>
        </div>

        {/* Transaction Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t("transactions.totalTransactions")}</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{transactions.length}</div>
              <p className="text-xs text-muted-foreground">Today</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t("transactions.totalVolume")}</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${(transactions.reduce((sum, t) => sum + t.amount, 0) / 1000000).toFixed(1)}M
              </div>
              <p className="text-xs text-muted-foreground">Total value</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{transactions.filter((t) => t.status === "Completed").length}</div>
              <p className="text-xs text-muted-foreground">
                {Math.round((transactions.filter((t) => t.status === "Completed").length / transactions.length) * 100)}%
                success rate
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {transactions.filter((t) => t.status === "Pending" || t.status === "Processing").length}
              </div>
              <p className="text-xs text-muted-foreground">Awaiting processing</p>
            </CardContent>
          </Card>
        </div>

        {/* Transaction Volume Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Transaction Volume</CardTitle>
            <CardDescription>Daily transaction volume and count</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={transactionVolume}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip
                  formatter={(value, name) => [
                    name === "volume" ? `$${Number(value).toLocaleString()}` : value,
                    name === "volume" ? "Volume" : "Count",
                  ]}
                />
                <Bar dataKey="volume" fill="#3b82f6" name="volume" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Transactions Management */}
        <Card>
          <CardHeader>
            <CardTitle>Transaction Management</CardTitle>
            <CardDescription>View and manage all transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4 mb-6">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search transactions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="buy">Buy</SelectItem>
                  <SelectItem value="sell">Sell</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Transactions Table */}
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Asset</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>
                      <span className="font-mono font-medium">{transaction.id}</span>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{transaction.client}</p>
                        <p className="text-xs text-muted-foreground">Broker: {transaction.broker}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={typeColors[transaction.type as keyof typeof typeColors]}>
                        {transaction.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="font-mono font-medium">{transaction.asset}</span>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">{transaction.quantity.toLocaleString()}</span>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">${transaction.price.toFixed(2)}</span>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">${transaction.amount.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">Fee: ${transaction.fee.toFixed(2)}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Badge className={statusColors[transaction.status as keyof typeof statusColors]}>
                          {transaction.status}
                        </Badge>
                        {transaction.status === "Failed" && <AlertCircle className="h-4 w-4 text-red-500" />}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm">{transaction.date.split(" ")[0]}</p>
                        <p className="text-xs text-muted-foreground">{transaction.date.split(" ")[1]}</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}
