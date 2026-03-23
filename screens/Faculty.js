import React, { useState } from 'react';
import {View,Text,FlatList,TouchableOpacity,StyleSheet,useColorScheme,ScrollView,Image,Linking,} from 'react-native';

//FACULTY DATA (from 2023 LUCT Prospectus) 
const faculties = [
  {
    id: '1',
    name: 'Faculty of Design Innovation',
    icon: '🎨',
    image: 'https://news.artnet.com/app/news-upload/2022/08/2022ex-sp032_o3-1536x763.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=_d0NaOefGK0',
    description:
      'Cultivate your creative talents in design disciplines. Our programmes blend creativity with cutting-edge technology, equipping students to lead in global design industries.',
    courses: [
      {
        name: 'Diploma in Creative Advertising',
        image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80',
        videoUrl: 'https://www.youtube.com/watch?v=lre2EBVBU2M',
        description: 'Learn to craft compelling brand messages across digital and print media. Combine psychology, visual design, and strategy to create impactful advertising campaigns.',
        requirements: [
          'Minimum 3 C grades and 2 D passes',
          'At least a D in English',
          'Submission of a portfolio',
          'A C grade in Art, Art & Design, Design & Technology, Home Economics, Needlework or Woodwork is an added advantage',
          'OR Diploma / TVET Certificate in any relevant field from a recognized institution',
          'OR N4 in a relevant field',
        ],
      },
      {
        name: 'Diploma in Graphic Design',
        image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&q=80',
        videoUrl: 'https://www.youtube.com/watch?v=WONZVnlam6U',
        description: 'Master visual communication through typography, branding, illustration and digital design tools. Build a strong portfolio ready for the creative industry.',
        requirements: [
          'Minimum 3 C grades and 2 D passes',
          'At least a D in English',
          'Submission of a portfolio',
          'A C grade in Art, Art & Design, Design & Technology, Home Economics or Needlework is an added advantage',
          'OR Diploma / TVET Certificate in any relevant field',
          'OR N4 in a relevant field',
        ],
      },
      {
        name: 'Diploma in Fashion and Apparel Design',
        image: 'https://img.freepik.com/premium-photo/fashion-design-hd-image-textile-design-hd-image-fashion-designer-hd-image_1012565-18344.jpg?w=2000',
        videoUrl: 'https://www.youtube.com/shorts/ijXeBlrnYe4',
        description: 'Explore garment construction, fabric science, trend forecasting and fashion illustration. Graduate ready for careers in fashion design, styling and retail.',
        requirements: [
          'Minimum 3 C grades and 2 D passes',
          'At least a D in English',
          'Submission of a portfolio',
          'A C grade in Art, Art & Design, Design & Technology, Home Economics or Needlework is an added advantage',
          'OR Diploma in a relevant field',
          'OR N4 in a relevant field',
          'OR TVET Certificate in any relevant field',
        ],
      },
    ],
  },
  {
    id: '2',
    name: 'Faculty of Communication, Media & Broadcasting',
    icon: '📡',
    image: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=600&q=80',
    videoUrl: 'https://www.youtube.com/watch?v=_ymFhekBNew',
    description:
      'Shape narratives, influence audiences and master the art of media production. Our programmes prepare students for careers in journalism, broadcasting and digital content creation.',
    courses: [
      {
        name: 'Degree in Professional Communication',
        image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&q=80',
        videoUrl: 'https://www.youtube.com/watch?v=GrxHWrhEAis',
        description: 'Develop expertise in corporate communication, public relations and media strategy. Learn to manage brand reputation and craft powerful messages for diverse audiences.',
        requirements: [
          'Minimum 4 C grades and 2 D passes',
          'Must include a C grade in English Language or English Literature',
          'OR Diploma in Mass Communication or any relevant field from a recognized institution',
        ],
      },
      {
        name: 'Degree in Broadcasting & Journalism',
        image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&q=80',
        videoUrl: 'https://www.youtube.com/watch?v=a7Y07B0xqbg',
        description: 'Train in news reporting, investigative journalism, radio and TV broadcasting. Develop your voice and storytelling skills for modern media platforms.',
        requirements: [
          'Minimum 4 C grades and 2 D passes',
          'Must include a C grade in English Language or English Literature',
          'OR Diploma in Mass Communication or any relevant field',
        ],
      },
      {
        name: 'Diploma in Television and Film Production',
        image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600&q=80',
        videoUrl: 'https://www.youtube.com/watch?v=2ns4Avc1b_E',
        description: 'Learn cinematography, directing, scriptwriting, editing and post-production. Create compelling film and television content from concept to screen.',
        requirements: [
          'Minimum 3 C grades and 2 D passes',
          'Must include a C grade in English Language / Literature',
          'Drama is an added advantage',
          'OR Diploma in any Relevant Field',
          'OR TVET Certificate in a relevant field',
        ],
      },
      {
        name: 'Diploma in Broadcasting (Radio and TV)',
        image: 'https://www.ypccollege.edu.my/wp-content/uploads/2021/03/DIPLOMA-IN-DIGITAL-MEDIA-AND-BROADASTING_WEB-1.jpg',
        videoUrl: 'https://www.youtube.com/watch?v=sRJzc0gaBng',
        description: 'Master on-air presentation, audio production, programme scheduling and audience engagement for both radio and television platforms.',
        requirements: [
          'Minimum 3 C grades and 2 D passes',
          'Must include a C grade in English Language / Literature',
          'OR Diploma in any Relevant Field',
          'OR TVET Certificate in a relevant field',
        ],
      },
      {
        name: 'Diploma in Public Relations',
        image: 'https://www.1training.org/wp-content/uploads/2021/04/Advanced-Diploma-in-Public-Relations-Level-3.jpg',
        videoUrl: 'https://www.youtube.com/watch?v=VejDCJ9_wuk',
        description: 'Learn media relations, event management, crisis communication and brand storytelling. Build skills to represent organisations with confidence and professionalism.',
        requirements: [
          'Minimum 3 C grades and 2 D passes',
          'Must include a C grade in English Language / Literature',
          'OR Diploma in any Relevant Field',
          'OR TVET Certificate in a relevant field',
        ],
      },
      {
        name: 'Diploma in Journalism and Media',
        image: 'https://dsj.uti.ac.tz/courses/DIPLOMA_-_BANNER_350.jpg',
        videoUrl: 'https://www.youtube.com/watch?v=ACLL384Np4s',
        description: 'Develop investigative, print, online and multimedia journalism skills. Learn to report accurately and ethically in a fast-paced media environment.',
        requirements: [
          'Minimum 3 C grades and 2 D passes',
          'Must include a C grade in English Language / Literature',
          'OR Diploma in any Relevant Field',
          'OR TVET Certificate in a relevant field',
        ],
      },
    ],
  },
  {
    id: '3',
    name: 'Faculty of Architecture & the Built Environment',
    icon: '🏛️',
    image: 'https://www.umanitoba.ca/architecture/sites/architecture/files/styles/21x9_1100w/public/2020-03/faculty-of-architecture.jpg?itok=kpMj04No',
    videoUrl: 'https://www.youtube.com/watch?v=B8JAuvcAO8Q',
    description:
      'Design the spaces where people live, work and dream. Our programme blends technical precision with creative vision to produce skilled architectural technologists.',
    courses: [
      {
        name: 'Diploma in Architectural Technology',
        image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=80',
        videoUrl: 'https://www.youtube.com/watch?v=aShwQxvKn78',
        description: 'Study building design, construction technology, technical drawing and 3D modelling. Develop skills to support architects in designing safe and beautiful structures.',
        requirements: [
          'Minimum 3 C grades and 2 D passes',
          'At least a D in Mathematics and English Language',
          'A C grade in Art, Woodwork, Design & Technology or Technical Drawing is an added advantage',
          'OR TVET Certificate in a relevant field',
          'OR Certificate in Bricklaying',
          'OR Certificate in Carpentry',
          'OR N4 in a relevant field',
        ],
      },
    ],
  },
  {
    id: '4',
    name: 'Faculty of Business Management & Globalization',
    icon: '💼',
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&q=80',
    videoUrl: 'https://www.youtube.com/watch?v=KI3zMFQpiTE',
    description:
      'Build the strategic, entrepreneurial and leadership skills needed to thrive in a globalized economy. Our business programmes combine theory with real-world application.',
    courses: [
      {
        name: 'Degree in International Business',
        image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&q=80',
        videoUrl: 'https://www.youtube.com/watch?v=gnxSv2jjdlA',
        description: 'Gain knowledge in global trade, international marketing, cross-cultural management and business strategy to compete in worldwide markets.',
        requirements: [
          'Minimum 4 C grades',
          'At least a C grade in Commercial subjects',
          '2 D passes in any other subjects inclusive of Mathematics',
          'OR Diploma in any relevant field from a recognized institution',
        ],
      },
      {
        name: 'Degree in Entrepreneurship',
        image: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=600&q=80',
        videoUrl: 'https://www.youtube.com/watch?v=Rz_BDmUEQlo',
        description: 'Learn how to start, manage and scale your own business. Develop innovation, financial planning, marketing and leadership skills for the modern entrepreneur.',
        requirements: [
          'Minimum 4 C grades',
          'At least a C grade in Commercial subjects',
          '2 D passes in any other subjects inclusive of Mathematics',
          'OR Diploma in any relevant field from a recognized institution',
        ],
      },
      {
        name: 'Degree in Human Resource Management',
        image: 'https://www.business-management-degree.net/wp-content/uploads/2023/01/Best-Online-Associates-in-Human-Resources-featured-image.jpg',
        videoUrl: 'https://www.youtube.com/watch?v=bI9RZjF-538',
        description: 'Study talent acquisition, organisational behaviour, labour law and people management. Prepare for HR leadership roles across all industries.',
        requirements: [
          'Minimum 4 C grades',
          'At least a C grade in Commercial subjects',
          '2 D passes in any other subjects inclusive of Mathematics',
          'OR Diploma in any relevant field from a recognized institution',
        ],
      },
      {
        name: 'Diploma in Business Management',
        image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=80',
        videoUrl: 'https://www.youtube.com/watch?v=UQAtIEmhQ-4',
        description: 'Build a solid foundation in operations, finance, marketing and management. Ideal for those looking to enter the business world or advance in their career.',
        requirements: [
          'Minimum 3 C grades',
          'At least a C grade in commercial subjects',
          '2 D passes in any other subjects inclusive of English and Mathematics',
          'OR TVET Certificates in any relevant field',
        ],
      },
      {
        name: 'Diploma in Retail Management',
        image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=600&q=80',
        videoUrl: 'https://www.youtube.com/watch?v=KQfCCM_wQjA',
        description: 'Specialise in retail operations, supply chain, customer experience and merchandising. Graduate ready to manage and grow retail businesses.',
        requirements: [
          'Minimum 3 C grades',
          'At least a C grade in commercial subjects',
          '2 D passes in any other subjects inclusive of English and Mathematics',
          'OR TVET Certificates in any relevant field',
        ],
      },
      {
        name: 'Diploma in Marketing',
        image: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=600&q=80',
        videoUrl: 'https://www.youtube.com/watch?v=QusJ4fpWQwA',
        description: 'Master brand management, digital marketing, consumer behaviour and market research. Develop creative campaigns that drive business growth.',
        requirements: [
          'Minimum 3 C grades',
          'At least a C grade in commercial subjects',
          '2 D passes in any other subjects inclusive of English and Mathematics',
          'OR TVET Certificates in any relevant field',
        ],
      },
    ],
  },
  {
    id: '5',
    name: 'Faculty of Creativity in Tourism & Hospitality',
    icon: '✈️',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80',
    videoUrl: 'https://www.youtube.com/watch?v=-oODVdCibMc',
    description:
      "Create unforgettable experiences in travel, tourism and hospitality. Our programmes develop creative professionals ready to lead in Lesotho's and the world's growing tourism industry.",
    courses: [
      {
        name: 'Degree in Tourism Management',
        image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&q=80',
        videoUrl: 'https://www.youtube.com/watch?v=i0G6EcmQd_g',
        description: 'Study destination marketing, eco-tourism, travel operations and sustainable tourism. Lead the future of travel and tourism in Africa and beyond.',
        requirements: [
          'Minimum 4 C grades and 2 D passes or better',
          'Must include English Language / Literature and Geography',
          'OR Diploma in Tourism Management / Business Management / Cooperatives Administration from a recognized institution',
        ],
      },
      {
        name: 'Diploma in Tourism Management',
        image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&q=80',
        videoUrl: 'https://www.youtube.com/watch?v=MiLpZeldsCE',
        description: 'Gain practical skills in tour operations, customer service, travel planning and tourism marketing for entry-level and mid-level tourism careers.',
        requirements: [
          'Minimum 3 C grades and 2 D passes',
          'Must include a D in English Language / Literature and Geography',
          'OR TVET Certificate in any Relevant Field',
          'OR Certificate in Catering / Home Science / Nutrition from a recognized institution',
        ],
      },
      {
        name: 'Diploma in Hotel Management',
        image: 'https://www.ihtsnepal.com/wp-content/uploads/2018/09/dhm-1170x607-1-1024x531.jpg',
        videoUrl: 'https://www.youtube.com/watch?v=1-Bd0XV_XM8',
        description: 'Learn front office operations, housekeeping, food & beverage service and hotel administration. Prepare for management roles in hotels and resorts.',
        requirements: [
          'Minimum 3 C grades and 2 D passes',
          'Must include a D in English Language / Literature and Geography',
          'OR TVET Certificate in any Relevant Field',
          'OR Certificate in Catering / Home Science / Nutrition from a recognized institution',
        ],
      },
      {
        name: 'Diploma in Events Management',
        image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&q=80',
        videoUrl: 'https://www.youtube.com/watch?v=t7dm6EVXu4A',
        description: 'Master the art of planning, coordinating and executing events — from corporate conferences to cultural festivals. Build skills in logistics, marketing and client management.',
        requirements: [
          'Minimum 3 C grades and 2 D passes',
          'Must include a D in English Language / Literature and Geography',
          'OR TVET Certificate in any Relevant Field',
          'OR Certificate in Catering / Home Science / Nutrition from a recognized institution',
        ],
      },
    ],
  },
  {
    id: '6',
    name: 'Faculty of Information & Communication Technology',
    icon: '💻',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&q=80',
    videoUrl: 'https://www.youtube.com/watch?v=djmUYBlbb08',
    description:
      'Drive digital innovation through software, systems and technology. Our ICT programmes prepare graduates to lead in a technology-driven world.',
    courses: [
      {
        name: 'Degree in Software Engineering with Multimedia',
        image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=600&q=80',
        videoUrl: 'https://www.youtube.com/watch?v=4hCZVhhdf6E',
        description: 'Build software systems, mobile apps and multimedia solutions. Combine coding skills with creative design for innovative digital products.',
        requirements: [
          'Minimum 4 C grades and 2 D passes',
          'C grade or better in Mathematics',
          'C grade or better in Commercial/Financial Subjects for Business Information Technology',
          'OR Diploma in Information Technology or any relevant field',
        ],
      },
      {
        name: 'Degree in Business Information Technology',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80',
        videoUrl: 'https://www.youtube.com/watch?v=-Zpu85fWglA',
        description: 'Bridge the gap between business and technology. Learn systems analysis, database management, IT project management and enterprise solutions.',
        requirements: [
          'Minimum 4 C grades and 2 D passes',
          'C grade or better in Mathematics',
          'C grade or better in Commercial/Financial Subjects',
          'OR Diploma in Information Technology or any relevant field',
        ],
      },
      {
        name: 'Degree in Information Technology',
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80',
        videoUrl: 'https://www.youtube.com/watch?v=XZrckLYqdys',
        description: 'Study networking, cybersecurity, systems administration and software development. Graduate ready to manage and build modern IT infrastructure.',
        requirements: [
          'Minimum 4 C grades and 2 D passes',
          'C grade or better in Mathematics',
          'OR Diploma in Information Technology or any relevant field',
        ],
      },
      {
        name: 'Diploma in Multimedia and Software Engineering',
        image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&q=80',
        videoUrl: 'https://www.youtube.com/watch?v=iIxZrYzJJ7I&t=435s',
        description: 'Learn programming, web development, UI/UX design and digital media production. Create powerful software and engaging digital experiences.',
        requirements: [
          'Minimum 3 C grades and 2 D passes',
          'C grade or better in Mathematics',
          'C grade or better in Commercial/Financial Subjects',
          'OR Diploma in Information Technology or relevant field',
          'OR TVET Certificate in any relevant field',
        ],
      },
      {
        name: 'Diploma in Business Information Technology',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80',
        videoUrl: 'https://www.youtube.com/watch?v=-Zpu85fWglA',
        description: 'Develop skills in IT systems, database management and business computing. Ideal for those wanting to apply technology solutions in business environments.',
        requirements: [
          'Minimum 3 C grades and 2 D passes',
          'C grade or better in Mathematics',
          'C grade or better in Commercial/Financial Subjects',
          'OR Diploma in Information Technology or relevant field',
          'OR TVET Certificate in any relevant field',
        ],
      },
      {
        name: 'Diploma in Information Technology',
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80',
        videoUrl: 'https://www.youtube.com/watch?v=XZrckLYqdys',
        description: 'Gain foundational skills in networking, hardware, software and IT support. Build a strong base for a career in IT operations and systems management.',
        requirements: [
          'Minimum 3 C grades and 2 D passes',
          'C grade or better in Mathematics',
          'OR Diploma in Information Technology or relevant field',
          'OR TVET Certificate in any relevant field',
        ],
      },
    ],
  },
];

