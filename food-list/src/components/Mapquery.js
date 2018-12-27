import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider, Query } from "react-apollo";
import gql from "graphql-tag";
import SimpleMap from "../components/Map.js";
import Divider from "@material-ui/core/Divider";

const client = new ApolloClient({
  uri: `http://ba03f06e.ngrok.io/graphql`
});

const GET_MAP_INFO = gql`
 query dish($loc: String!){
     search(location: $loc, limit: 1) {
       business {
         name
         coordinates{
           latitude
           longitude
         } 
       }
     }
   }
`;

class Mapquery extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <ApolloProvider client={client}>
          <div style={{ height: "50vh", width: "50%" }}>
            <Query query={GET_MAP_INFO} variables={this.props.loc}>
              {({ loading, error, data }) => {
                if (loading) return <p>Loading...</p>;
                if (error) return <p>Error :(</p>;
                return data.search.business.map((business, i) => {
                  const { name, coordinates } = business;
                  return (
                    <div id="mapContainer">
                      <div class="p-2" height="200vh" id="Simplemap">
                        <SimpleMap
                          lat={`${coordinates.latitude}`}
                          long={`${coordinates.longitude}`}
                          text={`${name}`}
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
        </ApolloProvider>
      </div>
    );
  }
}

export default Mapquery;
