
export default function ContentContainer({heading, subheading, children}: {heading: string, subheading: string, children: React.ReactNode}) {
    return (
        <div className="content_container">
            <h1 className="heading">{heading ? heading : 'Default heading'}</h1>
            <h2 className="subheading">{subheading ? subheading : 'Default subheading'}</h2>
            {children}
        </div>
    )
}
