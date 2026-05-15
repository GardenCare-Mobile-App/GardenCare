import { Platform, StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../globalStyles';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    header: {
        alignSelf: "flex-start",
        marginTop: 50,
    },
    wellcome: {
        color: COLORS.amarelo,
        marginTop: 50,
        fontSize: 24,
        fontWeight: "600",
    },
    campos:{
        flex: 1,
    },
    content: {
        flex: 1,
        width: '100%',
        marginTop: 50,
        alignItems: 'center',
        gap: 20,
    },

//     placeholder="Underline style"
//   style={{
//     borderBottomWidth: 2,
//     borderBottomColor: '#e17055',
//     borderRadius: 0,
//     padding: 10,
//     fontSize: 14,
//     backgroundColor: 'transparent',
    contentInput: {
        flex: 1,
        fontSize: 14,
        width: '100%',
        backgroundColor: "#f1f1f167",
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        elevation: 10,
        borderBottomWidth: 3,
        borderBottomColor: '#00cc1bff',
    },
    input: {
        flex: 1,
        color: "#a0a0a0"
    },
    buttonSignIn: {
        backgroundColor: "#1ab55c",
        width: '100%',
        height: 56,
        borderRadius: 36,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40,
    },
    buttonSignInText: {
        color: '#143110',
        fontSize: 16,
        fontWeight: '800'
    },
    containerSeparator: {
        width: '100%',
        marginTop: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },
    separator: {
        height: 1,
        backgroundColor: '#e0e7b9',
        flex: 1,
    },
    separatorText: {
        color: COLORS.amareloMuitoClaro,
        fontSize: 16,
        fontWeight: '400'
    },
    footer: {
        marginTop: 50,
        flexDirection: 'row',
        gap: 10
    },
    footerButton: {
        width: 100,
        height: 60,
        backgroundColor: "#e0e7b9",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
    },
    footerText: {
        color: COLORS.amareloMuitoClaro,
        fontSize: 16,
        fontWeight: "400"
    },
    footerButtonText: {
        color: "#1ab55c",
        fontSize: 16,
        fontWeight: "400"
    }
});