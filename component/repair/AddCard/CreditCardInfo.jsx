import { View, Text } from 'react-native'
import React from 'react'
import CardInput from './CardInput'
import { useState } from 'react'

const CreditCardInfo = () => {
  const [cardNumber, setCardNumber] = useState();
  const [expiry, setExpiry] = useState();
  const [CVV, setCVV] = useState();

  // Format card number
  const formatCardNumber = (text) => {
    const numericText = text.replace(/[^0-9]/g, '');
    let formattedText = '';
    for (let i = 0; i < numericText.length; i++) {
        if (i > 0 && i % 4 === 0) {
            formattedText += ' ';
        }
        formattedText += numericText[i];
    }
    setCardNumber(formattedText);
  }

  // Format expiry date
  const formatExpiryDate = (text) => {
    const numericText = text.replace(/\D/g, '');
    if (numericText.length >= 2) {
      setExpiry(`${numericText.slice(0, 2)}/${numericText.slice(2)}`);
    } else {
      setExpiry(numericText);
    }
  }

  return (
    <View className="mt-2">
      {/* Card Number */}
      <CardInput 
        title="Card Number" 
        inputMode='numeric' 
        value={cardNumber} 
        setValue={setCardNumber}
        placeholder='0000 0000 0000 0000'
        maxLength={19}
        handleInput={formatCardNumber}
      />

      <View className="w-full flex flex-row justify-between">
        {/* Expiry date */}
        <View className="w-[47%]">
          <CardInput 
            title="Expiry Date" 
            inputMode='numeric' 
            value={expiry} 
            placeholder='00/00'
            maxLength={5}
            handleInput={formatExpiryDate}
          />
        </View>

        {/* CVV */}
        <View className="w-[47%]">
          <CardInput 
            title="CVV" 
            inputMode='numeric' 
            value={CVV} 
            maxLength={3}
            placeholder='000'
            handleInput={setCVV}
          />
        </View>

      </View>
    </View>
  ) 
}

export default CreditCardInfo