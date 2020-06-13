import React, { memo } from 'react';
import { 
  StyleSheet, 
  View, 
  Image, 
  Text
} from 'react-native';

import { THEME } from '../theme';

export const DrinkItem = memo(({ drinkItem }) => {
  return (
    <View style={styles.wrap}>
      <Image style={styles.image} source={{ uri: drinkItem.strDrinkThumb }} />
      <View style={styles.textBlock}>
        <Text style={styles.title}>
          {drinkItem.strDrink}
        </Text>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  wrap: {
    marginBottom: 40,
    flexDirection: 'row'
  },
  textBlock: {
    paddingLeft: 20,
    justifyContent: 'center'
  },
  image: {
    width: 100,
    height: 100
  },
  title: {
    color: `${THEME.TEXT_COLOR}`,
    fontFamily: 'roboto-regular',
    fontSize: 16,
  }
});