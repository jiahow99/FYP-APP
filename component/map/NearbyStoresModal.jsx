import { View, Text } from 'react-native'
import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { renderBackdrop, snapPoints } from '../../utils/bottomsheet';
import CollapseBtn from '../CollapseBtn';
import { FlashList } from '@shopify/flash-list';
import FilterService from './FilterService';
import { observer } from 'mobx-react';
import { userStore } from '../../store/UserStore';
import Store from './Store';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { router } from 'expo-router';

const NearbyStoresModal = observer(forwardRef((props, ref) => {
    useImperativeHandle(ref, () => ({
        focus(store) {
            modalRef.current?.present();
            storeListRef.current?.scrollToItem({
                animated: true,
                item: store
            })
        },
        present() {
            modalRef.current?.snapToIndex(0);
        },
        collapse() {
            modalRef.current?.collapse();
        },
        dismiss() {
            modalRef.current?.dismiss();
        }
    }))

    const modalRef = useRef(null);
    const storeListRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(1);

    const { nearbyStores } = userStore;

    // Modal onChange
    const handleSheetChanges = useCallback((index) => {
        setActiveIndex(index);
    }, []);

    // Collapse modal
    const collapse = () => {
        activeIndex === 0
            ? modalRef.current?.expand()
            : modalRef.current?.collapse();
    }

    useEffect(() => {
        modalRef.current?.present();

        return () => modalRef.current?.dismiss();
    },[modalRef]);

    const onPress = (store) => {
        modalRef.current?.dismiss();
        router.push(`(tabs)/repair?place_id=${store.place_id}`);
    }

    // Service filter
    const services = [
        {
            'name' : 'Mechanic',
            'src' : require('../../assets/icons/mechanic_service.png'),
        },
        {
            'name' : 'Tyre Change',
            'src' : require('../../assets/icons/tyre_service.png'),
        },
        {
            'name' : 'Parts Store',
        }
    ]

    return (
        <BottomSheetModal
            ref={modalRef}
            index={0}
            snapPoints={snapPoints(['15%','60%'])}
            backdropComponent={renderBackdrop(1,0)}
            onChange={handleSheetChanges}
            enableContentPanningGesture={false}
            enablePanDownToClose={false}
            backgroundStyle={{ borderRadius: 30, overflow: 'hidden'}}
        >
          <View className="w-full h-full bg-[#F6F6F6]">
            {/* Collapse */}
            <View className="absolute top-0 right-0 pt-3 pr-5">
                <CollapseBtn onPress={collapse} index={activeIndex} />
            </View>
            {/* Title */}
            <View className="flex items-center justify-center mt-3">
                <Text className="text-xl font-bold">Nearby Mechanic Shop</Text>
            </View>
            {/* Filter */}
            <View className="w-full mt-3 ml-4" style={{ minHeight: '3px' }}>
                <FlashList 
                    data={services}
                    renderItem={({ item:service }) => <FilterService service={service} />}
                    estimatedItemSize={3}
                    horizontal
                />
            </View>
            {/* Stores */}
            {nearbyStores && nearbyStores.length > 0 && (
                <View className="w-full h-full mt-2" style={{ minHeight: '3px' }}>
                    <FlashList 
                        ref={storeListRef}
                        data={nearbyStores}
                        renderItem={({ item:store }) => <Store store={store} onPress={onPress} />}
                        estimatedItemSize={3}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
            )}
          </View>
        </BottomSheetModal>
    )
}))

export default NearbyStoresModal