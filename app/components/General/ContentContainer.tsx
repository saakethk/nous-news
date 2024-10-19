
export default function ContentContainer({ hasheader=true, heading, subheading, children}: {hasheader?: boolean, heading: string, subheading: string, children: React.ReactNode}) {
    
    if (hasheader) {
        return (
            <div className="content_container">
                <h1 className="heading">{heading ? heading : 'Default heading'}</h1>
                <h2 className="subheading">{subheading ? subheading : 'Default subheading'}</h2>
                {children}
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
