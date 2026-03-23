import React, { useState, useRef } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  ScrollView, Dimensions, FlatList, Animated,
} from 'react-native';

// ── RESPONSIVE ───────────────────────────────────────────────
const { width: SW, height: SH } = Dimensions.get('window');
const rs  = (n) => Math.round(n * (SW / 390));
const rvs = (n) => Math.round(n * (SH / 844));

// ── PINK THEME ───────────────────────────────────────────────
const P = {
  bg:      '#fdf2f8',
  card:    '#ffffff',
  pink100: '#fce7f3',
  pink200: '#fbcfe8',
  pink300: '#f9a8d4',
  pink400: '#f472b6',
  pink500: '#ec4899',
  pink600: '#db2777',
  pink700: '#be185d',
  pink800: '#9d174d',
  txt:     '#1a0a10',
  sub:     '#7d4d60',
  muted:   '#c084b0',
};

// ── DATA ─────────────────────────────────────────────────────
const questions = [
  {
    id: 1, emoji: '🎨',
    text: "What do you love doing the most?",
    options: [
      { text: "Drawing & making art",             emoji: '✏️', score: { design: 3, media: 2 } },
      { text: "Telling stories & acting",          emoji: '🎭', score: { media: 3, design: 1 } },
      { text: "Building & measuring things",       emoji: '🏗️', score: { architecture: 3 } },
      { text: "Being the team leader",             emoji: '👑', score: { business: 3 } },
      { text: "Planning trips & fun events",       emoji: '✈️', score: { tourism: 3 } },
      { text: "Playing with computers & gadgets", emoji: '💻', score: { ict: 3 } },
    ],
  },
  {
    id: 2, emoji: '📚',
    text: "What was your favourite subject at school?",
    options: [
      { text: "Art & Design",               emoji: '🎨', score: { design: 3 } },
      { text: "English & Drama",            emoji: '📖', score: { media: 3 } },
      { text: "Maths & Technical Drawing",  emoji: '📐', score: { architecture: 3 } },
      { text: "Business Studies",           emoji: '💼', score: { business: 3 } },
      { text: "Geography & Home Economics", emoji: '🌍', score: { tourism: 3 } },
      { text: "Computer Studies",           emoji: '🖥️', score: { ict: 3 } },
    ],
  },
  {
    id: 3, emoji: '👫',
    text: "In a team, what do YOU do best?",
    options: [
      { text: "Make it look beautiful",        emoji: '🌸', score: { design: 2, media: 1 } },
      { text: "Talk and explain ideas",         emoji: '🗣️', score: { media: 3 } },
      { text: "Plan and organise everything",   emoji: '📋', score: { architecture: 3 } },
      { text: "Lead the group",                 emoji: '⭐', score: { business: 3 } },
      { text: "Make everyone happy & welcome",  emoji: '😊', score: { tourism: 3 } },
      { text: "Fix the tech problems",          emoji: '🔧', score: { ict: 3 } },
    ],
  },
  {
    id: 4, emoji: '🏢',
    text: "Where would you love to work one day?",
    options: [
      { text: "A cool design studio",       emoji: '🖌️', score: { design: 3 } },
      { text: "A TV or radio station",       emoji: '📺', score: { media: 3 } },
      { text: "An architecture office",      emoji: '📏', score: { architecture: 3 } },
      { text: "A big company office",        emoji: '🏦', score: { business: 3 } },
      { text: "A hotel or travel agency",    emoji: '🏨', score: { tourism: 3 } },
      { text: "A tech company like Google",  emoji: '🔬', score: { ict: 3 } },
    ],
  },
  {
    id: 5, emoji: '🤝',
    text: "Do you prefer people or technology?",
    options: [
      { text: "I love being around people!",             emoji: '👥', score: { tourism: 2, business: 2, media: 1 } },
      { text: "I prefer working with tools & computers", emoji: '🔩', score: { design: 2, ict: 2, architecture: 1 } },
      { text: "Both are great for me!",                  emoji: '🤩', score: { media: 2, business: 1 } },
    ],
  },
  {
    id: 6, emoji: '🌟',
    text: "What dream sounds most exciting to you?",
    options: [
      { text: "My designs seen all over the world", emoji: '🌍', score: { design: 3 } },
      { text: "Millions watching my content",       emoji: '📱', score: { media: 3 } },
      { text: "Designing a famous building",        emoji: '🏛️', score: { architecture: 3 } },
      { text: "Running my own business",            emoji: '💰', score: { business: 3 } },
      { text: "Working at beautiful hotels",        emoji: '🌴', score: { tourism: 3 } },
      { text: "Creating an amazing app",            emoji: '📲', score: { ict: 3 } },
    ],
  },
];

