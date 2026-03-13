import React from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';

const PrivacyPolicyScreen = ({ navigation }: any) => {
    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back" size={24} color="#000000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Privacy Policy</Text>
                <View style={styles.placeholder} />
            </View>

            {/* Content */}
            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.section}>
                    <Text style={styles.title}>Privacy Policy for Easy Flyer</Text>
                    <Text style={styles.lastUpdated}>Last updated: December 2024</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Introduction</Text>
                    <Text style={styles.paragraph}>
                        Easy Flyer ("we," "our," or "us") respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Information We Collect</Text>

                    <Text style={styles.subsectionTitle}>Personal Information</Text>
                    <Text style={styles.paragraph}>
                        • <Text style={styles.bold}>Postal Code:</Text> We collect your postal code to show you relevant local deals and offers{'\n'}
                        • <Text style={styles.bold}>User ID:</Text> A unique identifier to associate your account with your preferences{'\n'}
                        • <Text style={styles.bold}>Device Information:</Text> Device type, operating system, and app version for technical support
                    </Text>

                    <Text style={styles.subsectionTitle}>Usage Information</Text>
                    <Text style={styles.paragraph}>
                        • <Text style={styles.bold}>App Usage:</Text> How you interact with the app, features used, and time spent{'\n'}
                        • <Text style={styles.bold}>Deal Interactions:</Text> Which deals you view, share, or interact with{'\n'}
                        • <Text style={styles.bold}>Location Data:</Text> General location based on postal code (not precise GPS coordinates)
                    </Text>

                    <Text style={styles.subsectionTitle}>Camera and Photo Access</Text>
                    <Text style={styles.paragraph}>
                        • <Text style={styles.bold}>QR Code Scanning:</Text> Camera access to scan QR codes on flyers{'\n'}
                        • <Text style={styles.bold}>Photo Sharing:</Text> Access to save and share flyer images
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>How We Use Your Information</Text>
                    <Text style={styles.paragraph}>
                        • Provide personalized deals and offers based on your location{'\n'}
                        • Improve our app functionality and user experience{'\n'}
                        • Send you relevant notifications about new deals{'\n'}
                        • Analyze usage patterns to enhance our services{'\n'}
                        • Provide customer support
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Information Sharing</Text>
                    <Text style={styles.paragraph}>
                        We do not sell, trade, or rent your personal information to third parties. We may share information only in these circumstances:
                    </Text>
                    <Text style={styles.paragraph}>
                        • <Text style={styles.bold}>Service Providers:</Text> With trusted partners who help us operate our app{'\n'}
                        • <Text style={styles.bold}>Legal Requirements:</Text> When required by law or to protect our rights{'\n'}
                        • <Text style={styles.bold}>Business Transfers:</Text> In case of merger, acquisition, or sale of assets
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Data Security</Text>
                    <Text style={styles.paragraph}>
                        We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Your Rights</Text>
                    <Text style={styles.paragraph}>
                        You have the right to:{'\n'}
                        • Access your personal information{'\n'}
                        • Correct inaccurate information{'\n'}
                        • Delete your account and data{'\n'}
                        • Opt-out of marketing communications
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Children's Privacy</Text>
                    <Text style={styles.paragraph}>
                        Our app is not intended for children under 13. We do not knowingly collect personal information from children under 13.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Changes to This Policy</Text>
                    <Text style={styles.paragraph}>
                        We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy in the app.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Contact Us</Text>
                    <Text style={styles.paragraph}>
                        If you have any questions about this Privacy Policy, please contact us at:{'\n'}
                        • Email: privacy@easyflyer.com{'\n'}
                        • Address: [Your Company Address]
                    </Text>
                </View>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>
                        This Privacy Policy is effective as of the date listed above and will remain in effect except with respect to any changes in its provisions in the future.
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F8FF',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingVertical: 15,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    headerTitle: {
        color: '#000000',
        fontSize: 18,
        fontWeight: 'bold',
    },
    placeholder: {
        width: 24,
    },
    content: {
        flex: 1,
        padding: 20,
    },
    section: {
        marginBottom: 25,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#4C6EF5',
        marginBottom: 10,
        textAlign: 'center',
    },
    lastUpdated: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        fontStyle: 'italic',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    subsectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#4C6EF5',
        marginTop: 15,
        marginBottom: 8,
    },
    paragraph: {
        fontSize: 14,
        color: '#555',
        lineHeight: 22,
        marginBottom: 10,
    },
    bold: {
        fontWeight: 'bold',
        color: '#333',
    },
    footer: {
        marginTop: 20,
        padding: 15,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
    },
    footerText: {
        fontSize: 12,
        color: '#666',
        fontStyle: 'italic',
        textAlign: 'center',
    },
});

export default PrivacyPolicyScreen;
