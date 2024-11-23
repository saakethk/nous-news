
// AUTHOR: SAAKETH KESIREDDY
// LAST EDIT: 11/22/24

// TYPE
"use server";

// IMPORTS
import { User } from "@/firebase/database_types";

// RECALL SUMMARY ITEM COMPONENT
function RecallSummaryItem(
    { statistic, heading }:
    { statistic: number, heading: string }
) {
    return (
        <div className="recall_summary_item">
            <div>
                <h1 className="recall_summary_item_title">
                    {statistic}
                </h1>
            </div>
            <div>
                <p className="recall_summary_item_caption">
                    {heading}
                </p>
            </div>
        </div>
    )
}

// RECALL SUMMARY CONTAINER COMPONENT
function RecallSummaryContainer(
    { user }:
    { user: User }
) {
    return (
        <div className="recall_summary_container">
            <div className="w-full p-0 -my-5">
                <p className="card_container_heading">
                    Summary
                </p>
            </div>
            <RecallSummaryItem 
            statistic={user.following.length} 
            heading="Sources Followed" />
            <RecallSummaryItem 
            statistic={user.discussed.length} 
            heading="Discussions Started" />
            <RecallSummaryItem 
            statistic={user.comments.length} 
            heading="Comments Made" />
            <RecallSummaryItem 
            statistic={user.liked.length} 
            heading="Liked Stories" />
            <RecallSummaryItem 
            statistic={user.liked_discussions.length} 
            heading="Liked Discussions" />
            <RecallSummaryItem 
            statistic={user.liked_comments.length} 
            heading="Liked Comments" />
        </div>
    )
}

export {
    RecallSummaryContainer
}