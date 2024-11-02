"use client";

import { Button } from "@nextui-org/react"
import { House, Newspaper, LogIn, MessagesSquare, History } from 'lucide-react';
import { useRouter } from "next/navigation";

function SideBarHomeButton({vertical}: {vertical: boolean}) {
    const router = useRouter();
    if (vertical) {
        return (
            <Button startContent={<House />} color="primary" variant="flat" className="sidebar_vertical_button" onClick={() => router.push('/')}>
                Home
            </Button>
        )
    }
    else {
        return (
            <Button isIconOnly color="primary" className="sidebar_horizontal_button" onClick={() => router.push('/')}>
                <House />
            </Button>
        )
    }
}

function SideBarNewsButton({vertical}: {vertical: boolean}) {
    const router = useRouter();
    if (vertical) {
        return (
            <Button startContent={<Newspaper />} color="primary" variant="flat" className="sidebar_vertical_button" onClick={() => router.push('/news')}>
                News
            </Button>  
        )
    }
    else {
        return (
            <Button isIconOnly color="primary" className="sidebar_horizontal_button" onClick={() => router.push('/news')}>
                <Newspaper />
            </Button> 
        )
    }
}

function SideBarDiscussionsButton({vertical}: {vertical: boolean}) {
    const router = useRouter();
    if (vertical) {
        return (
            <Button startContent={<MessagesSquare />} color="primary" variant="flat" className="sidebar_vertical_button" onClick={() => router.push('/discussions/trending')}>
                Discussions
            </Button>  
        )
    }
    else {
        return (
            <Button isIconOnly color="primary" className="sidebar_horizontal_button" onClick={() => router.push('/discussions/trending')}>
                <MessagesSquare />
            </Button> 
        )
    }
}

function SideBarHistoryButton({vertical}: {vertical: boolean}) {
    const router = useRouter();
    if (vertical) {
        return (
            <Button startContent={<History />} color="primary" variant="flat" className="sidebar_vertical_button" onClick={() => router.push('/account')}>
                History
            </Button>  
        )
    }
    else {
        return (
            <Button isIconOnly color="primary" className="sidebar_horizontal_button" onClick={() => router.push('/account')}>
                <History />
            </Button> 
        )
    }
}

function SideBarSignInButton({vertical}: {vertical: boolean}) {
    const router = useRouter();
    if (vertical) {
        return (
            <Button startContent={<LogIn />} color="primary" variant="flat" className="sidebar_vertical_button" onClick={() => router.push('/signin')}>
                Sign In
            </Button>  
        )
    }
    else {
        return (
            <Button isIconOnly color="primary" className="sidebar_horizontal_button" onClick={() => router.push('/signin')}>
                <LogIn />
            </Button> 
        )
    }
}

export { SideBarHomeButton, SideBarNewsButton, SideBarHistoryButton, SideBarSignInButton, SideBarDiscussionsButton };
