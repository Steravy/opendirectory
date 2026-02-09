import React, { ReactNode } from 'react'

type PageContainerProps = {
    children: ReactNode;
}

const PageContainer = ({ children }: PageContainerProps) => {

    return (
        <div className='mx-auto max-w-7xl flex-1 px-4 py-12 sm:px-6 sm:py-40 lg:px-8'>
            {children}
        </div>
    )
}

export default PageContainer