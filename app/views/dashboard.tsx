import * as React from 'react';
import {CustomAppBar} from "../components/ui/custom-app-bar";
import {DashboardContainer} from "../components/dashboard/dashboard-container";
import {CoursesPanel} from "../components/dashboard/courses-panel";
import {AddCourseModal} from "../components/dashboard/add-course-modal";
import {AddQuestionSetModal} from "../components/dashboard/add-question-set-modal";
import {AddQuestionModal} from "../components/dashboard/add-question-modal";

export const dashboardViewStyle = {
    margin: '10px',
    marginTop: '20px'
};

export const Dashboard =  () => {
    return (
        <div>
            <CustomAppBar/>
            <div style={dashboardViewStyle}>
                <CoursesPanel/>
                <DashboardContainer/>
            </div>
            <AddCourseModal/>
            <AddQuestionSetModal/>
            <AddQuestionModal/>
        </div>
    );
};