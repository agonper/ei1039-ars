import * as React from "react";
import {Avatar} from "material-ui";

export const generateStudentNameAvatar = (studentName: string) => {
    const nameParts = studentName.split(' ');
    const studentAvatar = [''].concat(nameParts).reduce((prev, curr) => prev + curr.charAt(0).toUpperCase());
    return <Avatar>{studentAvatar}</Avatar>
};