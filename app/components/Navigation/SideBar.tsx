
// AUTHOR: SAAKETH KESIREDDY
// LAST EDIT: 11/04/24

// TYPE
"use server";

// IMPORTS
import { SideBarHomeButton, SideBarNewsButton, SideBarDiscussionsButton, SideBarHistoryButton } from "../Buttons/SideBar/SideBarNavButtons";
import { NousLogo } from "../Other/Logos";

// SIDEBAR COMPONENT
export default async function SideBar() {
    return (
        <>
            <div className="sidebar_vertical_container">
                <div className="sidebar_vertical">
                    <NousLogo />
                    <div className="sidebar_vertical_buttons">
                        <SideBarHomeButton vertical={true} />
                        <SideBarNewsButton vertical={true} />
                        <SideBarDiscussionsButton vertical={true} />
                        <SideBarHistoryButton vertical={true} /> 
                    </div>
                </div> 
            </div>
            <div className="sidebar_horizontal"> 
                <SideBarHomeButton vertical={false} />
                <SideBarNewsButton vertical={false} />
                <SideBarDiscussionsButton vertical={false} /> 
                <SideBarHistoryButton vertical={false} />
            </div>
        </>
    )
}