const MAX_RATING = 6;

// STAR RATING COMPONENT
function StarRating({ rating, onRate, isDark }) {
  return (
    <View style={ratingStyles.container}>
      <Text style={[ratingStyles.label, { color: isDark ? '#94a3b8' : '#64748b' }]}>
        Rate this course:
      </Text>
      <View style={ratingStyles.starsRow}>
        {[1, 2, 3, 4, 5, 6].map(star => (
          <TouchableOpacity
            key={star}
            onPress={() => onRate(star)}
            activeOpacity={0.7}
            style={ratingStyles.starBtn}
          >
            <Text style={[
              ratingStyles.star,
              { color: star <= rating ? '#f59e0b' : (isDark ? '#374151' : '#d1d5db') }
            ]}>
              ★
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={[ratingStyles.score, { color: isDark ? '#f59e0b' : '#d97706' }]}>
        {rating > 0 ? `${rating} / ${MAX_RATING}` : 'Not rated yet'}
      </Text>
    </View>
  );
}

const ratingStyles = StyleSheet.create({
  container: { marginTop: 20, marginBottom: 8 },
  label: { fontSize: 14, fontWeight: '600', marginBottom: 8 },
  starsRow: { flexDirection: 'row', marginBottom: 6 },
  starBtn: { marginRight: 6 },
  star: { fontSize: 34 },
  score: { fontSize: 13, fontWeight: '600' },
});

//COURSE DETAIL VIEW 
function CourseDetail({ course, isDark, onBack, rating, onRate }) {
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: isDark ? '#000' : '#f8fafc' }}
      contentContainerStyle={{ padding: 20, paddingBottom: 80 }}
    >
      <TouchableOpacity onPress={onBack}>
        <Text style={[styles.back, { color: isDark ? '#60a5fa' : '#2563eb' }]}>← Back</Text>
      </TouchableOpacity>

      {/*Course image*/}
      <Image
        source={{ uri: course.image }}
        style={styles.courseImage}
        resizeMode="cover"
      />

      <Text style={[styles.courseTitle, { color: isDark ? '#f1f5f9' : '#0f172a' }]}>
        {course.name}
      </Text>

      <Text style={[styles.courseDesc, { color: isDark ? '#cbd5e1' : '#475569' }]}>
        {course.description}
      </Text>

      {/*Watch course video*/}
      <TouchableOpacity
        style={[styles.videoBtn, { backgroundColor: isDark ? '#dc2626' : '#ef4444' }]}
        onPress={() => Linking.openURL(course.videoUrl).catch(console.error)}
      >
        <Text style={styles.videoBtnText}>▶  Watch Course Video</Text>
      </TouchableOpacity>

      {/*RATING SYSTEM*/}
      <StarRating rating={rating} onRate={onRate} isDark={isDark} />

      {/* Entry requirements */}
      <Text style={[styles.sectionLabel, { color: isDark ? '#60a5fa' : '#2563eb', marginTop: 20 }]}>
        📋 Entry Requirements
      </Text>
      {course.requirements.map((req, i) => (
        <Text key={i} style={[styles.reqItem, { color: isDark ? '#e2e8f0' : '#1e293b' }]}>
          • {req}
        </Text>
      ))}
    </ScrollView>
  );
}

