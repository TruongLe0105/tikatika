import React from "react";
import MapView, { LatLng, Marker, MarkerProps } from "react-native-maps";
import { isEqual } from "lodash";
import { Platform } from "react-native";
import { observer } from "mobx-react";

interface IAppProps extends MarkerProps {
  children?: any;
}

interface IAppState {}

export class CustomMarker extends React.PureComponent<IAppProps, IAppState> {
  state = {
    tracksViewChanges: false,
  };
  time: NodeJS.Timeout;
  _isMounted: boolean;

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props.coordinate, nextProps.coordinate)) {
      this.setState(() => ({
        tracksViewChanges: true,
      }));
    }
  }
  componentDidUpdate() {
    this._isMounted = true;
    if (this.state.tracksViewChanges) {
      if (Platform.OS === "ios") {
        this.time = setTimeout(() => {
          if (this._isMounted) {
            this.setState({ tracksViewChanges: false });
          }
        }, 500);
      } else {
        if (this._isMounted) {
          this.setState({ tracksViewChanges: false });
        }
      }
    }
  }

  componentWillUnmount() {
    clearTimeout(this.time);
    this._isMounted = false;
  }

  render() {
    return (
      <Marker tracksViewChanges={this.state.tracksViewChanges} {...this.props}>
        {this.props.children}
      </Marker>
    );
  }
}
