"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useLanguage } from "@/components/language-provider"
import {
  BarChart3,
  Users,
  Shield,
  UserPlus,
  Wallet,
  ShoppingCart,
  Package,
  CreditCard,
  AlertTriangle,
  FileCheck,
  TrendingUp,
  Activity,
  Settings,
  ChevronLeft,
  ChevronRight,
  Building2,
  Bot,
} from "lucide-react"

const menuItems = [
  {
    title: "nav.dashboard",
    href: "/dashboard",
    icon: BarChart3,
  },
  {
    title: "nav.users",
    href: "/users",
    icon: Users,
  },
  {
    title: "nav.permissions",
    href: "/permissions",
    icon: Shield,
  },
  {
    title: "nav.leads",
    href: "/leads",
    icon: UserPlus,
  },
  {
    title: "nav.assets",
    href: "/assets",
    icon: Wallet,
  },
  {
    title: "nav.orders",
    href: "/orders",
    icon: ShoppingCart,
  },
  {
    title: "nav.products",
    href: "/products",
    icon: Package,
  },
  {
    title: "nav.transactions",
    href: "/transactions",
    icon: CreditCard,
  },
  {
    title: "nav.risk",
    href: "/risk",
    icon: AlertTriangle,
  },
  {
    title: "nav.compliance",
    href: "/compliance",
    icon: FileCheck,
  },
  {
    title: "nav.reports",
    href: "/reports",
    icon: TrendingUp,
  },
  {
    title: "nav.settings",
    href: "/settings",
    icon: Settings,
  },
]

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname()
  const { t } = useLanguage()

  return (
    <div
      className={cn(
        "relative flex flex-col h-full bg-card border-r transition-all duration-300",
        collapsed ? "w-16" : "w-64",
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <Building2 className="h-8 w-8 text-primary" />
            <span className="font-bold text-lg">FinCRM</span>
          </div>
        )}
        <Button variant="ghost" size="icon" onClick={onToggle} className="h-8 w-8">
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-2 py-4">
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn("w-full justify-start", collapsed ? "px-2" : "px-3", isActive && "bg-secondary")}
                >
                  <Icon className="h-4 w-4" />
                  {!collapsed && <span className="ml-3">{t(item.title)}</span>}
                </Button>
              </Link>
            )
          })}
        </nav>
      </ScrollArea>
    </div>
  )
}
