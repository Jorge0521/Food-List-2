import React from "react";
import GoogleMapReact from "google-map-react";

const AnyReactComponent = ({ text }) => (
  <div
    style={{
      color: "red",
      transform: "translate(-50%, -50%)"
    }}
  >
    <span
      style={{
        display: "inline-block",
        float: "left"
      }}
    >
      {text}
      <img
        src="http://www.clker.com/cliparts/r/B/8/l/v/5/red-pin-th.png"
        height="30"
        width="20"
      />
    </span>
  </div>
);

class SimpleMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      center: [Number(this.props.lat), Number(this.props.long)],
      zoom: 11
    };
  }
  render() {
    return (
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyAU-OqF2oYht9amXKHHJgP-tbjPXx-zDvQ" }}
        defaultCenter={this.state.center}
        defaultZoom={this.state.zoom}
      >
        <AnyReactComponent
          lat={this.props.lat}
          lng={this.props.long}
          text={this.props.text}
        />
      </GoogleMapReact>
    );
  }
}
export default SimpleMap;
