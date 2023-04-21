import React from 'react';
import {View, StyleSheet, Button} from 'react-native';
// import R from 'res/R';
import BackgroundButton from './BackgroundButton';
// import addOrRemove from 'library/utils/addOrRemove';
export default class TagsView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: props.selected,
    };
  }

  render() {
    return <View style={styles.container}>{this.makeButtons()}</View>;
  }

  // onPress = (tag) => {
  //   let selected;
  //   if (this.props.isExclusive) {
  //     selected = [tag];
  //   } else {
  //     selected = addOrRemove(this.state.selected, tag);
  //   }
  //   this.setState({
  //     selected,
  //   });
  // };
  
  makeButtons() {
    return this.props.all.map((tag, i) => {
      const on = this.state.selected.includes(tag);
      const backgroundColor = on
        ? '#000'
        : '#505050CC';
      const textColor = on ? '#FFF' : '#FFF';
      const borderColor = on ? '#C70039' : '#900C3F';
      return (
        <BackgroundButton
          backgroundColor={backgroundColor}
          textColor={textColor}
          // borderColor={borderColor}
          onPress={() => {
            // this.onPress(tag);
          }}
          key={i}
          showImage={on}
          title={tag}
        />
      );
    });
  }
}
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    // paddingBottom: '10%',
    // paddingHorizontal: 20,
  },
});
