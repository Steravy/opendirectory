import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../client/components/ui/card"
import AdminDashboardLayout from '../layout/AdminDashboardLayout'
import { PageHeader } from '../components/PageHeader'

const AdminDashboardHomePage = () => {
    return (
        <AdminDashboardLayout>
            <div className="space-y-6">
                <PageHeader
                    title="Admin Dashboard"
                    description="Welcome to the admin dashboard. Use the sidebar to navigate between different management sections."
                />

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <Card>
                        <CardHeader>
                            <CardTitle>Categories</CardTitle>
                            <CardDescription>
                                Manage directory categories
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">
                                Create, edit, and organize categories for your directory listings.
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Tags</CardTitle>
                            <CardDescription>
                                Manage directory tags
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">
                                Create and manage tags to help organize and filter listings.
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Users</CardTitle>
                            <CardDescription>
                                Manage platform users
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">
                                View and manage user accounts and permissions.
                            </p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Quick Stats</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-sm text-muted-foreground">Total Categories</span>
                                    <span className="font-semibold">0</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-muted-foreground">Total Tags</span>
                                    <span className="font-semibold">0</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-muted-foreground">Total Listings</span>
                                    <span className="font-semibold">0</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Activity</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">
                                No recent activity to display.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AdminDashboardLayout>
    )
}

export default AdminDashboardHomePage;