import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaView, StyleSheet, FlatList } from 'react-native';
import { Button } from 'react-native-elements';

import { THEME } from '../theme';
import { FilterItem } from '../components/FilterItem';
import { fetchDrinksData } from '../redux/actions/drinks';
import { SELECTED_FILTERS } from '../redux/types';

export const FilterScreen = ({ navigation }) => {
  const filtersList = useSelector(state => state.drinks.filtersList);
  const selectedFiltersList = useSelector(state => state.drinks.selectedFiltersList);
  const dispatch = useDispatch();

  const handleSelected = useCallback(() => {
    dispatch({ type: SELECTED_FILTERS });
    dispatch(fetchDrinksData());
    navigation.navigate('Main');
  }, [dispatch, fetchDrinksData, navigation]);

  return (
    <SafeAreaView style={styles.wrap}>
      <FlatList
        data={filtersList} 
        keyExtractor={filter => filter.id.toString()}
        renderItem={({ item }) => <FilterItem filterItem={item} />}
      />
      <Button
        title="APPLY"
        containerStyle={styles.buttonContainer}
        buttonStyle={styles.button}
        onPress={handleSelected}
        titleStyle={styles.buttonTitle}
        disabled={!selectedFiltersList.length}
      />
    </SafeAreaView>
  );
};

FilterScreen.navigationOptions = {
  headerTitle: 'Filters',
};

const styles = StyleSheet.create({
  wrap: {
    padding: 30,
  },
  button: {
    backgroundColor: `${THEME.BUTTON_BG_COLOR}`,
    height: 53,
    width: 280,
  },
  buttonTitle: {
    fontFamily: 'roboto-bold',
    fontSize: 16,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 110,
    left: 50,
  },
});