import React from "react";
import {
  StyleSheet,
  FlatList,
  Text,
  View,
  Image,
  TouchableOpacity,
  Button,
  Animated
} from "react-native";
import PropTypes from "prop-types";

import { fetchOneDeal, makeCancelable } from "./fetch";
import EachDeal from "./EachDeal";

export default class SingleDeal extends React.Component {
  static propTypes = {
    initDeal: PropTypes.shape({
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      cause: PropTypes.shape({
        name: PropTypes.string.isRequired
      }).isRequired,
      media: PropTypes.arrayOf(PropTypes.string).isRequired
    }).isRequired,
    panFunc: PropTypes.any.isRequired,
    animX: PropTypes.any.isRequired
  };

  state = {
    deal: this.props.initDeal
  };

  cancelableFetch = null;

  executeFetch = () => {
    this.cancelableFetch = makeCancelable(
      fetchOneDeal(this.props.initDeal.key)
    );
    this.cancelableFetch.promise
      .then(res => {
        this.setState({ deal: res });
      })
      .catch(err => console.log(err));
  };

  componentDidMount() {
    this.executeFetch();
  }

  componentWillReceiveProps() {
    console.log("Page swipe recognized in Single Deal?");
    console.log(`Single page key is ${this.state.deal.key}`);
    this.setState({ deal: this.props.initDeal }, this.executeFetch);
  }

  componentWillUnmount() {
    this.cancelableFetch.cancel();
  }

  render() {
    return (
      <Animated.View
        {...this.props.panFunc.panHandlers}
        style={[{ left: this.props.animX }, styles.detailContainer]}
      >
        <EachDeal
          fetchDeal={() => console.log("Do nothing")}
          deal={this.state.deal}
          isDetailed={true}
        />
        {this.state.deal.user && (
          <FlatList
            style={styles.singleDealDetail}
            data={[
              { content: this.state.deal.user.name, styleClass: styles.title },
              { content: this.state.deal.description, styleClass: styles.desc }
            ]}
            renderItem={({ item }) => (
              <Text style={item.styleClass} id={item.id}>
                {item.content}
              </Text>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        )}
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  detailContainer: {
    flex: 1,
    justifyContent: "flex-start",
    fontSize: 16
  },
  singleDealDetail: {
    fontSize: 14,
    marginHorizontal: 15,
    marginVertical: 15
  },
  title: {
    flex: 1,
    fontSize: 20
  },
  desc: {
    flex: 1,
    fontSize: 12
  }
});
