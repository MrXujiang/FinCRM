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
import { AlertTriangle, TrendingDown, Shield, Activity, Users, DollarSign } from "lucide-react"

const riskMetrics = [
  { name: "Market Risk", value: 65, color: "#ef4444", status: "High" },
  { name: "Credit Risk", value: 35, color: "#f59e0b", status: "Medium" },
  { name: "Operational Risk", value: 25, color: "#10b981", status: "Low" },
  { name: "Liquidity Risk", value: 45, color: "#3b82f6", status: "Medium" },
]

const riskTrend = [
  { month: "Jan", overall: 45, market: 50, credit: 30, operational: 20 },
  { month: "Feb", overall: 52, market: 58, credit: 35, operational: 25 },
  { month: "Mar", overall: 48, market: 55, credit: 32, operational: 22 },
  { month: "Apr", overall: 61, market: 68, credit: 45, operational: 30 },
  { month: "May", overall: 55, market: 62, credit: 40, operational: 28 },
  { month: "Jun", overall: 58, market: 65, credit: 42, operational: 32 },
]

const highRiskClients = [
  {
    id: 1,
    name: "TechCorp Inc.",
    riskScore: 85,
    exposure: 2500000,
    category: "High",
    lastReview: "2024-01-10",
    alerts: 3,
    portfolio: "Aggressive Growth",
  },
  {
    id: 2,
    name: "Innovation Partners",
    riskScore: 78,
    exposure: 1800000,
    category: "High",
    lastReview: "2024-01-12",
    alerts: 2,
    portfolio: "Technology Focus",
  },
  {
    id: 3,
    name: "Global Ventures",
    riskScore: 72,
    exposure: 3200000,
    category: "Medium-High",
    lastReview: "2024-01-08",
    alerts: 4,
    portfolio: "Diversified",
  },
  {
    id: 4,
    name: "StartupXYZ",
    riskScore: 68,
    exposure: 950000,
    category: "Medium-High",
    lastReview: "2024-01-15",
    alerts: 1,
    portfolio: "Emerging Markets",
  },
]

const riskAlerts = [
  {
    id: 1,
    type: "Market Risk",
    severity: "Critical",
    client: "TechCorp Inc.",
    description: "Portfolio concentration exceeds 15% in single sector",
    date: "2024-01-15",
    status: "Open",
  },
  {
    id: 2,
    type: "Credit Risk",
    severity: "High",
    client: "Global Ventures",
    description: "Credit rating downgrade detected",
    date: "2024-01-14",
    status: "Under Review",
  },
  {
    id: 3,
    type: "Liquidity Risk",
    severity: "Medium",
    client: "Innovation Partners",
    description: "Low liquidity assets exceed threshold",
    date: "2024-01-13",
    status: "Monitoring",
  },
  {
    id: 4,
    type: "Operational Risk",
    severity: "Low",
    client: "StartupXYZ",
    description: "Documentation incomplete for recent transactions",
    date: "2024-01-12",
    status: "Resolved",
  },
]

const severityColors = {
  Critical: "bg-red-100 text-red-800",
  High: "bg-orange-100 text-orange-800",
  Medium: "bg-yellow-100 text-yellow-800",
  Low: "bg-green-100 text-green-800",
}

const statusColors = {
  Open: "bg-red-100 text-red-800",
  "Under Review": "bg-yellow-100 text-yellow-800",
  Monitoring: "bg-blue-100 text-blue-800",
  Resolved: "bg-green-100 text-green-800",
}

export default function RiskPage() {
  const { t } = useLanguage()

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">{t("risk.title")}</h1>
            <p className="text-muted-foreground">{t("risk.description")}</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">Risk Report</Button>
            <Button>Risk Assessment</Button>
          </div>
        </div>

        {/* Risk Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overall Risk Score</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">58</div>
              <div className="flex items-center text-xs text-red-600">
                <TrendingDown className="h-3 w-3 mr-1" />
                +3 from last month
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">High Risk Clients</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{highRiskClients.filter((c) => c.category === "High").length}</div>
              <p className="text-xs text-muted-foreground">Require attention</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Exposure</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${(highRiskClients.reduce((sum, c) => sum + c.exposure, 0) / 1000000).toFixed(1)}M
              </div>
              <p className="text-xs text-muted-foreground">High risk exposure</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{riskAlerts.filter((a) => a.status !== "Resolved").length}</div>
              <p className="text-xs text-muted-foreground">Pending resolution</p>
            </CardContent>
          </Card>
        </div>

        {/* Risk Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Risk Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Risk Distribution</CardTitle>
              <CardDescription>Current risk levels by category</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={riskMetrics}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {riskMetrics.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-2 mt-4">
                {riskMetrics.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-sm">{item.name}</span>
                    </div>
                    <Badge
                      variant={
                        item.status === "High" ? "destructive" : item.status === "Medium" ? "secondary" : "default"
                      }
                    >
                      {item.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Risk Trend */}
          <Card>
            <CardHeader>
              <CardTitle>Risk Trend</CardTitle>
              <CardDescription>Risk score evolution over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={riskTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="overall" stroke="#ef4444" strokeWidth={2} name="Overall" />
                  <Line type="monotone" dataKey="market" stroke="#3b82f6" strokeWidth={2} name="Market" />
                  <Line type="monotone" dataKey="credit" stroke="#f59e0b" strokeWidth={2} name="Credit" />
                  <Line type="monotone" dataKey="operational" stroke="#10b981" strokeWidth={2} name="Operational" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* High Risk Clients */}
        <Card>
          <CardHeader>
            <CardTitle>High Risk Clients</CardTitle>
            <CardDescription>Clients requiring enhanced monitoring</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client</TableHead>
                  <TableHead>Risk Score</TableHead>
                  <TableHead>Exposure</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Portfolio</TableHead>
                  <TableHead>Alerts</TableHead>
                  <TableHead>Last Review</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {highRiskClients.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell>
                      <span className="font-medium">{client.name}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Progress value={client.riskScore} className="w-16 h-2" />
                        <span className="text-sm font-medium">{client.riskScore}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">${client.exposure.toLocaleString()}</span>
                    </TableCell>
                    <TableCell>
                      <Badge variant={client.category === "High" ? "destructive" : "secondary"}>
                        {client.category}
                      </Badge>
                    </TableCell>
                    <TableCell>{client.portfolio}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <AlertTriangle className="h-4 w-4 text-red-500" />
                        <span className="font-medium">{client.alerts}</span>
                      </div>
                    </TableCell>
                    <TableCell>{client.lastReview}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button variant="ghost" size="sm">
                          Review
                        </Button>
                        <Button variant="ghost" size="sm">
                          Mitigate
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Risk Alerts */}
        <Card>
          <CardHeader>
            <CardTitle>Risk Alerts</CardTitle>
            <CardDescription>Active risk monitoring alerts</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {riskAlerts.map((alert) => (
                  <TableRow key={alert.id}>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Activity className="h-4 w-4 text-muted-foreground" />
                        <span>{alert.type}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={severityColors[alert.severity as keyof typeof severityColors]}>
                        {alert.severity}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">{alert.client}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{alert.description}</span>
                    </TableCell>
                    <TableCell>{alert.date}</TableCell>
                    <TableCell>
                      <Badge className={statusColors[alert.status as keyof typeof statusColors]}>{alert.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                        {alert.status !== "Resolved" && (
                          <Button variant="ghost" size="sm">
                            Resolve
                          </Button>
                        )}
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
