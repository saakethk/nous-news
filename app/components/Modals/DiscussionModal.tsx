
"use client";

import { useState } from "react";
import { Story, User } from "@/firebase/database_types";
import { createDiscussion } from "@/firebase/helper";
import { useRouter } from "next/navigation";
import { SuccessModal, PostModal } from "./PostModal";

export default function DiscussionModal({ user, story, isOpen, onOpenChange}: {user: User, story: Story, isOpen: boolean, onOpenChange: (isOpen: boolean) => void }) {
    
    const router = useRouter();
    const [discussionText, setDiscussionText] = useState("");
    const [posted, setPosted] = useState(false);

    const publishDiscussion = async () => {
        const post_response = await createDiscussion(user, story, discussionText)
        setPosted(post_response.success);
    };

    const resetHandler = () => {
        setPosted(false);
        setDiscussionText("");
        router.refresh();
    };
     
    if (posted) {
        return (
            <SuccessModal 
            title="Discussion" 
            success_message="Your discussion has been shared with the Nous community."
            post_text={discussionText} 
            isOpen={isOpen} 
            onOpenChange={onOpenChange}
            reset={resetHandler}
            />
        )
    }
    else {
        return (
            <PostModal
            title="Discussion"
            text_placeholder="Enlighten the world by starting a conversation..."
            text_limit={500}
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            post_text={discussionText}
            setPostText={setDiscussionText}
            publishPost={publishDiscussion}
            />
        )
    }

}