
export default function CardContainer({heading, children}: {heading: string, children: React.ReactNode}) {
    return (
        <div className="card_container">
            <h1 className="card_container_heading">{heading ? heading : 'Default heading'}</h1>
            <div className="card_container_content">
                {children}
            </div>
        </div>
    )
}


