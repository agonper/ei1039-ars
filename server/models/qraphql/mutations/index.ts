import {GraphQLObjectType} from "graphql";
import MutationCreateCourse from "./create-course";

export const MutationType = new GraphQLObjectType({
    name: 'Mutation',
    description: 'All the different mutations (inserts / updates / deletes) available within application scope',
    fields: {
        createCourse: MutationCreateCourse
    }
});