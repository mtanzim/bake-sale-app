import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { fetchInitialDeals } from "./fetch";
import DealList from "./DealList";
// import SingleDeal from "./SingleDeal";
import { fetchOneDeal } from "./fetch";


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

  showSingleDeal = async (id) => {
    let data = await fetchOneDeal(id);
    this.setState(
      {
        singleDeal: true,
        currentDeal: this.state.deals.filter(a => a.key === data.key),
        singleDealData: data
      },
      () => {
        console.log(this.state.singleDealData.key);
        console.log(this.state.currentDeal);
        // console.log('Back to root!')
      }
    );
  };

  toggleBack = () => {
    this.setState({
      singleDeal: false,
      singelDealData: {},
      currentDeal: []
    });
  };

  render() {
    return (
      <View style={styles.appContainer}>
        <Text style={styles.header}>Bakesale</Text>
        {this.state.deals.length > 0 ? (
          <View>
            <DealList
              showSingleDeal={
                !this.state.singleDeal ? this.showSingleDeal : this.toggleBack
              }
              deals={
                !this.state.singleDeal
                  ? this.state.deals
                  : this.state.currentDeal
              }
            />
          </View>
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
    marginTop: 50,
    marginBottom: 50
  },
  header: {
    fontSize: 40
  }
});
