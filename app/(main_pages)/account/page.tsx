import SideBar from "@/app/components/Navigation/SideBar";
import ContentContainer from "@/app/components/Containers/ContentContainer";
import { AccountSignOutButton } from "@/app/components/Buttons/AccountButtons";

// Account Page
// Private page which allows user to see settings and their own liked snippets along with suggestions.
export default function AccountPrivate() {
    return (
        <>
            <SideBar />
            <ContentContainer heading="Your Account" subheading="Manage your account settings and more...">
                <AccountSignOutButton />
            </ContentContainer>
        </>
    )
}