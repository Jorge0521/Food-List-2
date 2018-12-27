import {
  makeRemoteExecutableSchema,
  makeExecutableSchema,
  introspectSchema,
  mergeSchemas
} from "graphql-tools";
import { HttpLink } from "apollo-link-http";
import fetch from "node-fetch";


const link = new HttpLink({
  uri: "https://api.yelp.com/v3/graphql",
  fetch,
  headers: {
    Authorization:
      "Bearer r5b9jmTLJGj4_qdDDZtWISM_6QoX4uDHYoEb2JneFCfD4aUDPm5__J4cN6uDxUE-xccigJw_WylE86bkBAFoSqIjQ8YcZ8pF6TDGHyQtZn7WdnCRrRpSr2O44aBHW3Yx"
  }
});

const getYelpSchema = async () => {
  const schema = await introspectSchema(link);

  const executableSchema = makeRemoteExecutableSchema({
    schema,
    link
  });

  return executableSchema;
};

const dishLink = new HttpLink({
  uri: "https://api.graph.cool/simple/v1/cjjeqxhxj4klh01468zmazh9w",
  fetch
});
const getDishSchema = async () => {
  const schema = await introspectSchema(dishLink);
  const executableSchema = makeRemoteExecutableSchema({
    schema,
    link: dishLink
  });
  return executableSchema;
};

const linkTypeDefs = `
	extend type Dish{
		yelpBusiness: Business
	}	
	extend type Business{
		dish: Dish
	}
  extend type Mutation {
    createDishWithBusiness(businessId: String!, name: String, ranking:Int, ratingTotal: Int, tags:[String!], ratingsIds: [ID!], ratings: [DishratingsRating!] ): Dish
  }
`;

async function makeSchema() {
  const dishSchema = await getDishSchema();
  const yelpSchema = await getYelpSchema();
  return mergeSchemas({
    schemas: [dishSchema, linkTypeDefs, yelpSchema],
    resolvers: {
      
      Dish: {
        yelpBusiness: {
          fragment: `... on Dish { businessId }`,
          resolve(parent, args, context, info) {
            const bizId = parent.businessId
            return info.mergeInfo.delegateToSchema({
              schema: yelpSchema,  
              operation: "query",
              fieldName: "business",
              args: { id: bizId },
              context,
              info,
            });
          }
        }
      },

      // Business: {
      //   dish: {
      //     fragment: `... on Business { id }`,
      //     resolve(parent, args, context, info) {
      //       const dishId = parent.id
      //       return info.mergeInfo.delegateToSchema({
      //         schema: dishSchema,
      //         operation: "query",
      //         fieldName: "dish",
      //         args: {id: dishId},
      //         context,
      //         info,
      //       });
      //     }
      //   }
      // },

      Mutation: {
        async createDishWithBusiness(parent, args, context, info){
          const createdDish = await info.mergeInfo.delegateToSchema({
            operation: "mutation",
            fieldName: "createDish",
            info,
            args, 
            context,
            schema: dishSchema
          });
          return createdDish;
        }
      },

    }
  });
}

export const schema = makeSchema();