import { DataTable } from "../../../../client/components/ui/data-table"
import { categoryColumns } from "./CategoryTableColumns"
import { mockCategories } from "../../data/mockCategories"

export function CategoryDataTable() {
  return (
    <DataTable
      columns={categoryColumns}
      data={mockCategories}
      searchKey="name"
      searchPlaceholder="Search categories..."
    />
  )
}