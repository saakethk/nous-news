"use client";

import { Button } from "@nextui-org/react";
import { useClerk } from "@clerk/clerk-react";

function AccountSignOutButton() {
    const { signOut } = useClerk();

    return (
        <Button color="primary" variant="shadow" onClick={() => signOut({ redirectUrl: "/"})}>
            Sign Out
        </Button>
    )
}

export { AccountSignOutButton };