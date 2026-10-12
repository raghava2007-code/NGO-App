import { StudentClass, StudentLevel } from '../types';
import { STUDENT_CLASS_OPTIONS } from '../types';

export interface TestQuestionItem {
  id: string;
  promptEn: string;
  promptTe: string;
  diagramType?: 'big_small' | 'subtraction_apples' | 'shapes_geom' | 'counting' | 'fraction' | 'array' | 'balance' | 'numbers';
  diagramData?: any;
  correctAnswer: string;
  acceptableAnswers?: string[];
  hintEn: string;
  hintTe: string;
  explanationEn: string;
  explanationTe: string;
}

export interface ChapterData {
  id: string;
  level: StudentLevel;
  chapterNumber: number;
  titleEn: string;
  titleTe: string;
  shortDescriptionEn: string;
  shortDescriptionTe: string;
  visualShape: 'circle' | 'square' | 'triangle' | 'star' | 'shapes' | 'numbers';
  shapeSvgType?: 'circle' | 'square' | 'triangle' | 'star';
  shapeNumberLabel?: string;
  badgeEn: string;
  badgeTe: string;
  preTestSummaryEn: string;
  preTestSummaryTe: string;
  keyConceptsEn: string[];
  keyConceptsTe: string[];
  visualDiagramType: 'big_small' | 'subtraction_apples' | 'shapes_geom' | 'number_bonds' | 'multiplication_array' | 'fraction_pie' | 'equation_balance' | 'counting_grid';
  testQuestions: TestQuestionItem[];
}

