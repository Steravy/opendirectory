import React from 'react'
import { AppSidebar } from "../../client/components/app-sidebar"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "../../client/components/ui/breadcrumb"
import { Separator } from "../../client/components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "../../client/components/ui/sidebar"
import RegisterCategoryForm from '../categories/components/forms/register-category-form'
import RegisterCategoryModal from '../categories/components/modals/register-category-modal'

const DashboardPage = () => {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-12 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator
                            orientation="vertical"
                            className="mr-2 data-[orientation=vertical]:h-4"
                        />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem className="hidden md:block">
                                    <BreadcrumbLink href="#">
                                        Build Your Application
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator className="hidden md:block" />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">

                    {/* <RegisterCategoryForm /> */}
                    <RegisterCategoryModal />

                    {/* <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                        <div className="bg-muted/50 aspect-video rounded-xl" />
                        <div className="bg-muted/50 aspect-video rounded-xl" />
                        <div className="bg-muted/50 aspect-video rounded-xl" />
                    </div>
                    <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" /> */}
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}

export default DashboardPage;