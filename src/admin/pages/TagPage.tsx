import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../client/components/ui/card"
import { Button } from "../../client/components/ui/button"
import AdminDashboardLayout from '../layout/AdminDashboardLayout'

const TagPage = () => {
    return (
        <AdminDashboardLayout>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Tag Management</h1>
                        <p className="text-muted-foreground">
                            Create and manage tags to help organize and filter your directory listings.
                        </p>
                    </div>
                    <Button>
                        Create Tag
                    </Button>
                </div>

                <div className="grid gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Tags Overview</CardTitle>
                            <CardDescription>
                                All tags in your directory
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-center h-32 bg-muted/10 rounded-lg border-2 border-dashed">
                                <div className="text-center">
                                    <p className="text-sm text-muted-foreground mb-2">
                                        No tags found
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        Create your first tag to get started
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="grid gap-4 md:grid-cols-3">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Total Tags</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold">0</div>
                                <p className="text-xs text-muted-foreground">
                                    Tags created
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Active Tags</CardTitle>
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
                                <CardTitle className="text-lg">Popular Tags</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold">0</div>
                                <p className="text-xs text-muted-foreground">
                                    Most used tags
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Tag Actions</CardTitle>
                            <CardDescription>
                                Quick actions for tag management
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex gap-2">
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
                                Visual representation of tag usage
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-center h-24 bg-muted/10 rounded-lg">
                                <p className="text-sm text-muted-foreground">
                                    Tag cloud will appear here when tags are created
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AdminDashboardLayout>
    )
}

export default TagPage;