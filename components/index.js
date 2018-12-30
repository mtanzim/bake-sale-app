import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {fetchInitialDeals} from "./fetch";
import DealList from "./DealList";


export default class AppContainer extends React.Component {

  state = {
    deals: []
  }

  async componentDidMount () {
    let deals = await fetchInitialDeals();
    this.setState({deals});
  }
  
  render() {
    return (
      <View style={styles.appContainer}>
        <Text style={styles.header}>Bakesale</Text>
        { (this.state.deals.length > 0) ? (
          this.state.deals.map(deal => {
            // console.log(deal)
            return (<DealList key={deal.key} id={deal.key} title={deal.title}/>)
          })) :
          (<Text>Loading...</Text>)
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
  },
  header: {
    fontSize: 40,
  }
});
