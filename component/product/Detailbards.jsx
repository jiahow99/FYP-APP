import { View, Text, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import React from 'react'

const Detailbards = ({ details, setDetails }) => {
  return (
    <View className="w-full bg-black/50 rounded-xl flex flex-row mt-5">
        {/* Description */}
        <TouchableOpacity onPress={() => setDetails('description')} className="w-1/2">
          <View className={`w-full py-3 ${details === "description" && 'bg-[#4B515D]'} flex items-center justify-center rounded-xl`}>
            <Text className="font-bold text-white">Description</Text>
          </View>
        </TouchableOpacity>
        {/* Reviews */}
        <TouchableOpacity onPress={() => setDetails('review')} className="w-1/2">
          <View className={`w-full py-3 ${details === "review" && 'bg-[#4B515D]'} flex items-center justify-center rounded-xl`}>
            <Text className="font-bold text-white">Reviews</Text>
          </View>
        </TouchableOpacity>
    </View>
  )
}

export default Detailbards