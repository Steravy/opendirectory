import { MoreHorizontal, Eye, Edit, Copy, Trash2 } from "lucide-react"
import { Button } from "../../../../client/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../../client/components/ui/dropdown-menu"
import { toast } from "sonner"

export type TagTableRow = {
  id: string
  name: string
  slug: string
  description: string | null
  createdAt: Date
  listingsCount: number
  status: 'active' | 'inactive'
}

interface TagRowActionsProps {
  tag: TagTableRow
}

export function TagRowActions({ tag }: TagRowActionsProps) {
  const handleView = () => {
    toast(`Viewing tag: ${tag.name}`)
  }

  const handleEdit = () => {
    toast(`Editing tag: ${tag.name}`)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(tag.slug)
    toast(`Copied slug "${tag.slug}" to clipboard`)
  }

  const handleDelete = () => {
    toast.error(`Delete tag: ${tag.name}`)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem onClick={handleView}>
          <Eye className="mr-2 h-4 w-4" />
          View
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleEdit}>
          <Edit className="mr-2 h-4 w-4" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleCopy}>
          <Copy className="mr-2 h-4 w-4" />
          Copy slug
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleDelete}
          className="text-red-600 focus:text-red-600"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}