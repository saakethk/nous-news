
// AUTHOR: SAAKETH KESIREDDY
// LAST EDIT: 11/06/24

// TYPE
"use client";

// IMPORTS
import { Source, User } from "@/firebase/database_types";
import { useState, useEffect } from "react";
import { Button, Skeleton } from "@nextui-org/react";
import { Plus, Check } from "lucide-react";
import { checkFollowSource, followSource } from "@/firebase/helper";

// FOLLOWS SOURCE BUTTON
function FollowSourceButton(
    { user, source }: 
    { user: User, source: Source }
) {

    // Stores whether button states
    const [isFollowing, setIsFollowed] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Gets initial button state
    useEffect(() => {
        (async () => {
            setIsFollowed(await checkFollowSource(user, source));
            setIsLoading(false);
        })();
    }, [])

    // On button click, source is added to users following list
    const handleClick = async () => {
        const { success, follows } = await followSource(user, source);
        if (success) {
            setIsFollowed(true);
            source.follows = follows
        }
    }

    if (isLoading) {
        return (
            <Button endContent={<Plus />} variant="solid" color="primary" className="source_follow_button" isDisabled>
                <Skeleton className="w-3/5 rounded-lg">
                    <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                </Skeleton>
            </Button>
        )
    }
    else if (isFollowing) {
        return (
            <Button endContent={<Check />} variant="solid" color="primary" className="source_follow_button" isDisabled>
                {source.follows} Following
            </Button>
        )
    } else {
        return (
            <Button endContent={<Plus />} variant="solid" color="primary" className="source_follow_button" onPress={handleClick}>
                Follow
            </Button>
        )
    }
}

export { FollowSourceButton };