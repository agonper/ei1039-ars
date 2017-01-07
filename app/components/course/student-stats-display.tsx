import * as React from "react";
import {Paper, List, ListItem, Badge} from "material-ui";
import {FormattedMessage} from "react-intl";
import {generateStudentNameAvatar} from "./student-avatar";

interface LinkedStudentStat {
    id: string,
    name: string,
    hits: number
}

interface StudentStatsDisplayProps {
    linkedStudentStats: LinkedStudentStat[]
}

export const StudentStatsDisplay = (props: StudentStatsDisplayProps) => {
    const {linkedStudentStats} = props;
    if (linkedStudentStats.length > 0) {
        return (
            <Paper>
                <List>
                    {linkedStudentStats.map((student) => {
                        return (
                            <ListItem
                                leftAvatar={generateStudentNameAvatar(student.name)}
                                rightIcon={<Badge badgeContent={student.hits}/>}>
                                {student.name}
                            </ListItem>
                        );
                    })}
                </List>
            </Paper>
        );
    }
    return <FormattedMessage id="display.course.ranking.no-records" defaultMessage="No records yet"/>;
};