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

import { fetchOneDeal } from "./fetch";
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

  componentDidMount() {
    this.fetchdeal();
  }

  fetchdeal = async () => {
    let detail = await fetchOneDeal(this.state.deal.key);
    this.setState({ deal: detail });
    // this.selectedDealItems = [this.state.deal.user.name, this.state.deal.description]
  };

  render() {
    return (
      <View style={styles.detailContainer}>
        <EachDeal
          fetchDeal={() => console.log("Do nothing")}
          deal={this.state.deal}
        />
        {this.state.deal.user && (
          <View style={styles.singleDealDetail}>
            <FlatList
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
            {/* <Text>{this.state.deal.user.name}</Text> */}
            {/* <Text>{this.state.deal.description}</Text> */}
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  detailContainer: {
    flex: 1,

    justifyContent: "flex-start",
    // paddingHorizontal: 15,
    fontSize: 16
  },
  singleDealDetail: {
    flex: 1,
    fontSize: 14,
    // padding: 15,
    marginHorizontal: 15,
    marginTop: 10,
    // borderColor: "#ddd",
    // borderWidth: 1,
    // padding: 8,
    // borderRadius: 2
  },
  title: {
    fontSize: 20,
  },
  desc: {
    fontSize: 12,
  }
});
