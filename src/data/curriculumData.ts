import { StudentClass } from '../types';

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
  classLevel: StudentClass;
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
  // ===================== CLASS 1 =====================
  {
    id: 'c1-ch1',
    classLevel: 'Class 1',
    chapterNumber: 1,
    titleEn: 'Big and Small (Comparing Sizes)',
    titleTe: 'పెద్దది మరియు చిన్నది (పరిమాణాల పోలిక)',
    shortDescriptionEn: 'Learn to compare object sizes with visual animal and ball diagrams.',
    shortDescriptionTe: 'జంతువులు మరియు బంతుల చిత్రాలతో వస్తువుల పరిమాణాలను పోల్చడం నేర్చుకోండి.',
    visualShape: 'shapes',
    shapeSvgType: 'circle',
    shapeNumberLabel: '1',
    badgeEn: 'Ready to be Learnt',
    badgeTe: 'నేర్చుకోవడానికి సిద్ధంగా ఉంది',
    preTestSummaryEn: 'Sizes tell us how much space an object occupies. An Elephant is Big, while an Ant or Mouse is Small. A football is Big, and a marble is Small.',
    preTestSummaryTe: 'పరిమాణాలు ఒక వస్తువు ఎంత స్థలాన్ని ఆక్రమిస్తుందో చెబుతాయి. ఏనుగు పెద్దది, ఎలుక లేదా చీమ చిన్నది. ఫుట్‌బాల్ పెద్దది, గోళీ చిన్నది.',
    keyConceptsEn: [
      'Compare two objects side-by-side to spot which is larger or smaller.',
      'An elephant is Big; an ant is Small.',
      'Big objects take more space; small objects take less space.'
    ],
    keyConceptsTe: [
      'ఏది పెద్దదో, ఏది చిన్నదో తెలుసుకోవడానికి రెండు వస్తువులను పక్కపక్కనే ఉంచి చూడండి.',
      'ఏనుగు పెద్దది; చీమ చిన్నది.',
      'పెద్ద వస్తువులు ఎక్కువ స్థలాన్ని ఆక్రమిస్తాయి; చిన్న వస్తువులు తక్కువ స్థలాన్ని ఆక్రమిస్తాయి.'
    ],
    visualDiagramType: 'big_small',
    testQuestions: [
      {
        id: 'q-c1-ch1-1',
        promptEn: 'Between an Elephant and an Ant, which one is Big? (Type "Elephant" or "Ant")',
        promptTe: 'ఏనుగు మరియు చీమలో ఏది పెద్దది? ("Elephant" లేదా "Ant" అని రాయండి)',
        diagramType: 'big_small',
        diagramData: { left: 'Elephant', right: 'Ant' },
        correctAnswer: 'Elephant',
        acceptableAnswers: ['elephant', 'Elephant', 'ఏనుగు'],
        hintEn: 'Think about who is giant and heavy!',
        hintTe: 'ఎవరు భారీగా, ఎత్తుగా ఉంటారో ఆలోచించండి!',
        explanationEn: 'An elephant is much larger in size than an ant, so the Elephant is Big.',
        explanationTe: 'ఏనుగు చీమ కంటే పరిమాణంలో చాలా పెద్దది, కాబట్టి ఏనుగు పెద్దది.'
      },
      {
        id: 'q-c1-ch1-2',
        promptEn: 'Between a Basketball and a small Marble, which one is Small? (Type "Marble" or "Basketball")',
        promptTe: 'బాస్కెట్‌బాల్ మరియు చిన్న గోళీలో ఏది చిన్నది? ("Marble" లేదా "Basketball" అని రాయండి)',
        diagramType: 'big_small',
        diagramData: { left: 'Basketball', right: 'Marble' },
        correctAnswer: 'Marble',
        acceptableAnswers: ['marble', 'Marble', 'గోళీ'],
        hintEn: 'The marble fits in your fingertips easily!',
        hintTe: 'గోళీని మీ వేళ్ళతో సులభంగా పట్టుకోవచ్చు!',
        explanationEn: 'A marble is tiny and fits in one hand, while a basketball is much bigger.',
        explanationTe: 'గోళీ చాలా చిన్నదిగా చేతిలో ఇమిడిపోతుంది, కాబట్టి గోళీ చిన్నది.'
      },
      {
        id: 'q-c1-ch1-3',
        promptEn: 'Count the big stars shown in the diagram. How many big stars are there? (Type a number)',
        promptTe: 'చిత్రంలో ఉన్న పెద్ద నక్షత్రాలను లెక్కించండి. ఎన్ని పెద్ద నక్షత్రాలు ఉన్నాయి? (అంకె రాయండి)',
        diagramType: 'counting',
        diagramData: { totalItems: 3, itemType: 'big_star' },
        correctAnswer: '3',
        acceptableAnswers: ['3', 'three', 'మూడు'],
        hintEn: 'Look at the highlighted large yellow stars only.',
        hintTe: 'పెద్దగా ఉన్న పసుపు నక్షత్రాలను మాత్రమే లెక్కించండి.',
        explanationEn: 'There are exactly 3 large stars displayed in the diagram.',
        explanationTe: 'చిత్రంలో సరిగ్గా 3 పెద్ద నక్షత్రాలు ఉన్నాయి.'
      }
    ]
  },
  {
    id: 'c1-ch2',
    classLevel: 'Class 1',
    chapterNumber: 2,
    titleEn: 'Counting Objects (1 to 10)',
    titleTe: 'వస్తువులను లెక్కించడం (1 నుండి 10)',
    shortDescriptionEn: 'Count bright circles, stars, and apples one by one up to 10.',
    shortDescriptionTe: '10 వరకు వృత్తాలు, నక్షత్రాలు మరియు ఆపిల్స్‌ను ఒక్కొక్కటిగా లెక్కించండి.',
    visualShape: 'numbers',
    shapeSvgType: 'triangle',
    shapeNumberLabel: '2',
    badgeEn: 'Ready to be Learnt',
    badgeTe: 'నేర్చుకోవడానికి సిద్ధంగా ఉంది',
    preTestSummaryEn: 'Counting is matching one number word to each object in order: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10. The last number spoken tells the total quantity.',
    preTestSummaryTe: 'లెక్కించడం అంటే వరుసగా ప్రతి వస్తువుకు ఒక సంఖ్యను కేటాయించడం: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10. చివరగా వచ్చిన సంఖ్య మొత్తం సంఖ్యను తెలుపుతుంది.',
    keyConceptsEn: [
      'Touch each object once as you count.',
      'Always start from 1 and move in order.',
      'Counting helps you know exactly "how many" items there are.'
    ],
    keyConceptsTe: [
      'లెక్కిస్తున్నప్పుడు ప్రతి వస్తువును ఒక్కసారి మాత్రమే తాకండి.',
      'ఎల్లప్పుడూ 1 తో ప్రారంభించి క్రమంగా ముందుకు వెళ్ళండి.',
      'ఎన్ని వస్తువులు ఉన్నాయో తెలుసుకోవడానికి లెక్కించడం సహాయపడుతుంది.'
    ],
    visualDiagramType: 'counting_grid',
    testQuestions: [
      {
        id: 'q-c1-ch2-1',
        promptEn: 'Count the apples on the tray: 🍎 🍎 🍎 🍎 🍎. How many apples are there?',
        promptTe: 'ట్రేలోని ఆపిల్స్‌ను లెక్కించండి: 🍎 🍎 🍎 🍎 🍎. ఎన్ని ఆపిల్స్ ఉన్నాయి?',
        diagramType: 'counting',
        diagramData: { count: 5, icon: 'apple' },
        correctAnswer: '5',
        acceptableAnswers: ['5', 'five', 'ఐదు'],
        hintEn: 'Count one by one: 1, 2, 3, 4, ...',
        hintTe: 'ఒక్కొక్కటిగా లెక్కించండి: 1, 2, 3, 4, ...',
        explanationEn: 'There are 5 apples shown in the row.',
        explanationTe: 'వరుసలో 5 ఆపిల్స్ ఉన్నాయి.'
      },
      {
        id: 'q-c1-ch2-2',
        promptEn: 'Count the blue circles: 🔵 🔵 🔵 🔵 🔵 🔵 🔵. How many blue circles are there?',
        promptTe: 'నీలం రంగు వృత్తాలను లెక్కించండి: 🔵 🔵 🔵 🔵 🔵 🔵 🔵. ఎన్ని ఉన్నాయి?',
        diagramType: 'counting',
        diagramData: { count: 7, icon: 'circle' },
        correctAnswer: '7',
        acceptableAnswers: ['7', 'seven', 'ఏడు'],
        hintEn: '5 circles plus 2 more circles equals what?',
        hintTe: '5 వృత్తాలకు మరో 2 వృత్తాలు కలిపితే ఎంత?',
        explanationEn: '7 blue circles are displayed.',
        explanationTe: '7 నీలం రంగు వృత్తాలు ఉన్నాయి.'
      }
    ]
  },
  {
    id: 'c1-ch3',
    classLevel: 'Class 1',
    chapterNumber: 3,
    titleEn: 'Single-Digit Subtraction (Take Away)',
    titleTe: 'ఒకే అంకె తీసివేత (తీసివేయడం)',
    shortDescriptionEn: 'Master taking away objects using visual apple removal diagrams.',
    shortDescriptionTe: 'ఆపిల్ తొలగింపు రేఖాచిత్రాలతో వస్తువులను తీసివేయడం నేర్చుకోండి.',
    visualShape: 'circle',
    shapeSvgType: 'circle',
    shapeNumberLabel: '3',
    badgeEn: 'Ready to be Learnt',
    badgeTe: 'నేర్చుకోవడానికి సిద్ధంగా ఉంది',
    preTestSummaryEn: 'Subtraction means taking away part of a group to find how many are left. If you have 8 apples on a branch and 3 apples are eaten, 5 whole apples remain: 8 - 3 = 5.',
    preTestSummaryTe: 'తీసివేత అంటే సమూహం నుండి కొన్నింటిని తీసివేసి ఇంకా ఎన్ని మిగిలాయో కనుగొనడం. కొమ్మపై 8 ఆపిల్స్ ఉండి 3 ఆపిల్స్ తింటే, 5 ఆపిల్స్ మిగులుతాయి: 8 - 3 = 5.',
    keyConceptsEn: [
      'Subtraction is finding the remaining quantity after removing objects.',
      'The minus sign (−) means "take away" or "subtract".',
      '8 apples minus 3 eaten apples = 5 remaining apples.'
    ],
    keyConceptsTe: [
      'వస్తువులను తీసివేసిన తర్వాత మిగిలిన సంఖ్యను కనుగొనడమే తీసివేత.',
      'మైనస్ గుర్తు (−) అంటే "తీసివేయడం".',
      '8 ఆపిల్స్ నుండి 3 తిన్న ఆపిల్స్ తీసివేస్తే = 5 ఆపిల్స్ మిగులుతాయి.'
    ],
    visualDiagramType: 'subtraction_apples',
    testQuestions: [
      {
        id: 'q-c1-ch3-1',
        promptEn: 'Look at the apple branch: 8 apples were on the branch, and 3 apples were eaten. How many apples are left? (8 − 3 = ?)',
        promptTe: 'ఆపిల్ కొమ్మను చూడండి: 8 ఆపిల్స్ ఉండగా 3 తినివేయబడ్డాయి. ఇంకా ఎన్ని ఆపిల్స్ మిగిలి ఉన్నాయి? (8 − 3 = ?)',
        diagramType: 'subtraction_apples',
        diagramData: { initial: 8, removed: 3, remaining: 5 },
        correctAnswer: '5',
        acceptableAnswers: ['5', 'five', 'ఐదు'],
        hintEn: 'Count the remaining whole red apples.',
        hintTe: 'కొమ్మపై మిగిలిన ఎరుపు రంగు ఆపిల్స్‌ను లెక్కించండి.',
        explanationEn: '8 total apples minus 3 removed apples leaves 5 apples (8 − 3 = 5).',
        explanationTe: '8 ఆపిల్స్ నుండి 3 తీసివేస్తే 5 ఆపిల్స్ మిగులుతాయి (8 − 3 = 5).'
      },
      {
        id: 'q-c1-ch3-2',
        promptEn: 'You have 6 balloons and 2 fly away. How many balloons do you still have? (6 − 2 = ?)',
        promptTe: 'మీ వద్ద 6 బెలూన్లు ఉండగా 2 ఎగిరిపోయాయి. మీ వద్ద ఇంకా ఎన్ని బెలూన్లు ఉన్నాయి? (6 − 2 = ?)',
        diagramType: 'counting',
        diagramData: { initial: 6, removed: 2, remaining: 4 },
        correctAnswer: '4',
        acceptableAnswers: ['4', 'four', 'నాలుగు'],
        hintEn: 'Start at 6 and count backwards 2 steps: 5, 4...',
        hintTe: '6 నుండి 2 అడుగులు వెనక్కి లెక్కించండి: 5, 4...',
        explanationEn: '6 minus 2 equals 4.',
        explanationTe: '6 నుండి 2 తీసివేస్తే 4 వస్తుంది.'
      }
    ]
  },
  {
    id: 'c1-ch4',
    classLevel: 'Class 1',
    chapterNumber: 4,
    titleEn: 'Basic 2D Shapes (Circle, Square, Triangle)',
    titleTe: 'ప్రాథమిక 2D ఆకారాలు (వృత్తం, చతురస్రం, త్రిభుజం)',
    shortDescriptionEn: 'Identify corners and sides of triangles, squares, and circles.',
    shortDescriptionTe: 'త్రిభుజాలు, చతురస్రాలు మరియు వృత్తాల అంచులు మరియు మూలలను గుర్తించండి.',
    visualShape: 'triangle',
    shapeSvgType: 'triangle',
    shapeNumberLabel: '4',
    badgeEn: 'Ready to be Learnt',
    badgeTe: 'నేర్చుకోవడానికి సిద్ధంగా ఉంది',
    preTestSummaryEn: 'A Triangle has 3 sides and 3 corners. A Square has 4 equal straight sides and 4 corners. A Circle is round with no corners.',
    preTestSummaryTe: 'త్రిభుజానికి 3 భుజాలు మరియు 3 మూలలు ఉంటాయి. చతురస్రానికి 4 సమాన భుజాలు మరియు 4 మూలలు ఉంటాయి. వృత్తం గుండ్రంగా ఉండి ఎటువంటి మూలలు ఉండవు.',
    keyConceptsEn: [
      'Triangle: 3 straight sides, 3 corners (like a slice of pizza).',
      'Square: 4 equal sides, 4 corners (like a chess board or box).',
      'Circle: 1 curved continuous boundary, zero corners (like a wheel or coin).'
    ],
    keyConceptsTe: [
      'త్రిభుజం: 3 భుజాలు, 3 మూలలు (సమోసా లేదా పిజ్జా ముక్కలా).',
      'చతురస్రం: 4 సమాన భుజాలు, 4 మూలలు (క్యారమ్ బోర్డులా).',
      'వృత్తం: గుండ్రటి వంపు గీత, సున్నా మూలలు (నాణెం లేదా చక్రంలా).'
    ],
    visualDiagramType: 'shapes_geom',
    testQuestions: [
      {
        id: 'q-c1-ch4-1',
        promptEn: 'How many sides does a Triangle have? (Type a number)',
        promptTe: 'త్రిభుజానికి ఎన్ని భుజాలు ఉంటాయి? (అంకె రాయండి)',
        diagramType: 'shapes_geom',
        diagramData: { shape: 'triangle', sides: 3 },
        correctAnswer: '3',
        acceptableAnswers: ['3', 'three', 'మూడు'],
        hintEn: 'Tri means three!',
        hintTe: 'త్రి అంటే మూడు!',
        explanationEn: 'A triangle always has exactly 3 straight sides.',
        explanationTe: 'త్రిభుజానికి ఎల్లప్పుడూ 3 భుజాలు ఉంటాయి.'
      },
      {
        id: 'q-c1-ch4-2',
        promptEn: 'Which shape is round and has 0 corners? (Type "Circle", "Square", or "Triangle")',
        promptTe: 'గుండ్రంగా ఉండి 0 మూలలు కలిగిన ఆకారం ఏది? ("Circle", "Square", లేదా "Triangle" అని రాయండి)',
        diagramType: 'shapes_geom',
        diagramData: { shape: 'circle' },
        correctAnswer: 'Circle',
        acceptableAnswers: ['circle', 'Circle', 'వృత్తం'],
        hintEn: 'It looks like a full moon or a coin.',
        hintTe: 'ఇది నిండు చందమామ లేదా రూపాయి నాణెంలా ఉంటుంది.',
        explanationEn: 'A circle has no sharp corners and is completely round.',
        explanationTe: 'వృత్తానికి ఎటువంటి మూలలు ఉండవు, అది పూర్తిగా గుండ్రంగా ఉంటుంది.'
      }
    ]
  },

  // ===================== CLASS 2 =====================
  {
    id: 'c2-ch1',
    classLevel: 'Class 2',
    chapterNumber: 1,
    titleEn: 'Number Bonds to 10 & 20',
    titleTe: '10 & 20 కి సంఖ్య బంధాలు',
    shortDescriptionEn: 'Split numbers into friendly pairs to make mental addition lightning fast.',
    shortDescriptionTe: 'సులభమైన మానసిక కూడిక కోసం సంఖ్యలను జంటలుగా విభజించండి.',
    visualShape: 'numbers',
    shapeSvgType: 'square',
    shapeNumberLabel: '1',
    badgeEn: 'Ready to be Learnt',
    badgeTe: 'నేర్చుకోవడానికి సిద్ధంగా ఉంది',
    preTestSummaryEn: 'Number bonds show how numbers combine together: 7 + 3 = 10, 8 + 2 = 10, 6 + 4 = 10. Making 10 is the core secret of rapid mental math!',
    preTestSummaryTe: 'సంఖ్య బంధాలు సంఖ్యలు ఎలా కలుస్తాయో చూపుతాయి: 7 + 3 = 10, 8 + 2 = 10, 6 + 4 = 10. 10 చేయడం వేగవంతమైన గణిత రహస్యం!',
    keyConceptsEn: [
      'Number pairs that make 10: (1,9), (2,8), (3,7), (4,6), (5,5).',
      'Split incoming numbers to complete friendly tens first.'
    ],
    keyConceptsTe: [
      '10 ని రూపొందించే సంఖ్యల జంటలు: (1,9), (2,8), (3,7), (4,6), (5,5).',
      'కూడికను వేగవంతం చేయడానికి మొదట 10 వచ్చేలా సంఖ్యను విభజించండి.'
    ],
    visualDiagramType: 'number_bonds',
    testQuestions: [
      {
        id: 'q-c2-ch1-1',
        promptEn: 'What number added to 7 makes 10? (7 + ? = 10)',
        promptTe: '7 కి ఏ సంఖ్య కలిపితే 10 వస్తుంది? (7 + ? = 10)',
        diagramType: 'counting',
        correctAnswer: '3',
        acceptableAnswers: ['3', 'three', 'మూడు'],
        hintEn: 'Count on your fingers from 7 up to 10: 8, 9, 10.',
        hintTe: '7 నుండి 10 వరకు వేళ్ళపై లెక్కించండి.',
        explanationEn: '7 + 3 = 10.',
        explanationTe: '7 + 3 = 10.'
      },
      {
        id: 'q-c2-ch1-2',
        promptEn: 'What number added to 8 makes 10? (8 + ? = 10)',
        promptTe: '8 కి ఏ సంఖ్య కలిపితే 10 వస్తుంది? (8 + ? = 10)',
        diagramType: 'counting',
        correctAnswer: '2',
        acceptableAnswers: ['2', 'two', 'రెండు'],
        hintEn: '8 needs just two more to reach 10.',
        hintTe: '8 కి 10 కావడానికి మరో 2 మాత్రమే కావాలి.',
        explanationEn: '8 + 2 = 10.',
        explanationTe: '8 + 2 = 10.'
      }
    ]
  },
  {
    id: 'c2-ch2',
    classLevel: 'Class 2',
    chapterNumber: 2,
    titleEn: 'Skip Counting by 2s, 5s, and 10s',
    titleTe: '2లు, 5లు మరియు 10లతో జంప్ కౌంటింగ్',
    shortDescriptionEn: 'Jump along the number line by 2, 5, or 10 steps to count large sets quickly.',
    shortDescriptionTe: 'పెద్ద సమూహాలను వేగంగా లెక్కించడానికి 2, 5 లేదా 10 అడుగులు వేయండి.',
    visualShape: 'circle',
    shapeSvgType: 'circle',
    shapeNumberLabel: '2',
    badgeEn: 'Ready to be Learnt',
    badgeTe: 'నేర్చుకోవడానికి సిద్ధంగా ఉంది',
    preTestSummaryEn: 'Skip counting by 2s: 2, 4, 6, 8, 10, 12... Skip counting by 5s: 5, 10, 15, 20, 25... Skip counting by 10s: 10, 20, 30, 40, 50...',
    preTestSummaryTe: '2లతో జంప్: 2, 4, 6, 8, 10... 5లతో జంప్: 5, 10, 15, 20... 10లతో జంప్: 10, 20, 30, 40, 50...',
    keyConceptsEn: [
      'Skip counting is the fastest way to count groups of equal size.',
      'It lays the foundation for multiplication tables.'
    ],
    keyConceptsTe: [
      'సమాన పరిమాణంలో ఉన్న సమూహాలను లెక్కించడానికి స్కిప్ కౌంటింగ్ ఉత్తమ మార్గం.',
      'ఇది గుణకార పట్టికలకు పునాది వేస్తుంది.'
    ],
    visualDiagramType: 'counting_grid',
    testQuestions: [
      {
        id: 'q-c2-ch2-1',
        promptEn: 'Fill in the next number in the pattern: 2, 4, 6, 8, ?',
        promptTe: 'ఈ క్రమంలో తదుపరి సంఖ్యను రాయండి: 2, 4, 6, 8, ?',
        correctAnswer: '10',
        acceptableAnswers: ['10', 'ten', 'పది'],
        hintEn: 'Add 2 to 8.',
        hintTe: '8 కి 2 కలపండి.',
        explanationEn: 'Counting by 2s: 8 + 2 = 10.',
        explanationTe: '2లతో లెక్కింపు: 8 + 2 = 10.'
      },
      {
        id: 'q-c2-ch2-2',
        promptEn: 'Fill in the missing number: 5, 10, 15, ? , 25',
        promptTe: 'లోపించిన సంఖ్యను పూరించండి: 5, 10, 15, ? , 25',
        correctAnswer: '20',
        acceptableAnswers: ['20', 'twenty', 'ఇరవై'],
        hintEn: 'Add 5 to 15.',
        hintTe: '15 కి 5 కలపండి.',
        explanationEn: '15 + 5 = 20.',
        explanationTe: '15 + 5 = 20.'
      }
    ]
  },

  // ===================== CLASS 3 =====================
  {
    id: 'c3-ch1',
    classLevel: 'Class 3',
    chapterNumber: 1,
    titleEn: 'Visual Multiplication Arrays (Rows & Columns)',
    titleTe: 'దృశ్య గుణకార వ్యూహాలు (వరుసలు & నిలువు వరుసలు)',
    shortDescriptionEn: 'Understand multiplication as repeated addition arranged in neat grid arrays.',
    shortDescriptionTe: 'గుణకారాన్ని వరుసల గ్రిడ్ శ్రేణులలో పునరావృత కూడికగా అర్థం చేసుకోండి.',
    visualShape: 'square',
    shapeSvgType: 'square',
    shapeNumberLabel: '1',
    badgeEn: 'Ready to be Learnt',
    badgeTe: 'నేర్చుకోవడానికి సిద్ధంగా ఉంది',
    preTestSummaryEn: 'An array has rows and columns. 4 rows with 6 dots in each row equals 4 × 6 = 24 dots in total. Multiplication is repeated addition!',
    preTestSummaryTe: 'శ్రేణిలో అడ్డ వరుసలు మరియు నిలువు వరుసలు ఉంటాయి. ప్రతి వరుసలో 6 చుక్కలతో 4 వరుసలు ఉంటే 4 × 6 = 24 చుక్కలు అవుతాయి.',
    keyConceptsEn: [
      'Rows go across horizontally; columns go down vertically.',
      'Total items = Rows × Columns.'
    ],
    keyConceptsTe: [
      'అడ్డ వరుసలు క్షితిజ సమాంతరంగా ఉంటాయి; నిలువు వరుసలు నిలువుగా ఉంటాయి.',
      'మొత్తం వస్తువులు = అడ్డ వరుసలు × నిలువు వరుసలు.'
    ],
    visualDiagramType: 'multiplication_array',
    testQuestions: [
      {
        id: 'q-c3-ch1-1',
        promptEn: 'An array has 3 rows with 4 stars in each row. How many stars in total? (3 × 4 = ?)',
        promptTe: 'ఒక గ్రిడ్‌లో ప్రతి వరుసలో 4 నక్షత్రాలతో 3 వరుసలు ఉన్నాయి. మొత్తం ఎన్ని నక్షత్రాలు? (3 × 4 = ?)',
        diagramType: 'array',
        diagramData: { rows: 3, cols: 4 },
        correctAnswer: '12',
        acceptableAnswers: ['12', 'twelve', 'పన్నెండు'],
        hintEn: 'Add 4 + 4 + 4.',
        hintTe: '4 + 4 + 4 ని కూడండి.',
        explanationEn: '3 rows of 4 equals 3 × 4 = 12.',
        explanationTe: '3 వరుసల్లో 4 చొప్పున 3 × 4 = 12.'
      },
      {
        id: 'q-c3-ch1-2',
        promptEn: 'What is 5 × 6 = ?',
        promptTe: '5 × 6 = ? ఎంత?',
        correctAnswer: '30',
        acceptableAnswers: ['30', 'thirty', 'ముప్పై'],
        hintEn: 'Count by 5s six times: 5, 10, 15, 20, 25, 30.',
        hintTe: '5లని ఆరు సార్లు లెక్కించండి: 5, 10, 15, 20, 25, 30.',
        explanationEn: '5 × 6 = 30.',
        explanationTe: '5 × 6 = 30.'
      }
    ]
  },

  // ===================== CLASS 4 =====================
  {
    id: 'c4-ch1',
    classLevel: 'Class 4',
    chapterNumber: 1,
    titleEn: 'Visual Fractions (Halves, Thirds, & Fourths)',
    titleTe: 'దృశ్య భిన్నాలు (సగాలు, మూడవ వంతులు & నాల్గవ వంతులు)',
    shortDescriptionEn: 'Explore visual fraction circles and shaded bars to see parts of a whole.',
    shortDescriptionTe: 'మొత్తంలో భాగాలను చూడటానికి వృత్తాలు మరియు బార్ల భిన్నాలను అన్వేషించండి.',
    visualShape: 'circle',
    shapeSvgType: 'circle',
    shapeNumberLabel: '1',
    badgeEn: 'Ready to be Learnt',
    badgeTe: 'నేర్చుకోవడానికి సిద్ధంగా ఉంది',
    preTestSummaryEn: 'A fraction represents equal parts of a whole. In 3/4, 4 is the denominator (total equal parts), and 3 is the numerator (parts we have or shaded).',
    preTestSummaryTe: 'భిన్నం అనేది మొత్తంలో సమాన భాగాలను సూచిస్తుంది. 3/4 లో, 4 అనేది హారం (మొత్తం భాగాలు), 3 అనేది లవం (మనం తీసుకున్న లేదా షేడ్ చేసిన భాగాలు).',
    keyConceptsEn: [
      'Numerator (Top): Number of parts taken.',
      'Denominator (Bottom): Total equal parts.',
      '1/2 is half, 1/4 is one quarter.'
    ],
    keyConceptsTe: [
      'లవం (పై భాగం): తీసుకున్న భాగాల సంఖ్య.',
      'హారం (క్రింది భాగం): మొత్తం సమాన భాగాలు.',
      '1/2 అంటే సగం, 1/4 అంటే పావు వంతు.'
    ],
    visualDiagramType: 'fraction_pie',
    testQuestions: [
      {
        id: 'q-c4-ch1-1',
        promptEn: 'A pizza is sliced into 4 equal slices. If you eat 1 slice, what fraction did you eat? (Type "1/4")',
        promptTe: 'ఒక పిజ్జా 4 సమాన ముక్కలుగా కోయబడింది. మీరు 1 ముక్క తింటే, మీరు తిన్న భిన్నం ఎంత? ("1/4" అని రాయండి)',
        diagramType: 'fraction',
        diagramData: { numerator: 1, denominator: 4 },
        correctAnswer: '1/4',
        acceptableAnswers: ['1/4', '0.25'],
        hintEn: '1 slice eaten out of 4 total slices.',
        hintTe: 'మొత్తం 4 ముక్కలలో 1 ముక్క తిన్నారు.',
        explanationEn: '1 part out of 4 equal parts is written as 1/4.',
        explanationTe: '4 సమాన భాగాలలో 1 భాగాన్ని 1/4 గా రాస్తారు.'
      },
      {
        id: 'q-c4-ch1-2',
        promptEn: 'If 2 out of 4 slices are eaten, what fraction is eaten? (Type "2/4" or "1/2")',
        promptTe: '4 ముక్కలలో 2 ముక్కలు తింటే, తిన్న భిన్నం ఎంత? ("2/4" లేదా "1/2" అని రాయండి)',
        correctAnswer: '2/4',
        acceptableAnswers: ['2/4', '1/2', '0.5'],
        hintEn: '2 parts out of 4 parts.',
        hintTe: '4 భాగాలలో 2 భాగాలు.',
        explanationEn: '2/4 simplifies to 1/2 (half).',
        explanationTe: '2/4 అనేది 1/2 కి సమానం (సగం).'
      }
    ]
  },

  // ===================== CLASS 5 =====================
  {
    id: 'c5-ch1',
    classLevel: 'Class 5',
    chapterNumber: 1,
    titleEn: 'Decimals & Money Calculations',
    titleTe: 'దశాంశాలు & ద్రవ్య గణనలు',
    shortDescriptionEn: 'Work with decimal points, tenths, hundredths, and rupee-paisa conversions.',
    shortDescriptionTe: 'దశాంశ బిందువులు, పదుల వంతులు, వందల వంతులు మరియు రూపాయల గణనలతో పనిచేయండి.',
    visualShape: 'numbers',
    shapeSvgType: 'triangle',
    shapeNumberLabel: '1',
    badgeEn: 'Ready to be Learnt',
    badgeTe: 'నేర్చుకోవడానికి సిద్ధంగా ఉంది',
    preTestSummaryEn: 'The decimal point separates whole numbers from fractional parts. In 14.50 rupees, 14 is whole rupees and 50 is paise (50/100).',
    preTestSummaryTe: 'దశాంశ బిందువు పూర్ణ సంఖ్యలను భిన్న భాగాల నుండి వేరు చేస్తుంది. 14.50 రూపాయలలో, 14 పూర్తి రూపాయలు మరియు 50 పైసలు.',
    keyConceptsEn: [
      'Line up decimal points vertically when adding or subtracting decimals.',
      '1 Rupee = 100 Paise.'
    ],
    keyConceptsTe: [
      'దశాంశాలను కూడేటప్పుడు దశాంశ బిందువులను నిలువుగా సమానంగా ఉంచండి.',
      '1 రూపాయి = 100 పైసలు.'
    ],
    visualDiagramType: 'counting_grid',
    testQuestions: [
      {
        id: 'q-c5-ch1-1',
        promptEn: 'What is 3.5 + 2.5 = ? (Type a number)',
        promptTe: '3.5 + 2.5 = ? ఎంత? (అంకె రాయండి)',
        correctAnswer: '6',
        acceptableAnswers: ['6', '6.0'],
        hintEn: 'Add 3 + 2 = 5, then add 0.5 + 0.5 = 1.0.',
        hintTe: '3 + 2 = 5 చేసి, 0.5 + 0.5 = 1 కలిపితే 6 అవుతుంది.',
        explanationEn: '3.5 + 2.5 = 6.0.',
        explanationTe: '3.5 + 2.5 = 6.'
      },
      {
        id: 'q-c5-ch1-2',
        promptEn: 'How many paise are in 5 Rupees? (1 Rupee = 100 Paise)',
        promptTe: '5 రూపాయలలో ఎన్ని పైసలు ఉంటాయి? (1 రూపాయి = 100 పైసలు)',
        correctAnswer: '500',
        acceptableAnswers: ['500', '500 paise'],
        hintEn: 'Multiply 5 × 100.',
        hintTe: '5 × 100 గుణించండి.',
        explanationEn: '5 × 100 = 500 paise.',
        explanationTe: '5 × 100 = 500 పైసలు.'
      }
    ]
  },

  // ===================== CLASS 6 =====================
  {
    id: 'c6-ch1',
    classLevel: 'Class 6',
    chapterNumber: 1,
    titleEn: 'Integers & Number Line Balancing',
    titleTe: 'పూర్ణ సంఖ్యలు & సంఖ్యా రేఖ సమతుల్యత',
    shortDescriptionEn: 'Understand positive numbers, negative numbers, and zero on a two-way number line.',
    shortDescriptionTe: 'సంఖ్యా రేఖపై ధన సంఖ్యలు, ఋణ సంఖ్యలు మరియు సున్నాను అర్థం చేసుకోండి.',
    visualShape: 'numbers',
    shapeSvgType: 'square',
    shapeNumberLabel: '1',
    badgeEn: 'Ready to be Learnt',
    badgeTe: 'నేర్చుకోవడానికి సిద్ధంగా ఉంది',
    preTestSummaryEn: 'Integers include positive numbers (+1, +2, +3...), negative numbers (-1, -2, -3...), and zero. Moving right increases value, moving left decreases value.',
    preTestSummaryTe: 'పూర్ణ సంఖ్యలలో ధన సంఖ్యలు, ఋణ సంఖ్యలు మరియు సున్నా ఉంటాయి. కుడివైపుకు వెళ్తే విలువ పెరుగుతుంది, ఎడమవైపుకు వెళ్తే తగ్గుతుంది.',
    keyConceptsEn: [
      'Zero is neither positive nor negative.',
      'Adding a negative number is the same as subtracting.'
    ],
    keyConceptsTe: [
      'సున్నా ధన సంఖ్య కాదు, ఋణ సంఖ్య కూడా కాదు.',
      'ఋణ సంఖ్యను కూడటం అంటే తీసివేయడంతో సమానం.'
    ],
    visualDiagramType: 'counting_grid',
    testQuestions: [
      {
        id: 'q-c6-ch1-1',
        promptEn: 'What is 5 + (-3) = ?',
        promptTe: '5 + (-3) = ? ఎంత?',
        correctAnswer: '2',
        acceptableAnswers: ['2', '+2'],
        hintEn: 'Starting at 5, move 3 steps to the left.',
        hintTe: '5 వద్ద ప్రారంభించి, 3 అడుగులు ఎడమవైపుకు వెళ్ళండి.',
        explanationEn: '5 + (-3) = 5 - 3 = 2.',
        explanationTe: '5 - 3 = 2.'
      }
    ]
  },

  // ===================== CLASS 7 =====================
  {
    id: 'c7-ch1',
    classLevel: 'Class 7',
    chapterNumber: 1,
    titleEn: 'Simple Linear Equations (Balance Scale)',
    titleTe: 'సరళ సమీకరణాలు (త్రాసు సమతుల్యత)',
    shortDescriptionEn: 'Isolate variables using the balance scale method: keep both sides equal.',
    shortDescriptionTe: 'త్రాసు సమతుల్యత పద్ధతిని ఉపయోగించి చరరాశి విలువను కనుగొనండి.',
    visualShape: 'triangle',
    shapeSvgType: 'triangle',
    shapeNumberLabel: '1',
    badgeEn: 'Ready to be Learnt',
    badgeTe: 'నేర్చుకోవడానికి సిద్ధంగా ఉంది',
    preTestSummaryEn: 'An equation is like a balanced scale. Whatever operation you apply to one side (addition, subtraction, multiplication, division), you must apply to the other side to keep it balanced.',
    preTestSummaryTe: 'సమీకరణం ఒక త్రాసు లాంటిది. ఒక వైపు ఏ మార్పు చేసినా రెండో వైపు కూడా సమానంగా చేయాలి.',
    keyConceptsEn: [
      'To solve for x, undo operations in reverse order.',
      'If 2x + 4 = 16, subtract 4 from both sides: 2x = 12, then divide by 2: x = 6.'
    ],
    keyConceptsTe: [
      'x విలువ కోసం వ్యతిరేక ప్రక్రియలను అనుసరించండి.',
      '2x + 4 = 16 అయితే, రెండు వైపులా 4 తీసివేస్తే 2x = 12, ఆపై 2 తో భాగిస్తే x = 6.'
    ],
    visualDiagramType: 'equation_balance',
    testQuestions: [
      {
        id: 'q-c7-ch1-1',
        promptEn: 'Solve for x: 3x = 21. What is the value of x?',
        promptTe: '3x = 21 అయితే, x విలువ ఎంత?',
        diagramType: 'balance',
        correctAnswer: '7',
        acceptableAnswers: ['7', 'x=7'],
        hintEn: 'Divide both sides by 3.',
        hintTe: 'రెండు వైపులా 3 తో భాగించండి.',
        explanationEn: 'x = 21 / 3 = 7.',
        explanationTe: 'x = 21 / 3 = 7.'
      },
      {
        id: 'q-c7-ch1-2',
        promptEn: 'Solve for x: x + 9 = 15. What is the value of x?',
        promptTe: 'x + 9 = 15 అయితే, x విలువ ఎంత?',
        correctAnswer: '6',
        acceptableAnswers: ['6', 'x=6'],
        hintEn: 'Subtract 9 from 15.',
        hintTe: '15 నుండి 9 తీసివేయండి.',
        explanationEn: 'x = 15 - 9 = 6.',
        explanationTe: 'x = 15 - 9 = 6.'
      }
    ]
  },

  // ===================== CLASS 8 =====================
  {
    id: 'c8-ch1',
    classLevel: 'Class 8',
    chapterNumber: 1,
    titleEn: 'Squares and Square Roots',
    titleTe: 'వర్గాలు మరియు వర్గమూలాలు',
    shortDescriptionEn: 'Discover perfect squares, geometric square areas, and square root calculations.',
    shortDescriptionTe: 'ఖచ్చితమైన వర్గాలు, చతురస్రాల వైశాల్యాలు మరియు వర్గమూలాలను కనుగొనండి.',
    visualShape: 'square',
    shapeSvgType: 'square',
    shapeNumberLabel: '1',
    badgeEn: 'Ready to be Learnt',
    badgeTe: 'నేర్చుకోవడానికి సిద్ధంగా ఉంది',
    preTestSummaryEn: 'Squaring a number means multiplying it by itself: 6² = 6 × 6 = 36. The square root (√) is the inverse: √36 = 6.',
    preTestSummaryTe: 'ఒక సంఖ్యను అదే సంఖ్యతో గుణిస్తే వర్గం వస్తుంది: 6² = 6 × 6 = 36. వర్గమూలం (√) దానికి వ్యతిరేకం: √36 = 6.',
    keyConceptsEn: [
      'A square of side 5 has an area of 5 × 5 = 25.',
      'Perfect squares include 1, 4, 9, 16, 25, 36, 49, 64, 81, 100.'
    ],
    keyConceptsTe: [
      '5 భుజం గల చతురస్ర వైశాల్యం 5 × 5 = 25.',
      'ఖచ్చితమైన వర్గాలు: 1, 4, 9, 16, 25, 36, 49, 64, 81, 100.'
    ],
    visualDiagramType: 'multiplication_array',
    testQuestions: [
      {
        id: 'q-c8-ch1-1',
        promptEn: 'What is 8² (8 squared)?',
        promptTe: '8² (8 వర్గం) ఎంత?',
        correctAnswer: '64',
        acceptableAnswers: ['64'],
        hintEn: 'Multiply 8 by 8.',
        hintTe: '8 ని 8 తో గుణించండి.',
        explanationEn: '8 × 8 = 64.',
        explanationTe: '8 × 8 = 64.'
      },
      {
        id: 'q-c8-ch1-2',
        promptEn: 'What is the square root of 49? (√49 = ?)',
        promptTe: '49 యొక్క వర్గమూలం ఎంత? (√49 = ?)',
        correctAnswer: '7',
        acceptableAnswers: ['7'],
        hintEn: 'What number multiplied by itself gives 49?',
        hintTe: 'ఏ సంఖ్యను దాంతోనే గుణిస్తే 49 వస్తుంది?',
        explanationEn: '7 × 7 = 49, so √49 = 7.',
        explanationTe: '7 × 7 = 49, కాబట్టి √49 = 7.'
      }
    ]
  },

  // ===================== CLASS 9 =====================
  {
    id: 'c9-ch1',
    classLevel: 'Class 9',
    chapterNumber: 1,
    titleEn: 'Coordinate Geometry & Cartesian Plane',
    titleTe: 'నిరూపక జ్యామితి & కార్టీసియన్ తలం',
    shortDescriptionEn: 'Plot points with X and Y axes, quadrants, and coordinates (x, y).',
    shortDescriptionTe: 'X మరియు Y అక్షాలు, పాదాలు మరియు బిందువులతో పనిచేయండి.',
    visualShape: 'shapes',
    shapeSvgType: 'triangle',
    shapeNumberLabel: '1',
    badgeEn: 'Ready to be Learnt',
    badgeTe: 'నేర్చుకోవడానికి సిద్ధంగా ఉంది',
    preTestSummaryEn: 'The Cartesian plane has a horizontal X-axis and a vertical Y-axis intersecting at the Origin (0,0). Every point is written as (x, y).',
    preTestSummaryTe: 'కార్టీసియన్ తలంలో క్షితిజ సమాంతర X-అక్షం మరియు నిలువు Y-అక్షం ఉంటాయి. మూల బిందువు (0,0). ప్రతి బిందువు (x, y) గా వ్రాయబడుతుంది.',
    keyConceptsEn: [
      'X-coordinate (Abscissa) is distance from Y-axis.',
      'Y-coordinate (Ordinate) is distance from X-axis.',
      'The Origin is (0, 0).'
    ],
    keyConceptsTe: [
      'X-నిరూపకం Y-అక్షం నుండి దూరాన్ని సూచిస్తుంది.',
      'Y-నిరూపకం X-అక్షం నుండి దూరాన్ని సూచిస్తుంది.',
      'మూల బిందువు (0, 0).'
    ],
    visualDiagramType: 'counting_grid',
    testQuestions: [
      {
        id: 'q-c9-ch1-1',
        promptEn: 'What are the coordinates of the Origin? (Format: "(0,0)" or "0,0")',
        promptTe: 'మూల బిందువు యొక్క నిరూపకాలు ఏమిటి? ("(0,0)" లేదా "0,0" అని రాయండి)',
        correctAnswer: '(0,0)',
        acceptableAnswers: ['(0,0)', '0,0', '(0, 0)', '0, 0'],
        hintEn: 'Both x and y are zero.',
        hintTe: 'x మరియు y రెండూ సున్నా.',
        explanationEn: 'The origin is where both axes meet, at coordinates (0, 0).',
        explanationTe: 'రెండు అక్షాలు కలిసే స్థానం మూల బిందువు (0, 0).'
      }
    ]
  },

  // ===================== CLASS 10 =====================
  {
    id: 'c10-ch1',
    classLevel: 'Class 10',
    chapterNumber: 1,
    titleEn: 'Trigonometry & Right-Angled Triangles',
    titleTe: 'త్రికోణమితి & లంబకోణ త్రిభుజాలు',
    shortDescriptionEn: 'Master sine, cosine, tangent ratios and the Pythagorean Theorem.',
    shortDescriptionTe: 'సైన్, కొసైన్, టాంజెంట్ నిష్పత్తులు మరియు పైథాగరస్ సిద్ధాంతాన్ని నేర్చుకోండి.',
    visualShape: 'triangle',
    shapeSvgType: 'triangle',
    shapeNumberLabel: '1',
    badgeEn: 'Ready to be Learnt',
    badgeTe: 'నేర్చుకోవడానికి సిద్ధంగా ఉంది',
    preTestSummaryEn: 'Trigonometry studies relationships between sides and angles of right-angled triangles. Sin θ = Opposite / Hypotenuse, Cos θ = Adjacent / Hypotenuse, Tan θ = Opposite / Adjacent.',
    preTestSummaryTe: 'త్రికోణమితి లంబకోణ త్రిభుజం యొక్క భుజాలు మరియు కోణాల సంబంధాలను అధ్యయనం చేస్తుంది. Sin θ = ఎదుటి భుజం / కర్ణం, Cos θ = ఆసన్న భుజం / కర్ణం.',
    keyConceptsEn: [
      'Pythagorean Theorem: a² + b² = c² (Hypotenuse² = Base² + Perpendicular²).',
      'Tan θ = Sin θ / Cos θ.'
    ],
    keyConceptsTe: [
      'పైథాగరస్ సిద్ధాంతం: కర్ణం² = భుజం² + భుజం².',
      'Tan θ = ఎదుటి భుజం / ఆసన్న భుజం.'
    ],
    visualDiagramType: 'shapes_geom',
    testQuestions: [
      {
        id: 'q-c10-ch1-1',
        promptEn: 'In a right triangle with legs of length 3 and 4, what is the length of the hypotenuse? (3² + 4² = c²)',
        promptTe: '3 మరియు 4 పొడవు గల భుజాలు కలిగిన లంబకోణ త్రిభుజంలో కర్ణం పొడవు ఎంత? (3² + 4² = c²)',
        correctAnswer: '5',
        acceptableAnswers: ['5'],
        hintEn: '3² = 9, 4² = 16. What is √(9 + 16)?',
        hintTe: '9 + 16 = 25 యొక్క వర్గమూలం ఎంత?',
        explanationEn: '9 + 16 = 25. √25 = 5. The classic 3-4-5 right triangle!',
        explanationTe: '9 + 16 = 25, √25 = 5. కర్ణం పొడవు 5.'
      }
    ]
  }
];

export function getChaptersForClass(studentClass: StudentClass): ChapterData[] {
  const filtered = CHAPTERS_DATA.filter((ch) => ch.classLevel === studentClass);
  if (filtered.length > 0) return filtered;
  // Default fallback to Class 1 if not explicitly found
  return CHAPTERS_DATA.filter((ch) => ch.classLevel === 'Class 1');
}

export function getChapterById(chapterId: string): ChapterData | undefined {
  return CHAPTERS_DATA.find((ch) => ch.id === chapterId);
}
