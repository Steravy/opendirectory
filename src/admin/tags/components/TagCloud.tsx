import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from "../../../client/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis } from "recharts"
import { mockTags } from "../data/mockTags"

export function TagCloud() {
  // Prepare chart data - get top 10 most used tags
  const chartData = mockTags
    .filter(tag => tag.listingsCount > 0)
    .sort((a, b) => b.listingsCount - a.listingsCount)
    .slice(0, 10)
    .map(tag => ({
      name: tag.name,
      listings: tag.listingsCount,
      fill: getTagColor(tag.listingsCount),
    }))

  const chartConfig = {
    listings: {
      label: "Listings",
    },
  } satisfies ChartConfig

  return (
    <div className="h-64">
      <ChartContainer config={chartConfig} className="h-full w-full">
        <BarChart
          data={chartData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 60,
          }}
        >
          <XAxis 
            dataKey="name" 
            angle={-45}
            textAnchor="end"
            height={60}
            fontSize={10}
          />
          <YAxis 
            fontSize={10}
          />
          <ChartTooltip 
            content={<ChartTooltipContent />}
            cursor={{ fill: 'rgba(0, 0, 0, 0.1)' }}
          />
          <Bar 
            dataKey="listings" 
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ChartContainer>
    </div>
  )
}

// Helper function to generate colors based on tag usage
function getTagColor(count: number): string {
  if (count >= 50) return 'hsl(var(--chart-1))'
  if (count >= 30) return 'hsl(var(--chart-2))'
  if (count >= 20) return 'hsl(var(--chart-3))'
  if (count >= 10) return 'hsl(var(--chart-4))'
  return 'hsl(var(--chart-5))'
}