import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet } from 'react-native';

export default function PaginaBase({ children }) {
    return <SafeAreaView style={styles.container}>{ children }</SafeAreaView>
}

const styles = StyleSheet.create({
    container: {
        backgroundColor : '#121011', 
        flex: 1,
        alignContent: 'center'
    }
});