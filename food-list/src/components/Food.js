import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider, Query } from "react-apollo";
import gql from "graphql-tag";
import RatingSystem from "../components/RatingSystem.js";
import Tags from "../components/Tags.js";
import SimpleMap from "../components/Map.js";
import "../Css/foodLayout.css";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import GridList from "@material-ui/core/GridList";

const client = new ApolloClient({
  uri: `http://ba03f06e.ngrok.io/graphql`
});

const GET_DISH_INFO_T = gql `
  query dish($locAb: String!){
    allDishes(orderBy:ratingTotal_DESC, filter: {location: $locAb}){
    id
    name
    ratingTotal
    location 
    yelpBusiness {
        name
        rating
        review_count
        photos
        phone
        coordinates{
        latitude
        longitude
        }
        location {
        address1
        city
        state
        country
      }
      }
    }
  }
`;

const GET_MAP_INFO_T = gql`
 query dish($locAb: String!){
     allDishes(orderBy:ratingTotal_DESC, filter: {location: $locAb}, first:1) {
       yelpBusiness{
        name
        coordinates{
          latitude
          longitude
        } 
       }
     }
   }
`;
const Food = ({ loc, locAb, coordinates }, props) => (
  <div class={locAb}>
    <ApolloProvider client={client}>
      <h1 align="center">{loc} Top 20</h1>

      <div class="container" id="food">
        <div class="row">
          <div class="col-sm">
            <Query query={GET_DISH_INFO_T} variables={{ locAb }}>
              {({ loading, error, data }) => {
                if (loading) return <p>Loading...</p>;
                if (error) return <p>Error :(</p>;

                return data.allDishes.map((dish, i) => {
                  const {
                    id,
                    name,
                    yelpBusiness
                  } = dish;
                  return (
                    <div class="wrapper">
                      <Card>
                        <GridList container spacing={16}>
                          <Grid item id="foodCardContainer">
                            <img
                              src={`${yelpBusiness.photos}`}
                              height="150"
                              width="150"
                              display="flex"
                              justify-content="space-around"
                            />
                            <List component="nav">
                              <ListItemText primary={`${name}`} />
                              <ListItemText primary={`${yelpBusiness.name}`} />
                              <Divider light />

                              <RatingSystem ind={i} />

                              <ListItemText primary={`${yelpBusiness.location.address1}`} />
                              <ListItemText primary={`${yelpBusiness.phone}`} />
                              <Tags ind={i} dishId = {`${id}`} />
                            </List>
                          </Grid>
                        </GridList>
                      </Card>
                     </div>
                  );
                });
              }}
            </Query>
          </div>

          <div class="col-sm" style={{ height: "50vh", width: "50%" }}>
            <Query query={GET_MAP_INFO_T} variables={{ locAb }}>
              {({ loading, error, data }) => {
                if (loading) return <p>Loading...</p>;
                if (error) return <p>Error :(</p>;

                return data.allDishes.map((business, i) => {
                  const { yelpBusiness } = business;
                  return (
                    <div id="mapContainer">
                      <div class="p-2" height="200vh" id="Simplemap">
                        <SimpleMap
                          lat={`${yelpBusiness.coordinates.latitude}`}
                          long={`${yelpBusiness.coordinates.longitude}`}
                          text={`${yelpBusiness.name}`}
                        />
                        <b style={{ color: "blue" }}>Price</b>
                        <p />
                        <Divider dark />
                        <input type="checkbox" />$<p />
                        <input type="checkbox" />$<p />
                        <input type="checkbox" />$$$
                      </div>
                    </div>
                  );
                });
              }}
            </Query>
          </div>
        </div>
      </div>
    </ApolloProvider>
  </div>
);

export default Food;
