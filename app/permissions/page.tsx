"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
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
import { MainLayout } from "@/components/layout/main-layout"
import { useLanguage } from "@/components/language-provider"
import { Search, Plus, Shield, Users, Settings, Edit, Trash2 } from "lucide-react"

const roles = [
  {
    id: 1,
    name: "Super Admin",
    description: "Full system access with all permissions",
    userCount: 2,
    permissions: ["user_management", "role_management", "system_settings", "data_export", "compliance_management"],
    color: "bg-red-100 text-red-800",
  },
  {
    id: 2,
    name: "Admin",
    description: "Administrative access with limited system settings",
    userCount: 5,
    permissions: ["user_management", "lead_management", "order_management", "reports"],
    color: "bg-blue-100 text-blue-800",
  },
  {
    id: 3,
    name: "Sales Manager",
    description: "Sales team management and reporting access",
    userCount: 8,
    permissions: ["lead_management", "order_management", "client_management", "sales_reports"],
    color: "bg-green-100 text-green-800",
  },
  {
    id: 4,
    name: "Risk Analyst",
    description: "Risk management and compliance monitoring",
    userCount: 3,
    permissions: ["risk_management", "compliance_monitoring", "risk_reports"],
    color: "bg-yellow-100 text-yellow-800",
  },
  {
    id: 5,
    name: "Sales Rep",
    description: "Basic sales operations and client interaction",
    userCount: 15,
    permissions: ["lead_view", "client_interaction", "basic_reports"],
    color: "bg-purple-100 text-purple-800",
  },
]

const allPermissions = [
  { id: "user_management", name: "User Management", category: "Administration" },
  { id: "role_management", name: "Role Management", category: "Administration" },
  { id: "system_settings", name: "System Settings", category: "Administration" },
  { id: "lead_management", name: "Lead Management", category: "Sales" },
  { id: "order_management", name: "Order Management", category: "Sales" },
  { id: "client_management", name: "Client Management", category: "Sales" },
  { id: "product_management", name: "Product Management", category: "Sales" },
  { id: "risk_management", name: "Risk Management", category: "Risk & Compliance" },
  { id: "compliance_monitoring", name: "Compliance Monitoring", category: "Risk & Compliance" },
  { id: "asset_management", name: "Asset Management", category: "Finance" },
  { id: "transaction_management", name: "Transaction Management", category: "Finance" },
  { id: "reports", name: "All Reports", category: "Reporting" },
  { id: "sales_reports", name: "Sales Reports", category: "Reporting" },
  { id: "risk_reports", name: "Risk Reports", category: "Reporting" },
  { id: "data_export", name: "Data Export", category: "Data" },
  { id: "data_import", name: "Data Import", category: "Data" },
]

export default function PermissionsPage() {
  const { t } = useLanguage()
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([])

  const filteredRoles = roles.filter(
    (role) =>
      role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const permissionsByCategory = allPermissions.reduce(
    (acc, permission) => {
      if (!acc[permission.category]) {
        acc[permission.category] = []
      }
      acc[permission.category].push(permission)
      return acc
    },
    {} as Record<string, typeof allPermissions>,
  )

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">{t("permissions.title")}</h1>
            <p className="text-muted-foreground">{t("permissions.description")}</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                {t("permissions.addRole")}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{t("permissions.addRole")}</DialogTitle>
                <DialogDescription>Create a new role with specific permissions</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="role-name">Role Name</Label>
                  <Input id="role-name" placeholder="Enter role name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role-description">Description</Label>
                  <Textarea id="role-description" placeholder="Enter role description" />
                </div>
                <div className="space-y-4">
                  <Label>Permissions</Label>
                  {Object.entries(permissionsByCategory).map(([category, permissions]) => (
                    <div key={category} className="space-y-2">
                      <h4 className="font-medium text-sm">{category}</h4>
                      <div className="grid grid-cols-2 gap-2 pl-4">
                        {permissions.map((permission) => (
                          <div key={permission.id} className="flex items-center space-x-2">
                            <Checkbox
                              id={permission.id}
                              checked={selectedPermissions.includes(permission.id)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setSelectedPermissions([...selectedPermissions, permission.id])
                                } else {
                                  setSelectedPermissions(selectedPermissions.filter((p) => p !== permission.id))
                                }
                              }}
                            />
                            <Label htmlFor={permission.id} className="text-sm">
                              {permission.name}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Create Role</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Role Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Roles</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{roles.length}</div>
              <p className="text-xs text-muted-foreground">Active roles</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{roles.reduce((sum, role) => sum + role.userCount, 0)}</div>
              <p className="text-xs text-muted-foreground">Users with roles</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Permissions</CardTitle>
              <Settings className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{allPermissions.length}</div>
              <p className="text-xs text-muted-foreground">Available permissions</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Object.keys(permissionsByCategory).length}</div>
              <p className="text-xs text-muted-foreground">Permission categories</p>
            </CardContent>
          </Card>
        </div>

        {/* Roles Management */}
        <Card>
          <CardHeader>
            <CardTitle>Role Management</CardTitle>
            <CardDescription>Manage user roles and their permissions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4 mb-6">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search roles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Roles Table */}
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Role</TableHead>
                  <TableHead>Users</TableHead>
                  <TableHead>Permissions</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRoles.map((role) => (
                  <TableRow key={role.id}>
                    <TableCell>
                      <div>
                        <div className="flex items-center space-x-2">
                          <Badge className={role.color}>{role.name}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{role.description}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">{role.userCount}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {role.permissions.slice(0, 3).map((permission) => (
                          <Badge key={permission} variant="outline" className="text-xs">
                            {allPermissions.find((p) => p.id === permission)?.name}
                          </Badge>
                        ))}
                        {role.permissions.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{role.permissions.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Permission Matrix */}
        <Card>
          <CardHeader>
            <CardTitle>Permission Matrix</CardTitle>
            <CardDescription>Overview of permissions by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {Object.entries(permissionsByCategory).map(([category, permissions]) => (
                <div key={category}>
                  <h3 className="font-medium mb-3">{category}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {permissions.map((permission) => (
                      <div key={permission.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <span className="text-sm">{permission.name}</span>
                        <Badge variant="outline" className="text-xs">
                          {roles.filter((role) => role.permissions.includes(permission.id)).length} roles
                        </Badge>
                      </div>
                    ))}
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
