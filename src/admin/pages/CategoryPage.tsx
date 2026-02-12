import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../client/components/ui/card"
import { Button } from "../../client/components/ui/button"
import RegisterCategoryModal from '../categories/components/modals/register-category-modal'
import AdminDashboardLayout from '../layout/AdminDashboardLayout'

const CategoryPage = () => {
    return (
        <AdminDashboardLayout>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Category Management</h1>
                        <p className="text-muted-foreground">
                            Create and manage categories to organize your directory listings.
                        </p>
                    </div>
                    <RegisterCategoryModal />
                </div>

                <div className="grid gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Categories Overview</CardTitle>
                            <CardDescription>
                                All categories in your directory
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-center h-32 bg-muted/10 rounded-lg border-2 border-dashed">
                                <div className="text-center">
                                    <p className="text-sm text-muted-foreground mb-2">
                                        No categories found
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        Create your first category to get started
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="grid gap-4 md:grid-cols-3">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Total Categories</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold">0</div>
                                <p className="text-xs text-muted-foreground">
                                    Categories created
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Active Categories</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold">0</div>
                                <p className="text-xs text-muted-foreground">
                                    With published listings
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Recent Activity</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold">0</div>
                                <p className="text-xs text-muted-foreground">
                                    Categories added this week
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Category Actions</CardTitle>
                            <CardDescription>
                                Quick actions for category management
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex gap-2">
                                <Button variant="outline" disabled>
                                    Import Categories
                                </Button>
                                <Button variant="outline" disabled>
                                    Export Categories
                                </Button>
                                <Button variant="outline" disabled>
                                    Bulk Edit
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AdminDashboardLayout>
    )
}

export default CategoryPage;