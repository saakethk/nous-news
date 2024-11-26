
// AUTHOR: SAAKETH KESIREDDY
// LAST EDIT: 11/05/24

// TYPE
"use client";

// IMPORTS
import { Card, CardBody, Image, Link } from "@nextui-org/react";
import { FollowSourceButton } from "../Buttons/Source/SourceButtons";
import { Source, User } from "@/firebase/database_types";

// SOURCE CARD COMPONENT
export default function SourceCard(
    {user, source}: 
    {user: User, source: Source}
) {
    return (
        <Card
            isBlurred
            className="border-none bg-background/60 dark:bg-default-100/50 basic_card"
            shadow="sm"
        >
            <CardBody>
                <div className="grid grid-cols-6 md:grid-cols-12 gap-1 md:gap-4 items-center justify-center">
                    <div className="relative col-span-6 md:col-span-4">
                        <Image
                            alt="Thumbnail"
                            className="object-cover"
                            height={120}
                            shadow="md"
                            src={source.logo}
                            width="100%"
                        />
                    </div>
                    <div className="flex flex-col col-span-6 md:col-span-8">
                        <div className="flex flex-col gap-0 basic_card_text">
                            <Link href={"/source/"+source.id}>
                                <h1 className="text-large font-medium mt-2 text-white/100 font-bold">{source.name}</h1>
                            </Link>
                            <p className="font-medium text-small text-foreground/80">{source.follows} followers ({source.num_stories} stories)</p>
                            <FollowSourceButton user={user} source={source} />
                        </div>
                    </div>
                </div>
            </CardBody>
        </Card>
    )
}
