import React,{ useState } from "react";
import { Text, StyleSheet, View, FlatList, TouchableOpacity } from "react-native";
import { Row, Col, Grid } from 'react-native-easy-grid';
import { Avatar, ListItem, Overlay } from "react-native-elements";
import AppHeader from "../components/AppHeader";
import DataTable from "../components/DataTable";
import FilterModal from "../components/FilterModal";
import Spacer from "../components/Spacer";
import colors from "../themes/colors";
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import { useStore } from "../context/StoreContext";

const WarehousePulloutReport = ({ navigation }) => {
  const { transactions, getTRDetails, tr_details, warehouse_bo, warehouse_pullout, warehouse_expired } = useStore();


  const calculateTotal = () => {
    let total = 0;

    warehouse_pullout.forEach(item => {
        total += item.sprice*item.quantity;
    });

    return total;
  }
  const calculateTotalQty = () => {
    let total = 0;

    warehouse_pullout.forEach(item => {
        total += item.quantity;
    });

    return total;
  }

  const renderItem = ({ item }) => (
      <Row style={{marginVertical: 5}}>     
        <Col  style={[styles.ColStyle,{alignItems: 'center'}]}>
              <Text  style={styles.textColor}>{item.date}</Text>
        </Col>   
        <Col  style={[styles.ColStyle,{alignItems: 'center'}]}>
              <Text  style={styles.textColor}>{item.product}</Text>
        </Col> 
        <Col  style={[styles.ColStyle,{alignItems: 'center'}]}>
              <Text  style={styles.textColor}>{item.quantity}</Text>
        </Col> 
        <Col  style={[styles.ColStyle,{alignItems: 'center'}]}>
              <Text  style={styles.textColor}>{item.sprice*item.quantity}</Text>
        </Col>
        <Col  style={[styles.ColStyle,{alignItems: 'center'}]}>
              <Text  style={styles.textColor}>{item.reason}</Text>
        </Col>
        <Col  style={[styles.ColStyle,{alignItems: 'center'}]}>
              <Text  style={styles.textColor}>{item.processed_by}</Text>
        </Col>
        <Col  style={[styles.ColStyle,{alignItems: 'center'}]}>
              <Text  style={styles.textColor}>{item.pullout_by}</Text>
        </Col>
      </Row>
  )

 

  return (
    <View style={{ flex: 1 }}>
        <AppHeader 
          centerText="Pullout Report" 
          leftComponent={
            <TouchableOpacity onPress={()=> navigation.goBack()}>
              <EvilIcons name={'arrow-left'} size={30} color={colors.white}/>
            </TouchableOpacity>
          } 
          gradient
          rightComponent={<FilterModal />}
          />
        
        <DataTable
          total={calculateTotal()}
          ototal={calculateTotalQty()}
          headerTitles={['Date', 'Product', 'Qty', 'Amount', 'Reason', 'Processed By', 'Pullout By']}
          alignment="center"
        >
          <FlatList
                keyExtractor={(key) => key._id}
                data={warehouse_pullout}
                renderItem={renderItem}
              />
        </DataTable>
    </View>
  );
};

WarehousePulloutReport.navigationOptions = () => {
  return {
    headerShown: false
  };
}

const styles = StyleSheet.create({
  textColor: {
    fontSize: 14,
    color: colors.black,
    textAlign:'center'
  },
  ColStyle: {
      width: 100,
      justifyContent: 'center',
      borderBottomWidth: 1,
      borderBottomColor: colors.grey,
      paddingBottom: 5
  }
});



export default WarehousePulloutReport;