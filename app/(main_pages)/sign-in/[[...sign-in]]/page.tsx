

// AUTHOR: SAAKETH KESIREDDY
// LAST EDIT: 11/04/24

// TYPE
"use client";

// IMPORTS
import SignInContainer from "@/app/components/Containers/SignInContainer";
import { Button } from "@nextui-org/react";
import { useSignIn } from "@clerk/nextjs";
import { OAuthStrategy } from "@clerk/types";
import { GoogleLogo } from "@/app/components/Other/Logos";

// SIGN IN PAGE
export default function SignInPage() {

    // Gets sign-in functions
    const { signIn } = useSignIn()

    // Checks object is not empty
    if (!signIn) return null

    // Defines sign-in function
    const signInWith = (strategy: OAuthStrategy) => {
        return signIn.authenticateWithRedirect({
            strategy,
            redirectUrl: '/sign-up/sso-callback',
            redirectUrlComplete: '/',
        })
    }

    return (
        <SignInContainer>
            <Button startContent={<GoogleLogo />} color="primary" variant="shadow" className="sign_in_button_google" onClick={() => signInWith("oauth_google")}>
                Sign in with Google
            </Button>
        </SignInContainer>
    )
}


