
// AUTHOR: SAAKETH KESIREDDY
// LAST EDIT: 11/05/24

// TYPE
"use server";

// IMPORTS
import { Source, User } from "@/firebase/database_types";
import { Image } from "@nextui-org/react";
import { FollowSourceButton } from "../Buttons/Source/SourceButtons";

// SOURCE HEADER COMPONENT
export default async function SourceHeader(
    {user, source}: 
    {user: User, source: Source}
) {
    return (
        <div className="source_header_container">
            <Image
                alt="Source Thumbnail"
                className="object-cover source_header_banner"
                height={120}
                shadow="md"
                src={source.logo}
                width="100%"
            />
            <div className="source_header_metadata">
                <div className="source_header_text">
                    <h1 className="heading">
                        {source.name}
                    </h1>
                    <p className="secondary_heading light">
                        {source.num_stories} stories
                    </p>
                </div>
                <div className="source_follow_button_container">
                    <FollowSourceButton user={JSON.parse(JSON.stringify(user))} source={JSON.parse(JSON.stringify(source))} />
                </div>
            </div>
        </div>
    )
}