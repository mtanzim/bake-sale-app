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
    fetchDeal: PropTypes.func.isRequired,
    isDetailed: PropTypes.bool.isRequired
  };

  state = {
    defaultImageIdx: 0,
    curImageIdx: 0
  };

  toggleImage = () => {
    this.setState(prevState => {
      if (prevState.curImageIdx === this.props.deal.media.length - 1) {
        return { curImageIdx: 0 };
      } else {
        return { curImageIdx: prevState.curImageIdx + 1 };
      }
    });
  };

  renderMultipleImages = () => (
    <TouchableOpacity onPress={() => this.toggleImage()}>
      <Image
        style={[styles.dealImage]}
        source={{ uri: this.props.deal.media[this.state.curImageIdx] }}
      />
    </TouchableOpacity>
  );

  renderSingleImage = () => (
    <TouchableOpacity onPress={() => this.props.fetchDeal(this.props.deal.key)}>
      <Image
        style={[styles.dealImage]}
        source={{ uri: this.props.deal.media[this.state.defaultImageIdx] }}
      />
    </TouchableOpacity>
  );

  render() {
    const { deal, isDetailed } = this.props;
    this.maxTitleLen = 50;

    return (
      <View style={styles.eachDealContainer}>
        {!this.props.isDetailed
          ? this.renderSingleImage()
          : this.renderMultipleImages()}
        <View style={styles.dealTextContainer}>
          <Text style={styles.dealTitle}>
            {deal.title.length < this.maxTitleLen
              ? deal.title
              : deal.title.substr(0, this.maxTitleLen) + " ..."}
          </Text>
          <View style={styles.dealSubTextContainer}>
            <Text style={styles.dealCause}>{deal.cause.name}</Text>
            <Text style={styles.dealPrice}>
              ${Math.round(deal.price / 100)}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  eachDealContainer: {
    width: "100%",
    paddingHorizontal: 15,
    paddingBottom: 20,
    marginBottom: 5
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
    marginBottom: 5,
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
