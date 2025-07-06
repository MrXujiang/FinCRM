"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MainLayout } from "@/components/layout/main-layout"
import { useLanguage } from "@/components/language-provider"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { FileText, Download, Calendar, Activity } from "lucide-react"

const salesData = [
  { month: "Jan", revenue: 450000, deals: 12, conversion: 24 },
  { month: "Feb", revenue: 520000, deals: 15, conversion: 28 },
  { month: "Mar", revenue: 480000, deals: 11, conversion: 22 },
  { month: "Apr", revenue: 610000, deals: 18, conversion: 32 },
  { month: "May", revenue: 550000, deals: 16, conversion: 29 },
  { month: "Jun", revenue: 670000, deals: 21, conversion: 35 },
]

const performanceData = [
  { name: "Alice Johnson", deals: 45, revenue: 2250000, target: 2000000 },
  { name: "Bob Smith", deals: 38, revenue: 1900000, target: 1800000 },
  { name: "Carol Davis", deals: 52, revenue: 2600000, target: 2200000 },
  { name: "David Wilson", deals: 29, revenue: 1450000, target: 1500000 },
]

const clientSegments = [
  { name: "Enterprise", value: 45, revenue: 4500000, color: "#3b82f6" },
  { name: "Mid-Market", value: 35, revenue: 2800000, color: "#10b981" },
  { name: "Small Business", value: 20, revenue: 1200000, color: "#f59e0b" },
]

const riskMetrics = [
  { category: "Low Risk", clients: 85, percentage: 56.7 },
  { category: "Medium Risk", clients: 45, percentage: 30.0 },
  { category: "High Risk", clients: 20, percentage: 13.3 },
]

const complianceMetrics = [
  { metric: "KYC Compliance", current: 95, target: 98, status: "Good" },
  { metric: "AML Screening", current: 88, target: 95, status: "Needs Improvement" },
  { metric: "Documentation", current: 92, target: 90, status: "Excellent" },
  { metric: "Risk Assessment", current: 85, target: 90, status: "Good" },
]

const reportTemplates = [
  {
    id: 1,
    name: "Monthly Sales Report",
    description: "Comprehensive sales performance analysis",
    category: "Sales",
    frequency: "Monthly",
    lastGenerated: "2024-01-15",
    status: "Active",
  },
  {
    id: 2,
    name: "Risk Assessment Report",
    description: "Portfolio risk analysis and recommendations",
    category: "Risk",
    frequency: "Weekly",
    lastGenerated: "2024-01-14",
    status: "Active",
  },
  {
    id: 3,
    name: "Compliance Summary",
    description: "Regulatory compliance status overview",
    category: "Compliance",
    frequency: "Monthly",
    lastGenerated: "2024-01-10",
    status: "Active",
  },
  {
    id: 4,
    name: "Client Performance Review",
    description: "Individual client portfolio performance",
    category: "Performance",
    frequency: "Quarterly",
    lastGenerated: "2024-01-01",
    status: "Scheduled",
  },
]

export default function ReportsPage() {
  const { t } = useLanguage()
  const [selectedPeriod, setSelectedPeriod] = useState("6months")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const filteredReports = reportTemplates.filter(
    (report) => selectedCategory === "all" || report.category.toLowerCase() === selectedCategory,
  )

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">{t("reports.title")}</h1>
            <p className="text-muted-foreground">{t("reports.description")}</p>
          </div>
          <div className="flex space-x-2">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-[150px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1month">Last Month</SelectItem>
                <SelectItem value="3months">Last 3 Months</SelectItem>
                <SelectItem value="6months">Last 6 Months</SelectItem>
                <SelectItem value="1year">Last Year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              Custom Range
            </Button>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Export All
            </Button>
          </div>
        </div>

        {/* Report Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{reportTemplates.length}</div>
              <p className="text-xs text-muted-foreground">Active templates</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Generated This Month</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">+15% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Scheduled Reports</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">Upcoming this week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4</div>
              <p className="text-xs text-muted-foreground">Report categories</p>
            </CardContent>
          </Card>
        </div>

        {/* Sales Performance Report */}
        <Card>
          <CardHeader>
            <CardTitle>{t("reports.salesReport")}</CardTitle>
            <CardDescription>Revenue and deal performance over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip
                  formatter={(value, name) => [
                    name === "revenue" ? `$${Number(value).toLocaleString()}` : value,
                    name === "revenue" ? "Revenue" : name === "deals" ? "Deals" : "Conversion %",
                  ]}
                />
                <Bar dataKey="revenue" fill="#3b82f6" name="revenue" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Performance and Client Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Team Performance */}
          <Card>
            <CardHeader>
              <CardTitle>{t("reports.performanceReport")}</CardTitle>
              <CardDescription>Individual team member performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {performanceData.map((member, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{member.name}</p>
                      <p className="text-sm text-muted-foreground">{member.deals} deals closed</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${member.revenue.toLocaleString()}</p>
                      <p className={`text-sm ${member.revenue >= member.target ? "text-green-600" : "text-red-600"}`}>
                        {member.revenue >= member.target ? "+" : ""}
                        {Math.round(((member.revenue - member.target) / member.target) * 100)}% vs target
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Client Segments */}
          <Card>
            <CardHeader>
              <CardTitle>Client Segment Analysis</CardTitle>
              <CardDescription>Revenue distribution by client segment</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={clientSegments}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {clientSegments.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2 mt-4">
                {clientSegments.map((segment, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: segment.color }} />
                      <span className="text-sm">{segment.name}</span>
                    </div>
                    <span className="text-sm font-medium">${(segment.revenue / 1000000).toFixed(1)}M</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Risk and Compliance Reports */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Risk Report */}
          <Card>
            <CardHeader>
              <CardTitle>{t("reports.riskReport")}</CardTitle>
              <CardDescription>Client risk distribution analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {riskMetrics.map((risk, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{risk.category}</span>
                      <span className="text-sm text-muted-foreground">{risk.clients} clients</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          risk.category === "Low Risk"
                            ? "bg-green-500"
                            : risk.category === "Medium Risk"
                              ? "bg-yellow-500"
                              : "bg-red-500"
                        }`}
                        style={{ width: `${risk.percentage}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">{risk.percentage.toFixed(1)}% of total</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Compliance Report */}
          <Card>
            <CardHeader>
              <CardTitle>{t("reports.complianceReport")}</CardTitle>
              <CardDescription>Regulatory compliance metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {complianceMetrics.map((metric, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{metric.metric}</p>
                      <p className="text-sm text-muted-foreground">Target: {metric.target}%</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{metric.current}%</p>
                      <Badge
                        variant={
                          metric.status === "Excellent"
                            ? "default"
                            : metric.status === "Good"
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {metric.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Report Templates */}
        <Card>
          <CardHeader>
            <CardTitle>Report Templates</CardTitle>
            <CardDescription>Manage and generate reports from templates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4 mb-6">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="sales">Sales</SelectItem>
                  <SelectItem value="risk">Risk</SelectItem>
                  <SelectItem value="compliance">Compliance</SelectItem>
                  <SelectItem value="performance">Performance</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredReports.map((report) => (
                <div key={report.id} className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-medium">{report.name}</h3>
                      <p className="text-sm text-muted-foreground">{report.description}</p>
                    </div>
                    <Badge variant={report.status === "Active" ? "default" : "secondary"}>{report.status}</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                    <span>Category: {report.category}</span>
                    <span>Frequency: {report.frequency}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                    <span>Last Generated: {report.lastGenerated}</span>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Download className="h-3 w-3 mr-1" />
                      Generate
                    </Button>
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}
