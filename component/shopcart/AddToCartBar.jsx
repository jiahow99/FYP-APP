import { View, Text } from 'react-native'
import React from 'react'
import { Surface } from 'react-native-paper'
import { TouchableOpacity } from 'react-native'
import { observer } from 'mobx-react'
import { cartStore } from '../../store/CartStore'

const handlePlaceOrder = () => {

}

const AddToCartBar = observer(() => {
  const { totalPrice } = cartStore;

  return (
    <Surface elevation={5} className="absolute bottom-0 left-0 w-full h-[17vh] bg-white py-3">
      <View className="w-11/12 h-full mx-auto flex flex-col justify-between">
        {/* Total */}
        <View className="w-full flex flex-row justify-between items-end">
          <Text className="text-lg font-medium">Total</Text>
          <Text className="text-xl font-bold">RM {Number(totalPrice).toFixed(2)}</Text>
        </View>

        {/* Place Order */}
        <TouchableOpacity onPress={handlePlaceOrder} className="w-full py-3 bg-[#4B515D] flex items-center justify-center rounded-xl">
          <Text className="text-lg font-bold text-white">Place Order</Text>
        </TouchableOpacity>
      </View>
    </Surface>
  )
})

export default AddToCartBar