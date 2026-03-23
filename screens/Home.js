import React from 'react';
import {
  View, Text, StyleSheet,
  Image, ScrollView, TouchableOpacity, Linking,
} from 'react-native';

const IMG = {
  logo: 'https://www.gov.ls/wp-content/uploads/2022/05/limkokwing.jpeg',
  hero: 'https://www.pula24.co.bw/wp-content/uploads/2022/01/limko-5.jpg',
};

export default function Home() {
  return (
    <View style={s.screen}>
      <ScrollView
        style={s.root}
        contentContainerStyle={s.wrap}
        showsVerticalScrollIndicator={false}
        scrollEnabled={true}
        bounces={true}
      >

        {/* Logo */}
        <View style={s.logoRing}>
          <View style={s.logoCircle}>
            <Image source={{ uri: IMG.logo }} style={s.logo} resizeMode="cover" />
          </View>
        </View>

        {/* University Name */}
        <Text style={s.uniName}>Limkokwing University</Text>
        <Text style={s.uniSub}>of Creative Technology</Text>

        {/* Tagline Badge */}
        <View style={s.badge}>
          <Text style={s.badgeTxt}>🏆 Lesotho's Most Award-Winning Creative University</Text>
        </View>

        {/* Hero Image */}
        <Image source={{ uri: IMG.hero }} style={s.heroImg} resizeMode="cover" />

        {/* About Text */}
        <View style={s.card}>
          <Text style={s.cardTitle}>Shape Your Future With Us</Text>
          <Text style={s.cardBody}>
            Limkokwing University of Creative Technology is a global institution that bridges
            the gap between education and industry. With a presence in over 150 countries,
            we empower students to become world-class creative professionals.
          </Text>
        </View>

        {/* Features Row */}
        <View style={s.featuresRow}>
          {[
            { icon: '🎨', label: 'Creative Arts' },
            { icon: '💻', label: 'Technology' },
            { icon: '🌍', label: 'Global Network' },
          ].map((f, i) => (
            <View key={i} style={s.featureItem}>
              <Text style={s.featureIcon}>{f.icon}</Text>
              <Text style={s.featureLabel}>{f.label}</Text>
            </View>
          ))}
        </View>

        {/* Quote */}
        <View style={s.quoteBox}>
          <Text style={s.quoteText}>
            "Creativity is the currency of the future — and your journey starts here."
          </Text>
        </View>

        {/* CTA */}
        <TouchableOpacity
          style={s.cta}
          onPress={() => Linking.openURL('https://www.limkokwing.com/page/lesotho').catch(console.error)}
          activeOpacity={0.85}
        >
          <Text style={s.ctaTxt}>Explore Limkokwing University  →</Text>
        </TouchableOpacity>

        {/* Footer note */}
        <Text style={s.footNote}>📍 Moshoeshoe Road, Maseru Central, Lesotho</Text>

      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#fdf2f8' },
  root:   { flex: 1 },
  wrap:   { alignItems: 'center', padding: 20, paddingBottom: 60 },

  // Logo
  logoRing: {
    width: 116, height: 116, borderRadius: 58,
    borderWidth: 3, borderColor: '#ec4899',
    alignItems: 'center', justifyContent: 'center',
    marginTop: 40, marginBottom: 16,
    shadowColor: '#ec4899',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4, shadowRadius: 16, elevation: 8,
  },
  logoCircle: {
    width: 104, height: 104, borderRadius: 52,
    overflow: 'hidden', alignItems: 'center', justifyContent: 'center',
    backgroundColor: '#fff',
  },
  logo: { width: 104, height: 104 },

  // University Name
  uniName: {
    fontSize: 26, fontWeight: '900', color: '#be185d',
    textAlign: 'center', marginBottom: 2,
  },
  uniSub: {
    fontSize: 14, fontWeight: '600', color: '#ec4899',
    textAlign: 'center', marginBottom: 14, letterSpacing: 0.5,
  },

  // Badge
  badge: {
    backgroundColor: '#fce7f3', paddingHorizontal: 14,
    paddingVertical: 7, borderRadius: 20, marginBottom: 20,
  },
  badgeTxt: { fontSize: 12, fontWeight: '700', color: '#be185d' },

  // Hero
  heroImg: {
    width: '100%', height: 220,
    borderRadius: 20, marginBottom: 24,
  },

  // About Card
  card: {
    width: '100%', backgroundColor: '#fff',
    borderRadius: 20, padding: 20, marginBottom: 20,
    borderLeftWidth: 4, borderLeftColor: '#ec4899',
    shadowColor: '#ec4899', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1, shadowRadius: 8, elevation: 3,
  },
  cardTitle: {
    fontSize: 18, fontWeight: '800', color: '#be185d', marginBottom: 10,
  },
  cardBody: {
    fontSize: 14, color: '#6b7280', lineHeight: 22,
  },

  // Features
  featuresRow: {
    flexDirection: 'row', width: '100%',
    justifyContent: 'space-between', marginBottom: 20,
  },
  featureItem: {
    flex: 1, alignItems: 'center', backgroundColor: '#fff',
    marginHorizontal: 4, borderRadius: 16, paddingVertical: 16,
    shadowColor: '#ec4899', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08, shadowRadius: 6, elevation: 2,
  },
  featureIcon: { fontSize: 26, marginBottom: 6 },
  featureLabel: { fontSize: 11, fontWeight: '700', color: '#be185d', textAlign: 'center' },

  // Quote
  quoteBox: {
    width: '100%', backgroundColor: '#fce7f3',
    borderRadius: 16, padding: 18, marginBottom: 24,
  },
  quoteText: {
    fontSize: 14, fontStyle: 'italic',
    color: '#9d174d', textAlign: 'center', lineHeight: 22,
  },

  // CTA
  cta: {
    width: '100%', backgroundColor: '#ec4899',
    paddingVertical: 18, borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#be185d', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3, shadowRadius: 8, elevation: 6,
    marginBottom: 20,
  },
  ctaTxt: { color: '#fff', fontSize: 16, fontWeight: '800' },

  // Footer note
  footNote: {
    fontSize: 13, color: '#f9a8d4', textAlign: 'center',
  },
});