export const CHAPTERS_DATA: ChapterData[] = [
  // =========================================================================
  // 🟢 BEGINNER LEVEL (Classes 1 - 5)
  // =========================================================================
  {
    id: 'b-ch1',
    level: 'Beginner',
    chapterNumber: 1,
    titleEn: 'Big and Small',
    titleTe: 'పెద్దది మరియు చిన్నది',
    shortDescriptionEn: 'Learn to compare object sizes with visual animal and ball diagrams.',
    shortDescriptionTe: 'జంతువులు మరియు వస్తువుల పరిమాణాలను పోల్చడం నేర్చుకోండి.',
    visualShape: 'shapes',
    shapeSvgType: 'circle',
    shapeNumberLabel: '1',
    badgeEn: 'Ready to be Learnt',
    badgeTe: 'నేర్చుకోవడానికి సిద్ధంగా ఉంది',
    preTestSummaryEn: 'Sizes tell us how much space an object occupies. An Elephant is Big, while an Ant is Small.',
    preTestSummaryTe: 'పరిమాణాలు ఒక వస్తువు ఎంత స్థలాన్ని ఆక్రమిస్తుందో చెబుతాయి. ఏనుగు పెద్దది, చీమ చిన్నది.',
    keyConceptsEn: ['Compare sizes side by side', 'Big objects occupy more space', 'Small objects occupy less space'],
    keyConceptsTe: ['పరిమాణాలను పోల్చడం', 'పెద్ద వస్తువులు ఎక్కువ స్థలాన్ని ఆక్రమిస్తాయి', 'చిన్న వస్తువులు తక్కువ స్థలాన్ని ఆక్రమిస్తాయి'],
    visualDiagramType: 'big_small',
    testQuestions: Array.from({ length: 10 }, (_, i) => ({
      id: `q-b-ch1-${i + 1}`,
      promptEn: `Beginner Big/Small Question ${i + 1}: Between an Elephant and an Ant, which one is Big? (Type "Elephant" or "Ant")`,
      promptTe: `ప్రారంభ ప్రశ్న ${i + 1}: ఏనుగు మరియు చీమలో ఏది పెద్దది? ("Elephant" లేదా "Ant" అని రాయండి)`,
      correctAnswer: 'Elephant',
      acceptableAnswers: ['elephant', 'Elephant', 'ఏనుగు'],
      hintEn: 'Think about giant animals.',
      hintTe: 'భారీ జంతువు గురించి ఆలోచించండి.',
      explanationEn: 'An elephant is much larger than an ant.',
      explanationTe: 'ఏనుగు చీమ కంటే చాలా పెద్దది.'
    }))
  },
  {
    id: 'b-ch2',
    level: 'Beginner',
    chapterNumber: 2,
    titleEn: 'Inside-Outside',
    titleTe: 'లోపల మరియు వెలుపల',
    shortDescriptionEn: 'Understand spatial positions like a pen inside a drawer or a dog outside the house.',
    shortDescriptionTe: 'డ్రాయర్ లోపల పెన్ లేదా ఇల్లు వెలుపల కుక్క వంటి స్థానాలను అర్థం చేసుకోండి.',
    visualShape: 'circle',
    shapeSvgType: 'square',
    shapeNumberLabel: '2',
    badgeEn: 'Ready to be Learnt',
    badgeTe: 'నేర్చుకోవడానికి సిద్ధంగా ఉంది',
    preTestSummaryEn: 'Inside means enclosed within a boundary. Outside means located on the exterior.',
    preTestSummaryTe: 'లోపల అంటే సరిహద్దు లోపల ఉండటం. వెలుపల అంటే బయట ఉండటం.',
    keyConceptsEn: ['Inside indicates internal placement', 'Outside indicates external placement'],
    keyConceptsTe: ['లోపల అంటే అంతర్గత స్థానం', 'వెలుపల అంటే బాహ్య స్థానం'],
    visualDiagramType: 'counting_grid',
    testQuestions: Array.from({ length: 10 }, (_, i) => ({
      id: `q-b-ch2-${i + 1}`,
      promptEn: `Inside-Outside Question ${i + 1}: If a pen is placed inside a closed drawer, where is it located? (Type "Inside" or "Outside")`,
      promptTe: `లోపల-వెలుపల ప్రశ్న ${i + 1}: పెన్ డ్రాయర్ లోపల ఉంటే, అది ఎక్కడ ఉంది? ("Inside" లేదా "Outside" అని రాయండి)`,
      correctAnswer: 'Inside',
      acceptableAnswers: ['inside', 'Inside', 'లోపల'],
      hintEn: 'It is placed in the interior of the drawer.',
      hintTe: 'ఇది డ్రాయర్ లోపలి భాగంలో ఉంచబడింది.',
      explanationEn: 'Being enclosed inside a drawer means it is Inside.',
      explanationTe: 'డ్రాయర్ లోపల ఉండటం అంటే ఇది లోపల (Inside) అని అర్థం.'
    }))
  },
  {
    id: 'b-ch3',
    level: 'Beginner',
    chapterNumber: 3,
    titleEn: 'Up-Down',
    titleTe: 'పైన మరియు కింద',
    shortDescriptionEn: 'Learn relative vertical positions like a clock above the TV or a rat under the table.',
    shortDescriptionTe: 'గడియారం పైన లేదా టేబుల్ కింద ఎలుక వంటి నిలువు స్థానాలను నేర్చుకోండి.',
    visualShape: 'triangle',
    shapeSvgType: 'triangle',
    shapeNumberLabel: '3',
    badgeEn: 'Ready to be Learnt',
    badgeTe: 'నేర్చుకోవడానికి సిద్ధంగా ఉంది',
    preTestSummaryEn: 'Up refers to a higher vertical position, while Down refers to a lower position.',
    preTestSummaryTe: 'పైన అంటే ఎత్తైన నిలువు స్థానం, కింద అంటే తక్కువ స్థానం.',
    keyConceptsEn: ['Up is higher', 'Down is lower'],
    keyConceptsTe: ['పైన అంటే ఎత్తులో', 'కింద అంటే దిగువన'],
    visualDiagramType: 'counting_grid',
    testQuestions: Array.from({ length: 10 }, (_, i) => ({
      id: `q-b-ch3-${i + 1}`,
      promptEn: `Up-Down Question ${i + 1}: If a clock is mounted on the wall above the TV, is it Up or Down? (Type "Up" or "Down")`,
      promptTe: `పైన-కింద ప్రశ్న ${i + 1}: టీవీ పైన గోడపై గడియారం ఉంటే, అదిపైన ఉందా కింద ఉందా? ("Up" లేదా "Down" అని రాయండి)`,
      correctAnswer: 'Up',
      acceptableAnswers: ['up', 'Up', 'పైన'],
      hintEn: 'Look at the higher vertical placement.',
      hintTe: 'ఎత్తైన స్థానాన్ని చూడండి.',
      explanationEn: 'Positioned above means it is Up.',
      explanationTe: 'పైన అమర్చబడి ఉంది కాబట్టి ఇది Up (పైన).'
    }))
  },
  {
    id: 'b-ch4',
    level: 'Beginner',
    chapterNumber: 4,
    titleEn: 'Single-Digit Subtraction',
    titleTe: 'ఒకే అంకె తీసివేత',
    shortDescriptionEn: 'Practice single-digit subtraction problems like 7-2, 5-3, and 2-2.',
    shortDescriptionTe: '7-2, 5-3 మరియు 2-2 వంటి తీసివేత లెక్కలను సాధన చేయండి.',
    visualShape: 'circle',
    shapeSvgType: 'circle',
    shapeNumberLabel: '4',
    badgeEn: 'Ready to be Learnt',
    badgeTe: 'నేర్చుకోవడానికి సిద్ధంగా ఉంది',
    preTestSummaryEn: 'Subtraction is taking away a quantity from another.',
    preTestSummaryTe: 'తీసివేత అంటే ఒక సంఖ్య నుండి మరొక సంఖ్యను తగ్గించడం.',
    keyConceptsEn: ['7 - 2 = 5', '5 - 3 = 2', '2 - 2 = 0'],
    keyConceptsTe: ['7 - 2 = 5', '5 - 3 = 2', '2 - 2 = 0'],
    visualDiagramType: 'subtraction_apples',
    testQuestions: [
      { id: 'q-b-ch4-1', promptEn: 'What is 7 - 2 = ?', promptTe: '7 - 2 = ? ఎంత?', correctAnswer: '5', acceptableAnswers: ['5'], hintEn: 'Count backwards 2 from 7.', hintTe: '7 నుండి 2 వెనక్కి లెక్కించండి.', explanationEn: '7 minus 2 is 5.', explanationTe: '7 నుండి 2 తీసివేస్తే 5.' },
      { id: 'q-b-ch4-2', promptEn: 'What is 5 - 3 = ?', promptTe: '5 - 3 = ? ఎంత?', correctAnswer: '2', acceptableAnswers: ['2'], hintEn: 'Take 3 away from 5.', hintTe: '5 నుండి 3 తీసివేయండి.', explanationEn: '5 minus 3 is 2.', explanationTe: '5 నుండి 3 తీసివేస్తే 2.' },
      { id: 'q-b-ch4-3', promptEn: 'What is 2 - 2 = ?', promptTe: '2 - 2 = ? ఎంత?', correctAnswer: '0', acceptableAnswers: ['0', 'zero', 'సున్నా'], hintEn: 'Subtracting a number from itself.', hintTe: 'ఒక సంఖ్యను దానితోనే తీసివేయడం.', explanationEn: '2 minus 2 is 0.', explanationTe: '2 నుండి 2 తీసివేస్తే 0.' },
      { id: 'q-b-ch4-4', promptEn: 'What is 6 - 1 = ?', promptTe: '6 - 1 = ? ఎంత?', correctAnswer: '5', acceptableAnswers: ['5'], hintEn: 'One less than 6.', hintTe: '6 కంటే ఒకటి తక్కువ.', explanationEn: '6 minus 1 is 5.', explanationTe: '6 నుండి 1 తీసివేస్తే 5.' },
      { id: 'q-b-ch4-5', promptEn: 'What is 8 - 4 = ?', promptTe: '8 - 4 = ? ఎంత?', correctAnswer: '4', acceptableAnswers: ['4'], hintEn: 'Half of 8.', hintTe: '8 లో సగం.', explanationEn: '8 minus 4 is 4.', explanationTe: '8 నుండి 4 తీసివేస్తే 4.' },
      { id: 'q-b-ch4-6', promptEn: 'What is 9 - 3 = ?', promptTe: '9 - 3 = ? ఎంత?', correctAnswer: '6', acceptableAnswers: ['6'], hintEn: 'Count down 3 from 9.', hintTe: '9 నుండి 3 వెనక్కి లెక్కించండి.', explanationEn: '9 minus 3 is 6.', explanationTe: '9 నుండి 3 తీసివేస్తే 6.' },
      { id: 'q-b-ch4-7', promptEn: 'What is 4 - 1 = ?', promptTe: '4 - 1 = ? ఎంత?', correctAnswer: '3', acceptableAnswers: ['3'], hintEn: '4 take away 1.', hintTe: '4 లో 1 తీసివేయండి.', explanationEn: '4 minus 1 is 3.', explanationTe: '4 నుండి 1 తీసివేస్తే 3.' },
      { id: 'q-b-ch4-8', promptEn: 'What is 7 - 4 = ?', promptTe: '7 - 4 = ? ఎంత?', correctAnswer: '3', acceptableAnswers: ['3'], hintEn: '7 take away 4.', hintTe: '7 లో 4 తీసివేయండి.', explanationEn: '7 minus 4 is 3.', explanationTe: '7 నుండి 4 తీసివేస్తే 3.' },
      { id: 'q-b-ch4-9', promptEn: 'What is 5 - 0 = ?', promptTe: '5 - 0 = ? ఎంత?', correctAnswer: '5', acceptableAnswers: ['5'], hintEn: 'Subtracting zero leaves the number unchanged.', hintTe: 'సున్నా తీసివేస్తే సంఖ్య మారదు.', explanationEn: '5 minus 0 is 5.', explanationTe: '5 నుండి 0 తీసివేస్తే 5.' },
      { id: 'q-b-ch4-10', promptEn: 'What is 3 - 2 = ?', promptTe: '3 - 2 = ? ఎంత?', correctAnswer: '1', acceptableAnswers: ['1'], hintEn: '3 take away 2.', hintTe: '3 లో 2 తీసివేయండి.', explanationEn: '3 minus 2 is 1.', explanationTe: '3 నుండి 2 తీసివేస్తే 1.' }
    ]
  },
  {
    id: 'b-ch5',
    level: 'Beginner',
    chapterNumber: 5,
    titleEn: 'Single-Digit Addition',
    titleTe: 'ఒకే అంకె కూడిక',
    shortDescriptionEn: 'Master single-digit addition problems like 7+5, 2+8, and 5+3.',
    shortDescriptionTe: '7+5, 2+8 మరియు 5+3 వంటి కూడిక లెక్కలను సాధన చేయండి.',
    visualShape: 'square',
    shapeSvgType: 'square',
    shapeNumberLabel: '5',
    badgeEn: 'Ready to be Learnt',
    badgeTe: 'నేర్చుకోవడానికి సిద్ధంగా ఉంది',
    preTestSummaryEn: 'Addition combines two or more quantities into a total sum.',
    preTestSummaryTe: 'కూడిక అంటే రెండు లేదా అంతకంటే ఎక్కువ సంఖ్యలను కలపడం.',
    keyConceptsEn: ['7 + 5 = 12', '2 + 8 = 10', '5 + 3 = 8'],
    keyConceptsTe: ['7 + 5 = 12', '2 + 8 = 10', '5 + 3 = 8'],
    visualDiagramType: 'number_bonds',
    testQuestions: [
      { id: 'q-b-ch5-1', promptEn: 'What is 7 + 5 = ?', promptTe: '7 + 5 = ? ఎంత?', correctAnswer: '12', acceptableAnswers: ['12'], hintEn: '7 plus 5.', hintTe: '7 కి 5 కలపండి.', explanationEn: '7 + 5 = 12.', explanationTe: '7 + 5 = 12.' },
      { id: 'q-b-ch5-2', promptEn: 'What is 2 + 8 = ?', promptTe: '2 + 8 = ? ఎంత?', correctAnswer: '10', acceptableAnswers: ['10'], hintEn: 'Number bond to 10.', hintTe: '10 యొక్క సంఖ్య బంధం.', explanationEn: '2 + 8 = 10.', explanationTe: '2 + 8 = 10.' },
      { id: 'q-b-ch5-3', promptEn: 'What is 5 + 3 = ?', promptTe: '5 + 3 = ? ఎంత?', correctAnswer: '8', acceptableAnswers: ['8'], hintEn: 'Count on 3 from 5.', hintTe: '5 నుండి 3 ముందుకు లెక్కించండి.', explanationEn: '5 + 3 = 8.', explanationTe: '5 + 3 = 8.' },
      { id: 'q-b-ch5-4', promptEn: 'What is 4 + 4 = ?', promptTe: '4 + 4 = ? ఎంత?', correctAnswer: '8', acceptableAnswers: ['8'], hintEn: 'Double of 4.', hintTe: '4 యొక్క రెట్టింపు.', explanationEn: '4 + 4 = 8.', explanationTe: '4 + 4 = 8.' },
      { id: 'q-b-ch5-5', promptEn: 'What is 6 + 3 = ?', promptTe: '6 + 3 = ? ఎంత?', correctAnswer: '9', acceptableAnswers: ['9'], hintEn: '6 plus 3.', hintTe: '6 కి 3 కలపండి.', explanationEn: '6 + 3 = 9.', explanationTe: '6 + 3 = 9.' },
      { id: 'q-b-ch5-6', promptEn: 'What is 1 + 9 = ?', promptTe: '1 + 9 = ? ఎంత?', correctAnswer: '10', acceptableAnswers: ['10'], hintEn: 'Reaches 10.', hintTe: '10 అవుతుంది.', explanationEn: '1 + 9 = 10.', explanationTe: '1 + 9 = 10.' },
      { id: 'q-b-ch5-7', promptEn: 'What is 3 + 3 = ?', promptTe: '3 + 3 = ? ఎంత?', correctAnswer: '6', acceptableAnswers: ['6'], hintEn: 'Double of 3.', hintTe: '3 యొక్క రెట్టింపు.', explanationEn: '3 + 3 = 6.', explanationTe: '3 + 3 = 6.' },
      { id: 'q-b-ch5-8', promptEn: 'What is 5 + 5 = ?', promptTe: '5 + 5 = ? ఎంత?', correctAnswer: '10', acceptableAnswers: ['10'], hintEn: 'Double of 5.', hintTe: '5 యొక్క రెట్టింపు.', explanationEn: '5 + 5 = 10.', explanationTe: '5 + 5 = 10.' },
      { id: 'q-b-ch5-9', promptEn: 'What is 2 + 3 = ?', promptTe: '2 + 3 = ? ఎంత?', correctAnswer: '5', acceptableAnswers: ['5'], hintEn: '2 plus 3.', hintTe: '2 కి 3 కలపండి.', explanationEn: '2 + 3 = 5.', explanationTe: '2 + 3 = 5.' },
      { id: 'q-b-ch5-10', promptEn: 'What is 4 + 5 = ?', promptTe: '4 + 5 = ? ఎంత?', correctAnswer: '9', acceptableAnswers: ['9'], hintEn: '4 plus 5.', hintTe: '4 కి 5 కలపండి.', explanationEn: '4 + 5 = 9.', explanationTe: '4 + 5 = 9.' }
    ]
  },
  {
    id: 'b-ch6',
    level: 'Beginner',
    chapterNumber: 6,
    titleEn: 'Single-Digit Multiplication',
    titleTe: 'ఒకే అంకె గుణకారాలు',
    shortDescriptionEn: 'Learn multiplication facts like 5*7, 7*7, and 8*6.',
    shortDescriptionTe: '5*7, 7*7 మరియు 8*6 వంటి గుణకార పట్టికలను నేర్చుకోండి.',
    visualShape: 'triangle',
    shapeSvgType: 'triangle',
    shapeNumberLabel: '6',
    badgeEn: 'Ready to be Learnt',
    badgeTe: 'నేర్చుకోవడానికి సిద్ధంగా ఉంది',
    preTestSummaryEn: 'Multiplication is repeated addition.',
    preTestSummaryTe: 'గుణకారం అంటే పునరావృత కూడిక.',
    keyConceptsEn: ['5 × 7 = 35', '7 × 7 = 49', '8 × 6 = 48'],
    keyConceptsTe: ['5 × 7 = 35', '7 × 7 = 49', '8 × 6 = 48'],
    visualDiagramType: 'multiplication_array',
    testQuestions: [
      { id: 'q-b-ch6-1', promptEn: 'What is 5 × 7 = ?', promptTe: '5 × 7 = ? ఎంత?', correctAnswer: '35', acceptableAnswers: ['35'], hintEn: 'Count by 5s seven times.', hintTe: '5 ని ఏడు సార్లు లెక్కించండి.', explanationEn: '5 × 7 = 35.', explanationTe: '5 × 7 = 35.' },
      { id: 'q-b-ch6-2', promptEn: 'What is 7 × 7 = ?', promptTe: '7 × 7 = ? ఎంత?', correctAnswer: '49', acceptableAnswers: ['49'], hintEn: '7 squared.', hintTe: '7 యొక్క వర్గం.', explanationEn: '7 × 7 = 49.', explanationTe: '7 × 7 = 49.' },
      { id: 'q-b-ch6-3', promptEn: 'What is 8 × 6 = ?', promptTe: '8 × 6 = ? ఎంత?', correctAnswer: '48', acceptableAnswers: ['48'], hintEn: '8 times 6.', hintTe: '8 ఆరుల.', explanationEn: '8 × 6 = 48.', explanationTe: '8 × 6 = 48.' },
      { id: 'q-b-ch6-4', promptEn: 'What is 3 × 4 = ?', promptTe: '3 × 4 = ? ఎంత?', correctAnswer: '12', acceptableAnswers: ['12'], hintEn: '3 times 4.', hintTe: '3 నాల్గుల.', explanationEn: '3 × 4 = 12.', explanationTe: '3 × 4 = 12.' },
      { id: 'q-b-ch6-5', promptEn: 'What is 6 × 6 = ?', promptTe: '6 × 6 = ? ఎంత?', correctAnswer: '36', acceptableAnswers: ['36'], hintEn: '6 squared.', hintTe: '6 యొక్క వర్గం.', explanationEn: '6 × 6 = 36.', explanationTe: '6 × 6 = 36.' },
      { id: 'q-b-ch6-6', promptEn: 'What is 9 × 5 = ?', promptTe: '9 × 5 = ? ఎంత?', correctAnswer: '45', acceptableAnswers: ['45'], hintEn: '9 times 5.', hintTe: '9 ఐదుల.', explanationEn: '9 × 5 = 45.', explanationTe: '9 × 5 = 45.' },
      { id: 'q-b-ch6-7', promptEn: 'What is 4 × 4 = ?', promptTe: '4 × 4 = ? ఎంత?', correctAnswer: '16', acceptableAnswers: ['16'], hintEn: '4 squared.', hintTe: '4 యొక్క వర్గం.', explanationEn: '4 × 4 = 16.', explanationTe: '4 × 4 = 16.' },
      { id: 'q-b-ch6-8', promptEn: 'What is 2 × 9 = ?', promptTe: '2 × 9 = ? ఎంత?', correctAnswer: '18', acceptableAnswers: ['18'], hintEn: 'Double of 9.', hintTe: '9 యొక్క రెట్టింపు.', explanationEn: '2 × 9 = 18.', explanationTe: '2 × 9 = 18.' },
      { id: 'q-b-ch6-9', promptEn: 'What is 3 × 3 = ?', promptTe: '3 × 3 = ? ఎంత?', correctAnswer: '9', acceptableAnswers: ['9'], hintEn: '3 squared.', hintTe: '3 యొక్క వర్గం.', explanationEn: '3 × 3 = 9.', explanationTe: '3 × 3 = 9.' },
      { id: 'q-b-ch6-10', promptEn: 'What is 5 × 5 = ?', promptTe: '5 × 5 = ? ఎంత?', correctAnswer: '25', acceptableAnswers: ['25'], hintEn: '5 squared.', hintTe: '5 యొక్క వర్గం.', explanationEn: '5 × 5 = 25.', explanationTe: '5 × 5 = 25.' }
    ]
  },
  {
    id: 'b-ch7',
    level: 'Beginner',
    chapterNumber: 7,
    titleEn: 'Basic 2D Shapes',
    titleTe: 'ప్రాథమిక 2D ఆకారాలు',
    shortDescriptionEn: 'Identify properties of Triangles, Rectangles, Squares, and Circles.',
    shortDescriptionTe: 'త్రిభుజాలు, దీర్ఘచతురస్రాలు, చతురస్రాలు మరియు వృత్తాల లక్షణాలను గుర్తించండి.',
    visualShape: 'circle',
    shapeSvgType: 'circle',
    shapeNumberLabel: '7',
    badgeEn: 'Ready to be Learnt',
    badgeTe: 'నేర్చుకోవడానికి సిద్ధంగా ఉంది',
    preTestSummaryEn: 'Geometric 2D shapes have specific sides and corners.',
    preTestSummaryTe: 'రేఖీయ 2D ఆకారాలకు నిర్దిష్ట భుజాలు మరియు మూలలు ఉంటాయి.',
    keyConceptsEn: ['Triangle: 3 sides', 'Square: 4 equal sides', 'Rectangle: 4 sides (opposite equal)', 'Circle: round, 0 corners'],
    keyConceptsTe: ['త్రిభుజం: 3 భుజాలు', 'చతురస్రం: 4 సమాన భుజాలు', 'దీర్ఘచతురస్రం: 4 భుజాలు', 'వృత్తం: గుండ్రని ఆకారం'],
    visualDiagramType: 'shapes_geom',
    testQuestions: [
      { id: 'q-b-ch7-1', promptEn: 'How many sides does a Triangle have? (Type number)', promptTe: 'త్రిభుజానికి ఎన్ని భుజాలు ఉంటాయి? (అంకె రాయండి)', correctAnswer: '3', acceptableAnswers: ['3'], hintEn: 'Tri means 3.', hintTe: 'త్రి అంటే 3.', explanationEn: 'A triangle has 3 sides.', explanationTe: 'త్రిభుజానికి 3 భుజాలు ఉంటాయి.' },
      { id: 'q-b-ch7-2', promptEn: 'How many equal sides does a Square have? (Type number)', promptTe: 'చతురస్రానికి ఎన్ని సమాన భుజాలు ఉంటాయి? (అంకె రాయండి)', correctAnswer: '4', acceptableAnswers: ['4'], hintEn: 'All 4 sides are equal.', hintTe: 'నాలుగు భుజాలు సమానం.', explanationEn: 'A square has 4 equal sides.', explanationTe: 'చతురస్రానికి 4 సమాన భుజాలు ఉంటాయి.' },
      { id: 'q-b-ch7-3', promptEn: 'How many corners does a Circle have? (Type number)', promptTe: 'వృత్తానికి ఎన్ని మూలలు ఉంటాయి? (అంకె రాయండి)', correctAnswer: '0', acceptableAnswers: ['0', 'zero', 'సున్నా'], hintEn: 'It is round.', hintTe: 'ఇది గుండ్రంగా ఉంటుంది.', explanationEn: 'A circle has 0 corners.', explanationTe: 'వృత్తానికి సున్నా మూలలు ఉంటాయి.' },
      { id: 'q-b-ch7-4', promptEn: 'Which shape has 4 sides with opposite sides equal? (Type "Rectangle" or "Triangle")',
        promptTe: 'ఎదురెదురు భుజాలు సమానంగా ఉండే ఆకారం ఏది? ("Rectangle" లేదా "Triangle")',
        correctAnswer: 'Rectangle', acceptableAnswers: ['rectangle', 'Rectangle', 'దీర్ఘచతురస్రం'],
        hintEn: 'Like a door or book.', hintTe: 'తలుపు లేదా పుస్తకం లాగా.',
        explanationEn: 'A rectangle has opposite sides equal.', explanationTe: 'దీర్ఘచతురస్రానికి ఎదురెదురు భుజాలు సమానం.' },
      { id: 'q-b-ch7-5', promptEn: 'Does a Square have 4 corners? (Type "Yes" or "No")', promptTe: 'చతురస్రానికి 4 మూలలు ఉంటాయా? ("Yes" లేదా "No")', correctAnswer: 'Yes', acceptableAnswers: ['yes', 'Yes', 'అవును'], hintEn: 'Count the corners of a square.', hintTe: 'చతురస్ర మూలలను లెక్కించండి.', explanationEn: 'Yes, a square has 4 corners.', explanationTe: 'అవును, చతురస్రానికి 4 మూలలు ఉంటాయి.' },
      { id: 'q-b-ch7-6', promptEn: 'Is a Circle round? (Type "Yes" or "No")', promptTe: 'వృత్తం గుండ్రంగా ఉంటుందా? ("Yes" లేదా "No")', correctAnswer: 'Yes', acceptableAnswers: ['yes', 'Yes', 'అవును'], hintEn: 'It has no straight sides.', hintTe: 'దీనికి నిలువు భుజాలు ఉండవు.', explanationEn: 'Yes, a circle is round.', explanationTe: 'అవును, వృత్తం గుండ్రంగా ఉంటుంది.' },
      { id: 'q-b-ch7-7', promptEn: 'How many vertices does a Triangle have? (Type number)', promptTe: 'త్రిభుజానికి ఎన్ని శీర్షాలు/మూలలు ఉంటాయి? (అంకె రాయండి)', correctAnswer: '3', acceptableAnswers: ['3'], hintEn: 'Same as its number of sides.', hintTe: 'దీని భుజాల సంఖ్యతో సమానం.', explanationEn: 'A triangle has 3 corners.', explanationTe: 'త్రిభుజానికి 3 మూలలు ఉంటాయి.' },
      { id: 'q-b-ch7-8', promptEn: 'Do all sides of a Rectangle have to be equal? (Type "Yes" or "No")', promptTe: 'దీర్ఘచతురస్రం యొక్క అన్ని భుజాలు సమానంగా ఉండాలా? ("Yes" లేదా "No")', correctAnswer: 'No', acceptableAnswers: ['no', 'No', 'కాదు'], hintEn: 'Only opposite sides are equal.', hintTe: 'ఎదురెదురు భుజాలు మాత్రమే సమానం.', explanationEn: 'No, only opposite sides are equal in a rectangle.', explanationTe: 'కాదు, దీర్ఘచతురస్రంలో ఎదురెదురు భుజాలు మాత్రమే సమానం.' },
      { id: 'q-b-ch7-9', promptEn: 'What shape is a coin? (Type "Circle" or "Square")', promptTe: 'నాణెం ఏ ఆకారంలో ఉంటుంది? ("Circle" లేదా "Square")', correctAnswer: 'Circle', acceptableAnswers: ['circle', 'Circle', 'వృత్తం'], hintEn: 'Round shape.', hintTe: 'గుండ్రని ఆకారం.', explanationEn: 'A coin is circular.', explanationTe: 'నాణెం వృత్తాకారంలో ఉంటుంది.' },
      { id: 'q-b-ch7-10', promptEn: 'What shape is a chess board? (Type "Square" or "Circle")', promptTe: 'చెస్ బోర్డు ఏ ఆకారంలో ఉంటుంది? ("Square" లేదా "Circle")', correctAnswer: 'Square', acceptableAnswers: ['square', 'Square', 'చతురస్రం'], hintEn: 'All 4 sides equal.', hintTe: '4 భుజాలు సమానం.', explanationEn: 'A chess board is square.', explanationTe: 'చెస్ బోర్డు చతురస్రాకారంలో ఉంటుంది.' }
    ]
  },

  // =========================================================================
  // 🟡 INTERMEDIATE LEVEL (Classes 6 - 8)
  // =========================================================================
  {
    id: 'i-ch1',
    level: 'Intermediate',
    chapterNumber: 1,
    titleEn: 'Simple Linear Equations',
    titleTe: 'సరళ సమీకరణాలు',
    shortDescriptionEn: 'Isolate variables using the balance scale method: keep both sides equal.',
    shortDescriptionTe: 'త్రాసు సమతుల్యత పద్ధతిని ఉపయోగించి చరరాశి విలువను కనుగొనండి.',
    visualShape: 'square',
    shapeSvgType: 'square',
    shapeNumberLabel: '1',
    badgeEn: 'Ready to be Learnt',
    badgeTe: 'నేర్చుకోవడానికి సిద్ధంగా ఉంది',
    preTestSummaryEn: 'An equation is a balanced scale where both sides must remain equal.',
    preTestSummaryTe: 'సమీకరణం అంటే రెండు వైపులా సమానంగా ఉండే త్రాసు లాంటిది.',
    keyConceptsEn: ['Undo operations in reverse', 'If 3x = 21, x = 7', 'If x + 9 = 15, x = 6'],
    keyConceptsTe: ['వ్యతిరేక ప్రక్రియలను అనుసరించండి', '3x = 21 అయితే x = 7', 'x + 9 = 15 అయితే x = 6'],
    visualDiagramType: 'equation_balance',
    testQuestions: [
      { id: 'q-i-ch1-1', promptEn: 'Solve for x: 3x = 21. What is x?', promptTe: '3x = 21 అయితే x ఎంత?', correctAnswer: '7', acceptableAnswers: ['7', 'x=7'], hintEn: 'Divide 21 by 3.', hintTe: '21 ని 3 తో భాగించండి.', explanationEn: 'x = 21 / 3 = 7.', explanationTe: 'x = 7.' },
      { id: 'q-i-ch1-2', promptEn: 'Solve for x: x + 9 = 15. What is x?', promptTe: 'x + 9 = 15 అయితే x ఎంత?', correctAnswer: '6', acceptableAnswers: ['6', 'x=6'], hintEn: 'Subtract 9 from 15.', hintTe: '15 నుండి 9 తీసివేయండి.', explanationEn: 'x = 15 - 9 = 6.', explanationTe: 'x = 6.' },
      { id: 'q-i-ch1-3', promptEn: 'Solve for x: 2x = 16. What is x?', promptTe: '2x = 16 అయితే x ఎంత?', correctAnswer: '8', acceptableAnswers: ['8', 'x=8'], hintEn: '16 divided by 2.', hintTe: '16 ని 2 తో భాగించండి.', explanationEn: 'x = 8.', explanationTe: 'x = 8.' },
      { id: 'q-i-ch1-4', promptEn: 'Solve for x: x - 4 = 10. What is x?', promptTe: 'x - 4 = 10 అయితే x ఎంత?', correctAnswer: '14', acceptableAnswers: ['14', 'x=14'], hintEn: 'Add 4 to 10.', hintTe: '10 కి 4 కలపండి.', explanationEn: 'x = 14.', explanationTe: 'x = 14.' },
      { id: 'q-i-ch1-5', promptEn: 'Solve for x: 5x = 35. What is x?', promptTe: '5x = 35 అయితే x ఎంత?', correctAnswer: '7', acceptableAnswers: ['7', 'x=7'], hintEn: '35 divided by 5.', hintTe: '35 ని 5 తో భాగించండి.', explanationEn: 'x = 7.', explanationTe: 'x = 7.' },
      { id: 'q-i-ch1-6', promptEn: 'Solve for x: x + 7 = 12. What is x?', promptTe: 'x + 7 = 12 అయితే x ఎంత?', correctAnswer: '5', acceptableAnswers: ['5', 'x=5'], hintEn: '12 minus 7.', hintTe: '12 నుండి 7 తీసివేయండి.', explanationEn: 'x = 5.', explanationTe: 'x = 5.' },
      { id: 'q-i-ch1-7', promptEn: 'Solve for x: 4x = 24. What is x?', promptTe: '4x = 24 అయితే x ఎంత?', correctAnswer: '6', acceptableAnswers: ['6', 'x=6'], hintEn: '24 divided by 4.', hintTe: '24 ని 4 తో భాగించండి.', explanationEn: 'x = 6.', explanationTe: 'x = 6.' },
      { id: 'q-i-ch1-8', promptEn: 'Solve for x: x - 3 = 11. What is x?', promptTe: 'x - 3 = 11 అయితే x ఎంత?', correctAnswer: '14', acceptableAnswers: ['14', 'x=14'], hintEn: '11 plus 3.', hintTe: '11 కి 3 కలపండి.', explanationEn: 'x = 14.', explanationTe: 'x = 14.' },
      { id: 'q-i-ch1-9', promptEn: 'Solve for x: 10x = 90. What is x?', promptTe: '10x = 90 అయితే x ఎంత?', correctAnswer: '9', acceptableAnswers: ['9', 'x=9'], hintEn: '90 divided by 10.', hintTe: '90 ని 10 తో భాగించండి.', explanationEn: 'x = 9.', explanationTe: 'x = 9.' },
      { id: 'q-i-ch1-10', promptEn: 'Solve for x: x + 12 = 20. What is x?', promptTe: 'x + 12 = 20 అయితే x ఎంత?', correctAnswer: '8', acceptableAnswers: ['8', 'x=8'], hintEn: '20 minus 12.', hintTe: '20 నుండి 12 తీసివేయండి.', explanationEn: 'x = 8.', explanationTe: 'x = 8.' }
    ]
  },
  {
    id: 'i-ch2',
    level: 'Intermediate',
    chapterNumber: 2,
    titleEn: 'Double-Digit Operations',
    titleTe: 'ద్విఅంకె సంఖ్యా ఆపరేషన్లు',
    shortDescriptionEn: 'Practice double-digit addition, subtraction, multiplication, and division like 24/6, 30/6, 56/8.',
    shortDescriptionTe: '24/6, 30/6, 56/8 వంటి ద్విఅంకె కూడిక, తీసివేత, గుణకార మరియు భాగాహార లెక్కలు.',
    visualShape: 'circle',
    shapeSvgType: 'circle',
    shapeNumberLabel: '2',
    badgeEn: 'Ready to be Learnt',
    badgeTe: 'నేర్చుకోవడానికి సిద్ధంగా ఉంది',
    preTestSummaryEn: 'Double-digit arithmetic covers fundamental operations on two-digit numbers.',
    preTestSummaryTe: 'ద్విఅంకె అంకగణితం రెండు అంకెల సంఖ్యలపై ప్రాథమిక కార్యకలాపాలను కవర్ చేస్తుంది.',
    keyConceptsEn: ['24 / 6 = 4', '30 / 6 = 5', '56 / 8 = 7'],
    keyConceptsTe: ['24 / 6 = 4', '30 / 6 = 5', '56 / 8 = 7'],
    visualDiagramType: 'counting_grid',
    testQuestions: [
      { id: 'q-i-ch2-1', promptEn: 'What is 24 / 6 = ?', promptTe: '24 / 6 = ? ఎంత?', correctAnswer: '4', acceptableAnswers: ['4'], hintEn: '6 times 4 is 24.', hintTe: '6 నాల్గుల 24.', explanationEn: '24 divided by 6 is 4.', explanationTe: '24 ని 6 తో భాగిస్తే 4.' },
      { id: 'q-i-ch2-2', promptEn: 'What is 30 / 6 = ?', promptTe: '30 / 6 = ? ఎంత?', correctAnswer: '5', acceptableAnswers: ['5'], hintEn: '6 times 5 is 30.', hintTe: '6 ఐదుల 30.', explanationEn: '30 divided by 6 is 5.', explanationTe: '30 ని 6 తో భాగిస్తే 5.' },
      { id: 'q-i-ch2-3', promptEn: 'What is 56 / 8 = ?', promptTe: '56 / 8 = ? ఎంత?', correctAnswer: '7', acceptableAnswers: ['7'], hintEn: '8 times 7 is 56.', hintTe: '8 ఏడుల 56.', explanationEn: '56 divided by 8 is 7.', explanationTe: '56 ని 8 తో భాగిస్తే 7.' },
      { id: 'q-i-ch2-4', promptEn: 'What is 45 + 23 = ?', promptTe: '45 + 23 = ? ఎంత?', correctAnswer: '68', acceptableAnswers: ['68'], hintEn: 'Add tens and units.', hintTe: 'పదులు మరియు విడి సంఖ్యలను కలపండి.', explanationEn: '45 + 23 = 68.', explanationTe: '45 + 23 = 68.' },
      { id: 'q-i-ch2-5', promptEn: 'What is 78 - 34 = ?', promptTe: '78 - 34 = ? ఎంత?', correctAnswer: '44', acceptableAnswers: ['44'], hintEn: 'Subtract tens and units.', hintTe: 'పదులు మరియు విడి సంఖ్యలను తీసివేయండి.', explanationEn: '78 - 34 = 44.', explanationTe: '78 - 34 = 44.' },
      { id: 'q-i-ch2-6', promptEn: 'What is 15 × 4 = ?', promptTe: '15 × 4 = ? ఎంత?', correctAnswer: '60', acceptableAnswers: ['60'], hintEn: 'Four 15s make 60.', hintTe: 'నాలుగు 15 లు 60.', explanationEn: '15 × 4 = 60.', explanationTe: '15 × 4 = 60.' },
      { id: 'q-i-ch2-7', promptEn: 'What is 72 / 9 = ?', promptTe: '72 / 9 = ? ఎంత?', correctAnswer: '8', acceptableAnswers: ['8'], hintEn: '9 times 8 is 72.', hintTe: '9 ఎనిమిదిల 72.', explanationEn: '72 / 9 = 8.', explanationTe: '72 / 9 = 8.' },
      { id: 'q-i-ch2-8', promptEn: 'What is 36 + 45 = ?', promptTe: '36 + 45 = ? ఎంత?', correctAnswer: '81', acceptableAnswers: ['81'], hintEn: 'Add with carry over.', hintTe: 'దయతో కూడండి.', explanationEn: '36 + 45 = 81.', explanationTe: '36 + 45 = 81.' },
      { id: 'q-i-ch2-9', promptEn: 'What is 90 - 45 = ?', promptTe: '90 - 45 = ? ఎంత?', correctAnswer: '45', acceptableAnswers: ['45'], hintEn: 'Half of 90.', hintTe: '90 లో సగం.', explanationEn: '90 - 45 = 45.', explanationTe: '90 - 45 = 45.' },
      { id: 'q-i-ch2-10', promptEn: 'What is 12 × 5 = ?', promptTe: '12 × 5 = ? ఎంత?', correctAnswer: '60', acceptableAnswers: ['60'], hintEn: '12 times 5.', hintTe: '12 ఐదుల.', explanationEn: '12 × 5 = 60.', explanationTe: '12 × 5 = 60.' }
    ]
  },
  {
    id: 'i-ch3',
    level: 'Intermediate',
    chapterNumber: 3,
    titleEn: '24 Hours Identification',
    titleTe: '24 గంటల సమయ గుర్తింపు',
    shortDescriptionEn: 'Learn to convert between 1-12 AM/PM and 13-24 hour military/railway time formats.',
    shortDescriptionTe: '1-12 AM/PM మరియు 13-24 గంటల రైల్వే సమయ ფორಮಾಟுகల మధ్య మార్పును నేర్చుకోండి.',
    visualShape: 'triangle',
    shapeSvgType: 'triangle',
    shapeNumberLabel: '3',
    badgeEn: 'Ready to be Learnt',
    badgeTe: 'నేర్చుకోవడానికి సిద్ధంగా ఉంది',
    preTestSummaryEn: 'The 24-hour clock runs from 00:00 to 23:59 without needing AM or PM.',
    preTestSummaryTe: '24 గంటల గడియారం AM లేదా PM అవసరం లేకుండా 00:00 నుండి 23:59 వరకు నడుస్తుంది.',
    keyConceptsEn: ['1:00 PM is 13:00', '8:00 PM is 20:00', '12:00 AM is 00:00'],
    keyConceptsTe: ['మధ్యాహ్నం 1:00 అంటే 13:00', 'రాత్రి 8:00 అంటే 20:00', 'అర్ధరాత్రి 12:00 అంటే 00:00'],
    visualDiagramType: 'counting_grid',
    testQuestions: [
      { id: 'q-i-ch3-1', promptEn: 'What is 3:00 PM in 24-hour format? (Type as "15:00")', promptTe: 'మధ్యాహ్నం 3:00 PM ను 24 గంటల ფორమాట్‌లో ఎలా రాయాలి? ("15:00" అని రాయండి)', correctAnswer: '15:00', acceptableAnswers: ['15:00', '1500'], hintEn: 'Add 12 to 3.', hintTe: '3 కి 12 కలపండి.', explanationEn: '3 PM + 12 hours = 15:00.', explanationTe: '3 PM + 12 గంటలు = 15:00.' },
      { id: 'q-i-ch3-2', promptEn: 'What is 8:00 PM in 24-hour format? (Type as "20:00")', promptTe: 'రాత్రి 8:00 PM ను 24 గంటల ფორమాట్‌లో ఎలా రాయాలి? ("20:00" అని రాయండి)', correctAnswer: '20:00', acceptableAnswers: ['20:00', '2000'], hintEn: 'Add 12 to 8.', hintTe: '8 కి 12 కలపండి.', explanationEn: '8 PM + 12 hours = 20:00.', explanationTe: '8 PM + 12 గంటలు = 20:00.' },
      { id: 'q-i-ch3-3', promptEn: 'What is 14:00 hours in 12-hour AM/PM format? (Type as "2:00 PM")', promptTe: '14:00 గంటలు అంటే 12 గంటల ფორమాట్‌లో ఎంత? ("2:00 PM" అని రాయండి)', correctAnswer: '2:00 PM', acceptableAnswers: ['2:00 PM', '2:00 pm', '2 PM'], hintEn: 'Subtract 12 from 14.', hintTe: '14 నుండి 12 తీసివేయండి.', explanationEn: '14:00 minus 12 is 2:00 PM.', explanationTe: '14:00 నుండి 12 తీసివేస్తే 2:00 PM.' },
      { id: 'q-i-ch3-4', promptEn: 'What is 21:00 hours in 12-hour AM/PM format? (Type as "9:00 PM")', promptTe: '21:00 గంటలు అంటే 12 గంటల ფორమాట్‌లో ఎంత? ("9:00 PM" అని రాయండి)', correctAnswer: '9:00 PM', acceptableAnswers: ['9:00 PM', '9:00 pm', '9 PM'], hintEn: 'Subtract 12 from 21.', hintTe: '21 నుండి 12 తీసివేయండి.', explanationEn: '21:00 minus 12 is 9:00 PM.', explanationTe: '21:00 నుండి 12 తీసివేస్తే 9:00 PM.' },
      { id: 'q-i-ch3-5', promptEn: 'What is 08:00 AM in 24-hour format? (Type as "08:00")', promptTe: 'ఉదయం 8:00 AM ను 24 గంటల ფორమాట్‌లో ఎలా రాయాలి? ("08:00" అని రాయండి)', correctAnswer: '08:00', acceptableAnswers: ['08:00', '8:00', '0800'], hintEn: 'Morning hours remain the same.', hintTe: 'ఉదయం గంటలు అలాగే ఉంటాయి.', explanationEn: 'Morning times are unchanged in 24-hour format.', explanationTe: 'ఉదయం సమయం 24 గంటల ფორమాట్‌లో మారాదు.' },
      { id: 'q-i-ch3-6', promptEn: 'What is 17:00 hours in 12-hour format? (Type as "5:00 PM")', promptTe: '17:00 గంటలు అంటే 12 గంటల ფორమాట్‌లో ఎంత? ("5:00 PM" అని రాయండి)', correctAnswer: '5:00 PM', acceptableAnswers: ['5:00 PM', '5:00 pm', '5 PM'], hintEn: '17 minus 12.', hintTe: '17 నుండి 12 తీసివేయండి.', explanationEn: '17:00 is 5:00 PM.', explanationTe: '17:00 అంటే సాయంత్రం 5:00 PM.' },
      { id: 'q-i-ch3-7', promptEn: 'What is 12:00 PM (noon) in 24-hour format? (Type as "12:00")', promptTe: 'మధ్యాహ్నం 12:00 PM ను 24 గంటల ფორమాట్‌లో ఎలా రాయాలి? ("12:00" అని రాయండి)', correctAnswer: '12:00', acceptableAnswers: ['12:00', '1200'], hintEn: 'Noon is 12:00.', hintTe: 'మధ్యాహ్నం 12:00.', explanationEn: '12:00 PM is 12:00.', explanationTe: 'మధ్యాహ్నం 12:00 PM అంటే 12:00.' },
      { id: 'q-i-ch3-8', promptEn: 'What is midnight (12:00 AM) in 24-hour format? (Type as "00:00")', promptTe: 'అర్ధరాత్రి 12:00 AM ను 24 గంటల ფორమాట్‌లో ఎలా రాయాలి? ("00:00" అని రాయండి)', correctAnswer: '00:00', acceptableAnswers: ['00:00', '0:00'], hintEn: 'Start of a new day.', hintTe: 'కొత్త రోజు ప్రారంభం.', explanationEn: 'Midnight is 00:00.', explanationTe: 'అర్ధరాత్రి 00:00.' },
      { id: 'q-i-ch3-9', promptEn: 'What is 10:00 PM in 24-hour format? (Type as "22:00")', promptTe: 'రాత్రి 10:00 PM ను 24 గంటల ფორమాట్‌లో ఎలా రాయాలి? ("22:00" అని రాయండి)', correctAnswer: '22:00', acceptableAnswers: ['22:00', '2200'], hintEn: 'Add 12 to 10.', hintTe: '10 కి 12 కలపండి.', explanationEn: '10 PM + 12 = 22:00.', explanationTe: '10 PM + 12 = 22:00.' },
      { id: 'q-i-ch3-10', promptEn: 'What is 11:00 AM in 24-hour format? (Type as "11:00")', promptTe: 'ఉదయం 11:00 AM ను 24 గంటల ფორమాట్‌లో ఎలా రాయాలి? ("11:00" అని రాయండి)', correctAnswer: '11:00', acceptableAnswers: ['11:00', '1100'], hintEn: 'Before noon stays same.', hintTe: 'మధ్యాహ్నం ముందు అలాగే ఉంటుంది.', explanationEn: '11:00 AM is 11:00.', explanationTe: 'ఉదయం 11:00 AM అంటే 11:00.' }
    ]
  },
  {
    id: 'i-ch4',
    level: 'Intermediate',
    chapterNumber: 4,
    titleEn: 'Converting Rupees to Paise',
    titleTe: 'రూపాయలను పైసలలోకి మార్చడం',
    shortDescriptionEn: 'Convert decimal rupees into paise (e.g., 15.5 rupees to paise, 20.3 rupees to paise).',
    shortDescriptionTe: 'దశాంశ రూపాయలను పైసలలోకి మార్చండి (ఉదా: 15.5 రూపాయలు, 20.3 రూపాయలు).',
    visualShape: 'circle',
    shapeSvgType: 'square',
    shapeNumberLabel: '4',
    badgeEn: 'Ready to be Learnt',
    badgeTe: 'నేర్చుకోవడానికి సిద్ధంగా ఉంది',
    preTestSummaryEn: '1 Rupee is equal to 100 Paise. To convert Rupees to Paise, multiply by 100.',
    preTestSummaryTe: '1 రూపాయి = 100 పైసలు. రూపాయలను పైసలలోకి మార్చడానికి 100 తో గుణించాలి.',
    keyConceptsEn: ['1 Rupee = 100 Paise', '15.5 Rupees = 1550 Paise', '20.3 Rupees = 2030 Paise'],
    keyConceptsTe: ['1 రూపాయి = 100 పైసలు', '15.5 రూపాయలు = 1550 పైసలు', '20.3 రూపాయలు = 2030 పైసలు'],
    visualDiagramType: 'counting_grid',
    testQuestions: [
      { id: 'q-i-ch4-1', promptEn: 'How many paise are in 15.5 Rupees? (Type number, e.g. "1550")', promptTe: '15.5 రూపాయలలో ఎన్ని పైసలు ఉంటాయి? (అంకె రాయండి, ఉదా: "1550")', correctAnswer: '1550', acceptableAnswers: ['1550', '1550 paise'], hintEn: 'Multiply 15.5 by 100.', hintTe: '15.5 ని 100 తో గుణించండి.', explanationEn: '15.5 × 100 = 1550 paise.', explanationTe: '15.5 × 100 = 1550 పైసలు.' },
      { id: 'q-i-ch4-2', promptEn: 'How many paise are in 20.3 Rupees? (Type number)', promptTe: '20.3 రూపాయలలో ఎన్ని పైసలు ఉంటాయి? (అంకె రాయండి)', correctAnswer: '2030', acceptableAnswers: ['2030', '2030 paise'], hintEn: 'Multiply 20.3 by 100.', hintTe: '20.3 ని 100 తో గుణించండి.', explanationEn: '20.3 × 100 = 2030 paise.', explanationTe: '20.3 × 100 = 2030 పైసలు.' },
      { id: 'q-i-ch4-3', promptEn: 'How many paise in 5 Rupees? (Type number)', promptTe: '5 రూపాయలలో ఎన్ని పైసలు? (అంకె రాయండి)', correctAnswer: '500', acceptableAnswers: ['500'], hintEn: '5 × 100.', hintTe: '5 × 100.', explanationEn: '500 paise.', explanationTe: '500 పైసలు.' },
      { id: 'q-i-ch4-4', promptEn: 'How many paise in 12.5 Rupees? (Type number)', promptTe: '12.5 రూపాయలలో ఎన్ని పైసలు? (అంకె రాయండి)', correctAnswer: '1250', acceptableAnswers: ['1250'], hintEn: '12.5 × 100.', hintTe: '12.5 × 100.', explanationEn: '1250 paise.', explanationTe: '1250 పైసలు.' },
      { id: 'q-i-ch4-5', promptEn: 'How many paise in 8 Rupees? (Type number)', promptTe: '8 రూపాయలలో ఎన్ని పైసలు? (అంకె రాయండి)', correctAnswer: '800', acceptableAnswers: ['800'], hintEn: '8 × 100.', hintTe: '8 × 100.', explanationEn: '800 paise.', explanationTe: '800 పైసలు.' },
      { id: 'q-i-ch4-6', promptEn: 'How many paise in 1.5 Rupees? (Type number)', promptTe: '1.5 రూపాయలలో ఎన్ని పైసలు? (అంకె రాయండి)', correctAnswer: '150', acceptableAnswers: ['150'], hintEn: '1.5 × 100.', hintTe: '1.5 × 100.', explanationEn: '150 paise.', explanationTe: '150 పైసలు.' },
      { id: 'q-i-ch4-7', promptEn: 'How many paise in 10 Rupees? (Type number)', promptTe: '10 రూపాయలలో ఎన్ని పైసలు? (అంకె రాయండి)', correctAnswer: '1000', acceptableAnswers: ['1000'], hintEn: '10 × 100.', hintTe: '10 × 100.', explanationEn: '1000 paise.', explanationTe: '1000 పైసలు.' },
      { id: 'q-i-ch4-8', promptEn: 'How many paise in 25 Rupees? (Type number)', promptTe: '25 రూపాయలలో ఎన్ని పైసలు? (అంకె రాయండి)', correctAnswer: '2500', acceptableAnswers: ['2500'], hintEn: '25 × 100.', hintTe: '25 × 100.', explanationEn: '2500 paise.', explanationTe: '2500 పైసలు.' },
      { id: 'q-i-ch4-9', promptEn: 'How many paise in 7.25 Rupees? (Type number)', promptTe: '7.25 రూపాయలలో ఎన్ని పైసలు? (అంకె రాయండి)', correctAnswer: '725', acceptableAnswers: ['725'], hintEn: '7.25 × 100.', hintTe: '7.25 × 100.', explanationEn: '725 paise.', explanationTe: '725 పైసలు.' },
      { id: 'q-i-ch4-10', promptEn: 'How many paise in 50 Rupees? (Type number)', promptTe: '50 రూపాయలలో ఎన్ని పైసలు? (అంకె రాయండి)', correctAnswer: '5000', acceptableAnswers: ['5000'], hintEn: '50 × 100.', hintTe: '50 × 100.', explanationEn: '5000 paise.', explanationTe: '5000 పైసలు.' }
    ]
  },
  {
    id: 'i-ch5',
    level: 'Intermediate',
    chapterNumber: 5,
    titleEn: 'Buying and Selling',
    titleTe: 'కొనుగోలు మరియు అమ్మకం',
    shortDescriptionEn: 'Master basic transaction logic: calculating total cost, change, and unit pricing.',
    shortDescriptionTe: 'మొత్తం ఖర్చు, మిగిలిన డబ్బు మరియు యూనిట్ ధరను లెక్కించే లావాదేవీలను నేర్చుకోండి.',
    visualShape: 'square',
    shapeSvgType: 'triangle',
    shapeNumberLabel: '5',
    badgeEn: 'Ready to be Learnt',
    badgeTe: 'నేర్చుకోవడానికి సిద్ధంగా ఉంది',
    preTestSummaryEn: 'Transactions involve buying items at cost and determining total price or change.',
    preTestSummaryTe: 'లావాదేవీలలో వస్తువులను కొనడం మరియు మొత్తం ధరను లెక్కించడం ఉంటాయి.',
    keyConceptsEn: ['Total Cost = Price per item × Quantity', 'Change = Amount Paid - Total Cost'],
    keyConceptsTe: ['మొత్తం ఖర్చు = ఒక్కదాని ధర × పరిమాణం', 'మిగిలిన డబ్బు = చెల్లించిన మొత్తం - మొత్తం ఖర్చు'],
    visualDiagramType: 'counting_grid',
    testQuestions: [
      { id: 'q-i-ch5-1', promptEn: 'If a pen costs 12 rupees and you buy 3 pens, what is the total cost? (Type number)', promptTe: 'ఒక పెన్ ధర 12 రూపాయలు అయితే, 3 పెన్నుల మొత్తం ధర ఎంత? (అంకె రాయండి)', correctAnswer: '36', acceptableAnswers: ['36'], hintEn: '12 × 3.', hintTe: '12 × 3.', explanationEn: '12 × 3 = 36 rupees.', explanationTe: '12 × 3 = 36 రూపాయలు.' },
      { id: 'q-i-ch5-2', promptEn: 'You buy items worth 45 rupees and pay with a 100 rupee note. How much change do you get back?', promptTe: 'మీరు 45 రూపాయల వస్తువులు కొని 100 రూపాయల నోటు ఇస్తే, మీకు ఎంత వెనక్కి వస్తుంది?', correctAnswer: '55', acceptableAnswers: ['55'], hintEn: '100 - 45.', hintTe: '100 - 45.', explanationEn: '100 - 45 = 55 rupees.', explanationTe: '100 - 45 = 55 రూపాయలు.' },
      { id: 'q-i-ch5-3', promptEn: 'If 4 notebooks cost 80 rupees, what is the price of 1 notebook?', promptTe: '4 నోట్‌బుక్‌ల ధర 80 రూపాయలు అయితే, 1 నోట్‌బుక్ ధర ఎంత?', correctAnswer: '20', acceptableAnswers: ['20'], hintEn: '80 / 4.', hintTe: '80 / 4.', explanationEn: '80 / 4 = 20 rupees.', explanationTe: '80 / 4 = 20 రూపాయలు.' },
      { id: 'q-i-ch5-4', promptEn: 'You buy 2 books at 50 rupees each. Total cost?', promptTe: 'మీరు ఒక్కొక్కటి 50 రూపాయల చొప్పున 2 పుస్తకాలు కొన్నారు. మొత్తం ఎంత?', correctAnswer: '100', acceptableAnswers: ['100'], hintEn: '50 × 2.', hintTe: '50 × 2.', explanationEn: '100 rupees.', explanationTe: '100 రూపాయలు.' },
      { id: 'q-i-ch5-5', promptEn: 'If fruit costs 75 rupees and you pay with 100 rupees, change = ?', promptTe: 'పండ్ల ధర 75 రూపాయలు, మీరు 100 రూపాయలు ఇస్తే మిగిలిన డబ్బు ఎంత?', correctAnswer: '25', acceptableAnswers: ['25'], hintEn: '100 - 75.', hintTe: '100 - 75.', explanationEn: '25 rupees.', explanationTe: '25 రూపాయలు.' },
      { id: 'q-i-ch5-6', promptEn: 'Cost of 5 pencils at 4 rupees each?', promptTe: 'ఒక్కొక్కటి 4 రూపాయల చొప్పున 5 పెన్సిల్ల ధర ఎంత?', correctAnswer: '20', acceptableAnswers: ['20'], hintEn: '5 × 4.', hintTe: '5 × 4.', explanationEn: '20 rupees.', explanationTe: '20 రూపాయలు.' },
      { id: 'q-i-ch5-7', promptEn: 'You have 150 rupees and spend 90 rupees. How much is left?', promptTe: 'మీ వద్ద 150 రూపాయలు ఉండి 90 రూపాయలు ఖర్చు చేస్తే ఎంత మిగులుతుంది?', correctAnswer: '60', acceptableAnswers: ['60'], hintEn: '150 - 90.', hintTe: '150 - 90.', explanationEn: '60 rupees.', explanationTe: '60 రూపాయలు.' },
      { id: 'q-i-ch5-8', promptEn: 'Price of 1 toy is 250 rupees. Cost of 2 toys?', promptTe: '1 బొమ్మ ధర 250 రూపాయలు. 2 బొమ్మల ధర ఎంత?', correctAnswer: '500', acceptableAnswers: ['500'], hintEn: '250 × 2.', hintTe: '250 × 2.', explanationEn: '500 rupees.', explanationTe: '500 రూపాయలు.' },
      { id: 'q-i-ch5-9', promptEn: 'Bill is 85 rupees, paid with 100 rupees. Change = ?', promptTe: 'బిల్లు 85 రూపాయలు, 100 రూపాయలు ఇచ్చారు. తిరిగి వచ్చేది ఎంత?', correctAnswer: '15', acceptableAnswers: ['15'], hintEn: '100 - 85.', hintTe: '100 - 85.', explanationEn: '15 rupees.', explanationTe: '15 రూపాయలు.' },
      { id: 'q-i-ch5-10', promptEn: '3 apples cost 60 rupees. Price per apple?', promptTe: '3 ఆపిల్స్ ధర 60 రూపాయలు. ఒక్క ఆపిల్ ధర ఎంత?', correctAnswer: '20', acceptableAnswers: ['20'], hintEn: '60 / 3.', hintTe: '60 / 3.', explanationEn: '20 rupees.', explanationTe: '20 రూపాయలు.' }
    ]
  },
  {
    id: 'i-ch6',
    level: 'Intermediate',
    chapterNumber: 6,
    titleEn: 'Meters to Centimeters',
    titleTe: 'మీటర్లను సెంటీమీటర్లలోకి మార్చడం',
    shortDescriptionEn: 'Convert meters to centimeters (e.g., 12 meters to centimeters, 1 meter to centimeters).',
    shortDescriptionTe: 'మీటర్లను సెంటీమీటర్లలోకి మార్చండి (ఉదా: 12 మీటర్లు, 1 మీటర్).',
    visualShape: 'triangle',
    shapeSvgType: 'circle',
    shapeNumberLabel: '6',
    badgeEn: 'Ready to be Learnt',
    badgeTe: 'నేర్చుకోవడానికి సిద్ధంగా ఉంది',
    preTestSummaryEn: '1 Meter = 100 Centimeters. To convert meters to centimeters, multiply by 100.',
    preTestSummaryTe: '1 మీటర్ = 100 సెంటీమీటర్లు. మీటర్లను సెంటీమీటర్లలోకి మార్చడానికి 100 తో గుణించాలి.',
    keyConceptsEn: ['1 Meter = 100 Centimeters', '12 Meters = 1200 Centimeters'],
    keyConceptsTe: ['1 మీటర్ = 100 సెంటీమీటర్లు', '12 మీటర్లు = 1200 సెంటీమీటర్లు'],
    visualDiagramType: 'counting_grid',
    testQuestions: [
      { id: 'q-i-ch6-1', promptEn: 'How many centimeters are in 12 Meters? (Type number)', promptTe: '12 మీటర్లలో ఎన్ని సెంటీమీటర్లు ఉంటాయి? (అంకె రాయండి)', correctAnswer: '1200', acceptableAnswers: ['1200', '1200 cm'], hintEn: '12 × 100.', hintTe: '12 × 100.', explanationEn: '12 × 100 = 1200 cm.', explanationTe: '12 × 100 = 1200 సెం.మీ.' },
      { id: 'q-i-ch6-2', promptEn: 'How many centimeters are in 1 Meter? (Type number)', promptTe: '1 మీటర్లో ఎన్ని సెంటీమీటర్లు ఉంటాయి? (అంకె రాయండి)', correctAnswer: '100', acceptableAnswers: ['100', '100 cm'], hintEn: '1 × 100.', hintTe: '1 × 100.', explanationEn: '100 cm.', explanationTe: '100 సెంటీమీటర్లు.' },
      { id: 'q-i-ch6-3', promptEn: 'How many cm in 5 Meters?', promptTe: '5 మీటర్లలో ఎన్ని సెం.మీ.?', correctAnswer: '500', acceptableAnswers: ['500'], hintEn: '5 × 100.', hintTe: '5 × 100.', explanationEn: '500 cm.', explanationTe: '500 సెం.మీ.' },
      { id: 'q-i-ch6-4', promptEn: 'How many cm in 8.5 Meters?', promptTe: '8.5 మీటర్లలో ఎన్ని సెం.మీ.?', correctAnswer: '850', acceptableAnswers: ['850'], hintEn: '8.5 × 100.', hintTe: '8.5 × 100.', explanationEn: '850 cm.', explanationTe: '850 సెం.మీ.' },
      { id: 'q-i-ch6-5', promptEn: 'How many cm in 20 Meters?', promptTe: '20 మీటర్లలో ఎన్ని సెం.మీ.?', correctAnswer: '2000', acceptableAnswers: ['2000'], hintEn: '20 × 100.', hintTe: '20 × 100.', explanationEn: '2000 cm.', explanationTe: '2000 సెం.మీ.' },
      { id: 'q-i-ch6-6', promptEn: 'How many cm in 3 Meters?', promptTe: '3 మీటర్లలో ఎన్ని సెం.మీ.?', correctAnswer: '300', acceptableAnswers: ['300'], hintEn: '3 × 100.', hintTe: '3 × 100.', explanationEn: '300 cm.', explanationTe: '300 సెం.మీ.' },
      { id: 'q-i-ch6-7', promptEn: 'How many cm in 15 Meters?', promptTe: '15 మీటర్లలో ఎన్ని సెం.మీ.?', correctAnswer: '1500', acceptableAnswers: ['1500'], hintEn: '15 × 100.', hintTe: '15 × 100.', explanationEn: '1500 cm.', explanationTe: '1500 సెం.మీ.' },
      { id: 'q-i-ch6-8', promptEn: 'How many cm in 0.5 Meters?', promptTe: '0.5 మీటర్లలో ఎన్ని సెం.మీ.?', correctAnswer: '50', acceptableAnswers: ['50'], hintEn: '0.5 × 100.', hintTe: '0.5 × 100.', explanationEn: '50 cm.', explanationTe: '50 సెం.మీ.' },
      { id: 'q-i-ch6-9', promptEn: 'How many cm in 10 Meters?', promptTe: '10 మీటర్లలో ఎన్ని సెం.మీ.?', correctAnswer: '1000', acceptableAnswers: ['1000'], hintEn: '10 × 100.', hintTe: '10 × 100.', explanationEn: '1000 cm.', explanationTe: '1000 సెం.మీ.' },
      { id: 'q-i-ch6-10', promptEn: 'How many cm in 50 Meters?', promptTe: '50 మీటర్లలో ఎన్ని సెం.మీ.?', correctAnswer: '5000', acceptableAnswers: ['5000'], hintEn: '50 × 100.', hintTe: '50 × 100.', explanationEn: '5000 cm.', explanationTe: '5000 సెం.మీ.' }
    ]
  },
  {
    id: 'i-ch7',
    level: 'Intermediate',
    chapterNumber: 7,
    titleEn: 'Kilograms to Grams',
    titleTe: 'కిలోగ్రాములను గ్రాములలోకి మార్చడం',
    shortDescriptionEn: 'Convert kilograms to grams (e.g., 50.3 kgs to gms, 12 kgs to grams).',
    shortDescriptionTe: 'కిలోలను గ్రాములలోకి మార్చండి (ఉదా: 50.3 కిలోలు, 12 కిలోలు).',
    visualShape: 'square',
    shapeSvgType: 'square',
    shapeNumberLabel: '7',
    badgeEn: 'Ready to be Learnt',
    badgeTe: 'నేర్చుకోవడానికి సిద్ధంగా ఉంది',
    preTestSummaryEn: '1 Kilogram = 1000 Grams. To convert kilograms to grams, multiply by 1000.',
    preTestSummaryTe: '1 కిలోగ్రామ్ = 1000 గ్రాములు. కిలోలను గ్రాములలోకి మార్చడానికి 1000 తో గుణించాలి.',
    keyConceptsEn: ['1 Kg = 1000 Grams', '50.3 Kgs = 50300 Grams', '12 Kgs = 12000 Grams'],
    keyConceptsTe: ['1 కిలో = 1000 గ్రాములు', '50.3 కిలోలు = 50300 గ్రాములు', '12 కిలోలు = 12000 గ్రాములు'],
    visualDiagramType: 'counting_grid',
    testQuestions: [
      { id: 'q-i-ch7-1', promptEn: 'How many grams are in 50.3 Kilograms? (Type number)', promptTe: '50.3 కిలోగ్రాములలో ఎన్ని గ్రాములు ఉంటాయి? (అంకె రాయండి)', correctAnswer: '50300', acceptableAnswers: ['50300', '50300 g'], hintEn: 'Multiply 50.3 by 1000.', hintTe: '50.3 ని 1000 తో గుణించండి.', explanationEn: '50.3 × 1000 = 50300 grams.', explanationTe: '50.3 × 1000 = 50300 గ్రాములు.' },
      { id: 'q-i-ch7-2', promptEn: 'How many grams are in 12 Kilograms? (Type number)', promptTe: '12 కిలోగ్రాములలో ఎన్ని గ్రాములు ఉంటాయి? (అంకె రాయండి)', correctAnswer: '12000', acceptableAnswers: ['12000', '12000 g'], hintEn: 'Multiply 12 by 1000.', hintTe: '12 ని 1000 తో గుణించండి.', explanationEn: '12 × 1000 = 12000 grams.', explanationTe: '12 × 1000 = 12000 గ్రాములు.' },
      { id: 'q-i-ch7-3', promptEn: 'How many grams in 1 Kg?', promptTe: '1 కిలోలో ఎన్ని గ్రాములు?', correctAnswer: '1000', acceptableAnswers: ['1000'], hintEn: '1 × 1000.', hintTe: '1 × 1000.', explanationEn: '1000 grams.', explanationTe: '1000 గ్రాములు.' },
      { id: 'q-i-ch7-4', promptEn: 'How many grams in 5 Kgs?', promptTe: '5 కిలోలలో ఎన్ని గ్రాములు?', correctAnswer: '5000', acceptableAnswers: ['5000'], hintEn: '5 × 1000.', hintTe: '5 × 1000.', explanationEn: '5000 grams.', explanationTe: '5000 గ్రాములు.' },
      { id: 'q-i-ch7-5', promptEn: 'How many grams in 2.5 Kgs?', promptTe: '2.5 కిలోలలో ఎన్ని గ్రాములు?', correctAnswer: '2500', acceptableAnswers: ['2500'], hintEn: '2.5 × 1000.', hintTe: '2.5 × 1000.', explanationEn: '2500 grams.', explanationTe: '2500 గ్రాములు.' },
      { id: 'q-i-ch7-6', promptEn: 'How many grams in 10 Kgs?', promptTe: '10 కిలోలలో ఎన్ని గ్రాములు?', correctAnswer: '10000', acceptableAnswers: ['10000'], hintEn: '10 × 1000.', hintTe: '10 × 1000.', explanationEn: '10000 grams.', explanationTe: '10000 గ్రాములు.' },
      { id: 'q-i-ch7-7', promptEn: 'How many grams in 0.75 Kgs?', promptTe: '0.75 కిలోలలో ఎన్ని గ్రాములు?', correctAnswer: '750', acceptableAnswers: ['750'], hintEn: '0.75 × 1000.', hintTe: '0.75 × 1000.', explanationEn: '750 grams.', explanationTe: '750 గ్రాములు.' },
      { id: 'q-i-ch7-8', promptEn: 'How many grams in 15 Kgs?', promptTe: '15 కిలోలలో ఎన్ని గ్రాములు?', correctAnswer: '15000', acceptableAnswers: ['15000'], hintEn: '15 × 1000.', hintTe: '15 × 1000.', explanationEn: '15000 grams.', explanationTe: '15000 గ్రాములు.' },
      { id: 'q-i-ch7-9', promptEn: 'How many grams in 3.2 Kgs?', promptTe: '3.2 కిలోలలో ఎన్ని గ్రాములు?', correctAnswer: '3200', acceptableAnswers: ['3200'], hintEn: '3.2 × 1000.', hintTe: '3.2 × 1000.', explanationEn: '3200 grams.', explanationTe: '3200 గ్రాములు.' },
      { id: 'q-i-ch7-10', promptEn: 'How many grams in 100 Kgs?', promptTe: '100 కిలోలలో ఎన్ని గ్రాములు?', correctAnswer: '100000', acceptableAnswers: ['100000'], hintEn: '100 × 1000.', hintTe: '100 × 1000.', explanationEn: '100000 grams.', explanationTe: '100000 గ్రాములు.' }
    ]
  },

  // =========================================================================
  // 🔴 ADVANCED LEVEL (Classes 9 - 12 / Intermediate)
  // =========================================================================
  {
    id: 'a-ch1',
    level: 'Advanced',
    chapterNumber: 1,
    titleEn: 'Triple-Digit Operations',
    titleTe: 'త్రిఅంకె సంఖ్యా ఆపరేషన్లు',
    shortDescriptionEn: 'Master advanced triple-digit addition, subtraction, multiplication, and division.',
    shortDescriptionTe: 'త్రిఅంకె సంఖ్యల కూడిక, తీసివేత, గుణకార మరియు భాగాహార లెక్కలు.',
    visualShape: 'square',
    shapeSvgType: 'square',
    shapeNumberLabel: '1',
    badgeEn: 'Ready to be Learnt',
    badgeTe: 'నేర్చుకోవడానికి సిద్ధంగా ఉంది',
    preTestSummaryEn: 'Advanced arithmetic involving numbers in the hundreds and thousands.',
    preTestSummaryTe: 'వందలు మరియు వేల సంఖ్యలతో కూడిన ఉన్నత స్థాయి అంకగణితం.',
    keyConceptsEn: ['345 + 231 = 576', '500 - 125 = 375', '125 × 4 = 500'],
    keyConceptsTe: ['345 + 231 = 576', '500 - 125 = 375', '125 × 4 = 500'],
    visualDiagramType: 'counting_grid',
    testQuestions: [
      { id: 'q-a-ch1-1', promptEn: 'What is 345 + 231 = ?', promptTe: '345 + 231 = ? ఎంత?', correctAnswer: '576', acceptableAnswers: ['576'], hintEn: 'Add units, tens, hundreds.', hintTe: 'విడి, పదులు, వందలను కలపండి.', explanationEn: '345 + 231 = 576.', explanationTe: '345 + 231 = 576.' },
      { id: 'q-a-ch1-2', promptEn: 'What is 500 - 125 = ?', promptTe: '500 - 125 = ? ఎంత?', correctAnswer: '375', acceptableAnswers: ['375'], hintEn: 'Borrowing subtraction.', hintTe: 'అప్పు తెచ్చుకొని తీసివేయడం.', explanationEn: '500 - 125 = 375.', explanationTe: '500 - 125 = 375.' },
      { id: 'q-a-ch1-3', promptEn: 'What is 125 × 4 = ?', promptTe: '125 × 4 = ? ఎంత?', correctAnswer: '500', acceptableAnswers: ['500'], hintEn: 'Four 125s make 500.', hintTe: 'నాలుగు 125 లు 500.', explanationEn: '125 × 4 = 500.', explanationTe: '125 × 4 = 500.' },
      { id: 'q-a-ch1-4', promptEn: 'What is 840 / 4 = ?', promptTe: '840 / 4 = ? ఎంత?', correctAnswer: '210', acceptableAnswers: ['210'], hintEn: '840 divided by 4.', hintTe: '840 ని 4 తో భాగించండి.', explanationEn: '210.', explanationTe: '210.' },
      { id: 'q-a-ch1-5', promptEn: 'What is 456 + 321 = ?', promptTe: '456 + 321 = ? ఎంత?', correctAnswer: '777', acceptableAnswers: ['777'], hintEn: 'Add digits.', hintTe: 'అంకెలను కలపండి.', explanationEn: '777.', explanationTe: '777.' },
      { id: 'q-a-ch1-6', promptEn: 'What is 999 - 456 = ?', promptTe: '999 - 456 = ? ఎంత?', correctAnswer: '543', acceptableAnswers: ['543'], hintEn: 'Subtract digits.', hintTe: 'అంకెలను తీసివేయండి.', explanationEn: '543.', explanationTe: '543.' },
      { id: 'q-a-ch1-7', promptEn: 'What is 200 × 3 = ?', promptTe: '200 × 3 = ? ఎంత?', correctAnswer: '600', acceptableAnswers: ['600'], hintEn: '200 times 3.', hintTe: '200 మూడుల.', explanationEn: '600.', explanationTe: '600.' },
      { id: 'q-a-ch1-8', promptEn: 'What is 650 / 5 = ?', promptTe: '650 / 5 = ? ఎంత?', correctAnswer: '130', acceptableAnswers: ['130'], hintEn: '650 divided by 5.', hintTe: '650 ని 5 తో భాగించండి.', explanationEn: '130.', explanationTe: '130.' },
      { id: 'q-a-ch1-9', promptEn: 'What is 789 - 123 = ?', promptTe: '789 - 123 = ? ఎంత?', correctAnswer: '666', acceptableAnswers: ['666'], hintEn: '789 minus 123.', hintTe: '789 నుండి 123 తీసివేయండి.', explanationEn: '666.', explanationTe: '666.' },
      { id: 'q-a-ch1-10', promptEn: 'What is 300 × 3 = ?', promptTe: '300 × 3 = ? ఎంత?', correctAnswer: '900', acceptableAnswers: ['900'], hintEn: '300 times 3.', hintTe: '300 మూడుల.', explanationEn: '900.', explanationTe: '900.' }
    ]
  },
  {
    id: 'a-ch2',
    level: 'Advanced',
    chapterNumber: 2,
    titleEn: 'Time Conversions',
    titleTe: 'కాల మార్పిడి (గంటలు & నిమిషాలు)',
    shortDescriptionEn: 'Convert Hours to Minutes and vice versa (e.g., 12 hours into minutes, 50 minutes into hours).',
    shortDescriptionTe: 'గంటలను నిమిషాలలోకి మరియు నిమిషాలను గంటలలోకి మార్చండి.',
    visualShape: 'circle',
    shapeSvgType: 'circle',
    shapeNumberLabel: '2',
    badgeEn: 'Ready to be Learnt',
    badgeTe: 'నేర్చుకోవడానికి సిద్ధంగా ఉంది',
    preTestSummaryEn: '1 Hour = 60 Minutes. To convert hours to minutes, multiply by 60. To convert minutes to hours, divide by 60.',
    preTestSummaryTe: '1 గంట = 60 నిమిషాలు. గంటలను నిమిషాలకు మార్చడానికి 60 తో గుణించాలి.',
    keyConceptsEn: ['1 Hour = 60 Minutes', '12 Hours = 720 Minutes', '3 Hours = 180 Minutes'],
    keyConceptsTe: ['1 గంట = 60 నిమిషాలు', '12 గంటలు = 720 నిమిషాలు', '3 గంటలు = 180 నిమిషాలు'],
    visualDiagramType: 'counting_grid',
    testQuestions: [
      { id: 'q-a-ch2-1', promptEn: 'How many minutes are in 12 Hours? (Type number)', promptTe: '12 గంటలలో ఎన్ని నిమిషాలు ఉంటాయి? (అంకె రాయండి)', correctAnswer: '720', acceptableAnswers: ['720', '720 minutes'], hintEn: '12 × 60.', hintTe: '12 × 60.', explanationEn: '12 × 60 = 720 minutes.', explanationTe: '12 × 60 = 720 నిమిషాలు.' },
      { id: 'q-a-ch2-2', promptEn: 'How many hours are in 120 Minutes? (Type number)', promptTe: '120 నిమిషాలలో ఎన్ని గంటలు ఉంటాయి? (అంకె రాయండి)', correctAnswer: '2', acceptableAnswers: ['2', '2 hours'], hintEn: '120 / 60.', hintTe: '120 / 60.', explanationEn: '120 / 60 = 2 hours.', explanationTe: '120 / 60 = 2 గంటలు.' },
      { id: 'q-a-ch2-3', promptEn: 'How many minutes in 3 Hours?', promptTe: '3 గంటలలో ఎన్ని నిమిషాలు?', correctAnswer: '180', acceptableAnswers: ['180'], hintEn: '3 × 60.', hintTe: '3 × 60.', explanationEn: '180 minutes.', explanationTe: '180 నిమిషాలు.' },
      { id: 'q-a-ch2-4', promptEn: 'How many hours in 300 Minutes?', promptTe: '300 నిమిషాలలో ఎన్ని గంటలు?', correctAnswer: '5', acceptableAnswers: ['5'], hintEn: '300 / 60.', hintTe: '300 / 60.', explanationEn: '5 hours.', explanationTe: '5 గంటలు.' },
      { id: 'q-a-ch2-5', promptEn: 'How many minutes in 5 Hours?', promptTe: '5 గంటలలో ఎన్ని నిమిషాలు?', correctAnswer: '300', acceptableAnswers: ['300'], hintEn: '5 × 60.', hintTe: '5 × 60.', explanationEn: '300 minutes.', explanationTe: '300 నిమిషాలు.' },
      { id: 'q-a-ch2-6', promptEn: 'How many hours in 600 Minutes?', promptTe: '600 నిమిషాలలో ఎన్ని గంటలు?', correctAnswer: '10', acceptableAnswers: ['10'], hintEn: '600 / 60.', hintTe: '600 / 60.', explanationEn: '10 hours.', explanationTe: '10 గంటలు.' },
      { id: 'q-a-ch2-7', promptEn: 'How many minutes in 2.5 Hours?', promptTe: '2.5 గంటలలో ఎన్ని నిమిషాలు?', correctAnswer: '150', acceptableAnswers: ['150'], hintEn: '2.5 × 60.', hintTe: '2.5 × 60.', explanationEn: '150 minutes.', explanationTe: '150 నిమిషాలు.' },
      { id: 'q-a-ch2-8', promptEn: 'How many hours in 90 Minutes? (Answer as decimal or fraction like "1.5")', promptTe: '90 నిమిషాలలో ఎన్ని గంటలు? ("1.5" అని రాయండి)', correctAnswer: '1.5', acceptableAnswers: ['1.5', '1.5 hours'], hintEn: '90 / 60.', hintTe: '90 / 60.', explanationEn: '1.5 hours.', explanationTe: '1.5 గంటలు.' },
      { id: 'q-a-ch2-9', promptEn: 'How many minutes in 4 Hours?', promptTe: '4 గంటలలో ఎన్ని నిమిషాలు?', correctAnswer: '240', acceptableAnswers: ['240'], hintEn: '4 × 60.', hintTe: '4 × 60.', explanationEn: '240 minutes.', explanationTe: '240 నిమిషాలు.' },
      { id: 'q-a-ch2-10', promptEn: 'How many hours in 240 Minutes?', promptTe: '240 నిమిషాలలో ఎన్ని గంటలు?', correctAnswer: '4', acceptableAnswers: ['4'], hintEn: '240 / 60.', hintTe: '240 / 60.', explanationEn: '4 hours.', explanationTe: '4 గంటలు.' }
    ]
  },
  {
    id: 'a-ch3',
    level: 'Advanced',
    chapterNumber: 3,
    titleEn: 'Time: Word Problems',
    titleTe: 'కాలము: మాట లెక్కలు',
    shortDescriptionEn: 'Solve complex word problems involving time intervals, schedules, and elapsed time.',
    shortDescriptionTe: 'సమయ వ్యవధులు మరియు షెడ్యూళ్లతో కూడిన క్లిష్టమైన మాట లెక్కలను సాధించండి.',
    visualShape: 'triangle',
    shapeSvgType: 'triangle',
    shapeNumberLabel: '3',
    badgeEn: 'Ready to be Learnt',
    badgeTe: 'నేర్చుకోవడానికి సిద్ధంగా ఉంది',
    preTestSummaryEn: 'Elapsed time is the difference between a start time and an end time.',
    preTestSummaryTe: 'కాల వ్యవధి అనేది ప్రారంభ సమయానికి ముగింపు సమయానికి మధ్య తేడా.',
    keyConceptsEn: ['Add or subtract hours and minutes', 'Calculate total duration'],
    keyConceptsTe: ['గంటలు మరియు నిమిషాలను కూడండి లేదా తీసివేయండి', 'మొత్తం వ్యవధిని లెక్కించండి'],
    visualDiagramType: 'counting_grid',
    testQuestions: [
      { id: 'q-a-ch3-1', promptEn: 'A train starts at 08:30 AM and reaches its destination at 02:30 PM. How many hours did the journey take? (Type number)', promptTe: 'ఒక రైలు ఉదయం 08:30 AM కి బయలుదేరి మధ్యాహ్నం 02:30 PM కి చేరుకుంది. ప్రయాణానికి ఎన్ని గంటలు పట్టింది? (అంకె రాయండి)', correctAnswer: '6', acceptableAnswers: ['6', '6 hours'], hintEn: 'Count hours from 8:30 AM to 2:30 PM.', hintTe: 'ఉదయం 8:30 నుండి మధ్యాహ్నం 2:30 వరకు గంటలు లెక్కించండి.', explanationEn: 'Journey took 6 hours.', explanationTe: 'ప్రయాణానికి 6 గంటలు పట్టింది.' },
      { id: 'q-a-ch3-2', promptEn: 'An exam starts at 10:00 AM and lasts for 2 hours and 45 minutes. When does it finish? (Type as "12:45 PM")', promptTe: 'పరీక్ష ఉదయం 10:00 AM కి ప్రారంభమై 2 గంటల 45 నిమిషాలు సాగుతుంది. అది ఎప్పుడు ముగుస్తుంది? ("12:45 PM" అని రాయండి)', correctAnswer: '12:45 PM', acceptableAnswers: ['12:45 PM', '12:45 pm'], hintEn: 'Add 2 hrs 45 mins to 10:00 AM.', hintTe: '10:00 AM కి 2 గంటల 45 నిమిషాలు కలపండి.', explanationEn: 'Finishes at 12:45 PM.', explanationTe: 'మధ్యాహ్నం 12:45 PM కి ముగుస్తుంది.' },
      { id: 'q-a-ch3-3', promptEn: 'Movie runs for 1 hour 30 mins. If it starts at 4:00 PM, end time? (Type as "5:30 PM")', promptTe: 'సినిమా 1 గంట 30 నిమిషాలు నడుస్తుంది. 4:00 PM కి మొదలైతే ముగిసే సమయం ఎంత? ("5:30 PM" అని రాయండి)', correctAnswer: '5:30 PM', acceptableAnswers: ['5:30 PM', '5:30 pm'], hintEn: '4:00 + 1 hr 30 mins.', hintTe: '4:00 + 1 గంట 30 నిమిషాలు.', explanationEn: '5:30 PM.', explanationTe: '5:30 PM.' },
      { id: 'q-a-ch3-4', promptEn: 'You sleep for 8 hours. If you sleep at 10:00 PM, what time do you wake up? (Type as "6:00 AM")', promptTe: 'మీరు 8 గంటలు నిద్రపోతారు. రాత్రి 10:00 PM కి పడుకుంటే ఏ సమయంలో లేస్తారు? ("6:00 AM" అని రాయండి)', correctAnswer: '6:00 AM', acceptableAnswers: ['6:00 AM', '6:00 am', '6 AM'], hintEn: '10 PM + 8 hours.', hintTe: '10 PM + 8 గంటలు.', explanationEn: '6:00 AM.', explanationTe: 'ఉదయం 6:00 AM.' },
      { id: 'q-a-ch3-5', promptEn: 'Cooking takes 45 minutes. You start at 11:15 AM. Finish time? (Type as "12:00 PM")', promptTe: 'వంట చేయడానికి 45 నిమిషాలు పడుతుంది. మీరు 11:15 AM కి ప్రారంభిస్తే ఎప్పుడు ముగుస్తుంది? ("12:00 PM" అని రాయండి)', correctAnswer: '12:00 PM', acceptableAnswers: ['12:00 PM', '12:00 pm', '12 PM'], hintEn: '11:15 + 45 mins.', hintTe: '11:15 + 45 నిమిషాలు.', explanationEn: '12:00 PM.', explanationTe: '12:00 PM.' },
      { id: 'q-a-ch3-6', promptEn: 'A meeting lasted for 150 minutes. How many hours and minutes is that? (Type as "2h 30m" or "2.5 hours")', promptTe: 'సమావేశం 150 నిమిషాలు సాగింది. అది ఎన్ని గంటలు మరియు నిమిషాలు? ("2.5" లేదా "2.5 hours")', correctAnswer: '2.5', acceptableAnswers: ['2.5', '2.5 hours', '2h 30m'], hintEn: '150 / 60.', hintTe: '150 / 60.', explanationEn: '2.5 hours.', explanationTe: '2.5 గంటలు.' },
      { id: 'q-a-ch3-7', promptEn: 'School starts at 08:00 AM and ends at 02:00 PM. Total hours at school? (Type number)', promptTe: 'పాఠశాల ఉదయం 08:00 AM కి ప్రారంభమై మధ్యాహ్నం 02:00 PM కి ముగుస్తుంది. పాఠశాలలో మొత్తం ఎన్ని గంటలు? (అంకె రాయండి)', correctAnswer: '6', acceptableAnswers: ['6'], hintEn: '8 AM to 2 PM.', hintTe: '8 నుండి 2 వరకు.', explanationEn: '6 hours.', explanationTe: '6 గంటలు.' },
      { id: 'q-a-ch3-8', promptEn: 'Flight takes 3 hours 15 mins. Departure 09:00 AM. Arrival time? (Type as "12:15 PM")', promptTe: 'విమాన ప్రయాణం 3 గంటల 15 నిమిషాలు. బయలుదేరే సమయం 09:00 AM. చేరే సమయం ఎంత? ("12:15 PM")', correctAnswer: '12:15 PM', acceptableAnswers: ['12:15 PM', '12:15 pm'], hintEn: '9:00 AM + 3h 15m.', hintTe: '9:00 AM + 3గం 15ని.', explanationEn: '12:15 PM.', explanationTe: '12:15 PM.' },
      { id: 'q-a-ch3-9', promptEn: 'If it is 3:40 PM now, what time was it 2 hours ago? (Type as "1:40 PM")', promptTe: 'ఇప్పుడు సమయం 3:40 PM అయితే, 2 గంటల క్రితం ఎంత సమయం అయి ఉంటుంది? ("1:40 PM")', correctAnswer: '1:40 PM', acceptableAnswers: ['1:40 PM', '1:40 pm'], hintEn: '3:40 - 2 hours.', hintTe: '3:40 - 2 గంటలు.', explanationEn: '1:40 PM.', explanationTe: '1:40 PM.' },
      { id: 'q-a-ch3-10', promptEn: 'You practice guitar for 50 mins daily. Total minutes in 6 days? (Type number)', promptTe: 'మీరు ప్రతిరోజూ 50 నిమిషాలు గిటార్ సాధన చేస్తారు. 6 రోజులలో మొత్తం ఎన్ని నిమిషాలు? (అంకె రాయండి)', correctAnswer: '300', acceptableAnswers: ['300'], hintEn: '50 × 6.', hintTe: '50 × 6.', explanationEn: '300 minutes.', explanationTe: '300 నిమిషాలు.' }
    ]
  },
  {
    id: 'a-ch4',
    level: 'Advanced',
    chapterNumber: 4,
    titleEn: 'Budgeting and Expenditure',
    titleTe: 'బడ్జెట్ మరియు వ్యయ నిర్వహణ',
    shortDescriptionEn: 'Manage personal and project finances, income, savings, and expense allocations.',
    shortDescriptionTe: 'వ్యక్తిగత మరియు ప్రాజెక్ట్ ఆర్థిక నిర్వహణ, ఆదాయం, పొదుపు మరియు ఖర్చుల కేటాయింపులు.',
    visualShape: 'circle',
    shapeSvgType: 'square',
    shapeNumberLabel: '4',
    badgeEn: 'Ready to be Learnt',
    badgeTe: 'నేర్చుకోవడానికి సిద్ధంగా ఉంది',
    preTestSummaryEn: 'Savings = Total Income - Total Expenditure.',
    preTestSummaryTe: 'పొదుపు = మొత్తం ఆదాయం - మొత్తం ఖర్చు.',
    keyConceptsEn: ['Income minus expenses equals savings', 'Percentage budgeting basics'],
    keyConceptsTe: ['ఆదాయం నుండి ఖర్చులు తీసివేస్తే పొదుపు వస్తుంది', 'బడ్జెట్ ప్రాథమిక సూత్రాలు'],
    visualDiagramType: 'counting_grid',
    testQuestions: [
      { id: 'q-a-ch4-1', promptEn: 'Monthly income is 15000 rupees and expenses are 11000 rupees. What are the savings? (Type number)', promptTe: 'నెలవారీ ఆదాయం 15000 రూపాయలు మరియు ఖర్చులు 11000 రూపాయలు అయితే పొదుపు ఎంత? (అంకె రాయండి)', correctAnswer: '4000', acceptableAnswers: ['4000', '4000 rupees'], hintEn: '15000 - 11000.', hintTe: '15000 - 11000.', explanationEn: 'Savings = 4000 rupees.', explanationTe: 'పొదుపు = 4000 రూపాయలు.' },
      { id: 'q-a-ch4-2', promptEn: 'You allocate 3000 rupees for food, 2000 for rent, and 1000 for transport out of a 10000 budget. How much money is unallocated? (Type number)', promptTe: '10000 బడ్జెట్‌లో ఆహారానికి 3000, అద్దెకు 2000, రవాణాకు 1000 కేటాయించారు. మిగిలిన మొత్తం ఎంత?', correctAnswer: '4000', acceptableAnswers: ['4000'], hintEn: '10000 - (3000+2000+1000).', hintTe: '10000 - 6000.', explanationEn: '4000 rupees unallocated.', explanationTe: '4000 రూపాయలు మిగిలి ఉన్నాయి.' },
      { id: 'q-a-ch4-3', promptEn: 'Income is 25000 rupees, savings is 5000 rupees. Total expenditure?', promptTe: 'ఆదాయం 25000 రూపాయలు, పొదుపు 5000 రూపాయలు. మొత్తం ఖర్చు ఎంత?', correctAnswer: '20000', acceptableAnswers: ['20000'], hintEn: '25000 - 5000.', hintTe: '25000 - 5000.', explanationEn: '20000 rupees.', explanationTe: '20000 రూపాయలు.' },
      { id: 'q-a-ch4-4', promptEn: 'You save 1500 rupees per month. Total savings in 1 year (12 months)?', promptTe: 'మీరు నెలకు 1500 రూపాయలు పొదుపు చేస్తారు. 1 సంవత్సరంలో (12 నెలలు) మొత్తం పొదుపు ఎంత?', correctAnswer: '18000', acceptableAnswers: ['18000'], hintEn: '1500 × 12.', hintTe: '1500 × 12.', explanationEn: '18000 rupees.', explanationTe: '18000 రూపాయలు.' },
      { id: 'q-a-ch4-5', promptEn: 'Weekly budget is 3500 rupees. Spent 2800 rupees. Remaining amount?', promptTe: 'వారపు బడ్జెట్ 3500 రూపాయలు. 2800 రూపాయలు ఖర్చు చేశారు. మిగిలిన మొత్తం?', correctAnswer: '700', acceptableAnswers: ['700'], hintEn: '3500 - 2800.', hintTe: '3500 - 2800.', explanationEn: '700 rupees.', explanationTe: '700 రూపాయలు.' },
      { id: 'q-a-ch4-6', promptEn: 'Earned 50000 rupees, spent 35000 rupees. Savings percentage? (Just type the number 30)', promptTe: '50000 సంపాదించి 35000 ఖర్చు చేస్తే పొదుపు శాతం ఎంత? (అంకె 30 అని రాయండి)', correctAnswer: '30', acceptableAnswers: ['30', '30%'], hintEn: 'Saved 15000 out of 50000.', hintTe: '50000 లో 15000 పొదుపు.', explanationEn: '30%.', explanationTe: '30%.' },
      { id: 'q-a-ch4-7', promptEn: 'Project budget is 12000 rupees. Equipment cost 8500 rupees. Leftover?', promptTe: 'ప్రాజెక్ట్ బడ్జెట్ 12000 రూపాయలు. పరికరాల ఖర్చు 8500 రూపాయలు. మిగిలినది?', correctAnswer: '3500', acceptableAnswers: ['3500'], hintEn: '12000 - 8500.', hintTe: '12000 - 8500.', explanationEn: '3500 rupees.', explanationTe: '3500 రూపాయలు.' },
      { id: 'q-a-ch4-8', promptEn: 'Target is to save 24000 rupees in a year. Monthly savings required?', promptTe: 'సంవత్సరంలో 24000 రూపాయలు పొదుపు చేయాలనే లక్ష్యం. నెలవారీ పొదుపు ఎంత ఉండాలి?', correctAnswer: '2000', acceptableAnswers: ['2000'], hintEn: '24000 / 12.', hintTe: '24000 / 12.', explanationEn: '2000 rupees.', explanationTe: '2000 రూపాయలు.' },
      { id: 'q-a-ch4-9', promptEn: 'Total earnings 40000 rupees, expenses 25000 rupees. Net savings?', promptTe: 'మొత్తం సంపాదన 40000 రూపాయలు, ఖర్చులు 25000 రూపాయలు. నికర పొదుపు?', correctAnswer: '15000', acceptableAnswers: ['15000'], hintEn: '40000 - 25000.', hintTe: '40000 - 25000.', explanationEn: '15000 rupees.', explanationTe: '15000 రూపాయలు.' },
      { id: 'q-a-ch4-10', promptEn: 'Pocket money 500 rupees, spent 320 rupees. Saved?', promptTe: 'పాకెట్ మనీ 500 రూపాయలు, 320 రూపాయలు ఖర్చు చేశారు. పొదుపు ఎంత?', correctAnswer: '180', acceptableAnswers: ['180'], hintEn: '500 - 320.', hintTe: '500 - 320.', explanationEn: '180 rupees.', explanationTe: '180 రూపాయలు.' }
    ]
  },
  {
    id: 'a-ch5',
    level: 'Advanced',
    chapterNumber: 5,
    titleEn: 'Profit and Loss',
    titleTe: 'లాభం మరియు నష్టం',
    shortDescriptionEn: 'Calculate profit, loss, cost price, and selling price (e.g. buying 20 pens at 15 rupees each with 55 profit).',
    shortDescriptionTe: 'లాభం, నష్టం, కొన్న ధర మరియు అమ్మిన ధరను లెక్కించండి (ఉదా: 20 పెన్నుల కొనుగోలు మరియు 55 లాభం).',
    visualShape: 'square',
    shapeSvgType: 'triangle',
    shapeNumberLabel: '5',
    badgeEn: 'Ready to be Learnt',
    badgeTe: 'నేర్చుకోవడానికి సిద్ధంగా ఉంది',
    preTestSummaryEn: 'Profit = Selling Price - Cost Price. If you bought a cart of 20 pens each worth 15 rupees (Total CP = 300) and got a profit of 55 rupees, total SP = 355, so each pen was sold for 355 / 20 = 17.75 rupees.',
    preTestSummaryTe: 'లాభం = అమ్మిన ధర - కొన్న ధర. 15 రూపాయల విలువైన 20 పెన్నులు కొని 55 లాభం పొందితే, ఒక్కో పెన్ను ఎంతకు అమ్మారు?',
    keyConceptsEn: ['Profit = SP - CP', 'Loss = CP - SP', 'Total Selling Price = Total Cost Price + Profit'],
    keyConceptsTe: ['లాభం = అమ్మిన ధర - కొన్న ధర', 'నష్టం = కొన్న ధర - అమ్మిన ధర', 'మొత్తం అమ్మిన ధర = మొత్తం కొన్న ధర + లాభం'],
    visualDiagramType: 'counting_grid',
    testQuestions: [
      {
        id: 'q-a-ch5-1',
        promptEn: 'You bought a cart of 20 pens each worth 15 rupees, and got a total profit of 55 rupees. How much did you sell each pen for? (Type as "17.75")',
        promptTe: 'మీరు ఒక్కొక్కటి 15 రూపాయల చొప్పున 20 పెన్నులు కొని, మొత్తం 55 రూపాయల లాభం పొందారు. ఒక్కో పెన్ను ఎంతకు అమ్మారు? ("17.75" అని రాయండి)',
        correctAnswer: '17.75',
        acceptableAnswers: ['17.75', '17.75 rupees'],
        hintEn: 'Total Cost = 20 × 15 = 300. Total Selling Price = 300 + 55 = 355. Price per pen = 355 / 20.',
        hintTe: 'మొత్తం కొన్న ధర = 300. మొత్తం అమ్మిన ధర = 355. ఒక్కో పెన్ను ధర = 355 / 20.',
        explanationEn: '20 pens cost 300. With 55 profit, total selling price is 355. 355 / 20 = 17.75 rupees per pen.',
        explanationTe: '20 పెన్నుల కొన్న ధర 300. 55 లాభంతో మొత్తం 355. 355 / 20 = 17.75 రూపాయలు.'
      },
      { id: 'q-a-ch5-2', promptEn: 'An item is bought for 200 rupees and sold for 250 rupees. What is the profit? (Type number)', promptTe: 'ఒక వస్తువు 200 రూపాయలకు కొని 250 రూపాయలకు అమ్మారు. లాభం ఎంత?', correctAnswer: '50', acceptableAnswers: ['50'], hintEn: '250 - 200.', hintTe: '250 - 200.', explanationEn: 'Profit = 50 rupees.', explanationTe: 'లాభం = 50 రూపాయలు.' },
      { id: 'q-a-ch5-3', promptEn: 'An item is bought for 500 rupees and sold for 420 rupees. What is the loss? (Type number)', promptTe: 'ఒక వస్తువు 500 రూపాయలకు కొని 420 రూపాయలకు అమ్మారు. నష్టం ఎంత?', correctAnswer: '80', acceptableAnswers: ['80'], hintEn: '500 - 420.', hintTe: '500 - 420.', explanationEn: 'Loss = 80 rupees.', explanationTe: 'నష్టం = 80 రూపాయలు.' },
      { id: 'q-a-ch5-4', promptEn: 'Cost price is 1000 rupees, profit is 150 rupees. Selling price?', promptTe: 'కొన్న ధర 1000 రూపాయలు, లాభం 150 రూపాయలు. అమ్మిన ధర ఎంత?', correctAnswer: '1150', acceptableAnswers: ['1150'], hintEn: '1000 + 150.', hintTe: '1000 + 150.', explanationEn: '1150 rupees.', explanationTe: '1150 రూపాయలు.' },
      { id: 'q-a-ch5-5', promptEn: 'Selling price is 800 rupees, loss is 100 rupees. Cost price?', promptTe: 'అమ్మిన ధర 800 రూపాయలు, నష్టం 100 రూపాయలు. కొన్న ధర ఎంత?', correctAnswer: '900', acceptableAnswers: ['900'], hintEn: '800 + 100.', hintTe: '800 + 100.', explanationEn: '900 rupees.', explanationTe: '900 రూపాయలు.' },
      { id: 'q-a-ch5-6', promptEn: 'Bought 10 toys at 50 rupees each, sold all for 650 rupees total. Total profit?', promptTe: 'ఒక్కొక్కటి 50 రూపాయల చొప్పున 10 బొమ్మలు కొని, మొత్తం 650 రూపాయలకు అమ్మారు. మొత్తం లాభం ఎంత?', correctAnswer: '150', acceptableAnswers: ['150'], hintEn: 'CP = 500, SP = 650.', hintTe: 'కొన్న ధర = 500, అమ్మిన ధర = 650.', explanationEn: '650 - 500 = 150 rupees.', explanationTe: '650 - 500 = 150 రూపాయలు.' },
      { id: 'q-a-ch5-7', promptEn: 'Cost price 400 rupees, profit 25%. What is the profit in rupees?', promptTe: 'కొన్న ధర 400 రూపాయలు, లాభం 25%. రూపాయలలో లాభం ఎంత?', correctAnswer: '100', acceptableAnswers: ['100'], hintEn: '25% of 400.', hintTe: '400 లో 25%.', explanationEn: '100 rupees.', explanationTe: '100 రూపాయలు.' },
      { id: 'q-a-ch5-8', promptEn: 'Sold a bicycle for 3500 rupees with a profit of 500 rupees. Cost price?', promptTe: '3500 రూపాయలకు సైకిల్ అమ్మి 500 రూపాయల లాభం పొందారు. కొన్న ధర ఎంత?', correctAnswer: '3000', acceptableAnswers: ['3000'], hintEn: '3500 - 500.', hintTe: '3500 - 500.', explanationEn: '3000 rupees.', explanationTe: '3000 రూపాయలు.' },
      { id: 'q-a-ch5-9', promptEn: 'Bought a watch for 1200 rupees, sold at 10% loss. Selling price?', promptTe: 'గడియారం 1200 రూపాయలకు కొని 10% నష్టానికి అమ్మారు. అమ్మిన ధర ఎంత?', correctAnswer: '1080', acceptableAnswers: ['1080'], hintEn: '1200 - 120.', hintTe: '1200 - 120.', explanationEn: '1080 rupees.', explanationTe: '1080 రూపాయలు.' },
      { id: 'q-a-ch5-10', promptEn: 'Profit is 200 rupees on a cost of 800 rupees. Profit percentage? (Just type 25)', promptTe: '800 రూపాయల కొన్న ధరపై 200 రూపాయల లాభం. లాభ శాతం ఎంత? (25 అని రాయండి)', correctAnswer: '25', acceptableAnswers: ['25', '25%'], hintEn: '200 / 800 × 100.', hintTe: '200 / 800 × 100.', explanationEn: '25%.', explanationTe: '25%.' }
    ]
  },
  {
    id: 'a-ch6',
    level: 'Advanced',
    chapterNumber: 6,
    titleEn: 'Country Currencies & Value Differences',
    titleTe: 'దేశ కరెన్సీలు మరియు మారకం విలువలు',
    shortDescriptionEn: 'Convert between Indian Rupees and foreign currencies like US Dollars (e.g., 220 rupees into dollars, 12 dollars into rupees).',
    shortDescriptionTe: 'రూపాయలు మరియు US డాలర్ల వంటి విదేశీ కరెన్సీల మధ్య మార్పిడిని లెక్కించండి.',
    visualShape: 'triangle',
    shapeSvgType: 'circle',
    shapeNumberLabel: '6',
    badgeEn: 'Ready to be Learnt',
    badgeTe: 'నేర్చుకోవడానికి సిద్ధంగా ఉంది',
    preTestSummaryEn: 'Exchange rates determine how much of one currency you get for another. Assume 1 Dollar = 80 Rupees for these calculations.',
    preTestSummaryTe: 'మారకం విలువలు ఒక కరెన్సీకి మరో కరెన్సీ ఎంత వస్తుందో నిర్ణయిస్తాయి. (1 డాలర్ = 80 రూపాయలు అనుకోండి).',
    keyConceptsEn: ['1 US Dollar = 80 Rupees (Conversion standard)', 'Rupees to Dollars: divide by 80', 'Dollars to Rupees: multiply by 80'],
    keyConceptsTe: ['1 US డాలర్ = 80 రూపాయలు', 'రూపాయల నుండి డాలర్లు: 80 తో భాగించండి', 'డాలర్ల నుండి రూపాయలు: 80 తో గుణించండి'],
    visualDiagramType: 'counting_grid',
    testQuestions: [
      {
        id: 'q-a-ch6-1',
        promptEn: 'Assuming 1 Dollar = 80 Rupees, how many Dollars is 220 Rupees? (Type decimal like "2.75")',
        promptTe: '1 డాలర్ = 80 రూపాయలు అయితే, 220 రూపాయలు ఎన్ని డాలర్లు అవుతాయి? ("2.75" అని రాయండి)',
        correctAnswer: '2.75',
        acceptableAnswers: ['2.75', '2.75 dollars'],
        hintEn: '220 / 80.',
        hintTe: '220 / 80.',
        explanationEn: '220 / 80 = 2.75 Dollars.',
        explanationTe: '220 / 80 = 2.75 డాలర్లు.'
      },
      {
        id: 'q-a-ch6-2',
        promptEn: 'Assuming 1 Dollar = 80 Rupees, how many Rupees are in 12 Dollars? (Type number)',
        promptTe: '1 డాలర్ = 80 రూపాయలు అయితే, 12 డాలర్లు ఎన్ని రూపాయలు అవుతాయి? (అంకె రాయండి)',
        correctAnswer: '960',
        acceptableAnswers: ['960', '960 rupees'],
        hintEn: '12 × 80.',
        hintTe: '12 × 80.',
        explanationEn: '12 × 80 = 960 Rupees.',
        explanationTe: '12 × 80 = 960 రూపాయలు.'
      },
      { id: 'q-a-ch6-3', promptEn: 'If 1 Dollar = 80 Rupees, convert 400 Rupees to Dollars.', promptTe: '1 డాలర్ = 80 రూపాయలు అయితే, 400 రూపాయలను డాలర్లలోకి మార్చండి.', correctAnswer: '5', acceptableAnswers: ['5'], hintEn: '400 / 80.', hintTe: '400 / 80.', explanationEn: '5 Dollars.', explanationTe: '5 డాలర్లు.' },
      { id: 'q-a-ch6-4', promptEn: 'If 1 Dollar = 80 Rupees, convert 5 Dollars to Rupees.', promptTe: '1 డాలర్ = 80 రూపాయలు అయితే, 5 డాలర్లను రూపాయలలోకి మార్చండి.', correctAnswer: '400', acceptableAnswers: ['400'], hintEn: '5 × 80.', hintTe: '5 × 80.', explanationEn: '400 Rupees.', explanationTe: '400 రూపాయలు.' },
      { id: 'q-a-ch6-5', promptEn: 'If 1 Dollar = 80 Rupees, convert 1600 Rupees to Dollars.', promptTe: '1 డాలర్ = 80 రూపాయలు అయితే, 1600 రూపాయలను డాలర్లలోకి మార్చండి.', correctAnswer: '20', acceptableAnswers: ['20'], hintEn: '1600 / 80.', hintTe: '1600 / 80.', explanationEn: '20 Dollars.', explanationTe: '20 డాలర్లు.' },
      { id: 'q-a-ch6-6', promptEn: 'If 1 Dollar = 80 Rupees, convert 50 Dollars to Rupees.', promptTe: '1 డాలర్ = 80 రూపాయలు అయితే, 50 డాలర్లను రూపాయలలోకి మార్చండి.', correctAnswer: '4000', acceptableAnswers: ['4000'], hintEn: '50 × 80.', hintTe: '50 × 80.', explanationEn: '4000 Rupees.', explanationTe: '4000 రూపాయలు.' },
      { id: 'q-a-ch6-7', promptEn: 'If 1 Dollar = 80 Rupees, convert 800 Rupees to Dollars.', promptTe: '1 డాలర్ = 80 రూపాయలు అయితే, 800 రూపాయలను డాలర్లలోకి మార్చండి.', correctAnswer: '10', acceptableAnswers: ['10'], hintEn: '800 / 80.', hintTe: '800 / 80.', explanationEn: '10 Dollars.', explanationTe: '10 డాలర్లు.' },
      { id: 'q-a-ch6-8', promptEn: 'If 1 Dollar = 80 Rupees, convert 100 Dollars to Rupees.', promptTe: '1 డాలర్ = 80 రూపాయలు అయితే, 100 డాలర్లను రూపాయలలోకి మార్చండి.', correctAnswer: '8000', acceptableAnswers: ['8000'], hintEn: '100 × 80.', hintTe: '100 × 80.', explanationEn: '8000 Rupees.', explanationTe: '8000 రూపాయలు.' },
      { id: 'q-a-ch6-9', promptEn: 'If 1 Dollar = 80 Rupees, convert 2400 Rupees to Dollars.', promptTe: '1 డాలర్ = 80 రూపాయలు అయితే, 2400 రూపాయలను డాలర్లలోకి మార్చండి.', correctAnswer: '30', acceptableAnswers: ['30'], hintEn: '2400 / 80.', hintTe: '2400 / 80.', explanationEn: '30 Dollars.', explanationTe: '30 డాలర్లు.' },
      { id: 'q-a-ch6-10', promptEn: 'If 1 Dollar = 80 Rupees, convert 25 Dollars to Rupees.', promptTe: '1 డాలర్ = 80 రూపాయలు అయితే, 25 డాలర్లను రూపాయలలోకి మార్చండి.', correctAnswer: '2000', acceptableAnswers: ['2000'], hintEn: '25 × 80.', hintTe: '25 × 80.', explanationEn: '2000 Rupees.', explanationTe: '2000 రూపాయలు.' }
    ]
  }
];

export function getLevelForStudentClass(studentClass: StudentClass): StudentLevel {
  const option = STUDENT_CLASS_OPTIONS.find((c) => c.value === studentClass);
  return option ? option.level : 'Beginner';
}

export function getChaptersForLevel(level: StudentLevel): ChapterData[] {
  const filtered = CHAPTERS_DATA.filter((ch) => ch.level === level);
  if (filtered.length > 0) return filtered;
  return CHAPTERS_DATA.filter((ch) => ch.level === 'Beginner');
}

export function getChaptersForClass(studentClass: StudentClass): ChapterData[] {
  const level = getLevelForStudentClass(studentClass);
  return getChaptersForLevel(level);
}

export function getChapterById(chapterId: string): ChapterData | undefined {
  return CHAPTERS_DATA.find((ch) => ch.id === chapterId);
}

