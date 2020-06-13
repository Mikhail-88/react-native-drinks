import React, { memo, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { StyleSheet } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons'; 

import { changeChecked } from '../redux/actions/drinks';
import { THEME } from '../theme';

export const FilterItem = memo(({ filterItem }) => {
  const { id, strCategory, checked } = filterItem;
  const dispatch = useDispatch();

  const handleChecked = useCallback(() => 
    dispatch(changeChecked(id)),
    [dispatch, changeChecked, id]
  );

  return (
    <CheckBox
      textStyle={styles.label}
      title={strCategory}
      checked={checked}
      onPress={handleChecked}
      checkedIcon={<AntDesign name="check" size={24} color="black" style={styles.icon}/>}
      iconRight
      containerStyle={styles.checkbox}
      uncheckedColor='transparent'
    />
  );
});

const styles = StyleSheet.create({
  label: {
    color: `${THEME.TEXT_COLOR}`,
    fontFamily: 'roboto-regular',
    fontSize: 16,
  },
  checkbox: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    width: '100%',
    paddingLeft: 0,
    marginBottom: 40,
  },
  icon: {
    marginLeft: 'auto'
  }
});