import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import PropTypes from "prop-types";
import { fetchOneDeal } from "./fetch";

import EachDeal from "./EachDeal";

export default class DealList extends React.Component {
  static propTypes = {
    deals: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        media: PropTypes.arrayOf(PropTypes.string).isRequired,
        cause: PropTypes.shape({
          name: PropTypes.string.isRequired
        }).isRequired
      }).isRequired
    ).isRequired,
    showSingleDeal: PropTypes.func.isRequired
  };

  fetchSingleDeal = async id => {
    this.props.showSingleDeal(await fetchOneDeal(id));
  };

  render() {
    return (
      <View style={styles.dealContainer}>
        <FlatList
          data={this.props.deals}
          renderItem={({ item }) => (
            <EachDeal fetchDeal={this.fetchSingleDeal} deal={item} />
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  dealContainer: {
    // flex: 1,
    marginTop: 15,
    paddingHorizontal: 35,
    alignItems: "flex-start",
    justifyContent: "flex-start"
  }
});
