import React from "react";
import StarRatingComponent from "react-star-rating-component";

class RatingSystem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      rating: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      rating_empty_initial: 0,
      rateArray: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    };
    this.onStarClickEmptyInitial = this.onStarClickEmptyInitial.bind(this);
  }

  onStarClickEmptyInitial(nextValue, prevValue, name, counter) {
    this.setState({ rating_empty_initial: nextValue });
    let index = this.props.ind;
    let temp = this.state.rateArray;
    let tempCounter = this.state.counter;
    let tempAvg = this.state.rating;

    tempCounter[index] = tempCounter[index] + 1;
    this.setState({ counter: tempCounter });
    temp[index] = temp[index] + nextValue;
    this.setState({ rateArray: temp });

    tempAvg[index] = temp[index] / tempCounter[index];
    this.setState({ rating: tempAvg });
  }

  render() {
    const { rating_empty_initial } = this.state;
    return (
      <div>
        <h3>
          <StarRatingComponent
            name="rate1"
            starCount={5}
            value={this.state.rating_empty_initial}
            onStarClick={this.onStarClickEmptyInitial.bind(this)}
            onClick={() => this.handleRating(rating_empty_initial)}
          />
          <h4>
            {(Math.ceil(this.state.rating[this.props.ind] * 10) / 10).toFixed(
              2
            )}{" "}
          </h4>
        </h3>
        <div style={{ fontSize: 5 }} />
      </div>
    );
  }
}
export default RatingSystem;
