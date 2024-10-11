import { Image, ImageBackground, Pressable, ScrollView, SectionList, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { DrawerLayout } from "react-native-gesture-handler"
import React, { useState } from "react"
import { LogoCustom } from "./LogoCustom"
import { GlobalStyles } from "../styles/GlobalStyles"
import { Colors } from "../styles/Colors"
import { SafeAreaView } from "react-native-safe-area-context"
import IconAnt from "react-native-vector-icons/AntDesign"
import { TouchableHighlight } from "react-native"
import menus from "../../domain/models/Menu"
import { ButtonCustom } from "./ButtonCustom"
import IconF5 from "react-native-vector-icons/FontAwesome5"
import { Dimensions } from 'react-native';
import { useNavigation } from "@react-navigation/native"

const screenWidth = Dimensions.get('window').width;
type DrawScreenLayoutProps = {
    onClose: () => void
}
export const DrawScreenLayout = (props: DrawScreenLayoutProps) => {
    const navigation = useNavigation();
    const [expandedSections, setExpandedSections] = useState<string[]>([]);

    const toggleSection = (sectionId: string) => {
        if (expandedSections.includes(sectionId)) {
            setExpandedSections(expandedSections.filter(id => id !== sectionId));
        } else {
            setExpandedSections([...expandedSections, sectionId]);
        }
    };

    const isSectionExpanded = (sectionId: string) => {
        return expandedSections.includes(sectionId);
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <SectionList
                sections={menus.map((item) => { 
                    return { data: item.menuItem, title: item.name, id: item.id, hasChildren: item.menuItem.length } 
                })}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                    if (isSectionExpanded(item.parentId)) {
                        return (
                            <TouchableOpacity onPress={item.onPress} style={{padding: 10, marginHorizontal: 15, marginVertical: 1, backgroundColor: '#ECF0FB', borderTopLeftRadius: 10, borderTopRightRadius: 10}} >
                                <Text style={[GlobalStyles.textStyle, { paddingVertical: 10 }]}>{item.name}</Text>
                            </TouchableOpacity>
                        )
                    }
                    return null;
                }}
                renderSectionHeader={({ section: { id, title, hasChildren } }) => (
                    <TouchableOpacity style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 20, paddingHorizontal: 15}} onPress={() => toggleSection(id)}>
                        <Text style={[GlobalStyles.textStyle, {color: hasChildren > 0 && isSectionExpanded(id) ? Colors.primary : '#000', fontWeight: 'bold'}]}>{title}</Text>
                        {hasChildren > 0 && <IconAnt name={isSectionExpanded(id) ? 'down' : 'right'} size={20} />}
                    </TouchableOpacity>
                )}
                ListHeaderComponent={() => (
                    <View style={{ backgroundColor: '#fff' }}>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15, paddingHorizontal: 15}}>
                            <LogoCustom color={Colors.primary} />
                            <Pressable onPress={() => props.onClose()}>
                                <IconAnt name="close" size={30} color="#000" />
                            </Pressable>
                        </View>
                        <ImageBackground style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', height: 80 }} resizeMode="cover" source={require('./../../../assets/user_background.png')}>
                            <Image style={{ marginHorizontal: 10 }} source={require('./../../../assets/ic_user_home.png')} resizeMode="contain" /> 
                            <Text style={[GlobalStyles.textStyle, { color: '#fff', fontWeight: 'bold', marginStart: 10 }]}>LÊ ĐÔN CHỦNG</Text>
                        </ImageBackground>
                    </View>
                )}
                ListFooterComponent={() => (
                    <View style={{paddingHorizontal: 15}}>
                        <ButtonCustom 
                            title="Hotline tư vấn: 18006927" 
                            buttonStyle={{padding: 2, backgroundColor: '#ECF0FB', marginVertical: 20, borderRadius: 20}} 
                            onPress={() => {}} 
                            leadingIcon={<IconF5 name="phone-alt" size={20} color={Colors.primary} />}
                            textStyle={[{color: Colors.primary}, {fontWeight: 'bold', marginStart: 10}]}
                        />
                    </View>
                )}
            />
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    }
})