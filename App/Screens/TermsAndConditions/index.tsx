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

const TermsAndConditionsScreen = ({ navigation }: any) => {
    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back" size={24} color="#000000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Terms & Conditions</Text>
                <View style={styles.placeholder} />
            </View>

            {/* Content */}
            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.section}>
                    <Text style={styles.title}>Terms of Service for Easy Flyer</Text>
                    <Text style={styles.lastUpdated}>Last updated: December 2024</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Agreement to Terms</Text>
                    <Text style={styles.paragraph}>
                        By downloading, installing, or using the Easy Flyer mobile application ("App"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, do not use our App.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Description of Service</Text>
                    <Text style={styles.paragraph}>
                        Easy Flyer is a mobile application that provides users with access to local deals, flyers, and promotional offers from various retailers and businesses.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>User Accounts</Text>

                    <Text style={styles.subsectionTitle}>Account Creation</Text>
                    <Text style={styles.paragraph}>
                        • You may need to provide a postal code to create an account{'\n'}
                        • You are responsible for maintaining the accuracy of your account information{'\n'}
                        • You must be at least 13 years old to use this service
                    </Text>

                    <Text style={styles.subsectionTitle}>Account Security</Text>
                    <Text style={styles.paragraph}>
                        • You are responsible for maintaining the confidentiality of your account{'\n'}
                        • You agree to notify us immediately of any unauthorized use of your account{'\n'}
                        • We are not liable for any loss arising from unauthorized use of your account
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Acceptable Use</Text>

                    <Text style={styles.subsectionTitle}>Permitted Uses</Text>
                    <Text style={styles.paragraph}>
                        • Browse and view available deals and offers{'\n'}
                        • Share deals with friends and family{'\n'}
                        • Scan QR codes on flyers{'\n'}
                        • Save deals for future reference
                    </Text>

                    <Text style={styles.subsectionTitle}>Prohibited Uses</Text>
                    <Text style={styles.paragraph}>
                        You agree not to:{'\n'}
                        • Use the App for any unlawful purpose{'\n'}
                        • Attempt to gain unauthorized access to our systems{'\n'}
                        • Interfere with the proper functioning of the App{'\n'}
                        • Use automated systems to access the App{'\n'}
                        • Share false or misleading information{'\n'}
                        • Violate any applicable laws or regulations
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Content and Intellectual Property</Text>

                    <Text style={styles.subsectionTitle}>Our Content</Text>
                    <Text style={styles.paragraph}>
                        All content in the App, including text, graphics, logos, and images, is owned by us or our licensors. You may not copy, modify, or distribute our content without permission.
                    </Text>

                    <Text style={styles.subsectionTitle}>User-Generated Content</Text>
                    <Text style={styles.paragraph}>
                        • You may share deals and offers through the App{'\n'}
                        • You are responsible for any content you share{'\n'}
                        • We reserve the right to remove content that violates these Terms
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Privacy</Text>
                    <Text style={styles.paragraph}>
                        Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and protect your information.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Disclaimers</Text>

                    <Text style={styles.subsectionTitle}>Service Availability</Text>
                    <Text style={styles.paragraph}>
                        • We strive to provide continuous service but cannot guarantee uninterrupted access{'\n'}
                        • We may modify, suspend, or discontinue the App at any time{'\n'}
                        • We are not responsible for any downtime or service interruptions
                    </Text>

                    <Text style={styles.subsectionTitle}>Deal Accuracy</Text>
                    <Text style={styles.paragraph}>
                        • We make reasonable efforts to provide accurate deal information{'\n'}
                        • However, we cannot guarantee the accuracy, completeness, or timeliness of all deals{'\n'}
                        • Users should verify deal details directly with retailers
                    </Text>

                    <Text style={styles.subsectionTitle}>Third-Party Content</Text>
                    <Text style={styles.paragraph}>
                        • The App may contain links to third-party websites or services{'\n'}
                        • We are not responsible for the content or practices of third parties{'\n'}
                        • Your use of third-party services is at your own risk
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Limitation of Liability</Text>
                    <Text style={styles.paragraph}>
                        To the maximum extent permitted by law:{'\n'}
                        • We shall not be liable for any indirect, incidental, special, or consequential damages{'\n'}
                        • Our total liability shall not exceed the amount you paid to use the App{'\n'}
                        • We are not responsible for any loss of data, profits, or business opportunities
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Indemnification</Text>
                    <Text style={styles.paragraph}>
                        You agree to indemnify and hold us harmless from any claims, damages, or expenses arising from:{'\n'}
                        • Your use of the App{'\n'}
                        • Your violation of these Terms{'\n'}
                        • Your violation of any third-party rights
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Termination</Text>

                    <Text style={styles.subsectionTitle}>By You</Text>
                    <Text style={styles.paragraph}>
                        • You may stop using the App at any time{'\n'}
                        • You may delete your account through the App settings
                    </Text>

                    <Text style={styles.subsectionTitle}>By Us</Text>
                    <Text style={styles.paragraph}>
                        • We may terminate or suspend your account for violations of these Terms{'\n'}
                        • We may discontinue the App with reasonable notice
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Changes to Terms</Text>
                    <Text style={styles.paragraph}>
                        We may update these Terms from time to time. We will notify you of significant changes through the App or by email. Your continued use of the App constitutes acceptance of the updated Terms.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Governing Law</Text>
                    <Text style={styles.paragraph}>
                        These Terms are governed by the laws of [Your Jurisdiction] without regard to conflict of law principles.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Contact Information</Text>
                    <Text style={styles.paragraph}>
                        If you have any questions about these Terms, please contact us at:{'\n'}
                        • Email: support@easyflyer.com{'\n'}
                        • Address: [Your Company Address]
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Severability</Text>
                    <Text style={styles.paragraph}>
                        If any provision of these Terms is found to be unenforceable, the remaining provisions will remain in full force and effect.
                    </Text>
                </View>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>
                        These Terms of Service are effective as of the date listed above and will remain in effect until modified or terminated.
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

export default TermsAndConditionsScreen;
