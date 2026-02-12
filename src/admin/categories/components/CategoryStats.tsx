import { Card, CardContent, CardHeader, CardTitle } from "../../../client/components/ui/card"
import { Badge } from "../../../client/components/ui/badge"
import { mockCategories } from "../data/mockCategories"
import { TrendingUp, TrendingDown, Folders, FolderCheck } from "lucide-react"

export function CategoryStats() {
  const totalCategories = mockCategories.length
  const activeCategories = mockCategories.filter(cat => cat.status === 'active').length
  const inactiveCategories = mockCategories.filter(cat => cat.status === 'inactive').length
  const recentCategories = mockCategories.filter(
    cat => new Date().getTime() - cat.createdAt.getTime() < 7 * 24 * 60 * 60 * 1000
  ).length

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Categories</CardTitle>
          <Folders className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalCategories}</div>
          <p className="text-xs text-muted-foreground">
            All categories in directory
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Categories</CardTitle>
          <FolderCheck className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">{activeCategories}</div>
          <div className="flex items-center space-x-1">
            <Badge variant="secondary" className="text-xs">
              {inactiveCategories} inactive
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Most Used</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">Productivity</div>
          <p className="text-xs text-muted-foreground">
            31 listings
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Recent (7 days)</CardTitle>
          <TrendingDown className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{recentCategories}</div>
          <p className="text-xs text-muted-foreground">
            Newly created categories
          </p>
        </CardContent>
      </Card>
    </div>
  )
}