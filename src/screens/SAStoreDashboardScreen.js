import React from 'react';
import {Text, StyleSheet, TouchableOpacity, View} from 'react-native';
import AppHeader from '../components/AppHeader';
import CardTiles from '../components/CardTiles';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import colors from '../themes/colors';

const SAStoreDashboard = ({navigation, route}) => {
  const STORE = route.params.storess;
  return (
    <View style={{flex: 1}}>
      <AppHeader
        centerText={`Store Dashboard`}
        leftComponent={
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <EvilIcons name={'arrow-left'} size={30} color={colors.white} />
          </TouchableOpacity>
        }
        // rightComponent={
        //   <TouchableOpacity style={{flexDirection:'row'}} onPress={()=> navigation.navigate("DeliveryRequest", {store:STORE})}>
        //   <EvilIcons name={'bell'} size={30} color={colors.white}/>
        //   <Badge containerStyle={{marginTop:-6}} value=" 3 " status="error" />
        // </TouchableOpacity>
        // }
      />
      <CardTiles
        rightTileText="Products"
        leftTileText="Reports"
        iconRightName="md-barcode-outline"
        iconLeftName="../../assets/xzacto_icons/warehouseicons/report.png"
        leftRouteName="Reports"
        rightRouteName="Products"
        centerTileText="Expenses"
        centerRouteName="Expenses"
        iconCenterName="document-text-outline"
        extraProps={STORE}
      />
      <CardTiles
        rightTileText="Attendants"
        leftTileText="Bills"
        iconRightName="md-people-circle-outline"
        iconLeftName="../../assets/xzacto_icons/warehouseicons/report.png"
        leftRouteName="BillsAndReceipt"
        rightRouteName="Staffs"
        centerTileText="Customers"
        centerRouteName="Customers"
        iconCenterName="md-people-circle-outline"
        extraProps={STORE}
      />
      <CardTiles
        leftTileText="Suppliers"
        iconLeftName="../../assets/xzacto_icons/warehouseicons/report.png"
        leftRouteName="Suppliers"
        centerTileText="Settings"
        centerRouteName="StoreSettings"
        iconCenterName="settings-outline"
        rightTileText="Delivery"
        iconRightName="md-people-circle-outline"
        rightRouteName="DeliveryRequest"
        extraProps={STORE}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
  },
});

export default SAStoreDashboard;
