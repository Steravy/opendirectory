import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../client/components/ui/card"
import { Button } from "../../client/components/ui/button"
import AdminDashboardLayout from '../layout/AdminDashboardLayout'
import { PageHeader } from '../components/PageHeader'
import { TagStats } from '../tags/components/TagStats'
import { TagDataTable } from '../tags/components/table/TagDataTable'
import { TagCloud } from '../tags/components/TagCloud'
import RegisterTagModal from '../tags/components/modals/register-tag-modal'
import { Separator } from '../../client/components/ui/separator'

const TagPage = () => {
    return (
        <AdminDashboardLayout>
            <div className="space-y-6">
                <PageHeader
                    title="Tag Management"
                    description="Create and manage tags to help organize and filter your directory listings."
                >
                    <RegisterTagModal />
                </PageHeader>

                {/* Stats Cards */}
                <TagStats />

                <Separator />

                {/* Data Table */}
                <div className="space-y-4">
                    <TagDataTable />
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Tag Actions</CardTitle>
                        <CardDescription>
                            Quick actions for tag management
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex-1 gap-2">
                            <Button variant="outline" disabled>
                                Import Tags
                            </Button>
                            <Button variant="outline" disabled>
                                Export Tags
                            </Button>
                            <Button variant="outline" disabled>
                                Bulk Edit
                            </Button>
                            <Button variant="outline" disabled>
                                Tag Analytics
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Tag Cloud</CardTitle>
                        <CardDescription>
                            Visual representation of tag usage frequency
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <TagCloud />
                    </CardContent>
                </Card>
            </div>
        </AdminDashboardLayout>
    )
}

export default TagPage;