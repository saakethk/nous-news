"use client";

import { SignUp } from "@clerk/clerk-react"

export default function SignUpPage() {
    return (
        <div className="sign_in_container">
            <div className="sign_in_graphic_container">
                <div className="sign_in_graphic">
                </div>
            </div>
            <div className="sign_in_provider_container">
                {/* <div className="sign_in_providers shadow-lg shadow-blue-500/50">
                    <h1>Sign In:</h1>
                    {Object.values(providers).map((provider: any) => (
                        <div key={provider.name as string}>
                            <Button startContent={<RectangleEllipsis />} color="primary" variant="shadow" className="sign_in_button_google" onClick={() => signIn(provider.id as string, {callbackUrl: '/'})}>
                            Sign in with {provider.name as string}
                            </Button>
                        </div>
                    ))}
                </div> */}
                <SignUp />
            </div>
        </div>
    )
}


