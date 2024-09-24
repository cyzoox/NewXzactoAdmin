import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import colors from '../themes/colors';
import {useStore} from '../context/StoreContext';
import {Divider} from 'react-native-elements/dist/divider/Divider';
import formatMoney from 'accounting-js/lib/formatMoney.js';
import SearchInput, {createFilter} from 'react-native-search-filter';
import moment from 'moment';
const KEYS_TO_FILTERS = ['date'];

const SADashboard = () => {
  const {
    stores,
    loading,
    products,
    expenses,
    transactions,
    user_info,
    onCreateUserPlan,
    staffs,
    onUpdatePlan,
    updateUserInfo,
  } = useStore();
  const date = moment().unix();
  const today = `${moment.unix(date).format('MMMM DD, YYYY')}`;

  const filteredTransaction = transactions.filter(
    createFilter(today, KEYS_TO_FILTERS),
  );
  const filteredExpenses = expenses.filter(
    createFilter(today, KEYS_TO_FILTERS),
  );

  const calculateStoreSale = (id, sid) => {
    let total = 0;

    filteredTransaction.forEach(item => {
      if (
        item.attendant_id === id &&
        item.status === 'Completed' &&
        item.store_id === sid
      ) {
        total += item.total;
      }
    });

    return total;
  };

  const calculateStoreSaleProfit = (id, sid) => {
    let total = 0;

    filteredTransaction.forEach(item => {
      if (
        item.attendant_id === id &&
        item.status === 'Completed' &&
        item.store_id === sid
      ) {
        total += item.profit;
      }
    });

    return total;
  };

  const calculateStoreExpenses = id => {
    let total = 0;
    filteredExpenses.forEach(item => {
      if (item.store_id === id) {
        total += item.amount;
      }
    });
    return total;
  };

  const calculateExpenses = () => {
    let total = 0;
    filteredExpenses.forEach(item => {
      total += item.amount;
    });
    return total;
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.xlgridStyle}>
        <View style={{position: 'absolute', top: 20, left: 20}}>
          <Text style={{fontSize: 25, color: colors.white, marginLeft: 15}}>
            XZACTO ADMIN
          </Text>
        </View>

        <TouchableOpacity
          style={{position: 'absolute', top: 20, right: 20}}
          onPress={() => {}}>
          <Image
            style={{width: 40, height: 40}}
            source={require('../../assets/logout.png')}
          />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={styles.saleMainCard}>
          <View>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 19,
                fontWeight: '900',
                paddingVertical: 10,
              }}>
              Today's Sale{' '}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: 10,
                paddingVertical: 10,
              }}>
              <Text style={{fontSize: 15, flex: 3}}></Text>
              <Text
                style={{
                  fontSize: 15,
                  textAlign: 'center',
                  fontWeight: 'bold',
                  color: colors.red,
                }}>
                Sales
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  marginLeft: 40,
                  fontWeight: 'bold',
                  color: colors,
                }}>
                Profit
              </Text>
            </View>
            <Divider />
            <View>
              {stores.map((item, index) => {
                return (
                  <View
                    key={index}
                    style={{
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      marginHorizontal: 10,
                      paddingVertical: 10,
                    }}>
                    <Text style={{fontSize: 18, flex: 3, fontWeight: 'bold'}}>
                      {item.name}
                    </Text>
                    {staffs.map(
                      subitem =>
                        subitem.store_id === item._id && (
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              marginHorizontal: 10,
                              paddingVertical: 10,
                            }}>
                            <Text style={{fontSize: 15, flex: 3}}>
                              {subitem.name}
                            </Text>
                            <Text style={{fontSize: 15}}>
                              {formatMoney(
                                calculateStoreSale(subitem._id, item._id),
                                {symbol: '₱ ', precision: 2},
                              )}
                            </Text>
                            <Text style={{fontSize: 15, marginLeft: 30}}>
                              {formatMoney(
                                calculateStoreSaleProfit(subitem._id, item._id),
                                {symbol: '₱ ', precision: 2},
                              )}
                            </Text>
                          </View>
                        ),
                    )}
                    <View
                      style={{
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        paddingHorizontal: 13,
                      }}>
                      <Text
                        style={{
                          fontSize: 15,
                          flex: 3,
                          fontWeight: 'bold',
                          color: colors.red,
                        }}>
                        Total
                      </Text>
                      <Text
                        style={{
                          fontSize: 15,
                          marginRight: 28,
                          fontWeight: 'bold',
                          color: colors.red,
                        }}>
                        {formatMoney(calculateStoreSale(item._id), {
                          symbol: '₱ ',
                          precision: 2,
                        })}
                      </Text>
                      <Text
                        style={{
                          fontSize: 15,

                          fontWeight: 'bold',
                          color: colors.red,
                        }}>
                        {formatMoney(calculateStoreSale(item._id), {
                          symbol: '₱ ',
                          precision: 2,
                        })}
                      </Text>
                    </View>
                    <Divider style={{paddingTop: 10}} />
                  </View>
                );
              })}
            </View>
            <Divider />
          </View>
        </View>
        <View
          style={{
            borderRadius: 10,
            borderColor: '#fff',
            backgroundColor: '#fff',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,
            elevation: 3,
            margin: 15,
          }}>
          <View>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 19,
                fontWeight: '900',
                paddingVertical: 10,
              }}>
              Today's Expenses{' '}
            </Text>
            <Divider />
            <View>
              {stores.map((item, index) => {
                return (
                  <View
                    key={index}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginHorizontal: 10,
                      paddingVertical: 10,
                    }}>
                    <Text style={{fontSize: 15}}>{item.name}</Text>
                    <Text style={{fontSize: 15}}>
                      {formatMoney(calculateStoreExpenses(item._id), {
                        symbol: '₱ ',
                        precision: 2,
                      })}
                    </Text>
                  </View>
                );
              })}
            </View>
            <Divider />
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginHorizontal: 10,
                  paddingVertical: 10,
                }}>
                <Text style={{fontSize: 15, fontWeight: 'bold'}}>Total</Text>
                <Text style={{fontSize: 15, fontWeight: 'bold'}}>
                  {formatMoney(calculateExpenses(), {
                    symbol: '₱ ',
                    precision: 2,
                  })}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
  },
  saleMainCard: {
    borderRadius: 10,
    borderColor: '#fff',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    margin: 15,
  },
  xlgridStyle: {
    backgroundColor: colors.primary,
    height: 150,
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
    marginBottom: 50,
  },
});

export default SADashboard;
