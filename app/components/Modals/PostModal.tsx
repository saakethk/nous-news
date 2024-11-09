
import React from "react";
import { Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Textarea, ButtonGroup } from "@nextui-org/react";
import { Send, X, RefreshCcw } from "lucide-react";

function SuccessModal({ title, success_message, post_text, isOpen, onOpenChange, reset }: { title: string, success_message: string, post_text: string, isOpen: boolean, onOpenChange: (isOpen: boolean) => void, reset: () => void }) {
    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} hideCloseButton className="discuss_modal" placement="center">
            <ModalContent>
                {(onClose) => (
                <>
                    <ModalHeader className="flex flex-col gap-1">
                        {title}
                    </ModalHeader>
                    <ModalBody className="discussion_modal_body">
                        {success_message}
                        <Textarea
                            isReadOnly
                            color="primary"
                            variant="flat"
                            className="discussion_text_area"
                            value={post_text}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button variant="solid" color="primary" onPress={() => {reset();onClose();}} endContent={<RefreshCcw />}>
                            Reload
                        </Button>
                    </ModalFooter>
                </>)}
            </ModalContent>
        </Modal>
    )
}

function PostModal({ title, text_placeholder, text_limit, isOpen, onOpenChange, post_text, setPostText, publishPost }: { title: string, text_placeholder: string, text_limit: number, isOpen: boolean, onOpenChange: (isOpen: boolean) => void, post_text: string, setPostText: (value: string) => void, publishPost: () => void }) {
    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} hideCloseButton className="discuss_modal" placement="center">
            <ModalContent>
            {(onClose) => (
                <>
                <ModalHeader className="flex flex-col gap-1">
                    {title}
                </ModalHeader>
                <ModalBody className="discussion_modal_body">
                    <Textarea
                        isRequired
                        label={"Content (" + text_limit + " characters)"}
                        labelPlacement="inside"
                        placeholder={text_placeholder}
                        color="primary"
                        variant="flat"
                        className="discussion_text_area"
                        maxLength={280}
                        value={post_text}
                        onValueChange={setPostText}
                    />
                </ModalBody>
                <ModalFooter>
                    <ButtonGroup>
                        <Button color="danger" variant="solid" onPress={onClose} endContent={<X />}>
                            Cancel
                        </Button>
                        <Button variant="solid" color="primary" onPress={publishPost} endContent={<Send />}>
                            Post
                        </Button>
                    </ButtonGroup>
                </ModalFooter>
                </>
            )}
            </ModalContent>
        </Modal>
    )
}

export { SuccessModal, PostModal };