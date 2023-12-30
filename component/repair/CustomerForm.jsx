import { View, Text } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'

const CustomerForm = ({children, type, setType}) => {
    return (
      <View className="w-11/12 relative pb-5 mx-auto">
        {/* Headers */}
        <View className="w-full flex flex-row">
          <TouchableOpacity onPress={() => setType('saved-details')} className={`w-1/2 py-3 flex items-center justify-center ${type==='saved-details' ? 'bg-[#4B515D] rounded-t-2xl' : 'bg-[#F6F6F6] rounded-br-2xl'}`}>
            <Text className={`font-bold ${type==='saved-details' && 'text-white'}`}>
              Saved Details
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setType('different-details')} className={`w-1/2 py-3 flex items-center justify-center ${type==='different-details' ? 'bg-[#4B515D] rounded-t-2xl' : 'bg-[#F6F6F6] rounded-bl-2xl'}`}>
            <Text className={`font-bold ${type==='different-details' && 'text-white'}`}>
              Different Details
            </Text>
          </TouchableOpacity>
        </View>

        {/* Slot */}
        <View className={`w-full bg-[#4B515D] rounded-b-2xl ${type==='saved-details' ? 'rounded-tr-2xl pb-5' : 'rounded-tl-2xl'}`}>
          {children}  
        </View>
      </View>
    )
  }

export default CustomerForm