import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet, Image} from 'react-native';
import {SIZE, Res} from '../constants/env';

export default class BackgroundButton extends React.Component {
  render() {
    const styles = this.makeStyles();
    return (
      <TouchableOpacity style={styles.touchable} onPress={this.props.onPress} activeOpacity={.6}>
        <View style={styles.view}>
          {/* {this.makeImageIfAny(styles)} */}
          <Text style={styles.text}>{this.props.title}</Text>
        </View>
      </TouchableOpacity>
    );
  }

//   makeImageIfAny(styles) {
//     if (this.props.showImage) {
//       return <Image style={styles.image} source={R.images.check} />;
//     }
//   }

  makeStyles() {
    return StyleSheet.create({
      view: {
        flexDirection: 'row',
        borderRadius: 15,
        // borderColor: this.props.borderColor,
        // borderWidth: 2,
        backgroundColor: this.props.backgroundColor,
        height: 32,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 16,
        paddingRight: 16,
      },
      touchable: {
        // marginLeft: 4,
        marginRight: 6,
        marginBottom: 8,
      },
      image: {
        marginRight: 8,
      },
      text: {
        fontSize: Res.Sizes.Body,
        textAlign: 'center',
        color: this.props.textColor,
      },
    });
  }
}
