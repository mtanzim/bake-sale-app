import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";

export default class EachDeal extends React.Component {
  static propTypes = {
    deal: PropTypes.shape({
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      cause: PropTypes.shape({
        name: PropTypes.string.isRequired
      }).isRequired,
      media: PropTypes.arrayOf(PropTypes.string).isRequired
    }).isRequired,
    fetchDeal: PropTypes.func.isRequired
  };

  render() {
    const { deal } = this.props;

    return (
      <TouchableOpacity onPress={() => this.props.fetchDeal(deal.key)}>
        <View style={styles.eachDealContainer}>
          <Image
            style={[styles.dealImage]}
            source={{ uri: this.props.deal.media[0] }}
          />
          <View style={styles.dealTextContainer}>
            <Text style={styles.dealTitle}>{deal.title}</Text>
            <View style={styles.dealSubTextContainer}>
              <Text style={styles.dealCause}>{deal.cause.name}</Text>
              <Text style={styles.dealPrice}>
                ${Math.round(deal.price / 100)}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  eachDealContainer: {
    flex: 1,
    marginBottom: 25
  },
  dealImage: {
    width: "100%",
    height: 150
  },
  dealTextContainer: {
    borderColor: "#ddd",
    borderWidth: 1,
    padding: 8
  },
  dealSubTextContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  dealTitle: {
    fontSize: 22,
    color: "black"
  },
  dealPrice: {
    color: "white",
    fontSize: 14,
    borderColor: "#ddd",
    borderWidth: 1,
    padding: 8,
    borderRadius: 6,
    backgroundColor: "orange"
  },
  dealCause: {
    alignSelf: "flex-end",
    color: "black",
    fontSize: 14
  }
});