const FACULTY_META = {
  design:       { emoji: '🎨', color: P.pink600, label: 'Design & Art',     fun: 'You are super creative!' },
  media:        { emoji: '🎬', color: P.pink700, label: 'Media & TV',       fun: 'You love telling stories!' },
  architecture: { emoji: '🏛️', color: P.pink500, label: 'Architecture',     fun: 'You love building things!' },
  business:     { emoji: '💼', color: P.pink600, label: 'Business',         fun: 'You are a born leader!' },
  tourism:      { emoji: '✈️', color: P.pink700, label: 'Tourism & Hotels', fun: 'You love making people happy!' },
  ict:          { emoji: '💻', color: P.pink500, label: 'Computers & Tech', fun: 'You are a tech star!' },
};

const INFO_CARDS = [
  { emoji: '❓', value: '6',     label: 'Questions' },
  { emoji: '🏫', value: '6',     label: 'Faculties' },
  { emoji: '⏱️', value: '2 min', label: 'Duration'  },
  { emoji: '🎯', value: 'Free',  label: 'No Sign Up' },
];

// ── MAIN COMPONENT ───────────────────────────────────────────
export default function Quizzes() {
  const [screen, setScreen]     = useState('welcome');
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers]   = useState({});   // { qIndex: optionIndex }
  const [scores, setScores]     = useState({
    design: 0, media: 0, architecture: 0, business: 0, tourism: 0, ict: 0,
  });

  const flatRef   = useRef(null);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  // ── Answer a question & auto-advance ────────────────────────
  const handleAnswer = (qIndex, optionIndex, optionScores) => {
    if (answers[qIndex] !== undefined) return;

    // Bounce animation
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 0.97, duration: 80, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1,    duration: 120, useNativeDriver: true }),
    ]).start();

    setAnswers(prev => ({ ...prev, [qIndex]: optionIndex }));

    const next = { ...scores };
    Object.keys(optionScores).forEach(k => { next[k] = (next[k] || 0) + optionScores[k]; });
    setScores(next);

    setTimeout(() => {
      if (qIndex < questions.length - 1) {
        const nextIndex = qIndex + 1;
        setCurrentQ(nextIndex);
        flatRef.current?.scrollToIndex({ index: nextIndex, animated: true });
      } else {
        setScreen('results');
      }
    }, 380);
  };

  const restart = () => {
    setScreen('welcome');
    setCurrentQ(0);
    setAnswers({});
    setScores({ design: 0, media: 0, architecture: 0, business: 0, tourism: 0, ict: 0 });
  };

  const getResult = () => {
    let max = -Infinity, topKey = 'design';
    Object.entries(scores).forEach(([k, v]) => { if (v > max) { max = v; topKey = k; } });
    const facultyMap = {
      design:       "Faculty of Design Innovation",
      media:        "Faculty of Communication, Media & Broadcasting",
      architecture: "Faculty of Architecture & the Built Environment",
      business:     "Faculty of Business & Globalization",
      tourism:      "Faculty of Creativity in Tourism & Hospitality",
      ict:          "Faculty of Information & Communication Technology",
    };
    const desc = {
      design:       "You are very creative! You would love Graphic Design, Fashion or Advertising.",
      media:        "You love stories! Broadcasting, Journalism or Film Production is perfect for you.",
      architecture: "You love building! Architectural Technology would be a great fit.",
      business:     "You are a great leader! Business, Entrepreneurship or Marketing suits you.",
      tourism:      "You make people happy! Tourism, Hotel or Events Management is made for you.",
      ict:          "You are a tech star! Software Engineering or IT is the right path for you.",
    };
    return { key: topKey, faculty: facultyMap[topKey], description: desc[topKey] };
  };

  // ════════════════════════════════════════════════════════════
  // WELCOME — Card-based layout
  // ════════════════════════════════════════════════════════════
  if (screen === 'welcome') {
    return (
      <ScrollView
        style={{ flex: 1, backgroundColor: P.bg }}
        contentContainerStyle={s.pad}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero card */}
        <View style={s.heroCard}>
          <Text style={s.heroEmoji}>🎓</Text>
          <Text style={s.heroTitle}>
            Find Your{'\n'}<Text style={s.accent}>Perfect Faculty</Text>
          </Text>
          <Text style={s.heroSub}>
            Answer 6 fun questions and discover which Limkokwing faculty was made for YOU!
          </Text>
          <TouchableOpacity style={s.heroBtn} onPress={() => setScreen('quiz')} activeOpacity={0.85}>
            <Text style={s.heroBtnTxt}>Take a Quiz 🚀</Text>
          </TouchableOpacity>
        </View>

        {/* 2×2 info grid */}
        <View style={s.infoGrid}>
          {INFO_CARDS.map((c, i) => (
            <View key={i} style={s.infoCard}>
              <Text style={s.infoEmoji}>{c.emoji}</Text>
              <Text style={s.infoVal}>{c.value}</Text>
              <Text style={s.infoLbl}>{c.label}</Text>
            </View>
          ))}
        </View>

        {/* Faculty preview grid */}
        <Text style={s.secTitle}>You could become...</Text>
        <View style={s.facultyGrid}>
          {Object.entries(FACULTY_META).map(([k, m]) => (
            <View key={k} style={s.facultyCard}>
              <Text style={s.facultyCardEmoji}>{m.emoji}</Text>
              <Text style={s.facultyCardLabel}>{m.label}</Text>
              <Text style={s.facultyCardFun}>{m.fun}</Text>
            </View>
          ))}
        </View>

        <Text style={s.footNote}>Free · No sign up · Instant results 😊</Text>
      </ScrollView>
    );
  }

  // ════════════════════════════════════════════════════════════
  // QUIZ — Horizontal swipe
  // ════════════════════════════════════════════════════════════
  if (screen === 'quiz') {
    const pct = ((currentQ + 1) / questions.length) * 100;

    return (
      <View style={{ flex: 1, backgroundColor: P.bg }}>

        {/* ── Fixed top bar ── */}
        <View style={s.quizTopBar}>
          {/* Dot stepper */}
          <View style={s.dotsRow}>
            {questions.map((_, i) => (
              <View key={i} style={[
                s.dot,
                i < currentQ   && s.dotDone,
                i === currentQ && s.dotCurrent,
                i > currentQ   && s.dotFuture,
              ]} />
            ))}
          </View>

          {/* Progress bar */}
          <View style={s.progTrack}>
            <View style={[s.progFill, { width: `${pct}%` }]} />
          </View>

          {/* Counter */}
          <Text style={s.qCounter}>
            {currentQ + 1} <Text style={{ color: P.muted }}>/ {questions.length}</Text>
          </Text>
        </View>

        {/* ── Horizontal FlatList ── */}
        <FlatList
          ref={flatRef}
          data={questions}
          keyExtractor={item => String(item.id)}
          horizontal
          pagingEnabled
          scrollEnabled={false}          // navigation only via answer tap
          showsHorizontalScrollIndicator={false}
          initialNumToRender={questions.length}
          getItemLayout={(_, index) => ({
            length: SW, offset: SW * index, index,
          })}
          renderItem={({ item, index }) => (
            <ScrollView
              style={{ width: SW }}
              contentContainerStyle={s.slidePad}
              showsVerticalScrollIndicator={false}
            >
              {/* Question card */}
              <Animated.View style={[s.qCard, { transform: [{ scale: scaleAnim }] }]}>
                <View style={s.qCardHeader}>
                  <View style={s.qBadge}>
                    <Text style={s.qBadgeTxt}>Question {index + 1}</Text>
                  </View>
                  <Text style={s.qEmoji}>{item.emoji}</Text>
                </View>
                <Text style={s.qText}>{item.text}</Text>
              </Animated.View>

              {/* Options */}
              <View style={s.optionsWrap}>
                {item.options.map((opt, i) => {
                  const answered  = answers[index] !== undefined;
                  const isChosen  = answers[index] === i;
                  return (
                    <TouchableOpacity
                      key={i}
                      style={[
                        s.optBtn,
                        isChosen  && s.optBtnChosen,
                        answered && !isChosen && s.optBtnFaded,
                      ]}
                      onPress={() => handleAnswer(index, i, opt.score)}
                      activeOpacity={0.78}
                      disabled={answered}
                    >
                      {/* Emoji bubble */}
                      <View style={[s.optBubble, isChosen && s.optBubbleChosen]}>
                        <Text style={s.optEmoji}>{opt.emoji}</Text>
                      </View>

                      <Text style={[s.optTxt, isChosen && s.optTxtChosen]}>
                        {opt.text}
                      </Text>

                      {/* Check indicator */}
                      {isChosen && (
                        <View style={s.checkWrap}>
                          <Text style={s.checkTxt}>✓</Text>
                        </View>
                      )}
                    </TouchableOpacity>
                  );
                })}
              </View>
            </ScrollView>
          )}
        />
      </View>
    );
  }

  // ════════════════════════════════════════════════════════════
  // RESULTS — Simple clean card
  // ════════════════════════════════════════════════════════════
  const result = getResult();
  const meta   = FACULTY_META[result.key];

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: P.bg }}
      contentContainerStyle={s.pad}
      showsVerticalScrollIndicator={false}
    >
      {/* Celebration header */}
      <View style={s.celebRow}>
        <Text style={s.celebEmoji}>🎉</Text>
        <Text style={s.celebTxt}>Quiz Complete!</Text>
        <Text style={s.celebEmoji}>🎊</Text>
      </View>

      {/* ── Main result card ── */}
      <View style={s.resultCard}>
        {/* Top pink banner */}
        <View style={s.resultBanner}>
          <Text style={s.resultBannerEmoji}>{meta.emoji}</Text>
          <View style={s.bestMatchPill}>
            <Text style={s.bestMatchTxt}>✨ Best Match</Text>
          </View>
        </View>

        {/* Body */}
        <View style={s.resultBody}>
          <Text style={s.resultLabel}>{meta.label}</Text>
          <Text style={s.resultFun}>{meta.fun}</Text>

          {/* Divider */}
          <View style={s.divider} />

          <Text style={s.resultFacultyTitle}>Faculty</Text>
          <Text style={s.resultFaculty}>{result.faculty}</Text>

          {/* Divider */}
          <View style={s.divider} />

          {/* Description */}
          <View style={s.resultDescRow}>
            <Text style={s.resultDescIcon}>💡</Text>
            <Text style={s.resultDesc}>{result.description}</Text>
          </View>
        </View>
      </View>

      {/* ── Score pills ── */}
      <Text style={s.secTitle}>How you scored</Text>
      <View style={s.pillsWrap}>
        {Object.entries(scores)
          .sort(([, a], [, b]) => b - a)
          .map(([key, score], idx) => {
            const m     = FACULTY_META[key];
            const isTop = idx === 0;
            return (
              <View key={key} style={[s.scorePill, isTop && s.scorePillTop]}>
                <Text style={s.scorePillEmoji}>{m.emoji}</Text>
                <Text style={[s.scorePillLabel, isTop && { color: P.pink700 }]}>
                  {m.label}
                </Text>
                <View style={[s.scorePillBadge, isTop && s.scorePillBadgeTop]}>
                  <Text style={[s.scorePillNum, isTop && { color: '#fff' }]}>
                    {score}
                  </Text>
                </View>
              </View>
            );
          })}
      </View>

      {/* Retake */}
      <TouchableOpacity style={s.retakeBtn} onPress={restart} activeOpacity={0.85}>
        <Text style={s.retakeTxt}>🔄  Take a Quiz Again</Text>
      </TouchableOpacity>

      <Text style={s.footNote}>Show this to your parents or teacher! 😊</Text>
    </ScrollView>
  );
}

