
// AUTHOR: SAAKETH KESIREDDY
// LAST EDIT: 11/26/24

// TYPE
"use client";

// IMPORTS
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";
import { NousLogo } from "../Other/Logos";
import { usePathname } from "next/navigation";

export default function NavBarTop() {

    // Retrieves path name
    const pathname = usePathname();

    return (
        <Navbar shouldHideOnScroll>
            <NavbarBrand>
                <NousLogo />
            </NavbarBrand>
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem isActive={(pathname == "/terms-of-service") ? true: false}>
                    <Link color={(pathname != "/terms-of-service") ? "foreground": undefined} href="/terms-of-service">
                        Terms of Service
                    </Link>
                </NavbarItem>
                <NavbarItem isActive={(pathname == "/privacy-policy") ? true: false}>
                    <Link color={(pathname != "/privacy-policy") ? "foreground": undefined} href="/privacy-policy" aria-current="page">
                        Privacy Policy
                    </Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem>
                    <Button as={Link} color="primary" href="/" variant="shadow">
                        Return to Nous
                    </Button>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    )
}