import React from "react";
import { Badge } from "reactstrap";
import ApolloClient from "apollo-boost";
import { Query } from "react-apollo";
import gql from "graphql-tag";

const client = new ApolloClient({
  uri: `http://ba03f06e.ngrok.io/graphql`
});

const GET_TAG_INFO = gql `
  query dish($dishId: String!){
    Dish(id: $dishId){
      tags
    }
  }
`;

// const UPDATE_TAG_INFO = gql `

// `;

class Tags extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tagObject: {
        name: "temp name",
        type: "temp type"
      },
      tempTag: ["Tag 1", "Tag 2", "Tag 3"],
      addStyle: {
        display: "none"
      }
    };
    this.showAddFoodTag = this.showAddFoodTag.bind(this);
    this.addFoodTag = this.addFoodTag.bind(this);
  }
  showAddFoodTag() {
    let tempStyle = {
      display: "inline"
    };
    this.setState({ addStyle: tempStyle });
  }

  addFoodTag() {
    let input = document.getElementById("newTag").value;
    if (input === "") {
      alert("Input cannot be blank.");
    } else {
      let temp = this.state.tempTag;
      let tempStyle = {
        display: "none"
      };
      temp.push(input);
      this.setState({
        tempTag: temp,
        addStyle: tempStyle
      });
    }
  }

  render() {
    return (
      <div>
        <Query query={GET_TAG_INFO} variables={ this.props.dishId }>
        {({loading, error, data}) =>{
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error :(</p>;

            return data.Dish.map((dish, i) => {
              const {
                tags
              } = dish;
              return (
                <div>
                  Map tags here
                </div>
              );
            })
          }
        }
        </Query>
        {this.state.tempTag.map((item, i) => (
          <Badge color="secondary"> {item} </Badge>
        ))}
        <Badge color="success" onClick={this.showAddFoodTag}>
          +
        </Badge>
        <div style={this.state.addStyle}>
          <br />Add tag:
          <input type="text" id="newTag" />
          <Badge color="success" onClick={this.addFoodTag}>
            Confirm
          </Badge>
        </div>
      </div>
    );
  }
}

export default Tags;
