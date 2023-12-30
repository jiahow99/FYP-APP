import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { observer } from 'mobx-react'
import { notificationStore } from '../store/NotificationStore'
import { useRef } from 'react'
import { renderBackdrop, snapPoints } from '../utils/bottomsheet'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { TouchableOpacity } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons';
import * as Linking from 'expo-linking';
import { trackingStore } from '../store/TrackingStore'
import { mechanicStore } from '../store/MechanicStore'
import { toast } from '@backpackapp-io/react-native-toast'

const WazeModal = observer(() => {
    // Ref
    const modalRef = useRef(null);
    const { wazeModal, toggleWazeModal, userLocation } = notificationStore;
    const { trackingInfo, setTrackingInfo } = trackingStore;
    const { completeService } = mechanicStore;

    useEffect(() => {
      if (wazeModal) {
          modalRef.current?.present();
      } else {
        modalRef.current?.dismiss();
      }
    }, [wazeModal]);

    // Open waze if installed
    // Go to place store if not
    const openWaze = () => {
        Linking.openURL(`https://waze.com/ul?ll=${userLocation.latitude},${userLocation.longitude}&navigate=yes`);
    }

    const handleComplete = () => {
      if(completeService(trackingInfo)) {
        toggleWazeModal(false);
        toast.success("Service completed.");
        setTrackingInfo(null);
      };
    }

    return (
        <BottomSheetModal
          ref={modalRef}
          index={1}
          snapPoints={snapPoints(['10%','25%'])}
          backdropComponent={renderBackdrop(1, 0, 'close')}
          enablePanDownToClose
        >
          <View className="p-3">
            {/* Open with waze */}
            <TouchableOpacity onPress={openWaze} className="bg-[#31CDFE] w-full rounded-full py-2 flex flex-row justify-center items-center">
                <Text className="text-lg font-bold text-white mr-3">Go with Waze</Text>
                <FontAwesome5 name="waze" size={26} color="white" />
            </TouchableOpacity>
            {/* Complete service */}
            <TouchableOpacity onPress={handleComplete} className="bg-white mt-3 w-full rounded-full py-2 flex flex-row justify-center items-center border-4 border-green-500">
                <Text className="text-lg font-bold mr-3">Complete Service</Text>
            </TouchableOpacity>
          </View>
        </BottomSheetModal>
    )
})

export default WazeModal