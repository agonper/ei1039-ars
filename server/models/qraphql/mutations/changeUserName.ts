import {GraphQLString, GraphQLNonNull} from 'graphql'
import UserType from "../types/user";
import {userRepository} from "../../user";

const MutationChangeUserName = {
    type: UserType,
    args: {
        name: {
            name: 'name',
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    resolve: (root: any, args: any, context: any) => {
        return userRepository.findByEmail(context.user.email).then((user: any) => {
            if (!user) throw new Error('User has been deleted');
            user.name = args.name;
            return user.save();
        })
    }
};

export default MutationChangeUserName;
