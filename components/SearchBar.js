import React from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import PropTypes from "prop-types";

export default class SearchBar extends React.Component {
  static propTypes = {
    submitSearch: PropTypes.func.isRequired
  };

  state = {
    text: ""
  };

  changeSearchText = text => {
    this.setState({ text }, () => {
      console.log(this.state.text);
      this.props.submitSearch(this.state.text);
    });
  };

  render() {
    return (
      <TextInput
        maxLength={20}
        onSubmitEditing={() => this.props.submitSearch(this.state.text)}
        onChangeText={this.changeSearchText}
        style={styles.searchBar}
        placeholder="Search Deals"
      />
    );
  }
}

const styles = StyleSheet.create({
  searchBar: {
    fontSize: 14,
    marginBottom: 20,
    marginHorizontal: 15,
    paddingHorizontal: 5,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 2
  }
});
