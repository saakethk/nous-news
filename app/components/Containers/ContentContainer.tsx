import { UserButton } from "@clerk/nextjs"

export default function ContentContainer({ hasheader=true, heading, children}: {hasheader?: boolean, heading: string, children: React.ReactNode}) {
    
    if (hasheader) {
        return (
            <div className="content_container">
                <div className="content_heading_container flex justify-between">
                    <div>
                        <h1 className="heading">{heading ? heading : 'Default heading'}</h1>
                    </div>
                    <UserButton/>
                </div>
                <div className="content_container_content">
                    {children}
                </div>
            </div>
        )
    } else {
        return (
            <div className="content_container">
                {children}
            </div>
        )
    }
}
