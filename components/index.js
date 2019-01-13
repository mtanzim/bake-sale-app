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

import {
  createHorizontalPanResponder,
  postStateUpdateAnimateSwipe
} from "./swipeHorizontal";

export default class AppContainer extends React.Component {
  titleXPos = new Animated.Value(0);

  state = {
    deals: [],
    curDealIndex: -1,
    curDealDetail: null,
    searchedDeals: [],
    searchFailed: false,
    currentDealId: null
  };

  pageXpos = new Animated.Value(0);
  width = Dimensions.get("window").width;
  pagePanResponder = createHorizontalPanResponder(
    this.pageXpos,
    this.width,
    // callback on successful release
    dir => {
      console.log(`Finished page swiping ${dir > 0 ? "right" : "left"}`);
      this.togglePages(dir);
    }
  );

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

  // cycle through the images
  togglePages = dir => {
    dir = -1 * dir;

    this.setState(
      prevState => {
        if (prevState.curDealIndex === prevState.deals.length - 1 && dir > 0) {
          let curIdx = 0;
          return {
            curDealIndex: curIdx,
            currentDealId: prevState.deals[curIdx].key
          };
          // return prevState;
        } else if (prevState.curDealIndex === 0 && dir < 0) {
          let curIdx = prevState.deals.length - 1;

          return {
            curDealIndex: curIdx,
            currentDealId: prevState.deals[curIdx].key
          };
          // return prevState;
        } else {
          let curIdx = prevState.curDealIndex + 1 * dir;
          return {
            curDealIndex: curIdx,
            currentDealId: prevState.deals[curIdx].key
          };
        }
      },
      () => {
        postStateUpdateAnimateSwipe(
          -1 * dir,
          this.pageXpos,
          this.width,
          `Current page index: ${this.state.curDealIndex}\nCurrent page key: ${
            this.state.currentDealId
          }`
        );
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

  showSingleDeal = id => {
    this.setState(
      {
        currentDealId: id,
        curDealIndex: this.state.deals.findIndex(deal => deal.key === id)
      },
      () => {
        console.log(this.state.currentDealId);
        console.log(`switched to deal index: ${this.state.curDealIndex}`);
      }
    );
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
    return (
      <SingleDeal
        panFunc={this.pagePanResponder}
        animX={this.pageXpos}
        initDeal={this.findCurrentDeal()}
      />
    );
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
