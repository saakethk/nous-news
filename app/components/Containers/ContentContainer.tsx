
// AUTHOR: SAAKETH KESIREDDY
// LAST EDIT: 11/04/24

// TYPE
"use server";

// IMPORTS
import { UserButton } from '@clerk/nextjs';

// CONTENT CONTAINER COMPONENT
export default async function ContentContainer(
    { children, hasheader=true, heading="", hassearch=false, searchtype=""}: 
    { children: React.ReactNode, hasheader?: boolean, heading?: string, hassearch?: boolean, searchtype?: string }
) {
    
    if (hasheader) {

        // Renders container with header
        return (
            <>
                <div className="content_container">
                    <div className="content_heading_container flex justify-between">
                        <div className='flex gap-2 content_heading'>
                            <h1 className="heading content_heading">
                                {heading}
                            </h1>
                        </div>
                        <UserButton/>
                    </div>
                    <div className="content_container_content">
                        {children}
                    </div>
                </div>
            </>
        )

    } else {

        // Renders container with no header
        return (
            <div className="content_container">
                {children}
            </div>
        )

    }
}
