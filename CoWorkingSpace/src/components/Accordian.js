import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Res } from '../constants/env';

function Accordian(props) {
  const [data, setData] = useState(props.data);
  const [expanded, setExpanded] = useState(false);

  if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  function toggleExpand() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  return (
    <View>
      <TouchableOpacity
        ref={this.accordian}
        style={styles.row}
        onPress={() => toggleExpand()}>
        <Text style={[styles.title, styles.font]}>{props.title}</Text>
        <Icon
          name={
            expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'
          }
          size={30}
          color={Res.Colors.Black}
        />
      </TouchableOpacity>
      <View style={styles.parentHr} />
      {expanded && (
        <View style={styles.child}>
          <Text>{props.title}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Res.Colors.White,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 56,
    paddingLeft: 25,
    paddingRight: 18,
    alignItems: 'center',
    backgroundColor: Res.Colors.Gray,
  },
  parentHr: {
    height: 1,
    color: Res.Colors.White,
    width: '100%',
  },
  child: {
    backgroundColor: Res.Colors.Detail,
    padding: 16,
  },
});

export default Accordian;