// ── STYLES ───────────────────────────────────────────────────
const s = StyleSheet.create({
  pad: { padding: rs(18), paddingBottom: rvs(80), paddingTop: rvs(20) },

  // ── Welcome ──────────────────────────────────────────────
  heroCard: {
    backgroundColor: P.pink600, borderRadius: rs(28),
    padding: rs(28), alignItems: 'center', marginBottom: rvs(16),
    shadowColor: P.pink700, shadowOffset: { width: 0, height: rvs(6) },
    shadowOpacity: 0.32, shadowRadius: rs(16), elevation: 8,
  },
  heroEmoji:  { fontSize: rs(62), marginBottom: rvs(10) },
  heroTitle:  { fontSize: rs(28), fontWeight: '900', color: '#fff', textAlign: 'center', lineHeight: rs(36), marginBottom: rvs(10) },
  accent:     { color: P.pink200 },
  heroSub:    { fontSize: rs(14), color: '#fce7f3', textAlign: 'center', lineHeight: rs(22), marginBottom: rvs(22) },
  heroBtn:    { backgroundColor: '#fff', paddingVertical: rvs(14), paddingHorizontal: rs(44), borderRadius: rs(16), shadowColor: P.pink800, shadowOffset: { width: 0, height: rvs(3) }, shadowOpacity: 0.18, shadowRadius: rs(8), elevation: 4 },
  heroBtnTxt: { fontSize: rs(17), fontWeight: '900', color: P.pink600 },

  infoGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: rs(10), marginBottom: rvs(18) },
  infoCard: {
    width: (SW - rs(18) * 2 - rs(10)) / 2,
    backgroundColor: P.card, borderRadius: rs(20), padding: rs(16),
    alignItems: 'center', gap: rvs(4),
    borderWidth: 2, borderColor: P.pink200,
    shadowColor: P.pink300, shadowOffset: { width: 0, height: rvs(2) },
    shadowOpacity: 0.15, shadowRadius: rs(6), elevation: 3,
  },
  infoEmoji: { fontSize: rs(26) },
  infoVal:   { fontSize: rs(22), fontWeight: '900', color: P.pink600 },
  infoLbl:   { fontSize: rs(11), fontWeight: '600', color: P.muted },

  secTitle:    { fontSize: rs(16), fontWeight: '800', color: P.pink700, marginBottom: rvs(12) },
  facultyGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: rs(10), marginBottom: rvs(18) },
  facultyCard: {
    width: (SW - rs(18) * 2 - rs(10)) / 2,
    backgroundColor: P.card, borderRadius: rs(18), padding: rs(14),
    alignItems: 'center', gap: rvs(4),
    borderWidth: 2, borderColor: P.pink200,
    shadowColor: P.pink200, shadowOffset: { width: 0, height: rvs(2) },
    shadowOpacity: 0.12, shadowRadius: rs(6), elevation: 2,
  },
  facultyCardEmoji: { fontSize: rs(30) },
  facultyCardLabel: { fontSize: rs(12), fontWeight: '800', color: P.pink800, textAlign: 'center' },
  facultyCardFun:   { fontSize: rs(10), fontWeight: '600', color: P.muted,  textAlign: 'center' },
  footNote:         { fontSize: rs(13), color: P.muted, textAlign: 'center', marginTop: rvs(4) },

  // ── Quiz top bar ─────────────────────────────────────────
  quizTopBar: {
    backgroundColor: P.card,
    paddingHorizontal: rs(18), paddingTop: rvs(14), paddingBottom: rvs(12),
    borderBottomWidth: 1.5, borderBottomColor: P.pink200,
    gap: rvs(8),
  },
  dotsRow:    { flexDirection: 'row', gap: rs(6), justifyContent: 'center' },
  dot:        { height: rvs(6), borderRadius: rs(3) },
  dotDone:    { width: rs(16), backgroundColor: P.pink400 },
  dotCurrent: { width: rs(28), backgroundColor: P.pink600 },
  dotFuture:  { width: rs(16), backgroundColor: P.pink200 },
  progTrack:  { height: rvs(6), borderRadius: rs(3), backgroundColor: P.pink200, overflow: 'hidden' },
  progFill:   { height: rvs(6), backgroundColor: P.pink500, borderRadius: rs(3) },
  qCounter:   { fontSize: rs(13), fontWeight: '800', color: P.pink700, textAlign: 'center' },

  // ── Quiz slide ───────────────────────────────────────────
  slidePad: { padding: rs(18), paddingBottom: rvs(60) },

  qCard: {
    backgroundColor: P.card, borderRadius: rs(24),
    padding: rs(22), marginBottom: rvs(16),
    borderWidth: 2, borderColor: P.pink200,
    shadowColor: P.pink400, shadowOffset: { width: 0, height: rvs(4) },
    shadowOpacity: 0.18, shadowRadius: rs(14), elevation: 6,
  },
  qCardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: rvs(14) },
  qBadge:      { backgroundColor: P.pink600, paddingHorizontal: rs(14), paddingVertical: rvs(5), borderRadius: rs(12) },
  qBadgeTxt:   { color: '#fff', fontSize: rs(12), fontWeight: '800', letterSpacing: 0.3 },
  qEmoji:      { fontSize: rs(38) },
  qText:       { fontSize: rs(20), fontWeight: '900', lineHeight: rs(30), color: P.txt },

  optionsWrap: { gap: rvs(10) },
  optBtn: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: P.card, borderRadius: rs(18),
    padding: rs(14), gap: rs(12),
    borderWidth: 2, borderColor: P.pink200,
    shadowColor: P.pink300, shadowOffset: { width: 0, height: rvs(2) },
    shadowOpacity: 0.12, shadowRadius: rs(8), elevation: 3,
  },
  optBtnChosen: { backgroundColor: P.pink600, borderColor: P.pink600 },
  optBtnFaded:  { opacity: 0.4 },
  optBubble:       { width: rs(44), height: rs(44), borderRadius: rs(14), backgroundColor: P.pink100, alignItems: 'center', justifyContent: 'center', borderWidth: 1.5, borderColor: P.pink300 },
  optBubbleChosen: { backgroundColor: 'rgba(255,255,255,0.22)', borderColor: 'rgba(255,255,255,0.4)' },
  optEmoji: { fontSize: rs(22) },
  optTxt:   { flex: 1, fontSize: rs(15), fontWeight: '700', color: P.txt, lineHeight: rs(21) },
  optTxtChosen: { color: '#fff' },
  checkWrap: { width: rs(30), height: rs(30), borderRadius: rs(15), backgroundColor: 'rgba(255,255,255,0.28)', alignItems: 'center', justifyContent: 'center' },
  checkTxt:  { fontSize: rs(15), color: '#fff', fontWeight: '900' },

  // ── Results ──────────────────────────────────────────────
  celebRow:  { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: rs(10), marginBottom: rvs(16) },
  celebEmoji:{ fontSize: rs(28) },
  celebTxt:  { fontSize: rs(22), fontWeight: '900', color: P.pink700 },

  resultCard: {
    backgroundColor: P.card, borderRadius: rs(28),
    overflow: 'hidden', marginBottom: rvs(22),
    borderWidth: 2, borderColor: P.pink200,
    shadowColor: P.pink500, shadowOffset: { width: 0, height: rvs(6) },
    shadowOpacity: 0.2, shadowRadius: rs(16), elevation: 8,
  },
  resultBanner: {
    backgroundColor: P.pink600, padding: rs(28),
    alignItems: 'center', gap: rvs(10),
  },
  resultBannerEmoji: { fontSize: rs(64) },
  bestMatchPill:     { backgroundColor: 'rgba(255,255,255,0.25)', paddingHorizontal: rs(16), paddingVertical: rvs(5), borderRadius: rs(20) },
  bestMatchTxt:      { color: '#fff', fontSize: rs(12), fontWeight: '800', letterSpacing: 0.5 },

  resultBody:        { padding: rs(22) },
  resultLabel:       { fontSize: rs(26), fontWeight: '900', color: P.pink800, marginBottom: rvs(4) },
  resultFun:         { fontSize: rs(14), fontWeight: '700', color: P.muted, marginBottom: rvs(16) },
  divider:           { height: 1.5, backgroundColor: P.pink100, marginBottom: rvs(16) },
  resultFacultyTitle:{ fontSize: rs(11), fontWeight: '800', color: P.muted, letterSpacing: 1, textTransform: 'uppercase', marginBottom: rvs(4) },
  resultFaculty:     { fontSize: rs(15), fontWeight: '800', color: P.pink700, marginBottom: rvs(16), lineHeight: rs(22) },
  resultDescRow:     { flexDirection: 'row', gap: rs(10), alignItems: 'flex-start' },
  resultDescIcon:    { fontSize: rs(20) },
  resultDesc:        { flex: 1, fontSize: rs(14), lineHeight: rs(22), color: P.sub, fontWeight: '600' },

  // ── Score pills ──────────────────────────────────────────
  pillsWrap: { gap: rvs(8), marginBottom: rvs(22) },
  scorePill: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: P.card, borderRadius: rs(16),
    padding: rs(14), gap: rs(12),
    borderWidth: 1.5, borderColor: P.pink200,
    shadowColor: P.pink200, shadowOffset: { width: 0, height: rvs(1) },
    shadowOpacity: 0.1, shadowRadius: rs(4), elevation: 2,
  },
  scorePillTop:       { borderColor: P.pink400, borderWidth: 2, backgroundColor: P.pink100 },
  scorePillEmoji:     { fontSize: rs(22) },
  scorePillLabel:     { flex: 1, fontSize: rs(14), fontWeight: '700', color: P.sub },
  scorePillBadge:     { backgroundColor: P.pink100, borderRadius: rs(10), paddingHorizontal: rs(10), paddingVertical: rvs(4) },
  scorePillBadgeTop:  { backgroundColor: P.pink600 },
  scorePillNum:       { fontSize: rs(14), fontWeight: '900', color: P.pink600 },

  retakeBtn: {
    backgroundColor: P.card, paddingVertical: rvs(16),
    borderRadius: rs(18), alignItems: 'center',
    borderWidth: 2, borderColor: P.pink300,
    marginBottom: rvs(14),
    shadowColor: P.pink300, shadowOffset: { width: 0, height: rvs(2) },
    shadowOpacity: 0.1, shadowRadius: rs(6), elevation: 2,
  },
  retakeTxt: { fontSize: rs(16), fontWeight: '900', color: P.pink700 },
});