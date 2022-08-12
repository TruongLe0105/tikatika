import * as React from "react";
import { Text, View, StyleSheet, ActivityIndicator } from "react-native";
import appStore from "@/store/appStore";
import { colors } from "@/styles/theme";
import { Component } from "react";
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from "react-native-indicators";

interface LoadingState {
  loadingVisible: boolean;
}

export class Loading extends Component<any, LoadingState> {
  static loadingInstance: Loading;
  closeTimeout: NodeJS.Timeout;
  static load() {
    this.loadingInstance.showLoading();
  }
  static hide() {
    if (this.loadingInstance.getLoadingState()) {
      this.loadingInstance.hideLoading();
    }
  }

  constructor(props) {
    super(props);

    this.state = {
      loadingVisible: false,
    };
  }

  getLoadingState() {
    return this.state.loadingVisible;
  }

  showLoading() {
    this.setState({
      loadingVisible: true,
    });
  }

  hideLoading = () => {
    this.setState({
      loadingVisible: false,
    });
  };

  render() {
    if (!this.state.loadingVisible) {
      return null;
    }
    return (
      <View
        style={{
          zIndex: 99,
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(255,255,255,0.5)",
          flex: 1,
        }}
      >
        <MaterialIndicator color={colors.primary} />
      </View>
    );
  }
}
