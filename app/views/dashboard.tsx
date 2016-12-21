import * as React from 'react';
import {CustomAppBar} from "../components/ui/custom-app-bar";
import {DashboardContainer} from "../components/dashboard/dashboard-container";
import {CoursesList} from "../components/dashboard/courses-list";

export const dashboardViewStyle = {
    margin: '10px',
    marginTop: '20px'
};

export const Dashboard = () => {
    return (
        <div>
            <CustomAppBar/>
            <div style={dashboardViewStyle}>
                <DashboardContainer/>
                <CoursesList/>
            </div>
        </div>
    );
};