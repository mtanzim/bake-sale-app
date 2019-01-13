import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Animated,
  Dimensions,
  Button,
  Linking
} from "react-native";
import PropTypes from "prop-types";

import {
  createHorizontalPanResponder,
  postStateUpdateAnimateSwipe
} from "./swipeHorizontal";

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

  imageXpos = new Animated.Value(0);
  width = Dimensions.get("window").width;
  imagePanResponder = createHorizontalPanResponder(
    this.imageXpos,
    this.width,
    dir => {
      console.log(`Finished switping ${dir > 0 ? "right" : "left"}`);
      this.toggleImage(dir);
    }
  );

  // cycle through the images
  toggleImage = dir => {
    this.setState(
      prevState => {
        if (
          prevState.curImageIdx === this.props.deal.media.length - 1 &&
          dir > 0
        ) {
          return { curImageIdx: 0 };
          // return prevState;
        } else if (prevState.curImageIdx === 0 && dir < 0) {
          return { curImageIdx: this.props.deal.media.length - 1 };
          // return prevState;
        } else {
          return { curImageIdx: prevState.curImageIdx + 1 * dir };
        }
      },
      () =>
        postStateUpdateAnimateSwipe(
          dir,
          this.imageXpos,
          this.width,
          `Current image index: ${this.state.curImageIdx}`
        )
    );
  };

  handleBuy = () => {
    Linking.openURL(this.props.deal.url).catch(err =>
      console.error("An error occurred", err)
    );
  };

  renderMultipleImages = () => (
    <Animated.Image
      {...this.imagePanResponder.panHandlers}
      style={[styles.dealImage, { left: this.imageXpos }]}
      source={{ uri: this.props.deal.media[this.state.curImageIdx] }}
    />
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
    const { deal } = this.props;
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
            {this.props.deal.url && (
              <Button
                onPress={this.handleBuy}
                title={"$ " + Math.round(deal.price / 100).toString()}
                style={styles.dealPrice}
              />
            )}
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
