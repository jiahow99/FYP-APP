import { View, Text } from 'react-native'
import React from 'react'
import { Button, Dialog, Portal } from 'react-native-paper'

const LocationDialog = ({ visible, handleOk }) => {
  return (
    <Portal>
        <Dialog visible={visible} dismissable={false} dismissableBackButton={false}>
            {/* Contents */}
            <Dialog.Content>
                <Text variant="bodyMedium">
                    To continue, turn on your location services.
                </Text>
            </Dialog.Content>
            {/* Buttons */}
            <Dialog.Actions>
            <Button onPress={handleOk}>Ok</Button>
            </Dialog.Actions>
        </Dialog>
    </Portal>
  )
}

export default LocationDialog