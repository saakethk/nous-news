
// AUTHOR: SAAKETH KESIREDDY
// LAST EDIT: 11/06/24

// TYPE
"use client";

// IMPORTS
import { Button } from "@nextui-org/react"
import { House, Newspaper, MessagesSquare, History } from 'lucide-react';
import { useRouter } from "next/navigation";

// SIDEBAR BUTTON - General Button Format
function SideBarButton(
    { text, children, vertical, link }: 
    { text: string, children: React.ReactNode, vertical: boolean, link: string }
) {

    // Gets all functions to associate with routing
    const router = useRouter();

    return (
        <>
            {(vertical) ? 
                <Button startContent={children} color="primary" variant="flat" className="sidebar_vertical_button" onClick={() => router.push(link)}>
                    {text}
                </Button>
                :
                <Button isIconOnly color="primary" className="sidebar_horizontal_button" onClick={() => router.push(link)}>
                    {children}
                </Button>
            }
        </>
    )
}

// SIDEBAR HOME BUTTON
function SideBarHomeButton({vertical}: {vertical: boolean}) {
    return (
        <SideBarButton text="Home" vertical={vertical} link="/">
            <House />
        </SideBarButton>
    )
}

// SIDEBAR NEWS BUTTON
function SideBarNewsButton({vertical}: {vertical: boolean}) {
    return (
        <SideBarButton text="News" vertical={vertical} link="/stories/trending">
            <Newspaper />
        </SideBarButton>
    )
}

// SIDEBAR DISCUSSIONS BUTTON
function SideBarDiscussionsButton({vertical}: {vertical: boolean}) {
    return (
        <SideBarButton text="Discussions" vertical={vertical} link="/discussions/trending">
            <MessagesSquare />
        </SideBarButton>
    )
}

// SIDEBAR HISTORY BUTTON
function SideBarHistoryButton({vertical}: {vertical: boolean}) {
    return (
        <SideBarButton text="Recall" vertical={vertical} link="/recall">
            <History />
        </SideBarButton>
    )
}

export { 
    SideBarHomeButton, 
    SideBarNewsButton, 
    SideBarHistoryButton, 
    SideBarDiscussionsButton 
}
