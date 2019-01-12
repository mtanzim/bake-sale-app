import React from "react";
import {
  StyleSheet,
  FlatList,
  Text,
  View,
  Image,
  TouchableOpacity,
  Button
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
    }).isRequired
  };

  state = {
    deal: this.props.initDeal
  };

  cancelableFetch = makeCancelable(fetchOneDeal(this.state.deal.key));

  componentDidMount() {
    this.cancelableFetch.promise
      .then(res => {
        this.setState({ deal: res });
      })
      .catch(err => console.log(err));
  }

  componentWillUnmount() {
    this.cancelableFetch.cancel();
  }

  render() {
    return (
      <View style={styles.detailContainer}>
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
    fontSize: 12
  }
});
