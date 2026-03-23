import React, { useState } from 'react';
import { View,Text,StyleSheet,useColorScheme,TouchableOpacity,ScrollView,
} from 'react-native';

const questions = [
  {
    id: 1,
    text: "When working on a project, what excites you most?",
    options: [
      { text: "Creating beautiful visuals, designs, or art", score: { design: 3, media: 2 } },
      { text: "Telling stories, communicating ideas, or working with media", score: { media: 3, design: 1 } },
      { text: "Building, planning structures, or solving spatial/technical problems", score: { architecture: 3 } },
      { text: "Managing people, money, strategies, or starting ventures", score: { business: 3 } },
      { text: "Helping people enjoy experiences, travel, events, or hospitality", score: { tourism: 3 } },
      { text: "Coding, technology, apps, software, or digital systems", score: { ict: 3 } },
    ],
  },
  {
    id: 2,
    text: "How do you prefer to spend your free time creatively?",
    options: [
      { text: "Drawing, designing clothes/graphics, photography", score: { design: 3 } },
      { text: "Making videos, podcasts, writing stories, social media content", score: { media: 3 } },
      { text: "Sketching buildings, models, or planning spaces", score: { architecture: 2 } },
      { text: "Organizing events, selling ideas, leading groups", score: { business: 2, tourism: 2 } },
      { text: "Planning trips, hosting friends, creating experiences", score: { tourism: 3 } },
      { text: "Building apps/websites, gaming, experimenting with tech", score: { ict: 3 } },
    ],
  },
  {
    id: 3,
    text: "Which subject/activity did you enjoy most in school?",
    options: [
      { text: "Art, Design & Technology, Fashion/Needlework", score: { design: 3 } },
      { text: "English, Drama, Literature, Public Speaking", score: { media: 3 } },
      { text: "Mathematics, Technical Drawing, Woodwork", score: { architecture: 3 } },
      { text: "Commerce, Business Studies, Accounting", score: { business: 3 } },
      { text: "Geography, Home Economics, Hospitality/Catering", score: { tourism: 3 } },
      { text: "Computer Studies, Maths, Science", score: { ict: 3 } },
    ],
  },
  {
    id: 4,
    text: "In a group project, what role do you naturally take?",
    options: [
      { text: "The visual designer or creative concept developer", score: { design: 2, media: 1 } },
      { text: "The presenter, communicator, or content creator", score: { media: 3 } },
      { text: "The planner or technical/structural expert", score: { architecture: 3 } },
      { text: "The organizer, leader, or strategist", score: { business: 3 } },
      { text: "The host, experience designer, or people coordinator", score: { tourism: 3 } },
      { text: "The coder, problem-solver, or tech fixer", score: { ict: 3 } },
    ],
  },
  {
    id: 5,
    text: "What kind of work environment appeals to you most?",
    options: [
      { text: "Studio with art supplies, mannequins, computers for design", score: { design: 3 } },
      { text: "Media lab, cameras, editing suites, microphones", score: { media: 3 } },
      { text: "Workshop with models, drawing boards, measuring tools", score: { architecture: 3 } },
      { text: "Office with meetings, strategies, client presentations", score: { business: 3 } },
      { text: "Hotels, events venues, travel planning spaces", score: { tourism: 3 } },
      { text: "Tech lab, computers, servers, coding environment", score: { ict: 3 } },
    ],
  },
  {
    id: 6,
    text: "How important is working with people vs technology/tools?",
    options: [
      { text: "I love working closely with people and teams", score: { tourism: 2, business: 2, media: 1 } },
      { text: "I prefer focusing on tools, software, or individual creative work", score: { design: 2, ict: 2, architecture: 1 } },
      { text: "A balanced mix of both", score: { media: 2, business: 1 } },
    ],
  },
  {
    id: 7,
    text: "Which future excites you more?",
    options: [
      { text: "Seeing my designs, fashion, or ads in the world", score: { design: 3 } },
      { text: "Creating content that reaches/influences many people", score: { media: 3 } },
      { text: "Designing buildings or spaces people live/work in", score: { architecture: 3 } },
      { text: "Running a business, managing teams, or growing brands", score: { business: 3 } },
      { text: "Creating memorable experiences for travelers/guests", score: { tourism: 3 } },
      { text: "Building apps, software, or digital innovations", score: { ict: 3 } },
    ],
  },
  {
    id: 8,
    text: "How do you feel about portfolios or presentations?",
    options: [
      { text: "I love creating and showing visual work (portfolio essential)", score: { design: 3, media: 2 } },
      { text: "I enjoy presenting ideas or speaking to groups", score: { media: 2, business: 1, tourism: 1 } },
      { text: "I prefer technical drawings/plans over artistic portfolios", score: { architecture: 2 } },
      { text: "I'm more comfortable with numbers/strategies than visuals", score: { business: 2, ict: 1 } },
    ],
  },
];

