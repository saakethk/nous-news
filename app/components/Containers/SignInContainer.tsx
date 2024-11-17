
// AUTHOR: SAAKETH KESIREDDY
// LAST EDIT: 11/06/24

// TYPE
"use server";

// IMPORTS
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
                                    By creating a Nous account, you are agreeing to all <a href="/terms-of-service">terms of service</a> and <a href="/privacy-policy">privacy policies</a>. Already a user? <a href="/sign-in">Sign In</a>
                                </p>
                            </>:
                            <>
                                <p className="disclaimer_text">
                                    Don't have an account? <a href="/sign-up">Sign Up</a>
                                </p>
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}