import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput
} from "react-native";
import PropTypes from "prop-types";

export default class SearchBar extends React.Component {
  // static propTypes = {
  //   // showSingleDeal: PropTypes.func.isRequired
  // };


  render() {
    return (
      <TextInput style={styles.searchBar} placeholder="Search Deals">
      </TextInput>
    );
  }
}

const styles = StyleSheet.create({
  searchBar: {
    // alignSelf: 'center',
    fontSize: 14,
    marginBottom: 20,
    marginHorizontal: 15,
    paddingHorizontal: 5,
    borderColor: "#ddd",
    borderWidth: 1,
    // padding: 8,
    borderRadius: 2
  }
});
