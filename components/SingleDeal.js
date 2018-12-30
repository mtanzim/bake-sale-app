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
    goBack: PropTypes.func.isRequired
  };

  render() {
    return (
          <Text>Now showing deal for {this.props.deal.key}</Text>
    );
  }
}

const styles = StyleSheet.create({

});
