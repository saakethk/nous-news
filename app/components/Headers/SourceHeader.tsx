
import { Source, User } from "@/firebase/database_types";
import { Image } from "@nextui-org/react";
import { FollowSourceButton } from "../Buttons/SourceButtons";

export default function SourceHeader({user, source}: {user: User, source: Source}) {
    return (
        <>
            <Image
                alt="Thumbnail"
                className="object-cover"
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
                    <p className="subheading">
                        {source.num_stories} stories
                    </p>
                </div>
                <div className="source_follow_button_container">
                    <FollowSourceButton user={JSON.parse(JSON.stringify(user))} source={JSON.parse(JSON.stringify(source))} />
                </div>
            </div>
        </>
    )
}