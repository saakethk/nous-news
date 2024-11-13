
// AUTHOR: SAAKETH KESIREDDY
// LAST EDIT: 11/12/24

// TYPE
"use client";

// IMPORTS
import { DiscussionCard, DiscussionCardLoader } from "../Cards/DiscussionCard";
import { getAllDiscussions } from "@/firebase/helper";
import { Discussion, Filter } from "@/firebase/database_types";
import { useState, useEffect } from "react";
import { Button } from "@nextui-org/react";
import { ChevronDown, PartyPopper } from "lucide-react";

// DISCUSSIONS CONTAINER
export default function DiscussionsContainer(
    { filter }: 
    { filter: Filter }
) {

    // Stores whether button is loading and liked
    const num_preloaded = 5;
    const [discussions, setDiscussions] = useState([] as Discussion[]);
    const [isLoading, setIsLoading] = useState(true);
    const [completed, setCompleted] = useState(false);

    // On initial load, this sets defaults
    useEffect(() => {
        (async () => {
            let discussions_retrieved: Discussion[];
            if (filter.where_filter == undefined) {
                discussions_retrieved = await getAllDiscussions(filter, {} as Discussion, num_preloaded);
            } else {
                discussions_retrieved = await getAllDiscussions(filter, {} as Discussion, num_preloaded, filter.where_filter);
            }
            setDiscussions(discussions_retrieved)
            setIsLoading(false);
        })();
    }, [])

    // Runs update story function when clicked
    const handleClick = async () => {
        let discussions_retrieved: Discussion[];
        // Checks if where filter needs to be applied
        if (filter.where_filter == undefined) {
            discussions_retrieved = await getAllDiscussions(filter, discussions[discussions.length-1], num_preloaded);
        } else {
            discussions_retrieved = await getAllDiscussions(filter, discussions[discussions.length-1], num_preloaded, filter.where_filter);
        }
        // Checks that there are still stories to be retrieved
        if (discussions_retrieved.length == 0) {
            setCompleted(true);
        } else {
            setDiscussions(discussions.concat(discussions_retrieved));
        }
    }

    return (
        <>
            <div className="discussions_extended_container">
                {
                    (!isLoading) ?
                    <>
                        {discussions.map((discussion) => (
                            <DiscussionCard key={discussion.id} discussion={JSON.parse(JSON.stringify(discussion))} isAdaptable={true} />
                        ))}
                    </>:
                    <>
                        {[...Array(num_preloaded).keys()].map((preload_id) => (
                            <DiscussionCardLoader key={preload_id} isAdaptable={true} />
                        ))}
                    </>
                }
            </div>
            <div className="flex">
                {
                    (!completed) ?
                    <Button endContent={<ChevronDown/>} className="pagination_button" onClick={handleClick}>
                        View More
                    </Button>:
                    <Button endContent={<PartyPopper/>} className="pagination_button">
                        You've reached the end
                    </Button>
                }
            </div>
        </>
    )
}