import { View, Text } from 'react-native'
import React, { useState } from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { TouchableOpacity } from 'react-native-gesture-handler'
import CreditCardInfo from './AddCard/CreditCardInfo'

const RadioButton = ({ method, paymentMethod }) => (
    <View className="w-2/12 flex items-center justify-center">
        <View className={`w-3 h-3 rounded-full border-2 border-white ${method === paymentMethod && 'bg-white'}`} />
    </View>
)

const PaymentMethods = () => {
    const [paymentMethod, setPaymentMethod] = useState();

    return (
    <>
        <Text className="text-white font-bold text-lg mt-3">Payment method</Text>
        
        {/* Pay with cash */}
        <TouchableOpacity onPress={() => setPaymentMethod('cash')} className="flex flex-row px-2 py-4 bg-black/30 rounded-lg mt-3">
            <RadioButton method="cash" paymentMethod={paymentMethod} />
            <Text className="text-white font-bold">Pay with cash</Text>
        </TouchableOpacity>
        {/* Pay with card */}
        <TouchableOpacity onPress={() => setPaymentMethod('card')} className="flex flex-row px-2 py-4 bg-black/30 rounded-lg mt-1">
            <RadioButton method="card" paymentMethod={paymentMethod} />
            <Text className="text-white font-bold mr-2">Pay with debit / credit cards</Text>
            <FontAwesome name='credit-card' size={20} color='white' />
        </TouchableOpacity>

        {paymentMethod === 'card' && <CreditCardInfo />}
    </>
    )
}


export default PaymentMethods