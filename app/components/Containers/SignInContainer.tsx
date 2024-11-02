
import { NousLogo } from "../Navigation/Logos";

export default function SignInContainer({ children }: { children: React.ReactNode }) {
    return (
        <div className="sign_in_container">
            <div className="sign_in_graphic">
            </div>
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