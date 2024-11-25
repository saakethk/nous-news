
// AUTHOR: SAAKETH KESIREDDY
// LAST EDIT: 11/24/24

// TYPE
"use client";

// IMPORTS
import CardContainer from "./CardContainer";
import { Snippet } from "@/firebase/database_types";
import { useState, useEffect } from "react";
import { getAllSnippets } from "@/firebase/helper";
import { SnippetCard, SnippetCardLoader } from "../Cards/SnippetCard";
import { Button } from "@nextui-org/react";
import { ChevronRight } from "lucide-react";

// CARD CONTAINER COMPONENT
export default function SnippetBriefContainer() {

    // Stores snippets and status
    const num_preloaded = 5;
    const [snippets, setSnippets] = useState([] as Snippet[]);
    const [isLoading, setIsLoading] = useState(true);
    const [completed, setCompleted] = useState(false);

    // On initial load, this sets defaults
    useEffect(() => {
        (async () => {
            // Gets snippets
            const stuff: Snippet[] = await getAllSnippets({} as Snippet, num_preloaded);
            setSnippets(stuff);
            setIsLoading(false);
        })();
    }, [])

    // Runs update snippets function when clicked
    const handleClick = async () => {

        // Retrieves snippets with cursor
        const snippets_retrieved = await getAllSnippets(snippets[snippets.length-1], num_preloaded)

        // Checks that there are still snippets to be retrieved
        if (snippets_retrieved.length == 0) {
            setCompleted(true);
        } else {
            setSnippets(snippets.concat(snippets_retrieved));
        }
    }

    return (
        <>
            {
                (!isLoading) ?
                <>
                    <CardContainer heading="Snippets" description="Playlists of stories curated for you">
                        {snippets.map((snippet) => (
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
                    </CardContainer>
                </>:
                <>
                    <CardContainer heading="Snippets" description="Playlists of stories curated for you">
                        {[...Array(num_preloaded).keys()].map((preload_id) => (
                            <SnippetCardLoader key={preload_id} />
                        ))}
                    </CardContainer>
                </>

            }
        </>
    )
}


