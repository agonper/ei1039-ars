import UserType from "../types/user";
const QueryCurrentUser = {
    type: UserType,
    description: 'Fetch current logged in user',
    resolve: (root: any, args: any, context: any) => {
        return context.user;
    }
};

export default QueryCurrentUser