const FACULTY_META = {
  design:       { emoji: '🎨', color: '#f97316', bg: '#fff7ed', label: 'Design Innovation' },
  media:        { emoji: '🎬', color: '#8b5cf6', bg: '#f5f3ff', label: 'Media & Broadcasting' },
  architecture: { emoji: '🏛️', color: '#0ea5e9', bg: '#f0f9ff', label: 'Architecture' },
  business:     { emoji: '💼', color: '#10b981', bg: '#f0fdf4', label: 'Business & Globalization' },
  tourism:      { emoji: '✈️', color: '#f59e0b', bg: '#fffbeb', label: 'Tourism & Hospitality' },
  ict:          { emoji: '💻', color: '#6366f1', bg: '#eef2ff', label: 'ICT' },
};

export default function Quizzes({ navigation }) {
  const colorScheme = useColorScheme() ?? 'light';
  const isDark = colorScheme === 'dark';

  const [screen, setScreen] = useState('welcome');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selected, setSelected] = useState(null);
  const [scores, setScores] = useState({
    design: 0, media: 0, architecture: 0, business: 0, tourism: 0, ict: 0,
  });

  const bg       = isDark ? '#0f172a' : '#f8fafc';
  const card     = isDark ? '#1e293b' : '#ffffff';
  const textMain = isDark ? '#f1f5f9' : '#0f172a';
  const textSub  = isDark ? '#94a3b8' : '#64748b';
  const border   = isDark ? '#334155' : '#e2e8f0';

  const handleAnswer = (optionScores, index) => {
    if (selected !== null) return;
    setSelected(index);
    const newScores = { ...scores };
    Object.keys(optionScores).forEach(k => {
      newScores[k] = (newScores[k] || 0) + (optionScores[k] || 0);
    });
    setTimeout(() => {
      setScores(newScores);
      setSelected(null);
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(q => q + 1);
      } else {
        setScreen('results');
      }
    }, 280);
  };

  const restart = () => {
    setScreen('welcome');
    setCurrentQuestion(0);
    setSelected(null);
    setScores({ design: 0, media: 0, architecture: 0, business: 0, tourism: 0, ict: 0 });
  };

  const getResult = () => {
    let max = -Infinity, topKey = 'design';
    Object.entries(scores).forEach(([k, v]) => { if (v > max) { max = v; topKey = k; } });
    const facultyMap = {
      design: "Faculty of Design Innovation",
      media: "Faculty of Communication, Media & Broadcasting",
      architecture: "Faculty of Architecture & the Built Environment",
      business: "Faculty of Business & Globalization",
      tourism: "Faculty of Creativity in Tourism & Hospitality",
      ict: "Faculty of Information & Communication Technology",
    };
    const desc = {
      design: "You have strong creative and visual talents! Fields like Graphic Design, Fashion & Apparel Design or Creative Advertising could be an excellent match.",
      media: "You enjoy communication, storytelling and media. Broadcasting & Journalism, Television & Film Production or Public Relations might suit you very well.",
      architecture: "You seem drawn to structure, planning and technical creativity. Architectural Technology would likely be a great fit.",
      business: "You have a strategic, people-oriented entrepreneurial mindset. International Business, Entrepreneurship or Marketing could be ideal.",
      tourism: "You thrive on creating experiences and working with people. Tourism Management, Hotel Management or Events Management looks very promising.",
      ict: "You're tech-savvy and love digital innovation. Software Engineering, Business IT or Information Technology aligns well with your interests.",
    };
    return { key: topKey, faculty: facultyMap[topKey], description: desc[topKey] };
  };

  const progressPct = ((currentQuestion + 1) / questions.length) * 100;

  //WELCOME
  if (screen === 'welcome') {
    return (
      <ScrollView style={[styles.root, { backgroundColor: bg }]}
        contentContainerStyle={styles.centerPad}>

        {/* Top pill */}
        <View style={[styles.pill, { backgroundColor: isDark ? '#1e3a5f' : '#dbeafe' }]}>
          <Text style={[styles.pillText, { color: isDark ? '#93c5fd' : '#1d4ed8' }]}>
            🎓  Limkokwing University · Career Match
          </Text>
        </View>

        {/*Headline*/}
        <Text style={[styles.welcomeTitle, { color: textMain }]}>
          Find Your{'\n'}<Text style={styles.accent}>Perfect</Text>{'\n'}Faculty
        </Text>

        <Text style={[styles.welcomeSub, { color: textSub }]}>
          Answer 8 quick questions and discover which Limkokwing programme was made for you.
        </Text>

        {/*Quick stats*/}
        <View style={[styles.statsRow, { backgroundColor: card, borderColor: border }]}>
          {[['8', 'Questions'], ['6', 'Faculties'], ['2 min', 'Duration']].map(([val, lbl], i) => (
            <View key={i} style={[styles.statCell, i < 2 && { borderRightWidth: 1, borderRightColor: border }]}>
              <Text style={styles.statVal}>{val}</Text>
              <Text style={[styles.statLbl, { color: textSub }]}>{lbl}</Text>
            </View>
          ))}
        </View>

        {/* Faculty chips */}
        <Text style={[styles.sectionLbl, { color: textSub }]}>AVAILABLE FACULTIES</Text>
        <View style={styles.chipsWrap}>
          {Object.entries(FACULTY_META).map(([k, m]) => (
            <View key={k} style={[styles.chip,
              { backgroundColor: isDark ? '#1e293b' : m.bg, borderColor: m.color + '50' }]}>
              <Text style={styles.chipEmoji}>{m.emoji}</Text>
              <Text style={[styles.chipText, { color: m.color }]}>{m.label}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.startBtn} onPress={() => setScreen('quiz')} activeOpacity={0.85}>
          <Text style={styles.startBtnText}>Start the Quiz  →</Text>
        </TouchableOpacity>

        <Text style={[styles.note, { color: textSub }]}>Free · No sign-up · Instant results</Text>
      </ScrollView>
    );
  }

  //QUIZ
  if (screen === 'quiz') {
    const q = questions[currentQuestion];
    return (
      <ScrollView style={[styles.root, { backgroundColor: bg }]}
        contentContainerStyle={styles.quizPad}>

        {/*Progress*/}
        <View style={styles.topRow}>
          <Text style={[styles.qCount, { color: textSub }]}>
            {currentQuestion + 1} / {questions.length}
          </Text>
          <View style={[styles.progTrack, { backgroundColor: border }]}>
            <View style={[styles.progFill, { width: `${progressPct}%` }]} />
          </View>
        </View>

        {/* Question card */}
        <View style={[styles.qCard, { backgroundColor: card, borderColor: border }]}>
          <View style={styles.qBadge}>
            <Text style={styles.qBadgeText}>Q{currentQuestion + 1}</Text>
          </View>
          <Text style={[styles.qText, { color: textMain }]}>{q.text}</Text>
        </View>

        {/* Options */}
        <View style={styles.optionsWrap}>
          {q.options.map((opt, i) => {
            const isSelected = selected === i;
            return (
              <TouchableOpacity
                key={i}
                style={[styles.optBtn,
                  { backgroundColor: isSelected ? '#3b82f6' : card, borderColor: isSelected ? '#3b82f6' : border }
                ]}
                onPress={() => handleAnswer(opt.score, i)}
                activeOpacity={0.75}
              >
                <View style={[styles.optLetter,
                  { backgroundColor: isSelected ? '#ffffff20' : (isDark ? '#0f172a' : '#f1f5f9'),
                    borderColor: isSelected ? '#ffffff40' : border }]}>
                  <Text style={[styles.optLetterText,
                    { color: isSelected ? '#fff' : textSub }]}>
                    {String.fromCharCode(65 + i)}
                  </Text>
                </View>
                <Text style={[styles.optText, { color: isSelected ? '#ffffff' : textMain }]}>
                  {opt.text}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Step dots */}
        <View style={styles.dotsRow}>
          {questions.map((_, i) => (
            <View key={i} style={[styles.dot, {
              backgroundColor: i <= currentQuestion ? '#3b82f6' : border,
              width: i === currentQuestion ? 20 : 8,
              opacity: i === currentQuestion ? 1 : i < currentQuestion ? 0.7 : 0.3,
            }]} />
          ))}
        </View>

      </ScrollView>
    );
  }

  //RESULTS
  const result = getResult();
  const meta = FACULTY_META[result.key];

  return (
    <ScrollView style={[styles.root, { backgroundColor: bg }]}
      contentContainerStyle={styles.centerPad}>

      {/* Emoji circle */}
      <View style={[styles.emojiCircle, { backgroundColor: meta.color + '20' }]}>
        <Text style={styles.emojiLarge}>{meta.emoji}</Text>
      </View>

      <Text style={[styles.matchLbl, { color: textSub }]}>YOUR BEST MATCH</Text>
      <Text style={[styles.facultyName, { color: meta.color }]}>{result.faculty}</Text>

      <View style={[styles.descCard, { backgroundColor: card, borderColor: meta.color + '40', borderLeftColor: meta.color }]}>
        <Text style={[styles.descText, { color: textMain }]}>{result.description}</Text>
      </View>

      {/*Score breakdown */}
      <Text style={[styles.sectionLbl, { color: textSub, marginTop: 24 }]}>SCORE BREAKDOWN</Text>
      <View style={[styles.scoreCard, { backgroundColor: card, borderColor: border }]}>
        {Object.entries(scores)
          .sort(([, a], [, b]) => b - a)
          .map(([key, score]) => {
            const m = FACULTY_META[key];
            const pct = Math.min((score / 24) * 100, 100);
            return (
              <View key={key} style={styles.scoreRow}>
                <Text style={styles.scoreEmoji}>{m.emoji}</Text>
                <View style={styles.scoreBarWrap}>
                  <Text style={[styles.scoreLabel, { color: textMain }]}>{m.label}</Text>
                  <View style={[styles.scoreTrack, { backgroundColor: border }]}>
                    <View style={[styles.scoreBar, { width: `${pct}%`, backgroundColor: m.color }]} />
                  </View>
                </View>
                <Text style={[styles.scoreNum, { color: m.color }]}>{score}</Text>
              </View>
            );
          })}
      </View>

      <TouchableOpacity style={[styles.retakeBtn, { borderColor: border }]} onPress={restart} activeOpacity={0.8}>
        <Text style={[styles.retakeBtnText, { color: textSub }]}>↺  Take the Quiz Again</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  centerPad: { alignItems: 'center', padding: 24, paddingBottom: 60, paddingTop: 40 },
  quizPad: { padding: 24, paddingBottom: 60, paddingTop: 40 },

  //Welcome
  pill: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, marginBottom: 28 },
  pillText: { fontSize: 13, fontWeight: '700' },
  welcomeTitle: { fontSize: 44, fontWeight: '900', textAlign: 'center', lineHeight: 52, marginBottom: 16 },
  accent: { color: '#3b82f6' },
  welcomeSub: { fontSize: 15, textAlign: 'center', lineHeight: 23, marginBottom: 28, paddingHorizontal: 8 },
  statsRow: { flexDirection: 'row', width: '100%', borderRadius: 16, borderWidth: 1, marginBottom: 28, overflow: 'hidden' },
  statCell: { flex: 1, alignItems: 'center', paddingVertical: 16 },
  statVal: { fontSize: 22, fontWeight: '800', color: '#3b82f6' },
  statLbl: { fontSize: 12, marginTop: 2, fontWeight: '500' },
  sectionLbl: { fontSize: 11, fontWeight: '700', letterSpacing: 1.2, marginBottom: 12, alignSelf: 'flex-start' },
  chipsWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 32, width: '100%' },
  chip: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20, borderWidth: 1, gap: 6 },
  chipEmoji: { fontSize: 14 },
  chipText: { fontSize: 12, fontWeight: '600' },
  startBtn: { width: '100%', backgroundColor: '#3b82f6', paddingVertical: 18, borderRadius: 16, alignItems: 'center', marginBottom: 14 },
  startBtnText: { color: '#fff', fontSize: 17, fontWeight: '800' },
  note: { fontSize: 13 },

  //Quiz
  topRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 20 },
  qCount: { fontSize: 13, fontWeight: '700', width: 44 },
  progTrack: { flex: 1, height: 6, borderRadius: 3, overflow: 'hidden' },
  progFill: { height: 6, backgroundColor: '#3b82f6', borderRadius: 3 },
  qCard: { borderRadius: 20, borderWidth: 1, padding: 20, marginBottom: 18 },
  qBadge: { backgroundColor: '#3b82f6', alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, marginBottom: 12 },
  qBadgeText: { color: '#fff', fontSize: 12, fontWeight: '700' },
  qText: { fontSize: 19, fontWeight: '700', lineHeight: 27 },
  optionsWrap: { gap: 10 },
  optBtn: { flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 14, borderWidth: 1.5, gap: 12 },
  optLetter: { width: 34, height: 34, borderRadius: 10, borderWidth: 1, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  optLetterText: { fontSize: 13, fontWeight: '800' },
  optText: { flex: 1, fontSize: 15, fontWeight: '500', lineHeight: 21 },
  dotsRow: { flexDirection: 'row', gap: 6, marginTop: 24, alignItems: 'center', justifyContent: 'center' },
  dot: { height: 8, borderRadius: 4 },

  //Results
  emojiCircle: { width: 100, height: 100, borderRadius: 50, alignItems: 'center', justifyContent: 'center', marginBottom: 16, marginTop: 4 },
  emojiLarge: { fontSize: 48 },
  matchLbl: { fontSize: 11, fontWeight: '700', letterSpacing: 1.5, marginBottom: 10 },
  facultyName: { fontSize: 24, fontWeight: '900', textAlign: 'center', lineHeight: 32, marginBottom: 20 },
  descCard: { width: '100%', borderRadius: 16, borderWidth: 1, borderLeftWidth: 4, padding: 18, marginBottom: 8 },
  descText: { fontSize: 15, lineHeight: 23, fontWeight: '500' },
  scoreCard: { width: '100%', borderRadius: 16, borderWidth: 1, padding: 16, gap: 14, marginBottom: 28 },
  scoreRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  scoreEmoji: { fontSize: 20, width: 28, textAlign: 'center' },
  scoreBarWrap: { flex: 1 },
  scoreLabel: { fontSize: 12, fontWeight: '600', marginBottom: 4 },
  scoreTrack: { height: 6, borderRadius: 3, overflow: 'hidden' },
  scoreBar: { height: 6, borderRadius: 3 },
  scoreNum: { fontSize: 14, fontWeight: '800', width: 24, textAlign: 'right' },
  retakeBtn: { width: '100%', paddingVertical: 16, borderRadius: 16, alignItems: 'center', borderWidth: 1.5 },
  retakeBtnText: { fontSize: 16, fontWeight: '700' },
});