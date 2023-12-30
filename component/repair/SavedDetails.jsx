import React from 'react'
import cars from '../../assets/data/cars.json'
import CustomerForm from './CustomerForm'
import CarCard from './CarCard'
import { View } from 'react-native'

const SavedDetails = ({ details, setDetails, type, setType }) => {
  return (
    <CustomerForm type={type} setType={setType}>
      <View className="bg-[#4B515D] rounded-b-2xl rounded-tr-2xl">
        {/* Card */}
        {cars.map(car => (
          <CarCard key={car.id} car={car} details={details} setDetails={setDetails}/>
        ))}
      </View>
    </CustomerForm>
  )
}

export default SavedDetails