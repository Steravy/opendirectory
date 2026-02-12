import React from 'react'
import AdminDashboardLayout from '../layout/AdminDashboardLayout'
import RegisterCategoryModal from '../categories/components/modals/register-category-modal'
import { CategoryStats } from '../categories/components/CategoryStats'
import { CategoryDataTable } from '../categories/components/table/CategoryDataTable'
import { Separator } from '../../client/components/ui/separator'
import { PageHeader } from '../components/PageHeader'

const CategoryPage = () => {
    return (
        <AdminDashboardLayout>
            <div className="space-y-6">
                {/* Header Section */}
                <PageHeader
                    title="Category Management"
                    description="Create and manage categories to organize your directory listings."
                >
                    <RegisterCategoryModal />
                </PageHeader>

                {/* Stats Cards */}
                <CategoryStats />

                <Separator />

                {/* Data Table */}
                <div className="space-y-4">
                    <CategoryDataTable />
                </div>
            </div>
        </AdminDashboardLayout>
    )
}

export default CategoryPage;