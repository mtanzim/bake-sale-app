import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import PropTypes from "prop-types";

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
    ).isRequired
    // showSingleDeal: PropTypes.func.isRequired
  };

  fetchSingleDeal = id => {
    this.props.showSingleDeal(id);
  };

  render() {
    return (
      <FlatList
        data={this.props.deals}
        renderItem={({ item }) => (
          <EachDeal fetchDeal={this.fetchSingleDeal} deal={item} />
        )}
      />
    );
  }
}

const styles = StyleSheet.create({});
