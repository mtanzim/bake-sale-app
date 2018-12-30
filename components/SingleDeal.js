import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Button
} from "react-native";
import PropTypes from "prop-types";

export default class SingleDeal extends React.Component {
  static propTypes = {
    deal: PropTypes.object.isRequired,
  };

  render() {
    return (
      <View>
        <Text>Now showing deal for {this.props.deal.key}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