//FACULTY DETAIL VIEW
function FacultyDetail({ faculty, isDark, onBack }) {
  const [selectedCourse, setSelectedCourse] = useState(null);

  // ratings keyed by course name — starts at 0 for every course
  const [ratings, setRatings] = useState(() => {
    const init = {};
    faculty.courses.forEach(c => { init[c.name] = 0; });
    return init;
  });

  const handleRate = (courseName, star) => {
    setRatings(prev => ({
      ...prev,
      // Cap at MAX_RATING (6), increase by 1 each press up to MAX
      [courseName]: Math.min(star, MAX_RATING),
    }));
  };

  if (selectedCourse) {
    return (
      <CourseDetail
        course={selectedCourse}
        isDark={isDark}
        onBack={() => setSelectedCourse(null)}
        rating={ratings[selectedCourse.name]}
        onRate={(star) => handleRate(selectedCourse.name, star)}
      />
    );
  }

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: isDark ? '#000' : '#f8fafc' }}
      contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
    >
      <TouchableOpacity onPress={onBack}>
        <Text style={[styles.back, { color: isDark ? '#60a5fa' : '#2563eb' }]}>← Back to Faculties</Text>
      </TouchableOpacity>

      {/*Faculty image */}
      <Image source={{ uri: faculty.image }} style={styles.facultyImage} resizeMode="cover" />

      <Text style={[styles.header, { color: isDark ? '#f1f5f9' : '#0f172a' }]}>
        {faculty.icon} {faculty.name}
      </Text>

      <Text style={[styles.facultyDesc, { color: isDark ? '#cbd5e1' : '#475569' }]}>
        {faculty.description}
      </Text>

      {/*Faculty video */}
      <TouchableOpacity
        style={[styles.videoBtn, { backgroundColor: isDark ? '#dc2626' : '#ef4444' }]}
        onPress={() => Linking.openURL(faculty.videoUrl).catch(console.error)}
      >
        <Text style={styles.videoBtnText}>▶  Watch Faculty Video</Text>
      </TouchableOpacity>

      <Text style={[styles.sectionLabel, { color: isDark ? '#60a5fa' : '#2563eb' }]}>
        📚 Courses Offered
      </Text>

      {faculty.courses.map((course, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.courseCard, { backgroundColor: isDark ? '#1e293b' : '#ffffff' }]}
          onPress={() => setSelectedCourse(course)}
          activeOpacity={0.85}
        >
          {/*Course thumbnail */}
          <Image
            source={{ uri: course.image }}
            style={styles.courseThumbnail}
            resizeMode="cover"
          />

          <View style={{ padding: 14 }}>
            <Text style={[styles.courseName, { color: isDark ? '#f1f5f9' : '#0f172a' }]}>
              {course.name}
            </Text>

            <Text
              style={[styles.courseSnippet, { color: isDark ? '#94a3b8' : '#64748b' }]}
              numberOfLines={2}
            >
              {course.description}
            </Text>

            {/*Inline mini star display */}
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
              {[1, 2, 3, 4, 5, 6].map(star => (
                <Text
                  key={star}
                  style={{
                    fontSize: 18,
                    color: star <= ratings[course.name] ? '#f59e0b' : (isDark ? '#374151' : '#d1d5db'),
                    marginRight: 2,
                  }}
                >
                  ★
                </Text>
              ))}
              <Text style={{ color: isDark ? '#94a3b8' : '#64748b', fontSize: 12, marginLeft: 6 }}>
                {ratings[course.name] > 0 ? `${ratings[course.name]}/6` : 'Unrated'}
              </Text>
            </View>

            <Text style={{ color: isDark ? '#60a5fa' : '#2563eb', marginTop: 8, fontWeight: '600' }}>
              View Details & Requirements →
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

//MAIN FACULTY SCREEN
export default function Faculty() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [selected, setSelected] = useState(null);

  if (selected) {
    return (
      <FacultyDetail
        faculty={selected}
        isDark={isDark}
        onBack={() => setSelected(null)}
      />
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#000' : '#f8fafc' }]}>
      <Text style={[styles.header, { color: isDark ? '#f1f5f9' : '#0f172a' }]}>Faculties</Text>
      <FlatList
        data={faculties}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.card, { backgroundColor: isDark ? '#1e293b' : 'white' }]}
            onPress={() => setSelected(item)}
            activeOpacity={0.85}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
              <Text style={{ fontSize: 28, marginRight: 12 }}>{item.icon}</Text>
              <Text style={[styles.name, { color: isDark ? '#f1f5f9' : '#0f172a', flex: 1 }]}>
                {item.name}
              </Text>
            </View>
            <Text style={{ color: isDark ? '#94a3b8' : '#64748b' }}>
              {item.courses.length} course{item.courses.length !== 1 ? 's' : ''} available
            </Text>
            <Text style={{ color: isDark ? '#60a5fa' : '#2563eb', marginTop: 6, fontWeight: '600' }}>
              Explore →
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

//STYLES
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: { fontSize: 26, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  back: { fontSize: 17, fontWeight: '600', marginBottom: 16 },

  card: {
    padding: 20,
    marginBottom: 12,
    borderRadius: 16,
    elevation: 3,
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  name: { fontSize: 17, fontWeight: '600' },

  facultyImage: { width: '100%', height: 200, borderRadius: 16, marginBottom: 20 },
  facultyDesc: { fontSize: 15, lineHeight: 24, marginBottom: 20 },

  videoBtn: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 24,
  },
  videoBtnText: { color: '#ffffff', fontSize: 16, fontWeight: '700' },
  sectionLabel: { fontSize: 18, fontWeight: '700', marginBottom: 14 },

  // Course card with image on top
  courseCard: {
    borderRadius: 14,
    marginBottom: 16,
    elevation: 2,
    shadowOpacity: 0.08,
    shadowRadius: 6,
    overflow: 'hidden',
  },
  courseThumbnail: { width: '100%', height: 160 },
  courseName: { fontSize: 16, fontWeight: '700', marginBottom: 6 },
  courseSnippet: { fontSize: 14, lineHeight: 20 },

  // Course detail
  courseImage: { width: '100%', height: 200, borderRadius: 16, marginBottom: 20 },
  courseTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 14 },
  courseDesc: { fontSize: 15, lineHeight: 24, marginBottom: 20 },
  reqItem: { fontSize: 14, lineHeight: 22, marginBottom: 6 },
});