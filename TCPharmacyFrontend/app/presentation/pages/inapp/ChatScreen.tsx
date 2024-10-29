import React, { useEffect } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../styles/Colors";
import IconF5 from "react-native-vector-icons/FontAwesome5";
import { GlobalStyles } from "../../styles/GlobalStyles";
import { useState } from "react";

import IconFE from "react-native-vector-icons/Feather";
import { TextInput } from "react-native-paper";
import IconF from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";

const messageList = [{
    id: 1,
    message: "Xin chào",
    isMe: true
},
{
    id: 2,
    message: "Chào bạn",
    isMe: false
},
{
    id: 3,
    message: "Bạn cần tư vấn gì không?",
    isMe: false
},
{
    id: 4,
    message: "Bên mình có bán kẹo ngậm không đường không ạ, nếu có cho em xin giá ạ",
    isMe: true
},
{
    id: 5,
    message: "Vui lòng đợi một vài phút để ad kiểm tra giúp bạn nhé.",
    isMe: false
}]

export const ChatScreen = () => {
    const navigation = useNavigation();
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState(messageList);
    useEffect(() => {
        // setMessages(messageList);
    }, []);

    const sendMessage = () => {
        if (message.trim() === "") {
            return;
        }
        const newMessage = {
            id: messages.length + 1,
            message: message,
            isMe: true
        }
        setMessages([...messages, newMessage]);
        setMessage("");
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
                    <ScrollView>
                    <Text style={[GlobalStyles.textStyle, { textAlign: 'center', marginVertical: 10 }]}>{getCurrentDate()}</Text>
                        {messages.map((item, index) => {
                            return (

                                <View key={item.id} style={{ flexDirection: item.isMe ? 'row-reverse' : 'row', marginHorizontal: 10, marginVertical: 10 }}>
                                    <View style={{ backgroundColor: item.isMe ? Colors.primary : "#fff", padding: 10, borderRadius: 10 }}>
                                        <Text style={[GlobalStyles.textStyle, { color: item.isMe ? Colors.secondary : Colors.textDecription }]}>{item.message}</Text>
                                    </View>
                                </View>
                            )
                        })}
                    </ScrollView>
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
                    value={message}
                    onChangeText={setMessage}
                    placeholder="Gửi thắc mắc"
                    placeholderTextColor="gray"
                    style={[GlobalStyles.textStyle, { backgroundColor: '#EBF0F4', width: "70%", height: 60, flexDirection: 'row', alignItems: 'center', borderRadius: 10 }]}
                    left={<TextInput.Icon icon={() => <IconF5 name="smile" size={30} color="gray" />} />}  // Biểu tượng bên trái
                />

                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 15 }}
                    onPress={() => {
                        sendMessage();
                    }}>
                    <IconF name="send" size={30} style={{ color: Colors.desciption }} />
                </TouchableOpacity>

            </View>
        </SafeAreaView>
    );
}