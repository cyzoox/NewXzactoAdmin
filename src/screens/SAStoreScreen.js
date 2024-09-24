import React from 'react';
import {
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
  View,
} from 'react-native';
import {useStore} from '../context/StoreContext';
import colors from '../themes/colors';
import {
  Card,
  ListItem,
  Avatar,
  Badge,
  Overlay,
  Input,
  Button,
  PricingCard,
} from 'react-native-elements';
import formatMoney from 'accounting-js/lib/formatMoney.js';
import moment from 'moment';
import SearchInput, {createFilter} from 'react-native-search-filter';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const KEYS_TO_FILTERS = ['date'];

const SAStoreScreen = ({navigation}) => {
  const {createStore, stores, loading, transactions, user_info} = useStore();
  const date = moment().unix();
  const today = `${moment.unix(date).format('MMMM DD, YYYY')}`;

  const filteredTransaction = transactions.filter(
    createFilter(today, KEYS_TO_FILTERS),
  );

  const calculateDailySales = id => {
    let total = 0;

    filteredTransaction.forEach(item => {
      if (item.store_id === id && item.status === 'Completed') {
        total += item.total;
      }
    });

    return total;
  };

  const renderItem = ({item}) => (
    <ListItem
      bottomDivider
      underlayColor="white"
      containerStyle={styles.lgridStyle}
      onPress={() => navigation.navigate('StoreDashboard', {storess: item})}>
      <Avatar
        title={item.name[0]}
        size="large"
        source={require('../../assets/xzacto_icons/iconsstore/stores2.png')}
      />
      <ListItem.Content>
        <ListItem.Title>{item.name}</ListItem.Title>
        <ListItem.Subtitle>{item.branch}</ListItem.Subtitle>
      </ListItem.Content>
      <Text style={{fontSize: 17, fontWeight: '700', color: colors.primary}}>
        {formatMoney(calculateDailySales(item._id), {
          symbol: '₱',
          precision: 2,
        })}
      </Text>
    </ListItem>
  );
  return (
    <View style={{flex: 1}}>
      <View style={styles.xlgridStyle}>
        <Text
          style={{
            fontSize: 40,
            color: 'white',
            fontWeight: '700',
            marginBottom: 20,
            marginLeft: 20,
            textAlign: 'center',
            marginTop: 70,
          }}>
          STORES
        </Text>
        <TouchableOpacity
          style={{position: 'absolute', top: 30, right: 20}}
          onPress={() => onAddStore()}>
          <Image
            style={{width: 60, height: 60}}
            source={require('../../assets/AddStore.png')}
          />
        </TouchableOpacity>
      </View>
      <FlatList
        keyExtractor={key => key._id}
        data={stores}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
  },
  xlgridStyle: {
    backgroundColor: colors.primary,
    height: windowHeight / 4,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
    justifyContent: 'center',
    shadowColor: '#EBECF0',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.89,
    shadowRadius: 2,
    elevation: 5,
  },
  lgridStyle: {
    flex: 1,
    height: 90,
    padding: 10,
    backgroundColor: colors.white,
    marginHorizontal: 15,
    marginTop: 10,
    marginBottom: 5,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    alignItems: 'center',
    shadowColor: '#EBECF0',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.89,
    shadowRadius: 2,
    elevation: 5,
  },
});

export default SAStoreScreen;
