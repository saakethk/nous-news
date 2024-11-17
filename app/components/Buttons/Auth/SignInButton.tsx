

// AUTHOR: SAAKETH KESIREDDY
// LAST EDIT: 11/09/24

// TYPE
"use client";

// IMPORTS
import { Button } from "@nextui-org/react";
import { useSignIn, useSignUp } from "@clerk/nextjs";
import { OAuthStrategy } from "@clerk/types";
import { GoogleLogo } from "@/app/components/Other/Logos";

// SIGN IN BUTTON
function SignInButton() {

    // Gets sign-in functions
    const { signIn } = useSignIn();

    // Checks object is not empty
    if (!signIn) return null;

    // Defines sign-in function
    const signInWith = (strategy: OAuthStrategy) => {
        return signIn.authenticateWithRedirect({
            strategy,
            redirectUrl: '/sign-in/sso-callback',
            redirectUrlComplete: '/',
        })
    }

    return (
        <Button startContent={<GoogleLogo />} color="primary" variant="shadow" className="sign_in_button_google" onClick={() => signInWith("oauth_google")}>
            Sign in with Google
        </Button>
    )
}

// SIGN UP BUTTON
function SignUpButton() {

    // Gets sign-in functions
    const { signUp } = useSignUp();

    // Checks object is not empty
    if (!signUp) return null;

    // Defines sign-in function
    const signUpWith = (strategy: OAuthStrategy) => {
        return signUp.authenticateWithRedirect({
            strategy,
            redirectUrl: '/sign-up/sso-callback',
            redirectUrlComplete: '/',
        })
    }

    return (
        <Button startContent={<GoogleLogo />} color="primary" variant="shadow" className="sign_in_button_google" onClick={() => signUpWith("oauth_google")}>
            Sign up with Google
        </Button>
    )
}

export {
    SignInButton,
    SignUpButton
}


