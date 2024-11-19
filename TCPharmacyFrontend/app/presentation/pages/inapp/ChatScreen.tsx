import React, { useEffect } from "react";
import { FlatList, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../styles/Colors";
import IconF5 from "react-native-vector-icons/FontAwesome5";
import { GlobalStyles } from "../../styles/GlobalStyles";
import { useState } from "react";

import IconFE from "react-native-vector-icons/Feather";
import { TextInput } from "react-native-paper";
import IconF from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";

import { getMessages, sendMessage } from "../../redux/slice/MessageSlice";
import { useDispatch, useSelector } from "react-redux";
import { MessageRequest } from "../../../domain/models/request/MessageRequest";
import { findUserLogin } from "../../redux/slice/UserSlice";
import { MessageModel } from "../../../domain/models/MessageModel";
import { Store } from "../../redux/store";

const dataSendMessage = {
    userId: 0,
    messageRequest: new MessageRequest("")
}

export const ChatScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const user = useSelector((state: Store) => state.user.userLogin);
    const messages = useSelector((state: Store) => state.message.messages);
    const [messageText, setMessageText] = useState("");
    const [request, setRequest] = useState(dataSendMessage);
    const mess = useSelector((state: Store) => state.message.message);

    useEffect(() => {
        const init = async () => {
            await dispatch(findUserLogin())
            await dispatch(getMessages(user.id));
            setRequest({ ...request, userId: user.id });
        }
        init();
    }, []);

    const sendMessageToTC = async () => {
        if (messageText.trim() === "") {
            return;
        } 

        const messageNew = new MessageRequest(messageText);
        // messages.push(new MessageModel(messageText, "user"));
        setRequest({ ...request, messageRequest: messageNew });
        await dispatch(sendMessage(request));
        if (mess != null) {            
            // messages.push(mess)
            await dispatch(getMessages(user.id));
            setMessageText("");
        }

        
    }
    // Lấy ngày, tháng, và năm hiện tại
    const getCurrentDate = () => {
        const date = new Date();

        const day = date.getDate();
        const month = date.getMonth() + 1; // getMonth() trả về tháng từ 0 đến 11, nên cần +1
        const year = date.getFullYear();

        // Định dạng lại thành chuỗi "dd/mm/yyyy"
        return `${day}/${month}/${year}`;
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#ECF0F1" }}>
            <View style={{ height: 70, width: '100%', backgroundColor: Colors.primary, flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity style={{ marginHorizontal: 15 }} onPress={() => { navigation.goBack() }}>
                    <IconF5 name="chevron-left" size={35} style={{ color: Colors.secondary }} />
                </TouchableOpacity>
                <Text style={[GlobalStyles.textStyle, { fontSize: 20, fontWeight: '700', color: Colors.secondary, textAlign: 'center', width: "80%" }]}>Dược sĩ TC Parmacy</Text>
            </View>

            <View style={{ width: "100%", height: 690 }}>
                {/* <ScrollView>
                    <Text style={[GlobalStyles.textStyle, { textAlign: 'center', marginVertical: 10 }]}>{getCurrentDate()}</Text>
                        {messages.map((item, index) => {
                            console.log("Item: ", item);
                            
                            return (
                                <View key={index} style={{ flexDirection: item.role === "user" ? 'row-reverse' : 'row', marginHorizontal: 10, marginVertical: 10 }}>
                                    <View style={{ backgroundColor: item.role === "user" ? Colors.primary : "#fff", padding: 10, borderRadius: 10 }}>
                                        <Text style={[GlobalStyles.textStyle, { color: item.role === "user" ? Colors.secondary : Colors.textDecription }]}>{item.content}</Text>
                                    </View>
                                </View>
                            )
                        })}
                    </ScrollView> */}

                {
                    messages && messages.length > 0 ? (
                        <FlatList
                            data={messages}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) =>
                                <View style={{ flexDirection: item.role === "user" ? 'row-reverse' : 'row', marginHorizontal: 10, marginVertical: 10 }}>
                                    <View style={{ backgroundColor: item.role === "user" ? Colors.primary : "#fff", padding: 10, borderRadius: 10 }}>
                                        <Text style={[GlobalStyles.textStyle, { color: item.role === "user" ? Colors.secondary : Colors.textDecription }]}>{item.content}</Text>
                                    </View>
                                </View>}
                        />
                    ) : (
                        <Text>Loading messages...</Text>
                    )
                }
            </View>

            <View style={{
                height: 80, width: '100%', position: "absolute",
                bottom: 0, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 15 }}>
                    <IconF5 name="camera" size={30} style={{ color: "#000" }} />
                </TouchableOpacity>
                <TextInput
                    value={messageText}
                    onChangeText={setMessageText}
                    placeholder="Gửi thắc mắc"
                    placeholderTextColor="gray"
                    style={[GlobalStyles.textStyle, { backgroundColor: '#EBF0F4', width: "70%", height: 60, flexDirection: 'row', alignItems: 'center', borderRadius: 10 }]}
                    left={<TextInput.Icon icon={() => <IconF5 name="smile" size={30} color="gray" />} />}  // Biểu tượng bên trái
                />

                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 15 }}
                    onPress={() => {
                        sendMessageToTC();
                    }}>
                    <IconF name="send" size={30} style={{ color: Colors.desciption }} />
                </TouchableOpacity>

            </View>
        </SafeAreaView>
    );
}