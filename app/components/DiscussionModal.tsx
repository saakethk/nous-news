"use client";

import { StoryCardBrief } from "./Cards/StoryCard";
import { Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Textarea } from "@nextui-org/react";
import { useState } from "react";
import { Story } from "@/firebase/database_types";
import { createDiscussion } from "@/firebase/helper";
import { Check, Send, X, SquareArrowOutUpRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DiscussionModal({ user_id, story, isOpen, onOpenChange}: {user_id: string, story: Story, isOpen: boolean, onOpenChange: (isOpen: boolean) => void }) {
    
    const router = useRouter();
    const [discussionText, setDiscussionText] = useState("");
    const [posted, setPosted] = useState(false);
    const [postId, setPostId] = useState("");

    const submitPostHandler = async () => {
        const post_response = await createDiscussion(user_id, story.id, discussionText)
        setPosted(post_response.success);
        setPostId(post_response.id);
    };
     
    if (posted) {
        return (
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} className="discuss_modal">
                <ModalContent>
                {(onClose) => (
                    <>
                    <ModalHeader className="flex flex-col gap-1">Create Discussion...</ModalHeader>
                    <ModalBody className="discussion_modal_body">
                        Your post has been successfully published.
                        <Textarea
                            endContent={<Check />}
                            isDisabled
                            isReadOnly
                            isRequired
                            variant="bordered"
                            placeholder="Enter your discussion starter..."
                            className="discussion_text_area_posted"
                            maxLength={250}
                            value={discussionText}
                            onValueChange={setDiscussionText}
                        />
                        <StoryCardBrief id={story.id} headline={story.title} image_url={story.image} likes={story.likes} />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="light" onPress={onClose} endContent={<X />}> 
                            Close
                        </Button>
                        <Button variant="bordered" color="primary" onPress={() => router.push("/discussion/"+postId)} endContent={<SquareArrowOutUpRight />}>
                            View Post
                        </Button>
                    </ModalFooter>
                    </>
                )}
                </ModalContent>
            </Modal>
        )
    }
    else {
        return (
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} className="discuss_modal">
                <ModalContent>
                {(onClose) => (
                    <>
                    <ModalHeader className="flex flex-col gap-1">Create Discussion...</ModalHeader>
                    <ModalBody className="discussion_modal_body">
                        <Textarea
                            isRequired
                            label="Content (250 characters)"
                            labelPlacement="inside"
                            placeholder="Enter your discussion starter..."
                            color="primary"
                            variant="flat"
                            className="discussion_text_area"
                            maxLength={250}
                            value={discussionText}
                            onValueChange={setDiscussionText}
                        />
                        <StoryCardBrief id={story.id} headline={story.title} image_url={story.image} likes={story.likes} />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="light" onPress={onClose} endContent={<X />}>
                            Cancel
                        </Button>
                        <Button variant="bordered" color="primary" onPress={submitPostHandler} endContent={<Send />}>
                            Post
                        </Button>
                    </ModalFooter>
                    </>
                )}
                </ModalContent>
            </Modal>
        )
    }

}