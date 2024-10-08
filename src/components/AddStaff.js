import React, {useState} from 'react';
import {Overlay, Input, Button, Text} from 'react-native-elements';
import {TouchableOpacity} from 'react-native';
import styles from '../../stylesheet';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import colors from '../themes/colors';
import {useAuth} from '../context/AuthContext';
import {Picker} from '@react-native-picker/picker';
import {TextInput} from 'react-native-paper';
// The AddTask is a button for adding tasks. When the button is pressed, an
// overlay shows up to request user input for the new task name. When the
// "Create" button on the overlay is pressed, the overlay closes and the new
// task is created in the realm.
export function AddStaff({createStaff, store}) {
  const {deviceName, deviceId} = useStore();
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('Active');

  return (
    <>
      <Overlay
        isVisible={overlayVisible}
        overlayStyle={{
          width: '70%',
          paddingHorizontal: 30,
          paddingBottom: 20,
          paddingTop: 15,
        }}
        onBackdropPress={() => setOverlayVisible(false)}>
        <>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 18,
              fontWeight: '700',
              marginBottom: 10,
            }}>
            Add Staff
          </Text>
          <TextInput
            mode="outlined"
            placeholder="Name"
            onChangeText={text => setName(text)}
            autoFocus={true}
          />
          <TextInput
            mode="outlined"
            placeholder="Password"
            onChangeText={text => setPassword(text)}
            autoFocus={true}
            maxLength={6}
          />
          <Button
            title="Create"
            buttonStyle={{marginTop: 20, backgroundColor: colors.accent}}
            onPress={() => {
              setOverlayVisible(false);
              createStaff(
                name,
                store._id,
                store.name,
                password,
                status,
                deviceName,
                deviceId,
              );
            }}
          />
        </>
      </Overlay>
      <TouchableOpacity onPress={() => setOverlayVisible(true)}>
        <EvilIcons name={'plus'} size={30} color={colors.white} />
      </TouchableOpacity>
    </>
  );
}
