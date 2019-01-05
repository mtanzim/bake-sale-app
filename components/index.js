import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { fetchInitialDeals } from "./fetch";
import DealList from "./DealList";
import SingleDeal from "./SingleDeal";
import SearchBar from "./SearchBar";

export default class AppContainer extends React.Component {
  state = {
    deals: [],
    currentDealId: null
  };

  async componentDidMount() {
    let deals = await fetchInitialDeals();
    this.setState({ deals });
  }

  showSingleDeal = id => {
    this.setState(
      {
        currentDealId: id
      },
      () => {
        console.log(this.state.currentDealId);
      }
    );
  };

  toggleBack = () => {
    this.setState(prevState => {
      if (prevState.currentDealId) {
        return {
          currentDealId: null
        };
      } else {
        return prevState;
      }
    });
  };

  renderLoading = () => {
    return <Text style={styles.loadingText}>Loading...</Text>;
  };

  renderList = () => {
    return (
      <View>
        <SearchBar />
        <DealList
          showSingleDeal={this.showSingleDeal}
          deals={this.state.deals}
        />
      </View>
    );
  };

  findCurrentDeal = () => {
    return this.state.deals.find(a => a.key === this.state.currentDealId);
  };

  renderSingleDeal = () => {
    return <SingleDeal initDeal={this.findCurrentDeal()} />;
  };

  render() {
    return (
      <View style={styles.appContainer}>
        <TouchableOpacity onPress={this.toggleBack}>
          <Text style={styles.header}>Bakesale</Text>
        </TouchableOpacity>
          {!this.state.currentDealId
            ? this.state.deals.length > 0
              ? this.renderList()
              : this.renderLoading()
            : this.renderSingleDeal()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    justifyContent: "flex-start",
    marginTop: 50,
    marginBottom: 5,
    paddingBottom: 5
  },
  header: {
    alignSelf: "center",
    fontSize: 40,
    marginBottom: 20
  },
  loadingText: {
    alignSelf: "center",
    fontSize: 12
  },
});
