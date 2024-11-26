
// AUTHOR: SAAKETH KESIREDDY
// LAST EDIT: 11/25/24

// TYPE
"use client";

// IMPORTS
import { Tooltip } from "@nextui-org/react";
import { CircleAlert } from "lucide-react";
import { Snippet, Story, Discussion, Comment, Source, User } from "@/firebase/database_types";
import { getSnippets, getStories, getDiscussions, getComments, getSources } from "@/firebase/helper";
import { SnippetCard, SnippetCardLoader } from "../Cards/SnippetCard";
import { StoryCard, StoryCardLoader } from "../Cards/StoryCard";
import { DiscussionCard, DiscussionCardLoader } from "../Cards/DiscussionCard";
import { CommentCard, CommentCardLoader } from "../Cards/CommentCard";
import SourceCard from "../Cards/SourceCard";
import { useState, useEffect } from "react";
import { Button } from "@nextui-org/react";
import { ChevronRight } from "lucide-react";

function CardContainerContent(
    { ids, type, user }:
    { ids: Array<string>, type: string, user: User}
) {

    // Determines number of items to preload
    const num_preloaded: number = 7;

    // Stores items and status
    const [items, setItems] = useState([] as (Snippet[] | Story[] | Discussion[] | Comment[] | Source[]));
    const [cursor, setCursor] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [completed, setCompleted] = useState(false);

    // On initial load, this sets defaults
    useEffect(() => {
        (async () => {
            
            // Determines breakpoint given cursor
            const filtered_ids = ids.slice(cursor, cursor+num_preloaded);
            setCursor(cursor+num_preloaded);

            if (ids.length <= filtered_ids.length) {
                setCompleted(true);
            }

            // Gets items
            switch (type) {
                case "snippets": {
                    setItems(await getSnippets(filtered_ids));
                    break;
                }
                case "stories": {
                    setItems(await getStories(filtered_ids));
                    break;
                }
                case "discussions": {
                    setItems(await getDiscussions(filtered_ids));
                    break;
                }
                case "comments": {
                    setItems(await getComments(filtered_ids));
                    break;
                }
                case "sources": {
                    setItems(await getSources(filtered_ids));
                    break;
                }
            }
            setIsLoading(false);
        })();
    }, [])


    const handleClick = async () => {

        // Stores next items
        let loaded_items: (Snippet[] | Story[] | Discussion[] | Comment[] | Source[]);

        // Determines breakpoint given cursor
        const filtered_ids = ids.slice(cursor, cursor+num_preloaded);
        setCursor(cursor+num_preloaded);

        // Gets items
        switch (type) {
            case "snippets": {
                loaded_items = await getSnippets(filtered_ids);
                setItems(items.concat(loaded_items) as Snippet[])
                break;
            }
            case "stories": {
                loaded_items = await getStories(filtered_ids);
                setItems(items.concat(loaded_items) as Story[])
                break;
            }
            case "discussions": {
                loaded_items = await getDiscussions(filtered_ids);
                setItems(items.concat(loaded_items) as Discussion[])
                break;
            }
            case "comments": {
                loaded_items = await getComments(filtered_ids);
                setItems(items.concat(loaded_items) as Comment[])
                break;
            }
            case "sources": {
                loaded_items = await getSources(filtered_ids);
                setItems(items.concat(loaded_items) as Source[])
                break;
            }
        }

        if (loaded_items!.length == 0) {
            setCompleted(true);
        }
    };

    if (!isLoading) {
        switch (type) {
            case "snippets": {
                return (
                    <>
                        {items.map((snippet) => (
                            <SnippetCard key={snippet.id} snippet={JSON.parse(JSON.stringify(snippet))} />
                        ))}
                        {
                            (!completed) ?
                            <>
                                <div className="horizontal_preload_button_container">
                                    <Button isIconOnly color="primary" onPress={handleClick}>
                                        <ChevronRight />
                                    </Button>
                                </div>
                            </>:
                            <></>
                        }
                    </>
                )
            }
            case "stories": {
                return (
                    <>
                        {items.map((story) => (
                            <StoryCard key={story.id} story={JSON.parse(JSON.stringify(story))} />
                        ))}
                        {
                            (!completed) ?
                            <>
                                <div className="horizontal_preload_button_container">
                                    <Button isIconOnly color="primary" onPress={handleClick}>
                                        <ChevronRight />
                                    </Button>
                                </div>
                            </>:
                            <></>
                        }
                    </>
                )
            }
            case "discussions": {
                return (
                    <>
                        {items.map((discussion) => (
                            <DiscussionCard key={discussion.id} current_user={user} discussion={JSON.parse(JSON.stringify(discussion))} />
                        ))}
                        {
                            (!completed) ?
                            <>
                                <div className="horizontal_preload_button_container">
                                    <Button isIconOnly color="primary" onPress={handleClick}>
                                        <ChevronRight />
                                    </Button>
                                </div>
                            </>:
                            <></>
                        }
                    </>
                )
            }
            case "comments": {
                return (
                    <>
                        {items.map((comment) => (
                            <CommentCard key={comment.id} user={user} comment={JSON.parse(JSON.stringify(comment))} />
                        ))}
                        {
                            (!completed) ?
                            <>
                                <div className="horizontal_preload_button_container">
                                    <Button isIconOnly color="primary" onPress={handleClick}>
                                        <ChevronRight />
                                    </Button>
                                </div>
                            </>:
                            <></>
                        }
                    </>
                )
            }
            case "sources": {
                return (
                    <>
                        {items.map((source) => (
                            <SourceCard key={source.id} user={user} source={JSON.parse(JSON.stringify(source))} />
                        ))}
                        {
                            (!completed) ?
                            <>
                                <div className="horizontal_preload_button_container">
                                    <Button isIconOnly color="primary" onPress={handleClick}>
                                        <ChevronRight />
                                    </Button>
                                </div>
                            </>:
                            <></>
                        }
                    </>
                )
            }
        }
    } else {
        switch (type) {
            case "snippets": {
                return (
                    <>
                        {[...Array(num_preloaded).keys()].map((preload_id) => (
                            <SnippetCardLoader key={preload_id} />
                        ))}
                    </>
                )
            }
            case "stories": {
                return (
                    <>
                        {[...Array(num_preloaded).keys()].map((preload_id) => (
                            <StoryCardLoader key={preload_id} />
                        ))}
                    </>
                )
            }
            case "discussions": {
                return (
                    <>
                        {[...Array(num_preloaded).keys()].map((preload_id) => (
                            <DiscussionCardLoader key={preload_id} />
                        ))}
                    </>
                )
            }
            case "comments": {
                return (
                    <>
                        {[...Array(num_preloaded).keys()].map((preload_id) => (
                            <CommentCardLoader key={preload_id} />
                        ))}
                    </>
                )
            }
            case "sources": {
                return (
                    <>
                        {[...Array(num_preloaded).keys()].map((preload_id) => (
                            <CommentCardLoader key={preload_id} />
                        ))}
                    </>
                )
            }
        }
    }
}

// CARD PAGINATED CONTAINER COMPONENT
export default function CardPaginatedContainer(
    { heading, description, ids, type, user }: 
    { heading: string, description: string, ids: Array<string>, type: string, user: User }
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
                    <CardContainerContent ids={ids} type={type} user={user} />
                </div>
            </div>
        </div>
    )
}


