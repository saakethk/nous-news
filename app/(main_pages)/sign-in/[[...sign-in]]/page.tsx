
"use client";

import SignInContainer from "@/app/components/Containers/SignInContainer";
import { Button } from "@nextui-org/react";
import { useSignIn } from "@clerk/nextjs";
import { OAuthStrategy } from "@clerk/types";
import { GoogleLogo } from "@/app/components/Navigation/Logos";

export default function SignInPage() {

    const { signIn } = useSignIn()

    if (!signIn) return null

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


