import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import CustomerForm from './CustomerForm'
import { TextInput } from 'react-native-gesture-handler'
import RNPickerSelect from 'react-native-picker-select';
import { carBrands, carModels, yearMake } from '../../assets/data/carsData';
import { useRef } from 'react';
import InputPicker from './InputPicker';
import { useState } from 'react';
import PaymentMethods from './PaymentMethods';
import PhoneNumberInput from './PhoneNumberInput';
import RelevantPictures from './Customer/RelevantPictures';
import Remarks from './Customer/Remarks';
import { Formik } from 'formik';
import ContinueBtn from './ContinueBtn';
import { router, useLocalSearchParams } from 'expo-router';
import storage from '@react-native-firebase/storage';
import axios from 'axios';
import { userStore } from '../../store/UserStore';
import { trackingStore } from '../../store/TrackingStore';
import { observer } from 'mobx-react';
import { ToastPosition, toast } from '@backpackapp-io/react-native-toast';

const DifferentDetails = observer(({ type, setType }) => {
  // Active user
  const { user, location } = userStore;
  const { setPlaceId, setUserInfo, setTyreInfo } = trackingStore;
  // Search params
  const { place_id, problems, tyreChange, tyreId, inch, width } = useLocalSearchParams();
  // Initial values
  const initialValues = {
    brand: '',
    model: '',
    yearMake: '',
    mileage: '',
    name: user.username ?? '',
    phone: '',
    remark: '',
    images: []
  }

  // For normal request mechanic
  const normalRequestMechanic = async (values) => {
      // On submit, upload photo to firebase cloud
      // Send FCM message to mechanic
      // Mechanic will fetch photos with "userId/storeId"
      try {
        loadingToast = toast.loading("Requesting Mechanic");
        const userId = user.uid;
        // Get token of the store
        const res = await axios.get(`https://f76d-113-23-129-82.ngrok-free.app/api/store/place-id/${place_id}`)
        const token = res.data.token;
        // Upload photo 
        const { images } = values;
        if (images.length > 0) {
          images.map(async (image) => {
            // "userId/placeId"
            const reference = storage().ref(`${userId}/${place_id}`);
            await reference.putFile(image);
          })
        }
        // Payload
        const data = {
          ...values,
          userId: user.uid,
          placeId: place_id, 
          userToken: user.token,
          problems,
          userLatitude: location.latitude,
          userLongitude: location.longitude
        }
        // Send to mechanic
        // If successful, navigate to pending page to wait for confirmation
        const requestMechanic = await axios.post(`https://f76d-113-23-129-82.ngrok-free.app/api/send-mechanic-request`, data);
        if (requestMechanic.status >= 200 && requestMechanic.status < 300) {
          setPlaceId(place_id);
          setUserInfo(values);
          router.push(`(tabs)/home?hasBooked=true`);
        }
      } catch (error) {
        // alert(error);
        toast.error("Error requesting mechanic.")
      } finally {
        toast.dismiss(loadingToast);
      }
  }

  // For tyre change
  const requestTyreChange  = async (values) => {
    try {
      loadingToast = toast.loading("Requesting Mechanic",{position: ToastPosition.BOTTOM});
      // Payload
      const data = {
        ...values,
        userId: user.uid,
        placeId: place_id, 
        userToken: user.token,
        tyreId,
        inch,
        width,
        userLatitude: location.latitude,
        userLongitude: location.longitude
      }
      // Send to mechanic
      // If successful, navigate to pending page to wait for confirmation
      const requestMechanic = await axios.post(`https://f76d-113-23-129-82.ngrok-free.app/api/request-tyre-change`, data);
      if (requestMechanic.status >= 200 && requestMechanic.status < 300) {
        setPlaceId(place_id);
        setUserInfo(values);
        setTyreInfo({inch,width});
        router.push(`(tabs)/home?hasBooked=true`);
      }
    } catch (error) {
      alert(error);
      toast.error("Error requesting mechanic.")
    } finally {
      toast.dismiss(loadingToast);
    }
  }


  const onSubmit = async (values) => {
    tyreChange === 'true'
      ? requestTyreChange(values)
      : normalRequestMechanic(values);
  }

  return (
    <CustomerForm type={type} setType={setType}>
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({handleChange, handleSubmit, values, setFieldValue}) => (
          <View className="w-11/12 mx-auto">
            <Text className="text-white font-bold text-lg">Your Details</Text>
              <View className="w-full">
                {/* Car Brands */}
                <InputPicker 
                  title="Car Brand" 
                  name='brand'
                  items={carBrands} 
                  value={values.brand}
                  setFieldValue={setFieldValue}
                  picker 
                  width="w-full" 
                />
                {/* Car Models */}
                {values.brand !== '' && (
                  <InputPicker 
                    title="Car Models" 
                    name="model"
                    items={carModels[values.brand]} 
                    value={values.model}
                    setFieldValue={setFieldValue}
                    picker 
                    width="w-full" 
                  />
                )}
              </View>

              <View className="w-full flex flex-row justify-between">
                {/* Mileage */}
                <InputPicker 
                  title="Mileage" 
                  value={values.mileage}
                  handleChange={handleChange('mileage')} 
                  keyboardType="decimal-pad" 
              />
                
              {/* Year make */}
              <InputPicker 
                title="Year Make" 
                name="yearMake"
                items={yearMake} 
                value={values.yearMake}
                setFieldValue={setFieldValue}
                picker 
                width="w-[47%]" 
              />
            </View>

            {/* Name */}
            <InputPicker 
              title="Name"
              value={values.name}
              handleChange={handleChange('name')} 
              width="w-full"
            />

            {/* Phone number */}
            <InputPicker 
              title="Phone Number" 
              value={values.phone}
              handleChange={handleChange('phone')} 
              width="w-full" 
              keyboardType="decimal-pad" 
              placeholder='xxx-xxxxxxx'
            />

            {/* Payment Methods */}
            <PaymentMethods />

            {/* Relevant pictures */}
            <RelevantPictures />

            {/* Remarks */}
            <Remarks value={values.remark} handleChange={handleChange('remark')}  />


          {/* Continue Btn */}
          <ContinueBtn 
            width="w-11/12 mx-auto" 
            onPress={handleSubmit}
            />
        </View>
      )}
    </Formik>
    </CustomerForm>
  )
})

export default DifferentDetails