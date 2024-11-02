
import { Tooltip } from "@nextui-org/react";
import { CircleAlert } from "lucide-react";

export default function CardContainer({ heading, description, children }: { heading: string, description: string, children: React.ReactNode }) {
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
            <div className="card_container_content">
                {children}
            </div>
        </div>
    )
}


