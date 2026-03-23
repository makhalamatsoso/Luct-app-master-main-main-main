import React, { useState } from 'react';
import {
  View, Text, FlatList, TouchableOpacity, StyleSheet,
  ScrollView, Image, Linking,
} from 'react-native';

// ── PINK THEME ──────────────────────────────────────────────
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

// ── FACULTY DATA ─────────────────────────────────────────────
const faculties = [
  {
    id: '1',
    name: 'Faculty of Design Innovation',
    image: 'https://news.artnet.com/app/news-upload/2022/08/2022ex-sp032_o3-1536x763.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=_d0NaOefGK0',
    description: 'Cultivate your creative talents in design disciplines. Our programmes blend creativity with cutting-edge technology, equipping students to lead in global design industries.',
    courses: [
      {
        name: 'Diploma in Creative Advertising',
        image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80',
        videoUrl: 'https://www.youtube.com/watch?v=lre2EBVBU2M',
        description: 'Learn to craft compelling brand messages across digital and print media.',
        requirements: ['Minimum 3 C grades and 2 D passes','At least a D in English','Submission of a portfolio','A C grade in Art, Art & Design, Design & Technology, Home Economics, Needlework or Woodwork is an added advantage','OR Diploma / TVET Certificate in any relevant field from a recognized institution','OR N4 in a relevant field'],
      },
      {
        name: 'Diploma in Graphic Design',
        image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&q=80',
        videoUrl: 'https://www.youtube.com/watch?v=WONZVnlam6U',
        description: 'Master visual communication through typography, branding, illustration and digital design tools.',
        requirements: ['Minimum 3 C grades and 2 D passes','At least a D in English','Submission of a portfolio','A C grade in Art, Art & Design, Design & Technology, Home Economics or Needlework is an added advantage','OR Diploma / TVET Certificate in any relevant field','OR N4 in a relevant field'],
      },
      {
        name: 'Diploma in Fashion and Apparel Design',
        image: 'https://img.freepik.com/premium-photo/fashion-design-hd-image-textile-design-hd-image-fashion-designer-hd-image_1012565-18344.jpg?w=2000',
        videoUrl: 'https://www.youtube.com/shorts/ijXeBlrnYe4',
        description: 'Explore garment construction, fabric science, trend forecasting and fashion illustration.',
        requirements: ['Minimum 3 C grades and 2 D passes','At least a D in English','Submission of a portfolio','A C grade in Art, Art & Design, Design & Technology, Home Economics or Needlework is an added advantage','OR Diploma in a relevant field','OR N4 in a relevant field','OR TVET Certificate in any relevant field'],
      },
    ],
  },
  {
    id: '2',
    name: 'Faculty of Communication, Media & Broadcasting',
    image: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=600&q=80',
    videoUrl: 'https://www.youtube.com/watch?v=_ymFhekBNew',
    description: 'Shape narratives, influence audiences and master the art of media production.',
    courses: [
      {
        name: 'Degree in Professional Communication',
        image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&q=80',
        videoUrl: 'https://www.youtube.com/watch?v=GrxHWrhEAis',
        description: 'Develop expertise in corporate communication, public relations and media strategy.',
        requirements: ['Minimum 4 C grades and 2 D passes','Must include a C grade in English Language or English Literature','OR Diploma in Mass Communication or any relevant field from a recognized institution'],
      },
      {
        name: 'Degree in Broadcasting & Journalism',
        image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&q=80',
        videoUrl: 'https://www.youtube.com/watch?v=a7Y07B0xqbg',
        description: 'Train in news reporting, investigative journalism, radio and TV broadcasting.',
        requirements: ['Minimum 4 C grades and 2 D passes','Must include a C grade in English Language or English Literature','OR Diploma in Mass Communication or any relevant field'],
      },
      {
        name: 'Diploma in Television and Film Production',
        image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600&q=80',
        videoUrl: 'https://www.youtube.com/watch?v=2ns4Avc1b_E',
        description: 'Learn cinematography, directing, scriptwriting, editing and post-production.',
        requirements: ['Minimum 3 C grades and 2 D passes','Must include a C grade in English Language / Literature','Drama is an added advantage','OR Diploma in any Relevant Field','OR TVET Certificate in a relevant field'],
      },
      {
        name: 'Diploma in Broadcasting (Radio and TV)',
        image: 'https://www.ypccollege.edu.my/wp-content/uploads/2021/03/DIPLOMA-IN-DIGITAL-MEDIA-AND-BROADASTING_WEB-1.jpg',
        videoUrl: 'https://www.youtube.com/watch?v=sRJzc0gaBng',
        description: 'Master on-air presentation, audio production, programme scheduling and audience engagement.',
        requirements: ['Minimum 3 C grades and 2 D passes','Must include a C grade in English Language / Literature','OR Diploma in any Relevant Field','OR TVET Certificate in a relevant field'],
      },
      {
        name: 'Diploma in Public Relations',
        image: 'https://www.1training.org/wp-content/uploads/2021/04/Advanced-Diploma-in-Public-Relations-Level-3.jpg',
        videoUrl: 'https://www.youtube.com/watch?v=VejDCJ9_wuk',
        description: 'Learn media relations, event management, crisis communication and brand storytelling.',
        requirements: ['Minimum 3 C grades and 2 D passes','Must include a C grade in English Language / Literature','OR Diploma in any Relevant Field','OR TVET Certificate in a relevant field'],
      },
      {
        name: 'Diploma in Journalism and Media',
        image: 'https://dsj.uti.ac.tz/courses/DIPLOMA_-_BANNER_350.jpg',
        videoUrl: 'https://www.youtube.com/watch?v=ACLL384Np4s',
        description: 'Develop investigative, print, online and multimedia journalism skills.',
        requirements: ['Minimum 3 C grades and 2 D passes','Must include a C grade in English Language / Literature','OR Diploma in any Relevant Field','OR TVET Certificate in a relevant field'],
      },
    ],
  },
  {
    id: '3',
    name: 'Faculty of Architecture & the Built Environment',
    image: 'https://www.umanitoba.ca/architecture/sites/architecture/files/styles/21x9_1100w/public/2020-03/faculty-of-architecture.jpg?itok=kpMj04No',
    videoUrl: 'https://www.youtube.com/watch?v=B8JAuvcAO8Q',
    description: 'Design the spaces where people live, work and dream.',
    courses: [
      {
        name: 'Diploma in Architectural Technology',
        image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=80',
        videoUrl: 'https://www.youtube.com/watch?v=aShwQxvKn78',
        description: 'Study building design, construction technology, technical drawing and 3D modelling.',
        requirements: ['Minimum 3 C grades and 2 D passes','At least a D in Mathematics and English Language','A C grade in Art, Woodwork, Design & Technology or Technical Drawing is an added advantage','OR TVET Certificate in a relevant field','OR Certificate in Bricklaying','OR Certificate in Carpentry','OR N4 in a relevant field'],
      },
    ],
  },
  {
    id: '4',
    name: 'Faculty of Business Management & Globalization',
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&q=80',
    videoUrl: 'https://www.youtube.com/watch?v=KI3zMFQpiTE',
    description: 'Build the strategic, entrepreneurial and leadership skills needed to thrive in a globalized economy.',
    courses: [
      {
        name: 'Degree in International Business',
        image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&q=80',
        videoUrl: 'https://www.youtube.com/watch?v=gnxSv2jjdlA',
        description: 'Gain knowledge in global trade, international marketing, cross-cultural management and business strategy.',
        requirements: ['Minimum 4 C grades','At least a C grade in Commercial subjects','2 D passes in any other subjects inclusive of Mathematics','OR Diploma in any relevant field from a recognized institution'],
      },
      {
        name: 'Degree in Entrepreneurship',
        image: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=600&q=80',
        videoUrl: 'https://www.youtube.com/watch?v=Rz_BDmUEQlo',
        description: 'Learn how to start, manage and scale your own business.',
        requirements: ['Minimum 4 C grades','At least a C grade in Commercial subjects','2 D passes in any other subjects inclusive of Mathematics','OR Diploma in any relevant field from a recognized institution'],
      },
      {
        name: 'Degree in Human Resource Management',
        image: 'https://www.business-management-degree.net/wp-content/uploads/2023/01/Best-Online-Associates-in-Human-Resources-featured-image.jpg',
        videoUrl: 'https://www.youtube.com/watch?v=bI9RZjF-538',
        description: 'Study talent acquisition, organisational behaviour, labour law and people management.',
        requirements: ['Minimum 4 C grades','At least a C grade in Commercial subjects','2 D passes in any other subjects inclusive of Mathematics','OR Diploma in any relevant field from a recognized institution'],
      },
      {
        name: 'Diploma in Business Management',
        image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=80',
        videoUrl: 'https://www.youtube.com/watch?v=UQAtIEmhQ-4',
        description: 'Build a solid foundation in operations, finance, marketing and management.',
        requirements: ['Minimum 3 C grades','At least a C grade in commercial subjects','2 D passes in any other subjects inclusive of English and Mathematics','OR TVET Certificates in any relevant field'],
      },
      {
        name: 'Diploma in Retail Management',
        image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=600&q=80',
        videoUrl: 'https://www.youtube.com/watch?v=KQfCCM_wQjA',
        description: 'Specialise in retail operations, supply chain, customer experience and merchandising.',
        requirements: ['Minimum 3 C grades','At least a C grade in commercial subjects','2 D passes in any other subjects inclusive of English and Mathematics','OR TVET Certificates in any relevant field'],
      },
      {
        name: 'Diploma in Marketing',
        image: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=600&q=80',
        videoUrl: 'https://www.youtube.com/watch?v=QusJ4fpWQwA',
        description: 'Master brand management, digital marketing, consumer behaviour and market research.',
        requirements: ['Minimum 3 C grades','At least a C grade in commercial subjects','2 D passes in any other subjects inclusive of English and Mathematics','OR TVET Certificates in any relevant field'],
      },
    ],
  },
  {
    id: '5',
    name: 'Faculty of Creativity in Tourism & Hospitality',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80',
    videoUrl: 'https://www.youtube.com/watch?v=-oODVdCibMc',
    description: 'Create unforgettable experiences in travel, tourism and hospitality.',
    courses: [
      {
        name: 'Degree in Tourism Management',
        image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&q=80',
        videoUrl: 'https://www.youtube.com/watch?v=i0G6EcmQd_g',
        description: 'Study destination marketing, eco-tourism, travel operations and sustainable tourism.',
        requirements: ['Minimum 4 C grades and 2 D passes or better','Must include English Language / Literature and Geography','OR Diploma in Tourism Management / Business Management / Cooperatives Administration from a recognized institution'],
      },
      {
        name: 'Diploma in Tourism Management',
        image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&q=80',
        videoUrl: 'https://www.youtube.com/watch?v=MiLpZeldsCE',
        description: 'Gain practical skills in tour operations, customer service, travel planning and tourism marketing.',
        requirements: ['Minimum 3 C grades and 2 D passes','Must include a D in English Language / Literature and Geography','OR TVET Certificate in any Relevant Field','OR Certificate in Catering / Home Science / Nutrition from a recognized institution'],
      },
      {
        name: 'Diploma in Hotel Management',
        image: 'https://www.ihtsnepal.com/wp-content/uploads/2018/09/dhm-1170x607-1-1024x531.jpg',
        videoUrl: 'https://www.youtube.com/watch?v=1-Bd0XV_XM8',
        description: 'Learn front office operations, housekeeping, food & beverage service and hotel administration.',
        requirements: ['Minimum 3 C grades and 2 D passes','Must include a D in English Language / Literature and Geography','OR TVET Certificate in any Relevant Field','OR Certificate in Catering / Home Science / Nutrition from a recognized institution'],
      },
      {
        name: 'Diploma in Events Management',
        image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&q=80',
        videoUrl: 'https://www.youtube.com/watch?v=t7dm6EVXu4A',
        description: 'Master the art of planning, coordinating and executing events.',
        requirements: ['Minimum 3 C grades and 2 D passes','Must include a D in English Language / Literature and Geography','OR TVET Certificate in any Relevant Field','OR Certificate in Catering / Home Science / Nutrition from a recognized institution'],
      },
    ],
  },
  {
    id: '6',
    name: 'Faculty of Information & Communication Technology',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&q=80',
    videoUrl: 'https://www.youtube.com/watch?v=djmUYBlbb08',
    description: 'Drive digital innovation through software, systems and technology.',
    courses: [
      {
        name: 'Degree in Software Engineering with Multimedia',
        image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=600&q=80',
        videoUrl: 'https://www.youtube.com/watch?v=4hCZVhhdf6E',
        description: 'Build software systems, mobile apps and multimedia solutions.',
        requirements: ['Minimum 4 C grades and 2 D passes','C grade or better in Mathematics','C grade or better in Commercial/Financial Subjects for Business Information Technology','OR Diploma in Information Technology or any relevant field'],
      },
      {
        name: 'Degree in Business Information Technology',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80',
        videoUrl: 'https://www.youtube.com/watch?v=-Zpu85fWglA',
        description: 'Bridge the gap between business and technology.',
        requirements: ['Minimum 4 C grades and 2 D passes','C grade or better in Mathematics','C grade or better in Commercial/Financial Subjects','OR Diploma in Information Technology or any relevant field'],
      },
      {
        name: 'Degree in Information Technology',
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80',
        videoUrl: 'https://www.youtube.com/watch?v=XZrckLYqdys',
        description: 'Study networking, cybersecurity, systems administration and software development.',
        requirements: ['Minimum 4 C grades and 2 D passes','C grade or better in Mathematics','OR Diploma in Information Technology or any relevant field'],
      },
      {
        name: 'Diploma in Multimedia and Software Engineering',
        image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&q=80',
        videoUrl: 'https://www.youtube.com/watch?v=iIxZrYzJJ7I&t=435s',
        description: 'Learn programming, web development, UI/UX design and digital media production.',
        requirements: ['Minimum 3 C grades and 2 D passes','C grade or better in Mathematics','C grade or better in Commercial/Financial Subjects','OR Diploma in Information Technology or relevant field','OR TVET Certificate in any relevant field'],
      },
      {
        name: 'Diploma in Business Information Technology',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80',
        videoUrl: 'https://www.youtube.com/watch?v=-Zpu85fWglA',
        description: 'Develop skills in IT systems, database management and business computing.',
        requirements: ['Minimum 3 C grades and 2 D passes','C grade or better in Mathematics','C grade or better in Commercial/Financial Subjects','OR Diploma in Information Technology or relevant field','OR TVET Certificate in any relevant field'],
      },
      {
        name: 'Diploma in Information Technology',
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80',
        videoUrl: 'https://www.youtube.com/watch?v=XZrckLYqdys',
        description: 'Gain foundational skills in networking, hardware, software and IT support.',
        requirements: ['Minimum 3 C grades and 2 D passes','C grade or better in Mathematics','OR Diploma in Information Technology or relevant field','OR TVET Certificate in any relevant field'],
      },
    ],
  },
];

