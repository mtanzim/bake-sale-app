import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { fetchInitialDeals } from "./fetch";
import DealList from "./DealList";
// import SingleDeal from "./SingleDeal";
import { fetchOneDeal } from "./fetch";
import SingleDeal from "./SingleDeal";

export default class AppContainer extends React.Component {
  state = {
    deals: [],
    currentDeal: [],
    singleDeal: false,
    singleDealData: {}
  };

  async componentDidMount() {
    let deals = await fetchInitialDeals();
    this.setState({ deals });
  }

  showSingleDeal = async id => {
    let data = await fetchOneDeal(id);
    this.setState(
      {
        singleDeal: true,
        currentDeal: this.state.deals.filter(a => a.key === data.key),
        singleDealData: data
      },
      () => {
        console.log(this.state.singleDealData.key);
        // console.log(this.state.currentDeal);
        // console.log('Back to root!')
      }
    );
  };

  toggleBack = () => {
    this.setState(prevState => {
      if (prevState.singleDeal === true) {
        return {
          singleDeal: false,
          singelDealData: {},
          currentDeal: []
        };
      } else {
        console.log('Doing nothing!')
        return prevState;
      }
    });
  };

  renderLoading = () => {
    return <Text>Loading...</Text>;
  };

  renderList = (listData) => {
    return (
      <DealList showSingleDeal={this.showSingleDeal} deals={listData} />
    );
  };

  rendeSingleDeal = () => (
    <SingleDeal deal={this.state.singleDealData} />
  );

  render() {
    return (
      <View style={styles.appContainer}>
        <TouchableOpacity onPress={this.toggleBack}>
          <Text style={styles.header}>Bakesale</Text>
        </TouchableOpacity>
        {!this.state.singleDeal
          ? this.state.deals.length > 0
            ? this.renderList(this.state.deals)
            : this.renderLoading()
          : this.rendeSingleDeal()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 50,
    marginBottom: 50
  },
  header: {
    fontSize: 40,
    marginBottom: 20,
  }
});
