
// AUTHOR: SAAKETH KESIREDDY
// LAST EDIT: 11/06/24

// TYPE
"use server";

// IMPORTS
import { NousLogo } from "../Other/Logos";

// SIGN IN CONTAINER COMPONENT
export default async function SignInContainer(
    { children }: 
    { children: React.ReactNode }
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
                        <p className="disclaimer_text">
                            By signing into Nous, you are agreeing to all terms of service and privacy policies.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}