"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { MainLayout } from "@/components/layout/main-layout"
import { useLanguage } from "@/components/language-provider"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
} from "recharts"
import { TrendingUp, TrendingDown, DollarSign, PieChartIcon, BarChart3, Plus } from "lucide-react"

const assetData = [
  { name: "Stocks", value: 45, amount: 2250000, color: "#3b82f6" },
  { name: "Bonds", value: 25, amount: 1250000, color: "#10b981" },
  { name: "Real Estate", value: 15, amount: 750000, color: "#f59e0b" },
  { name: "Commodities", value: 10, amount: 500000, color: "#ef4444" },
  { name: "Cash", value: 5, amount: 250000, color: "#8b5cf6" },
]

const portfolioPerformance = [
  { month: "Jan", value: 4800000, benchmark: 4750000 },
  { month: "Feb", value: 4950000, benchmark: 4800000 },
  { month: "Mar", value: 4850000, benchmark: 4820000 },
  { month: "Apr", value: 5100000, benchmark: 4900000 },
  { month: "May", value: 5250000, benchmark: 5000000 },
  { month: "Jun", value: 5000000, benchmark: 5050000 },
]

const topHoldings = [
  { symbol: "AAPL", name: "Apple Inc.", value: 450000, allocation: 9.0, change: 2.5 },
  { symbol: "MSFT", name: "Microsoft Corp.", value: 380000, allocation: 7.6, change: 1.8 },
  { symbol: "GOOGL", name: "Alphabet Inc.", value: 320000, allocation: 6.4, change: -0.5 },
  { symbol: "AMZN", name: "Amazon.com Inc.", value: 280000, allocation: 5.6, change: 3.2 },
  { symbol: "TSLA", name: "Tesla Inc.", value: 250000, allocation: 5.0, change: -1.2 },
]

const clientPortfolios = [
  {
    id: 1,
    client: "TechCorp Inc.",
    totalValue: 1250000,
    performance: 8.5,
    riskLevel: "Medium",
    lastRebalance: "2024-01-10",
  },
  {
    id: 2,
    client: "Global Solutions Ltd.",
    totalValue: 980000,
    performance: 12.3,
    riskLevel: "High",
    lastRebalance: "2024-01-08",
  },
  {
    id: 3,
    client: "Innovation Partners",
    totalValue: 1580000,
    performance: 6.7,
    riskLevel: "Low",
    lastRebalance: "2024-01-15",
  },
  {
    id: 4,
    client: "StartupXYZ",
    totalValue: 450000,
    performance: 15.2,
    riskLevel: "High",
    lastRebalance: "2024-01-12",
  },
]

export default function AssetsPage() {
  const { t } = useLanguage()

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">{t("assets.title")}</h1>
            <p className="text-muted-foreground">{t("assets.description")}</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">Portfolio Analysis</Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              {t("assets.addAsset")}
            </Button>
          </div>
        </div>

        {/* Asset Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t("assets.totalValue")}</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$5,000,000</div>
              <div className="flex items-center text-xs text-green-600">
                <TrendingUp className="h-3 w-3 mr-1" />
                +8.2% this month
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t("assets.portfolios")}</CardTitle>
              <PieChartIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{clientPortfolios.length}</div>
              <p className="text-xs text-muted-foreground">Active portfolios</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Performance</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">10.7%</div>
              <p className="text-xs text-muted-foreground">YTD return</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Risk Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">6.8</div>
              <p className="text-xs text-muted-foreground">Out of 10</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Asset Allocation */}
          <Card>
            <CardHeader>
              <CardTitle>{t("assets.allocation")}</CardTitle>
              <CardDescription>Portfolio distribution by asset class</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={assetData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {assetData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, "Allocation"]} />
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-2 mt-4">
                {assetData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-sm">{item.name}</span>
                    </div>
                    <span className="text-sm font-medium">{item.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Portfolio Performance */}
          <Card>
            <CardHeader>
              <CardTitle>{t("assets.performance")}</CardTitle>
              <CardDescription>Portfolio vs benchmark performance</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={portfolioPerformance}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${Number(value).toLocaleString()}`, ""]} />
                  <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} name="Portfolio" />
                  <Line type="monotone" dataKey="benchmark" stroke="#10b981" strokeWidth={2} name="Benchmark" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Top Holdings */}
        <Card>
          <CardHeader>
            <CardTitle>Top Holdings</CardTitle>
            <CardDescription>Largest positions in the portfolio</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Symbol</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Allocation</TableHead>
                  <TableHead>Change</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topHoldings.map((holding) => (
                  <TableRow key={holding.symbol}>
                    <TableCell>
                      <span className="font-mono font-medium">{holding.symbol}</span>
                    </TableCell>
                    <TableCell>{holding.name}</TableCell>
                    <TableCell>
                      <span className="font-medium">${holding.value.toLocaleString()}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Progress value={holding.allocation} className="w-16 h-2" />
                        <span className="text-sm">{holding.allocation}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className={`flex items-center ${holding.change >= 0 ? "text-green-600" : "text-red-600"}`}>
                        {holding.change >= 0 ? (
                          <TrendingUp className="h-3 w-3 mr-1" />
                        ) : (
                          <TrendingDown className="h-3 w-3 mr-1" />
                        )}
                        {Math.abs(holding.change)}%
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Client Portfolios */}
        <Card>
          <CardHeader>
            <CardTitle>Client Portfolios</CardTitle>
            <CardDescription>Overview of individual client portfolios</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client</TableHead>
                  <TableHead>Total Value</TableHead>
                  <TableHead>Performance</TableHead>
                  <TableHead>Risk Level</TableHead>
                  <TableHead>Last Rebalance</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clientPortfolios.map((portfolio) => (
                  <TableRow key={portfolio.id}>
                    <TableCell>
                      <span className="font-medium">{portfolio.client}</span>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">${portfolio.totalValue.toLocaleString()}</span>
                    </TableCell>
                    <TableCell>
                      <div
                        className={`flex items-center ${portfolio.performance >= 0 ? "text-green-600" : "text-red-600"}`}
                      >
                        {portfolio.performance >= 0 ? (
                          <TrendingUp className="h-3 w-3 mr-1" />
                        ) : (
                          <TrendingDown className="h-3 w-3 mr-1" />
                        )}
                        {portfolio.performance}%
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          portfolio.riskLevel === "High"
                            ? "destructive"
                            : portfolio.riskLevel === "Medium"
                              ? "secondary"
                              : "default"
                        }
                      >
                        {portfolio.riskLevel}
                      </Badge>
                    </TableCell>
                    <TableCell>{portfolio.lastRebalance}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                        <Button variant="ghost" size="sm">
                          Rebalance
                        </Button>
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
