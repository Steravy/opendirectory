import { Card, CardContent, CardHeader, CardTitle } from "../../../client/components/ui/card"
import { Badge } from "../../../client/components/ui/badge"
import { mockTags } from "../data/mockTags"
import { TrendingUp, TrendingDown, Tag, TagIcon } from "lucide-react"

export function TagStats() {
  const totalTags = mockTags.length
  const activeTags = mockTags.filter(tag => tag.status === 'active').length
  const inactiveTags = mockTags.filter(tag => tag.status === 'inactive').length
  const recentTags = mockTags.filter(
    tag => new Date().getTime() - tag.createdAt.getTime() < 7 * 24 * 60 * 60 * 1000
  ).length

  // Find most used tag
  const mostUsedTag = mockTags.reduce((prev, current) => 
    (prev.listingsCount > current.listingsCount) ? prev : current
  )

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Tags</CardTitle>
          <Tag className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalTags}</div>
          <p className="text-xs text-muted-foreground">
            All tags in directory
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Tags</CardTitle>
          <TagIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">{activeTags}</div>
          <div className="flex items-center space-x-1">
            <Badge variant="secondary" className="text-xs">
              {inactiveTags} inactive
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
          <div className="text-2xl font-bold">{mostUsedTag.name}</div>
          <p className="text-xs text-muted-foreground">
            {mostUsedTag.listingsCount} listings
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Recent (7 days)</CardTitle>
          <TrendingDown className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{recentTags}</div>
          <p className="text-xs text-muted-foreground">
            Newly created tags
          </p>
        </CardContent>
      </Card>
    </div>
  )
}