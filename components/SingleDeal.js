import React from "react";
import {
  StyleSheet,
  FlatList,
  Text,
  View,
  ScrollView,
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
    deal: this.props.initDeal,
    loading: false
  };

  cancelableFetch = null;

  executeFetch = () => {
    this.setState({ loading: true });
    this.cancelableFetch = makeCancelable(
      fetchOneDeal(this.props.initDeal.key)
    );
    this.cancelableFetch.promise.then(res => {
      this.setState({ deal: res, loading: false });
    });
    // .catch(err => console.log(err));
  };

  componentDidMount() {
    this.executeFetch();
  }

  componentWillReceiveProps() {
    // // console.log"Page swipe recognized in Single Deal?");
    // // console.log`Single page key is ${this.state.deal.key}`);
    this.setState(
      { deal: this.props.initDeal, loading: true },
      this.executeFetch
    );
  }

  componentWillUnmount() {
    this.cancelableFetch.cancel();
  }

  /*   renderAnimatedView = () => (
    <Animated.View
      {...this.props.panFunc.panHandlers}
      style={[{ left: this.props.animX }, styles.detailContainer]}
    >
      <EachDeal
        fetchDeal={() => undefined}
        deal={this.state.deal}
        isDetailed={true}
      />
      {this.state.deal.user && this.renderFlatList()}
    </Animated.View>
  ); */

  /*   renderFlatList = () => (
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
  ); */

  render() {
    // return this.renderAnimatedView();
    return (
      // Note: the flex style is required on the parent view for scrolling to work
      // https://stackoverflow.com/questions/38137388/scroll-view-inside-view-not-working-react-native
      <View style={{ flex: 1 }}>
        <Animated.View
          {...this.props.panFunc.panHandlers}
          style={[{ left: this.props.animX }, styles.swipe]}
        >
          <View style={styles.swipeTextContainer}>
            <Text></Text>
            <Text></Text>
          </View>
        </Animated.View>
        {!this.state.loading && (
          <EachDeal
            fetchDeal={() => undefined}
            deal={this.state.deal}
            isDetailed={true}
          />
        )}
        {this.state.deal.user && (
          <ScrollView style={styles.singleDealDetail}>
            <Text style={styles.title}>{this.state.deal.user.name}</Text>
            <Text style={styles.desc}>{this.state.deal.description}</Text>
          </ScrollView>
        )}
      </View>
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
    fontSize: 14
  },
  swipe: {
    marginBottom: 20,
    marginHorizontal: 85,
    height: 20,
    alignSelf: "stretch",
    // borderColor: "red",
    backgroundColor: "orange",
    // borderWidth: 1,
    borderRadius: 10
  },
  swipeTextContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5
  }
});
