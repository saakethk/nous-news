"use client";

import { Button } from "@nextui-org/react"
import { House, Newspaper, User, LogIn } from 'lucide-react';
import { useRouter } from "next/navigation";

function SideBarHomeButton({vertical}: {vertical: boolean}) {
    const router = useRouter();
    if (vertical) {
        return (
            <Button startContent={<House />} color="primary" variant="shadow" className="sidebar_vertical_button" onClick={() => router.push('/')}>
            Home
            </Button>
        )
    }
    else {
        return (
            <Button isIconOnly color="primary" variant="shadow" className="sidebar_horizontal_button" onClick={() => router.push('/')}>
                <House />
            </Button>
        )
    }
}

function SideBarNewsButton({vertical}: {vertical: boolean}) {
    const router = useRouter();
    if (vertical) {
        return (
            <Button startContent={<Newspaper />} color="primary" variant="shadow" className="sidebar_vertical_button" onClick={() => router.push('/news')}>
                News
            </Button>  
        )
    }
    else {
        return (
            <Button isIconOnly color="primary" variant="shadow" className="sidebar_horizontal_button" onClick={() => router.push('/news')}>
                <Newspaper />
            </Button> 
        )
    }
}

function SideBarAccountButton({vertical}: {vertical: boolean}) {
    const router = useRouter();
    if (vertical) {
        return (
            <Button startContent={<User />} color="primary" variant="shadow" className="sidebar_vertical_button" onClick={() => router.push('/account')}>
                Account
            </Button>  
        )
    }
    else {
        return (
            <Button isIconOnly color="primary" variant="shadow" className="sidebar_horizontal_button" onClick={() => router.push('/account')}>
                <User />
            </Button> 
        )
    }
}

function SideBarSignInButton({vertical}: {vertical: boolean}) {
    const router = useRouter();
    if (vertical) {
        return (
            <Button startContent={<LogIn />} color="primary" variant="shadow" className="sidebar_vertical_button" onClick={() => router.push('/signin')}>
                Sign In
            </Button>  
        )
    }
    else {
        return (
            <Button isIconOnly color="primary" variant="shadow" className="sidebar_horizontal_button" onClick={() => router.push('/signin')}>
                <LogIn />
            </Button> 
        )
    }
}

export { SideBarHomeButton, SideBarNewsButton, SideBarAccountButton, SideBarSignInButton };
