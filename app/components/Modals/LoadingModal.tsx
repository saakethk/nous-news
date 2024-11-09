
"use client";

import React from "react";
import { Modal, ModalContent } from "@nextui-org/react";
import { CircularProgress } from "@nextui-org/react";

export default function LoadingModal({ isOpen, onOpenChange }: {isOpen: boolean, onOpenChange: () => void}) {
    return (
        <>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} hideCloseButton className="discuss_modal" placement="center">
                <ModalContent>
                    <div className="search_loader">
                        <CircularProgress aria-label="Loading..." />
                        <p className="small_heading">
                            Loading Search...
                        </p>
                    </div>
                </ModalContent>
            </Modal>
        </>
    )
}