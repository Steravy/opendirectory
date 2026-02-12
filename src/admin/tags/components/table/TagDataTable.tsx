import { DataTable } from "../../../../client/components/ui/data-table"
import { tagColumns } from "./TagTableColumns"
import { mockTags } from "../../data/mockTags"

export function TagDataTable() {
  return (
    <DataTable
      columns={tagColumns}
      data={mockTags}
      searchKey="name"
      searchPlaceholder="Search tags..."
    />
  )
}