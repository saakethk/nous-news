
// AUTHOR: SAAKETH KESIREDDY
// LAST EDIT: 11/06/24

// TYPE
"use server";

// IMPORTS
import Link from "next/link";
import { NousLogo } from "../Other/Logos";

// SIGN IN CONTAINER COMPONENT
export default async function SignInContainer(
    { children, new_user=false }: 
    { children: React.ReactNode, new_user?: boolean }
) {
    return (
        <div className="sign_in_container">
            <div className="sign_in_graphic" />
            <div className="sign_in_content">
                <div className="sign_in_providers">
                    <NousLogo />
                    <div className="sign_in_call_to_action">
                        <h1 className="heading">
                            Spread the truth.
                        </h1>
                        {children}
                        {
                            (new_user) ?
                            <>
                                <p className="disclaimer_text">
                                    By creating a Nous account, you are agreeing to all <Link href="/terms-of-service">terms of service</Link> and <Link href="/privacy-policy">privacy policies</Link>. Already a user? <Link href="/sign-in">Sign In</Link>
                                </p>
                            </>:
                            <>
                                <p className="disclaimer_text">
                                    Don't have an account? <Link href="/sign-up">Sign Up</Link>
                                </p>
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}