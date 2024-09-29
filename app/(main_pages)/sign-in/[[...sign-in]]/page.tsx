"use client";

import { SignIn } from "@clerk/clerk-react"
import { Button } from "@nextui-org/react"
import { useSignIn } from "@clerk/nextjs"
import { OAuthStrategy } from "@clerk/types"
import { RectangleEllipsis } from "lucide-react"

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
        <div className="sign_in_container">
            <div className="sign_in_graphic_container">
                <div className="sign_in_graphic">
                </div>
            </div>
            <div className="sign_in_provider_container">
                <div className="sign_in_providers shadow-lg shadow-blue-500/50">
                    <h1>Sign In:</h1>
                    <div>
                        <Button startContent={<RectangleEllipsis />} color="primary" variant="shadow" className="sign_in_button_google" onClick={() => signInWith("oauth_google")}>
                            Sign in with Google
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}


