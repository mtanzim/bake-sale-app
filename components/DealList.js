import React from "react";
import { StyleSheet, Text, View } from "react-native";
import PropTypes from 'prop-types';


export default class DealList extends React.Component {

  static propTypes = {
    title: PropTypes.string.isRequired,

  };

  render() {
    return (
      <View style={styles.dealContainer}>
        <Text style={styles.dealTitle}>{this.props.title}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  dealContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start"
  },
  dealTitle: {
    fontSize: 12,
  }
});
