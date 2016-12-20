import {GraphQLObjectType} from "graphql";
import MutationChangeUserName from "./changeUserName";

export const MutationType = new GraphQLObjectType({
    name: 'Mutation',
    description: 'All the different mutations (inserts / updates / deletes) available within application scope',
    fields: {
        changeUserName: MutationChangeUserName
    }
});