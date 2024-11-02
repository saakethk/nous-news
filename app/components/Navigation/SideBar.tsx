
"use client";

import { SideBarHomeButton, SideBarNewsButton, SideBarHistoryButton, SideBarDiscussionsButton } from "../Buttons/SideBarNavButtons";
import { NousLogo } from "./Logos";

export default function SideBar() {
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

