
// AUTHOR: SAAKETH KESIREDDY
// LAST EDIT: 11/05/24

// TYPE
"use client";

// IMPORTS
import { Card, Image, CardFooter, Link, Slider, Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { Snippet } from "@/firebase/database_types";
import { getNumDays, sendFeedback } from "@/firebase/helper";
import { useState } from "react";

// SNIPPET CARD
function SnippetCard({ snippet }: { snippet: Snippet }) {

    // Retreives router functions
    const router = useRouter()

    return (
        <Card
        isPressable
        onPress={() => router.push("/snippet/"+snippet.id)}
        isFooterBlurred
        radius="lg"
        className="border-none snippet_card"
        >
            <Image
                alt="Snippet Thumbnail"
                className="object-cover"
                height={200}
                src={snippet.thumbnail}
                width={200}
            />
            <CardFooter className="py-2 -my-1 justify-between overflow-hidden absolute before:rounded-xl bottom-1 w-[calc(100%)] shadow-small z-10">
                <p className="text-tiny text-white/80">
                    <b>
                        {getNumDays(snippet.date_created)}
                    </b>
                </p>
                <Link className="text-tiny text-white/100 bg-black/50 hover:bg-black/80 rounded-lg px-3 py-1" href={"/snippets/"+snippet.id}>
                    Read
                </Link>
            </CardFooter>
        </Card>
    )
}

function SnippetFeedbackCard({ snippet }: { snippet: Snippet } ) {

    // Stores the status of the slider
    const [localRating, setLocalRating] = useState(0.5);
    const [submitted, setSubmitted] = useState(false);

    // Updates feedback of snippet
    const handleClick = async () => {
        const { success, rating } = await sendFeedback(snippet, localRating);
        if (success) {
            setLocalRating(rating);
            setSubmitted(true);
        }
    } 

    return (
        <div className="snippet_feedback_container">
            {
                (!submitted) ?
                <>
                    <Slider 
                    label="How satisfied were you with this snippet?" 
                    showTooltip={true}
                    step={0.1} 
                    maxValue={1}
                    minValue={0}
                    hideValue={true}
                    marks={[
                        {
                        value: 0.2,
                        label: "20%",
                        },
                        {
                        value: 0.5,
                        label: "50%",
                        },
                        {
                        value: 0.8,
                        label: "80%",
                        },
                    ]}
                    defaultValue={localRating}
                    onChange={(e) => setLocalRating(e as number)}
                    className="max-w-lg"
                    />
                    <Button variant="shadow" color="primary" className="snippet_feedback_submit" onClick={handleClick}>
                        Submit
                    </Button>
                </>:
                <>
                    <div>
                        Your feedback had been recorded.
                    </div>
                </>
            }
        </div>
    )
}

export {
    SnippetCard,
    SnippetFeedbackCard
}
