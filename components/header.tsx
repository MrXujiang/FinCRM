"use client"

import { Bell, Search, User, Moon, Sun, Globe, Settings, LogOut } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/components/language-provider"
import { useAuth } from "@/components/auth-provider"
import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react"

export function Header() {
  const { theme, setTheme } = useTheme()
  const { language, setLanguage, t } = useLanguage()
  const { user, logout } = useAuth()
  const router = useRouter()
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  const handleSettings = () => {
    router.push("/settings")
  }

  const handleProfile = () => {
    router.push("/profile")
  }

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-card border-b">
      {/* Search */}
      <div className="flex items-center space-x-4 flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input placeholder={t("common.search")} className="pl-10 w-80" />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center space-x-4">
         <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" onClick={() => {
              setIsAddDialogOpen(true)
            }}>
              Pro版
            </Button>
          </DropdownMenuTrigger>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost">
             更多
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem><a href="https://flowmix.turntip.cn" target="_blank">多模态文档</a></DropdownMenuItem>
            <DropdownMenuItem><a href="http://mute.turntip.cn" target="_blank">多维表格</a></DropdownMenuItem>
            <DropdownMenuItem><a href="https://orange.turntip.cn" target="_blank">知识库</a></DropdownMenuItem>
            <DropdownMenuItem><a href="https://mindlink.turntip.cn" target="_blank">智能文档</a></DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        {/* Language Switcher */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Globe className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setLanguage("en")}>English {language === "en" && "✓"}</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setLanguage("zh")}>中文 {language === "zh" && "✓"}</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Theme Switcher */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>{t("theme.light")}</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>{t("theme.dark")}</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>{t("theme.system")}</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">3</Badge>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>{t("notifications.title")}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">{t("notifications.newLead")}</p>
                <p className="text-xs text-muted-foreground">
                  John Doe - {t("priority.high")} {t("notifications.priorityClient")}
                </p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">{t("notifications.riskAlert")}</p>
                <p className="text-xs text-muted-foreground">{t("notifications.portfolioExposure")}</p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">{t("notifications.complianceReview")}</p>
                <p className="text-xs text-muted-foreground">{t("notifications.monthlyReport")}</p>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://flowmix.turntip.cn/home-ai-logo.ea0d9a19.png" alt={t("profile.avatar")} />
                <AvatarFallback>
                  {user?.firstName?.[0]}
                  {user?.lastName?.[0]}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleProfile}>
              <User className="mr-2 h-4 w-4" />
              <span>{t("profile.title")}</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleSettings}>
              <Settings className="mr-2 h-4 w-4" />
              <span>{t("settings.title")}</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>{t("auth.logout")}</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Pro版本介绍 <span style={{color: '#06c'}}> (¥399/前100名粉丝)</span></DialogTitle>
                <DialogDescription>功能更强大的中后台管理系统模块</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <ul style={{color: '#64748b', fontWeight: 'bold'}}>
                  <li>1. 支持系统监控页面模块</li>
                  <li>2. 支持AI辅助页面模块</li>
                  <li>3. 支持AI问答助手插件</li>
                  <li>4. 支持表单设计器模块</li>
                  <li>5. 专业的本地开发部署咨询</li>
                </ul>
                <div>
                  源码获取方式:
                  <img src="https://flowmix.turntip.cn/fm/static/my.8ee63da4.png" alt="" style={{width: 160}} />
                </div>
              </div>
            </DialogContent>
          </Dialog>
    </header>
  )
}
