import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export const SocialLinks: React.FC = () => {
  const handleSocialLink = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.socialLinks}>
      <TouchableOpacity 
        onPress={() => handleSocialLink('https://www.instagram.com')}
        style={styles.socialButton}
      >
        <Icon name="instagram" size={26} color="#fff" />
      </TouchableOpacity>

      <TouchableOpacity 
        onPress={() => handleSocialLink('https://www.twitter.com')}
        style={styles.socialButton}
      >
        <Icon name="twitter" size={26} color="#fff" />
      </TouchableOpacity>

      <View style={styles.phoneContainer}>
        <Icon name="phone" size={26} color="#fff" />
        <Text style={styles.phoneText}>304 214 3679</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  socialLinks: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    marginTop: 20,
  },
  
  socialButton: {
    padding: 10,
  },
  
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  phoneText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});