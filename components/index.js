import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { fetchInitialDeals, fetchSearch } from "./fetch";
import DealList from "./DealList";
import SingleDeal from "./SingleDeal";
import SearchBar from "./SearchBar";

export default class AppContainer extends React.Component {
  state = {
    deals: [],
    searchedDeals: [],
    currentDealId: null
  };

  async componentDidMount() {
    let deals = await fetchInitialDeals();
    this.setState({ deals });
  }

  getSearchResults = async text => {
    const results = await fetchSearch(text);
    const keys = results.map(a => a.key);
    this.setState(
      prevState => {
        // console.log(keys);
        return {
          searchedDeals: prevState.deals.filter(a => {
            // console.log(`Testing ${a.key} on ${keys}`)
            // console.log (keys.indexOf(a.key))
            return keys.indexOf(a.key) > -1;
          })
        };
      },
      () => {
        // console.log('These keys made it:')
        this.state.searchedDeals.forEach(a => {
          // console.log(a.key)
        });
      }
    );
  };

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
          currentDealId: null,
          searchedDeals: []
        };
      } else {
        return prevState;
      }
    });
  };

  renderLoading = () => {
    return <Text style={styles.loadingText}>Loading...</Text>;
  };

  renderSearchedList = () => {
    return (
      <View>
        <SearchBar submitSearch={this.getSearchResults} />
        <DealList
          showSingleDeal={this.showSingleDeal}
          deals={this.state.searchedDeals}
        />
      </View>
    );
  };

  renderList = () => {
    return (
      <View>
        <SearchBar submitSearch={this.getSearchResults} />
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
            ? this.state.searchedDeals.length > 0
              ? this.renderSearchedList()
              : this.renderList()
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
  }
});
