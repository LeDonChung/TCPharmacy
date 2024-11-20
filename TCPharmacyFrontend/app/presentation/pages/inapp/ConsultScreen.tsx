import React, { useEffect, useRef, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View, Animated, Linking, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../styles/Colors";
import IconO from "react-native-vector-icons/Octicons";
import IconF5 from "react-native-vector-icons/FontAwesome5";
import { GlobalStyles } from "../../styles/GlobalStyles";
import { TextInput } from "react-native-paper";
import IconF from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import { getMessages, sendMessage, setMessages } from "../../redux/slice/MessageSlice";
import { useDispatch, useSelector } from "react-redux";
import { MessageRequest } from "../../../domain/models/request/MessageRequest";
import { Store } from "../../redux/store";

export const ConsultScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const user = useSelector((state: Store) => state.user.userLogin);
    const messages = useSelector((state: Store) => state.message.messages);

    const [messageSend, setMessageSend] = useState("");
    const [isReplying, setIsReplying] = useState(false);

    const dotValues = [useRef(new Animated.Value(0)).current, useRef(new Animated.Value(0)).current, useRef(new Animated.Value(0)).current];
    const scrollViewRef = useRef(null);

    const handleClickCallHotline = () => {
        const phoneNumber = 'tel:18006928';
        Linking.canOpenURL(phoneNumber)
            .then((supported) => {
                if (supported) {
                    Linking.openURL(phoneNumber);
                } else {
                    Alert.alert("Thiết bị không hỗ trợ tính năng này");
                }
            })
            .catch((err) => console.error('Error:', err));
    }

    useEffect(() => {
        dispatch(getMessages(user.id));
    }, [dispatch, user.id]);

    useEffect(() => {
        navigation.setOptions({
            tabBarStyle: {
                display: "none"
            }
        });
        return () => navigation.setOptions({
            tabBarStyle: undefined
        });
    }, [navigation]);

    useEffect(() => {
        if (isReplying) {
            Animated.loop(
                Animated.stagger(300, dotValues.map(dotValue =>
                    Animated.sequence([
                        Animated.timing(dotValue, {
                            toValue: -5,
                            duration: 300,
                            useNativeDriver: true
                        }),
                        Animated.timing(dotValue, {
                            toValue: 0,
                            duration: 300,
                            useNativeDriver: true
                        })
                    ])
                ))
            ).start();
        } else {
            dotValues.forEach(dotValue => dotValue.setValue(0));
        }
    }, [isReplying, dotValues]);

    const sendMessageToTC = async () => {
        if (messageSend.trim() === "") return;

        setIsReplying(true);
        dispatch(setMessages([...messages, { role: "user", content: messageSend }]));
        setMessageSend("");

        await dispatch(sendMessage({ userId: user.id, messageRequest: new MessageRequest(messageSend) }));
        setIsReplying(false);
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#ECF0F1" }}>
             <View style={{ height: 70, width: '100%', backgroundColor: Colors.primary, flexDirection: 'row', alignItems: 'center', justifyContent: "space-between" }}>
                    <TouchableOpacity style={{ marginHorizontal: 15, justifyContent: "center", alignContent: "center" }} onPress={() => { navigation.goBack() }}>
                        <IconF5 name="chevron-left" size={25} style={{ color: Colors.secondary }} />
                    </TouchableOpacity>
                    <Text style={[GlobalStyles.textStyle, { fontSize: 20, fontWeight: '700', color: Colors.secondary, textAlign: 'center' }]}>
                        Dược sĩ TC Parmacy
                    </Text>
                    <TouchableOpacity style={{ marginHorizontal: 15, justifyContent: "center", alignContent: "center" }} onPress={() => { handleClickCallHotline() }}>
                        <IconF name="phone" size={25} style={{ color: Colors.secondary }} />
                    </TouchableOpacity>
                </View>

            <View style={{ width: "100%", marginBottom: 160 }}>
                {messages && messages.length > 0 ? (
                    <ScrollView ref={scrollViewRef} onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}>
                        {messages.map((item, index) => (
                            <View key={index} style={{ flexDirection: item.role === "user" ? 'row-reverse' : 'row', marginHorizontal: 10, marginVertical: 10 }}>
                                <View style={{ backgroundColor: item.role === "user" ? Colors.primary : "#fff", padding: 10, borderRadius: 10 }}>
                                    <Text style={[GlobalStyles.textStyle, { color: item.role === "user" ? Colors.secondary : Colors.textDecription }]}>{item.content}</Text>
                                </View>
                            </View>
                        ))}
                        {isReplying && (
                            <View style={{ flexDirection: 'row', marginHorizontal: 10, marginVertical: 10 }}>
                                <View style={{ backgroundColor: "#fff", borderRadius: 10, flexDirection: 'row', alignItems: 'center' }}>
                                    {dotValues.map((dotValue, index) => (
                                        <Animated.View key={index} style={{ transform: [{ translateY: dotValue }], marginHorizontal: 5 }}>
                                            <IconO name="dot-fill" size={16} color={Colors.textDecription} />
                                        </Animated.View>
                                    ))}
                                </View>
                            </View>
                        )}
                    </ScrollView>
                ) : (
                    <Text style={{ textAlign: 'center', marginTop: 20 }}>Chưa có tin nhắn nào. Hãy bắt đầu cuộc trò chuyện!</Text>
                )}
            </View>

            <View style={{
                height: 60, width: '100%', position: "absolute",
                bottom: 0, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 15 }}>
                    <IconF5 name="camera" size={24} style={{ color: "#000" }} />
                </TouchableOpacity>
                <TextInput
                    value={messageSend}
                    onChangeText={setMessageSend}
                    placeholder="Gửi thắc mắc"
                    mode="outlined"
                    outlineColor={Colors.primary}
                    activeOutlineColor={Colors.primary}
                    placeholderTextColor="gray"
                    outlineStyle={{ borderWidth: 0 }}
                    style={[GlobalStyles.textStyle, { backgroundColor: '#fff', flex: 1 }]}
                    left={<TextInput.Icon icon={() => <IconF5 name="smile" size={24} color="gray" />} />}  // Biểu tượng bên trái
                />
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 15 }} onPress={sendMessageToTC}>
                    <IconF name="send" size={24} style={{ color: Colors.desciption }} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};