
// AUTHOR: SAAKETH KESIREDDY
// LAST EDIT: 11/05/24

// TYPE
"use client";

// IMPORTS
import { StoryCard, StoryCardLoader,  } from "../Cards/StoryCard";
import { Story, Filter } from "@/firebase/database_types";
import { getAllStories } from "@/firebase/helper";
import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { ChevronDown, PartyPopper } from "lucide-react";

// STORIES CONTAINER
export default function StoriesContainer(
    { filter }: 
    { filter: Filter }
) {

    // Stores whether button is loading and liked
    const num_preloaded = 5;
    const [stories, setStories] = useState([] as Story[]);
    const [isLoading, setIsLoading] = useState(true);
    const [completed, setCompleted] = useState(false);

    // On initial load, this sets defaults
    useEffect(() => {
        (async () => {
            let stories_retrieved: Story[];
            if (filter.where_filter == undefined) {
                stories_retrieved = await getAllStories(filter, {} as Story, num_preloaded);
            } else {
                stories_retrieved = await getAllStories(filter, {} as Story, num_preloaded, filter.where_filter);
            }
            setStories(stories_retrieved);
            setIsLoading(false);
        })();
    }, [])

    // Runs update story function when clicked
    const handleClick = async () => {
        let stories_retrieved: Story[];
        // Checks if where filter needs to be applied
        if (filter.where_filter == undefined) {
            stories_retrieved = await getAllStories(filter, stories[stories.length-1], num_preloaded);
        } else {
            stories_retrieved = await getAllStories(filter, stories[stories.length-1], num_preloaded, filter.where_filter);
        }
        // Checks that there are still stories to be retrieved
        if (stories_retrieved.length == 0) {
            setCompleted(true);
        } else {
            setStories(stories.concat(stories_retrieved));
        }
    }

    return (
        <>
            <div className="discussions_extended_container">
                {
                    (!isLoading) ?
                    <>
                        {stories.map((story) => (
                            <StoryCard key={story.id} story={JSON.parse(JSON.stringify(story))} />
                        ))}
                    </>:
                    <>
                        {[...Array(num_preloaded).keys()].map((preload_id) => (
                            <StoryCardLoader key={preload_id} />
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