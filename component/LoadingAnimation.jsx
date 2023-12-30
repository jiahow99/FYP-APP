import { View, Text } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native'
import Modal from "react-native-modal";

const LoadingAnimation = ({ isVisible, children='' }) => {
  return (
    <Modal isVisible={isVisible}>
        <View className="w-full h-full flex items-center justify-center">
            <View className="p-5 bg-white rounded-2xl flex items-center justify-center">
                <LottieView source={require("../assets/lottie/pin-loading.json")} className="w-56 h-28" autoSize autoPlay loop />
                <Text className="font-semibold">
                  {children}
                </Text>
            </View>
        </View>
    </Modal>
  )
}

export default LoadingAnimation