const MAX_RATING = 6;

// ── STAR RATING ──────────────────────────────────────────────
function StarRating({ rating, onRate }) {
  return (
    <View style={r.container}>
      <Text style={r.label}>Rate this course:</Text>
      <View style={r.row}>
        {[1,2,3,4,5,6].map(star => (
          <TouchableOpacity key={star} onPress={() => onRate(star)} activeOpacity={0.7}>
            <Text style={[r.star, { color: star <= rating ? P.pink500 : P.pink200 }]}>★</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={r.score}>{rating > 0 ? `${rating} / ${MAX_RATING}` : 'Not rated yet'}</Text>
    </View>
  );
}
const r = StyleSheet.create({
  container: { backgroundColor: P.pink100, borderRadius: 16, padding: 16, marginVertical: 16 },
  label:     { fontSize: 14, fontWeight: '700', color: P.pink700, marginBottom: 8 },
  row:       { flexDirection: 'row', gap: 4, marginBottom: 6 },
  star:      { fontSize: 32 },
  score:     { fontSize: 13, fontWeight: '700', color: P.pink600 },
});

// ── COURSE DETAIL ────────────────────────────────────────────
function CourseDetail({ course, onBack, rating, onRate }) {
  return (
    <ScrollView style={s.screen} contentContainerStyle={s.scrollPad}>
      <TouchableOpacity onPress={onBack} style={s.backBtn}>
        <Text style={s.backTxt}>← Back</Text>
      </TouchableOpacity>

      <Image source={{ uri: course.image }} style={s.detailHero} resizeMode="cover" />
      <Text style={s.detailTitle}>{course.name}</Text>
      <Text style={s.detailDesc}>{course.description}</Text>

      <TouchableOpacity style={s.videoBtn}
        onPress={() => Linking.openURL(course.videoUrl).catch(console.error)}>
        <Text style={s.videoBtnTxt}>▶  Watch Course Video</Text>
      </TouchableOpacity>

      <StarRating rating={rating} onRate={onRate} />

      <View style={s.reqCard}>
        <Text style={s.reqTitle}>📋 Entry Requirements</Text>
        {course.requirements.map((req, i) => (
          <View key={i} style={s.reqRow}>
            <View style={s.reqDot} />
            <Text style={s.reqTxt}>{req}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

// ── FACULTY DETAIL ───────────────────────────────────────────
function FacultyDetail({ faculty, onBack }) {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [ratings, setRatings] = useState(() => {
    const init = {};
    faculty.courses.forEach(c => { init[c.name] = 0; });
    return init;
  });

  if (selectedCourse) {
    return (
      <CourseDetail
        course={selectedCourse}
        onBack={() => setSelectedCourse(null)}
        rating={ratings[selectedCourse.name]}
        onRate={star => setRatings(p => ({ ...p, [selectedCourse.name]: Math.min(star, MAX_RATING) }))}
      />
    );
  }

  return (
    <ScrollView style={s.screen} contentContainerStyle={s.scrollPad}>
      <TouchableOpacity onPress={onBack} style={s.backBtn}>
        <Text style={s.backTxt}>← Back to Faculties</Text>
      </TouchableOpacity>

      <Image source={{ uri: faculty.image }} style={s.detailHero} resizeMode="cover" />
      <Text style={s.facultyTitleTxt}>{faculty.name}</Text>
      <Text style={s.detailDesc}>{faculty.description}</Text>

      <TouchableOpacity style={s.videoBtn}
        onPress={() => Linking.openURL(faculty.videoUrl).catch(console.error)}>
        <Text style={s.videoBtnTxt}>▶  Watch Faculty Video</Text>
      </TouchableOpacity>

      <View style={s.coursesHeader}>
        <Text style={s.coursesHeaderTxt}>Courses Offered</Text>
        <View style={s.countBadge}>
          <Text style={s.countBadgeTxt}>{faculty.courses.length}</Text>
        </View>
      </View>

      {faculty.courses.map((course, i) => (
        <TouchableOpacity key={i} style={s.courseRow}
          onPress={() => setSelectedCourse(course)} activeOpacity={0.85}>
          <Image source={{ uri: course.image }} style={s.courseRowThumb} resizeMode="cover" />
          <View style={s.courseRowInfo}>
            <Text style={s.courseRowName}>{course.name}</Text>
            <Text style={s.courseRowSnippet} numberOfLines={2}>{course.description}</Text>
            <View style={{ flexDirection: 'row', marginTop: 6, gap: 2 }}>
              {[1,2,3,4,5,6].map(st => (
                <Text key={st} style={{ fontSize: 13, color: st <= ratings[course.name] ? P.pink500 : P.pink200 }}>★</Text>
              ))}
            </View>
          </View>
          <Text style={s.courseRowArrow}>›</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

// ── MAIN SCREEN ──────────────────────────────────────────────
export default function Faculty() {
  const [selected, setSelected] = useState(null);

  if (selected) {
    return <FacultyDetail faculty={selected} onBack={() => setSelected(null)} />;
  }

  return (
    <View style={s.screen}>

      {/* ── Pink header banner ── */}
      <View style={s.banner}>
        <Text style={s.bannerTitle}>Our Faculties</Text>
        <Text style={s.bannerSub}>Explore {faculties.length} faculties & their courses</Text>
      </View>

      {/* ── 2-column grid ── */}
      <FlatList
        data={faculties}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={s.gridRow}
        contentContainerStyle={s.gridPad}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={s.gridCard}
            onPress={() => setSelected(item)}
            activeOpacity={0.85}
          >
            <Image source={{ uri: item.image }} style={s.gridImg} resizeMode="cover" />
            <View style={s.gridOverlay} />
            <View style={s.gridBody}>
              <Text style={s.gridName} numberOfLines={2}>{item.name}</Text>
              <View style={s.gridPill}>
                <Text style={s.gridPillTxt}>
                  {item.courses.length} course{item.courses.length !== 1 ? 's' : ''}
                </Text>
              </View>
              <Text style={s.gridExplore}>Explore →</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

// ── STYLES ───────────────────────────────────────────────────
const CARD_W = '48%';

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: P.bg },

  // Banner — no search bar, slightly less bottom padding
  banner: {
    backgroundColor: P.pink600,
    paddingTop: 52, paddingBottom: 24,
    paddingHorizontal: 18,
    borderBottomLeftRadius: 32, borderBottomRightRadius: 32,
    shadowColor: P.pink700, shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3, shadowRadius: 14, elevation: 8,
  },
  bannerTitle: { fontSize: 24, fontWeight: '900', color: '#fff', textAlign: 'center', marginBottom: 4 },
  bannerSub:   { fontSize: 13, color: '#fce7f3', textAlign: 'center', fontWeight: '500' },

  // Grid
  gridPad: { padding: 14, paddingBottom: 110 },
  gridRow: { justifyContent: 'space-between', marginBottom: 14 },

  gridCard: {
    width: CARD_W,
    backgroundColor: P.card,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: P.pink200,
    shadowColor: P.pink400,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15, shadowRadius: 8, elevation: 4,
  },
  gridImg:     { width: '100%', height: 110 },
  gridOverlay: { position: 'absolute', top: 0, left: 0, right: 0, height: 110, backgroundColor: '#be185d18' },
  gridBody:    { padding: 12 },
  gridName:    { fontSize: 13, fontWeight: '800', color: P.txt, lineHeight: 18, marginBottom: 8 },
  gridPill:    { backgroundColor: P.pink100, borderRadius: 999, paddingHorizontal: 8, paddingVertical: 3, alignSelf: 'flex-start', marginBottom: 8 },
  gridPillTxt: { fontSize: 11, fontWeight: '700', color: P.pink700 },
  gridExplore: { fontSize: 12, fontWeight: '800', color: P.pink600 },

  // Shared detail
  scrollPad: { padding: 20, paddingBottom: 100 },
  backBtn:   { marginBottom: 16 },
  backTxt:   { fontSize: 16, fontWeight: '700', color: P.pink600 },

  detailHero: {
    width: '100%', height: 210, borderRadius: 22,
    marginBottom: 18, borderWidth: 2, borderColor: P.pink200,
  },

  facultyTitleTxt: { fontSize: 20, fontWeight: '900', color: P.pink800, lineHeight: 28, marginBottom: 12 },
  detailTitle:     { fontSize: 21, fontWeight: '900', color: P.pink800, lineHeight: 28, marginBottom: 12 },
  detailDesc:      { fontSize: 14, lineHeight: 22, color: P.sub, marginBottom: 20 },

  videoBtn: {
    backgroundColor: P.pink600, paddingVertical: 14,
    borderRadius: 14, alignItems: 'center', marginBottom: 4,
    shadowColor: P.pink700, shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.28, shadowRadius: 10, elevation: 5,
  },
  videoBtnTxt: { color: '#fff', fontSize: 15, fontWeight: '800' },

  reqCard:  { backgroundColor: P.pink100, borderRadius: 18, padding: 18, marginTop: 4, borderWidth: 1.5, borderColor: P.pink200 },
  reqTitle: { fontSize: 16, fontWeight: '800', color: P.pink700, marginBottom: 14 },
  reqRow:   { flexDirection: 'row', alignItems: 'flex-start', gap: 10, marginBottom: 10 },
  reqDot:   { width: 8, height: 8, borderRadius: 4, backgroundColor: P.pink500, marginTop: 6, flexShrink: 0 },
  reqTxt:   { flex: 1, fontSize: 13.5, lineHeight: 21, color: P.txt },

  coursesHeader:    { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 14, marginTop: 4 },
  coursesHeaderTxt: { fontSize: 17, fontWeight: '800', color: P.pink700 },
  countBadge:       { backgroundColor: P.pink600, borderRadius: 999, paddingHorizontal: 10, paddingVertical: 3 },
  countBadgeTxt:    { color: '#fff', fontSize: 12, fontWeight: '800' },

  courseRow: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: P.card, borderRadius: 16,
    marginBottom: 12, overflow: 'hidden',
    borderWidth: 1.5, borderColor: P.pink200,
    shadowColor: P.pink300, shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1, shadowRadius: 6, elevation: 2,
  },
  courseRowThumb:   { width: 90, height: 90 },
  courseRowInfo:    { flex: 1, padding: 12 },
  courseRowName:    { fontSize: 13, fontWeight: '800', color: P.pink800, marginBottom: 4, lineHeight: 18 },
  courseRowSnippet: { fontSize: 12, color: P.sub, lineHeight: 17 },
  courseRowArrow:   { fontSize: 24, color: P.pink400, paddingRight: 14, fontWeight: '300' },
});