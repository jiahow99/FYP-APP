import { View, Text } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Image } from 'react-native'
import CarInfo from './CarInfo'

const CarCard = ({ car, details, setDetails }) => {
  const imgSrc = car.brand === 'BMW'
    ? require('../../assets/images/bmw_blue.png')
    : require('../../assets/images/benz_c_class.png');

  return (
    <TouchableOpacity 
    className={`w-11/12 mt-3 mx-auto p-2 pb-4 ${car === details ? 'bg-white' : 'bg-white/20'} rounded-2xl`}
    onPress={() => setDetails(car)}
    > 
      <View className="flex flex-row justify-between">
        <View>
            {/* Logo */}
            <Image source={require('../../assets/images/benz_logo.png')} resizeMode='contain' className="w-16 h-14" />
            {/* Name */}
            <Text className="font-bold">
            {car.brand} {car.name}
            </Text>
            {/* Year make */}
            <Text className="font-bold">
            {car.year_make}
            </Text>
        </View>

        {/* Image */}
        <Image source={imgSrc} resizeMode='contain' className="w-40 h-28 " />
        </View>

        <View className="w-full flex flex-row justify-between space-y-2">
        <CarInfo name="Mileage" value={`${car.mileage} km`} />
        <CarInfo width="w-4/12 ml-1" name="Address" value="No 1710 Avivakdskdakdjaksdjsakdsakdj" />
        <CarInfo width="w-4/12 ml-1" name="Name" value={car.userName} />
      </View>
    </TouchableOpacity>
  )
}

export default CarCard