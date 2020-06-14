import React, { useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ActivityIndicator, 
  SectionList, 
  Button,
  TouchableOpacity
} from 'react-native';

import { THEME } from '../theme';
import { DrinkItem } from '../components/DrinkItem';
import { AppHeaderIcon } from '../components/AppHeaderIcon';
import { filtersLoaded, fetchDrinksData } from '../redux/actions/drinks';

export const MainScreen = () => {
  const isLoading = useSelector(state => state.drinks.isLoading);
  const hasError = useSelector(state => state.drinks.hasError);
  const drinksData = useSelector(state => state.drinks.drinksData);
  const filtersList = useSelector(state => state.drinks.filtersList);
  const dispatch = useDispatch();
  let sectionListRef = useRef();

  useEffect(() => {
    !filtersList.length && dispatch(filtersLoaded());
    dispatch(fetchDrinksData());
  }, [filtersList.length]);

  const handleScrollToTop = () => {
    sectionListRef.scrollToLocation({
      animated: true,
      sectionIndex: 0,
      itemIndex: 0,
      viewPosition: 0
    });
  };

  const handleLoadMore = useCallback(() =>
    dispatch(fetchDrinksData()),
    [dispatch, fetchDrinksData]
  );

  const handleRestart = useCallback(() =>
    dispatch(filtersLoaded()),
    [dispatch, filtersLoaded]
  );

  if (isLoading && !filtersList.length) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size='large' color={THEME.BUTTON_BG_COLOR} />
      </View> 
    );
  }

  if (hasError) {
    return (
      <View style={styles.wrap}>
        <Text style={styles.text}>Something went wrong, try again later!</Text>
        <Button
          title='RESTART'
          color={THEME.BUTTON_BG_COLOR}
          onPress={handleRestart}
        />
      </View>
    );
  }

  const renderFooter = () => {
    if (isLoading) {
      return (
        <View style={styles.loader}>
          <ActivityIndicator size='large' color={THEME.BUTTON_BG_COLOR} />
        </View> 
      );
    } else {
      return drinksData.length ? (
        <View>
          <Text style={styles.text}>You have reached the end of the list!</Text>
          <TouchableOpacity onPress={handleScrollToTop}>
            <Text style={styles.textLink}>Scroll to top!</Text>
          </TouchableOpacity>
        </View>
      ) : null
    }
  };

  return (
    <SafeAreaView style={styles.wrap}>
      <SectionList
        sections={drinksData}
        keyExtractor={(item, index) => index}
        renderItem={({ item }) => <DrinkItem drinkItem={item} />}
        renderSectionHeader={({ section }) => (
          <Text style={styles.title}>{section.category}</Text>
        )}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        ref={ref => (sectionListRef = ref)}
        initialNumToRender={5}
      />
    </SafeAreaView>
  );
};

MainScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: 'Drinks',
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
        <Item
          title='Filters'
          iconName='filter'
          onPress={() => navigation.navigate('Filter')}
        />
      </HeaderButtons>
    ),
  }
};

const styles = StyleSheet.create({
  wrap: {
    padding: 20,
  },
  loader: {
    marginTop: 10,
    alignItems: 'center',
  },
  title: {
    color: `${THEME.TEXT_COLOR}`,
    fontFamily: 'roboto-regular',
    fontSize: 14,
    marginBottom: 20
  },
  text: {
    color: `${THEME.TEXT_COLOR}`,
    fontFamily: 'roboto-regular',
    fontSize: 16,
    alignSelf: 'center',
    marginBottom: 20
  },
  textLink: {
    color: `${THEME.TEXT_COLOR}`,
    fontFamily: 'roboto-regular',
    fontSize: 19,
    alignSelf: 'center',
    textDecorationLine: 'underline'
  }
});