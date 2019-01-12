import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Easing,
  Dimensions
} from "react-native";
import { fetchInitialDeals, fetchSearch } from "./fetch";
import DealList from "./DealList";
import SingleDeal from "./SingleDeal";
import SearchBar from "./SearchBar";

export default class AppContainer extends React.Component {
  titleXPos = new Animated.Value(0);

  state = {
    deals: [],
    searchedDeals: [],
    searchFailed: false,
    currentDealId: null
  };

  animateHeader = (dir = 1) => {
    const width = Dimensions.get("window").width - 250;

    Animated.timing(this.titleXPos, {
      toValue: dir * (width / 2),
      duration: 1000,
      easing: Easing.ease
    }).start(() => {
      if (this.state.deals.length === 0) {
        this.animateHeader(dir * -1);
      } else {
        Animated.timing(this.titleXPos, {
          toValue: 0,
          duration: 750,
          easing: Easing.ease
        }).start();
      }
    });
  };

  async componentDidMount() {
    if (this.state.deals.length === 0) this.animateHeader();
    let deals = await fetchInitialDeals();
    setTimeout(async () => {
      this.setState({ deals });
    }, 1250);
  }

  getSearchResults = async text => {
    const results = await fetchSearch(text);
    const keys = results.map(a => a.key);
    this.setState(prevState => {
      let searchedDeals = prevState.deals.filter(a => {
        return keys.indexOf(a.key) > -1;
      });

      if (searchedDeals.length === 0) {
        return { searchFailed: true, searchedDeals: [] };
      }

      return {
        searchedDeals,
        searchFailed: false
      };
    });
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

  renderList = ({ isSearched }) => {
    return (
      <View>
        <SearchBar submitSearch={this.getSearchResults} />
        {this.state.searchFailed && (
          <Text style={styles.searchBarMessage}>No search results!</Text>
        )}
        <DealList
          showSingleDeal={this.showSingleDeal}
          deals={isSearched ? this.state.searchedDeals : this.state.deals}
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
        <Animated.View style={{ left: this.titleXPos }}>
          <TouchableOpacity onPress={this.toggleBack}>
            <Text style={styles.header}>
              {this.state.currentDealId ? "Back" : "Bakesale"}
            </Text>
          </TouchableOpacity>
        </Animated.View>
        {!this.state.currentDealId
          ? this.state.deals.length > 0
            ? this.state.searchedDeals.length > 0
              ? this.renderList({ isSearched: true })
              : this.renderList({ isSearched: false })
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
  searchBarMessage: {
    alignSelf: "center",
    marginVertical: 5
  }
});
