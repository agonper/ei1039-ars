import * as React from 'react';
import {mainViewStyle} from "./main-view";
import {CustomAppBar} from "../components/ui/custom-app-bar";
import {DashboardContainer} from "../components/dashboard/dashboard-container";

export const Dashboard = () => {
    return (
        <div>
            <CustomAppBar/>
            <div style={mainViewStyle}>
                <DashboardContainer/>
            </div>
        </div>
    );
};