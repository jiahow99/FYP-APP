import { View, Text } from 'react-native'
import React from 'react'
import { observer } from 'mobx-react'
import { trackingStore } from '../../store/TrackingStore'
import { useRef } from 'react'
import { renderBackdrop, snapPoints } from '../../utils/bottomsheet'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { AntDesign } from '@expo/vector-icons';

const CompletedModal = observer(() => {
    // Ref
    const modalRef = useRef(null);

    const { completed, mechanicInfo } = trackingStore;

    if (completed) {
        modalRef.current?.present();
    }
    
    return (
        <BottomSheetModal
            ref={modalRef}
            index={1}
            snapPoints={snapPoints(['15%','60%'])}
            backdropComponent={renderBackdrop(1,0)}
            enablePanDownToClose
            backgroundStyle={{ borderRadius: 30, overflow: 'hidden'}}
        >
            <View className="w-full h-full flex flex-col items-center justify-center">
                <AntDesign name="checkcircle" size={50} color="green" />
                <Text className="w-10/12 text-2xl font-bold flex items-center justify-center">
                    {mechanicInfo.name} has reached your destination !
                </Text>
                <Text className="w-10/12 text-2xl font-bold flex items-center justify-center">
                    Thank you
                </Text>
                <TouchableOpacity onPress={() => modalRef.current?.dismiss()} className="py-3 rounded-xl w-10/12 bg-green-500">
                    <Text className="text-white font-bold text-lg">Close</Text>
                </TouchableOpacity>
            </View>
        </BottomSheetModal>
    )
})



export default CompletedModal