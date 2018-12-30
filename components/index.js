import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { fetchInitialDeals } from "./fetch";
import DealList from "./DealList";
import SingleDeal from "./SingleDeal";

export default class AppContainer extends React.Component {
  state = {
    deals: [],
    singleDeal: false,
    singelDealData: {}
  };

  async componentDidMount() {
    let deals = await fetchInitialDeals();
    this.setState({ deals });
  }

  showSingleDeal = async data => {
    this.setState({ singleDeal: true, singelDealData: data }, () => {
      // console.log(this.state.singelDealData);
      // console.log('Back to root!')
    });
  };

  toggleBack = () => {
    this.setState({
      singleDeal: false,
      singelDealData: {}
    });
  };

  render() {
    return (
      <View style={styles.appContainer}>
        <Text style={styles.header}>Bakesale</Text>
        {this.state.deals.length > 0 ? (
          !this.state.singleDeal ? (
            <DealList
              showSingleDeal={this.showSingleDeal}
              deals={this.state.deals}
            />
          ) : (
            <SingleDeal
              goBack={this.toggleBack}
              deal={this.state.singelDealData}
            />
          )
        ) : (
          <Text>Loading...</Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25
  },
  header: {
    fontSize: 40
  }
});
