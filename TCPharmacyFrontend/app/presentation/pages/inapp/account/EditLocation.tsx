import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type location = {
    id: string;
    name: string;
    phone: string;
    address: {
        province: string;
        district: string;
        ward: string;
        street: string;
    }
}

const locate = {
    name: "Trần Thị Thanh Tuyên",
    phone: "0396 172 224",
    address: {
        province: "Hồ Chí Minh",
        district: "Quận Gò Vấp",
        ward: "Phường 4",
        street: "44/10 Lê Lai"
    }
}

export const EditLocation = () => {
    return(
        <SafeAreaView>
            <Text>Edit Location</Text>
        </SafeAreaView>
    )
}