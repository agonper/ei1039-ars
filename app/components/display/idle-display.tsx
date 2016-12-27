import * as React from 'react';
const {Component} = React;
import MoreHorizIcon from 'material-ui/svg-icons/navigation/more-horiz';
import {connect} from 'react-redux';
import {ApplicationState} from "../../reducers/index";
import {DisplayedCourseState} from "../../reducers/display-course";
import {shortenCourseUrl} from "../../actions/shorten-course-url";
import {appConfig} from "../../config/environment";

interface IdleDisplayProps {
    displayedCourse: DisplayedCourseState,
    shortenCourseUrl(courseId: string): any
}

const qrSize = {
    height: 200,
    width: 200
};

class IdleDisplayComponent extends Component<IdleDisplayProps, any> {
    componentWillMount() {
        const {shortenCourseUrl, displayedCourse} = this.props;
        shortenCourseUrl(displayedCourse.course.id);
    }

    render() {
        const {shortenedUrl} = this.props.displayedCourse;

        if (!shortenedUrl) return <div><MoreHorizIcon/></div>;

        return (
            <div>
                <img src={`${appConfig.qrGeneratorBaseURL}?size=${qrSize.height}x${qrSize.width}&data=${shortenedUrl}`}/>
                <big><h1>{shortenedUrl}</h1></big>
            </div>
        )
    }
}

function mapStateToProps(state: ApplicationState) {
    return {
        displayedCourse: state.displayedCourse
    }
}

export const IdleDisplay = connect(mapStateToProps, {shortenCourseUrl})(IdleDisplayComponent);