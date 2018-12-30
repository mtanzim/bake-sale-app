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
      <TouchableOpacity onPress={() => this.props.fetchDeal(deal.key)}>
        <View style={styles.singleDeal}>
          <Text>Now showing deal for {this.props.deal.key}</Text>
          <Button title="Back" onPress={this.props.goBack} />
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  singleDeal: {
    flex: 1
    // marginBottom: 25
  }
});
