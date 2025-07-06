"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { MainLayout } from "@/components/layout/main-layout"
import { useLanguage } from "@/components/language-provider"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"
import { AlertCircle, CheckCircle, Clock, Shield, Users, FileText, Activity } from "lucide-react"

const complianceMetrics = [
  { name: "KYC Compliant", value: 95, color: "#10b981" },
  { name: "AML Cleared", value: 88, color: "#3b82f6" },
  { name: "Documentation", value: 92, color: "#f59e0b" },
  { name: "Risk Assessment", value: 85, color: "#ef4444" },
]

const complianceStatus = [
  { category: "KYC", compliant: 142, pending: 8, total: 150 },
  { category: "AML", compliant: 132, pending: 18, total: 150 },
  { category: "FATCA", compliant: 138, pending: 12, total: 150 },
  { category: "CRS", compliant: 145, pending: 5, total: 150 },
]

const pendingReviews = [
  {
    id: 1,
    client: "TechCorp Inc.",
    type: "KYC Renewal",
    priority: "High",
    dueDate: "2024-01-20",
    assignedTo: "Alice Johnson",
    status: "In Progress",
    daysOverdue: 0,
  },
  {
    id: 2,
    client: "Global Solutions Ltd.",
    type: "AML Screening",
    priority: "Critical",
    dueDate: "2024-01-18",
    assignedTo: "Bob Smith",
    status: "Overdue",
    daysOverdue: 2,
  },
  {
    id: 3,
    client: "Innovation Partners",
    type: "Risk Assessment",
    priority: "Medium",
    dueDate: "2024-01-25",
    assignedTo: "Carol Davis",
    status: "Pending",
    daysOverdue: 0,
  },
  {
    id: 4,
    client: "StartupXYZ",
    type: "Documentation Review",
    priority: "Low",
    dueDate: "2024-01-30",
    assignedTo: "David Wilson",
    status: "Scheduled",
    daysOverdue: 0,
  },
]

const complianceAlerts = [
  {
    id: 1,
    type: "AML Alert",
    severity: "Critical",
    client: "Global Solutions Ltd.",
    description: "Suspicious transaction pattern detected",
    date: "2024-01-15",
    status: "Under Investigation",
  },
  {
    id: 2,
    type: "KYC Expiry",
    severity: "High",
    client: "TechCorp Inc.",
    description: "KYC documentation expires in 5 days",
    date: "2024-01-14",
    status: "Renewal Initiated",
  },
  {
    id: 3,
    type: "Regulatory Change",
    severity: "Medium",
    client: "All Clients",
    description: "New FATCA reporting requirements",
    date: "2024-01-13",
    status: "Implementation Planned",
  },
  {
    id: 4,
    type: "Documentation Gap",
    severity: "Low",
    client: "Innovation Partners",
    description: "Missing beneficial ownership information",
    date: "2024-01-12",
    status: "Requested",
  },
]

const priorityColors = {
  Critical: "bg-red-100 text-red-800",
  High: "bg-orange-100 text-orange-800",
  Medium: "bg-yellow-100 text-yellow-800",
  Low: "bg-green-100 text-green-800",
}

const statusColors = {
  "In Progress": "bg-blue-100 text-blue-800",
  Overdue: "bg-red-100 text-red-800",
  Pending: "bg-yellow-100 text-yellow-800",
  Scheduled: "bg-green-100 text-green-800",
  "Under Investigation": "bg-red-100 text-red-800",
  "Renewal Initiated": "bg-blue-100 text-blue-800",
  "Implementation Planned": "bg-yellow-100 text-yellow-800",
  Requested: "bg-orange-100 text-orange-800",
}

export default function CompliancePage() {
  const { t } = useLanguage()

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">{t("compliance.title")}</h1>
            <p className="text-muted-foreground">{t("compliance.description")}</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">Compliance Report</Button>
            <Button>New Review</Button>
          </div>
        </div>

        {/* Compliance Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Compliance Score</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">90%</div>
              <div className="flex items-center text-xs text-green-600">
                <CheckCircle className="h-3 w-3 mr-1" />
                +2% from last month
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingReviews.length}</div>
              <p className="text-xs text-muted-foreground">
                {pendingReviews.filter((r) => r.status === "Overdue").length} overdue
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{complianceAlerts.length}</div>
              <p className="text-xs text-muted-foreground">
                {complianceAlerts.filter((a) => a.severity === "Critical").length} critical
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Compliant Clients</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">135</div>
              <p className="text-xs text-muted-foreground">Out of 150 total</p>
            </CardContent>
          </Card>
        </div>

        {/* Compliance Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Compliance Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Compliance Overview</CardTitle>
              <CardDescription>Overall compliance status by category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {complianceMetrics.map((metric, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{metric.name}</span>
                      <span className="text-sm text-muted-foreground">{metric.value}%</span>
                    </div>
                    <Progress value={metric.value} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Compliance Status by Category */}
          <Card>
            <CardHeader>
              <CardTitle>Status by Category</CardTitle>
              <CardDescription>Compliance status breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={complianceStatus}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="compliant" fill="#10b981" name="Compliant" />
                  <Bar dataKey="pending" fill="#f59e0b" name="Pending" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Pending Reviews */}
        <Card>
          <CardHeader>
            <CardTitle>Pending Reviews</CardTitle>
            <CardDescription>Compliance reviews requiring attention</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client</TableHead>
                  <TableHead>Review Type</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Assigned To</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingReviews.map((review) => (
                  <TableRow key={review.id}>
                    <TableCell>
                      <span className="font-medium">{review.client}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span>{review.type}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={priorityColors[review.priority as keyof typeof priorityColors]}>
                        {review.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p>{review.dueDate}</p>
                        {review.daysOverdue > 0 && (
                          <p className="text-xs text-red-600">{review.daysOverdue} days overdue</p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{review.assignedTo}</TableCell>
                    <TableCell>
                      <Badge className={statusColors[review.status as keyof typeof statusColors]}>
                        {review.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                        <Button variant="ghost" size="sm">
                          Complete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Compliance Alerts */}
        <Card>
          <CardHeader>
            <CardTitle>Compliance Alerts</CardTitle>
            <CardDescription>Active compliance monitoring alerts</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Alert Type</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {complianceAlerts.map((alert) => (
                  <TableRow key={alert.id}>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Activity className="h-4 w-4 text-muted-foreground" />
                        <span>{alert.type}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={priorityColors[alert.severity as keyof typeof priorityColors]}>
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
                          Investigate
                        </Button>
                        <Button variant="ghost" size="sm">
                          Resolve
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Compliance Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {complianceStatus.map((status) => (
            <Card key={status.category}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">{status.category} Compliance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Compliant</span>
                    <span className="text-sm font-medium">{status.compliant}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Pending</span>
                    <span className="text-sm font-medium">{status.pending}</span>
                  </div>
                  <Progress value={(status.compliant / status.total) * 100} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    {Math.round((status.compliant / status.total) * 100)}% compliant
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  )
}
