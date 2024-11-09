
// AUTHOR: SAAKETH KESIREDDY
// LAST EDIT: 11/06/24

// TYPE
"use server";

// IMPORTS
import { Tooltip } from "@nextui-org/react";
import { CircleAlert } from "lucide-react";

// CARD CONTAINER COMPONENT
export default async function CardContainer(
    { heading, description, children }: 
    { heading: string, description: string, children: React.ReactNode }
) {
    return (
        <div className="card_container">
            <div className="card_container_heading flex justify-between">
                <h1 className="card_container_heading">
                    {heading ? heading : 'Default heading'}
                </h1>
                <Tooltip
                    className="card_container_description"
                    content={
                        <p>
                            {description}
                        </p>
                    }
                >
                    <CircleAlert />
                </Tooltip>
            </div>
            <div className="card_container_content_container">
                <div className="card_container_content">
                    {children}
                </div>
            </div>
        </div>
    )
}


