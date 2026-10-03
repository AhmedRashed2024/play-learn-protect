// Egyptian-themed educational games data
// Ready for Supabase migration: replace with API calls

export const GAMES = [
  // Ages 3-5 Games
  {
    id: 'math-pyramids-35',
    title: 'Math Pyramids',
    titleAr: 'أهرامات الرياضيات',
    description: 'Count the pyramid blocks!',
    descriptionAr: 'عد كتل الأهرامات!',
    ageGroup: '3-5',
    subject: 'math',
    subjectAr: 'رياضيات',
    estimatedTime: 10,
    points: 50,
    icon: '🔢',
    difficulty: 'easy',
    published: true,
    image: null
  },
  {
    id: 'colors-nile-35',
    title: 'Nile Colors',
    titleAr: 'ألوان النيل',
    description: 'Learn colors with Nile animals!',
    descriptionAr: 'تعلم الألوان مع حيوانات النيل!',
    ageGroup: '3-5',
    subject: 'science',
    subjectAr: 'علوم',
    estimatedTime: 8,
    points: 40,
    icon: '🎨',
    difficulty: 'easy',
    published: true,
    image: null
  },
  {
    id: 'arabic-letters-35',
    title: 'Hieroglyphic Letters',
    titleAr: 'حروف الهيروغليفية',
    description: 'Trace Arabic letters like a scribe!',
    descriptionAr: 'ارسم الحروف العربية مثل الكاتب!',
    ageGroup: '3-5',
    subject: 'language',
    subjectAr: 'لغة',
    estimatedTime: 12,
    points: 60,
    icon: '✍️',
    difficulty: 'easy',
    published: true,
    image: null
  },
  {
    id: 'shapes-pharaoh-35',
    title: "Pharaoh's Shapes",
    titleAr: 'أشكال الفرعون',
    description: 'Match shapes in the palace!',
    descriptionAr: 'طابق الأشكال في القصر!',
    ageGroup: '3-5',
    subject: 'math',
    subjectAr: 'رياضيات',
    estimatedTime: 10,
    points: 45,
    icon: '🔷',
    difficulty: 'easy',
    published: true,
    image: null
  },

  // Ages 6-8 Games
  {
    id: 'math-sphinx-68',
    title: "Sphinx's Math Riddles",
    titleAr: 'ألغاز أبو الهول الرياضية',
    description: 'Solve riddles to unlock the sphinx!',
    descriptionAr: 'حل الألغاز لفتح أبو الهول!',
    ageGroup: '6-8',
    subject: 'math',
    subjectAr: 'رياضيات',
    estimatedTime: 15,
    points: 80,
    icon: '🦁',
    difficulty: 'medium',
    published: true,
    image: null
  },
  {
    id: 'science-mummy-68',
    title: 'Mummy Science Lab',
    titleAr: 'مختبر علوم المومياء',
    description: 'Discover ancient Egyptian science!',
    descriptionAr: 'اكتشف علوم مصر القديمة!',
    ageGroup: '6-8',
    subject: 'science',
    subjectAr: 'علوم',
    estimatedTime: 20,
    points: 100,
    icon: '🧪',
    difficulty: 'medium',
    published: true,
    image: null
  },
  {
    id: 'history-pharaohs-68',
    title: 'Pharaohs of Egypt',
    titleAr: 'فراعنة مصر',
    description: 'Learn about great Egyptian rulers!',
    descriptionAr: 'تعرف على حكام مصر العظماء!',
    ageGroup: '6-8',
    subject: 'history',
    subjectAr: 'تاريخ',
    estimatedTime: 15,
    points: 75,
    icon: '👑',
    difficulty: 'medium',
    published: true,
    image: null
  },
  {
    id: 'arabic-stories-68',
    title: 'Tales of the Nile',
    titleAr: 'حكايات النيل',
    description: 'Read and write Arabic stories!',
    descriptionAr: 'اقرأ واكتب قصص عربية!',
    ageGroup: '6-8',
    subject: 'language',
    subjectAr: 'لغة',
    estimatedTime: 18,
    points: 90,
    icon: '📖',
    difficulty: 'medium',
    published: true,
    image: null
  },
  {
    id: 'coding-obelisk-68',
    title: 'Obelisk Coding',
    titleAr: 'برمجة المسلة',
    description: 'Code patterns on the obelisk!',
    descriptionAr: 'ابرمج الأنماط على المسلة!',
    ageGroup: '6-8',
    subject: 'coding',
    subjectAr: 'برمجة',
    estimatedTime: 20,
    points: 100,
    icon: '💻',
    difficulty: 'medium',
    published: true,
    image: null
  },

  // Ages 9-12 Games
  {
    id: 'math-architect-912',
    title: 'Pyramid Architect',
    titleAr: 'مهندس الأهرامات',
    description: 'Calculate and build pyramids!',
    descriptionAr: 'احسب وابنِ الأهرامات!',
    ageGroup: '9-12',
    subject: 'math',
    subjectAr: 'رياضيات',
    estimatedTime: 25,
    points: 150,
    icon: '📐',
    difficulty: 'hard',
    published: true,
    image: null
  },
  {
    id: 'physics-catapult-912',
    title: 'Catapult Physics',
    titleAr: 'فيزياء المنجنيق',
    description: 'Learn physics by building catapults!',
    descriptionAr: 'تعلم الفيزياء ببناء المنجنيق!',
    ageGroup: '9-12',
    subject: 'physics',
    subjectAr: 'فيزياء',
    estimatedTime: 30,
    points: 180,
    icon: '⚙️',
    difficulty: 'hard',
    published: true,
    image: null
  },
  {
    id: 'chemistry-papyrus-912',
    title: 'Papyrus Chemistry',
    titleAr: 'كيمياء البردي',
    description: 'Mix potions like ancient Egyptians!',
    descriptionAr: 'امزج الجرعات مثل المصريين القدماء!',
    ageGroup: '9-12',
    subject: 'chemistry',
    subjectAr: 'كيمياء',
    estimatedTime: 25,
    points: 160,
    icon: '⚗️',
    difficulty: 'hard',
    published: true,
    image: null
  },
  {
    id: 'coding-hieroglyphs-912',
    title: 'Hieroglyph Decoder',
    titleAr: 'فك رموز الهيروغليفية',
    description: 'Code a hieroglyph translator!',
    descriptionAr: 'ابرمج مترجم الهيروغليفية!',
    ageGroup: '9-12',
    subject: 'coding',
    subjectAr: 'برمجة',
    estimatedTime: 35,
    points: 200,
    icon: '🔐',
    difficulty: 'hard',
    published: true,
    image: null
  },
  {
    id: 'english-ambassador-912',
    title: 'Egyptian Ambassador',
    titleAr: 'السفير المصري',
    description: 'Practice English as a diplomat!',
    descriptionAr: 'مارس الإنجليزية كدبلوماسي!',
    ageGroup: '9-12',
    subject: 'english',
    subjectAr: 'إنجليزي',
    estimatedTime: 20,
    points: 120,
    icon: '🌍',
    difficulty: 'hard',
    published: true,
    image: null
  },
  {
    id: 'history-cleopatra-912',
    title: "Cleopatra's Kingdom",
    titleAr: 'مملكة كليوباترا',
    description: 'Rule Egypt and make decisions!',
    descriptionAr: 'احكم مصر واتخذ القرارات!',
    ageGroup: '9-12',
    subject: 'history',
    subjectAr: 'تاريخ',
    estimatedTime: 30,
    points: 175,
    icon: '🐍',
    difficulty: 'hard',
    published: true,
    image: null
  }
];

// Get games by age group
export const getGamesByAgeGroup = (ageGroup) => {
  return GAMES.filter(game => game.ageGroup === ageGroup && game.published);
};

// Get game by ID
export const getGameById = (gameId) => {
  return GAMES.find(game => game.id === gameId);
};

// Get all published games
export const getPublishedGames = () => {
  return GAMES.filter(game => game.published);
};

// Get games by subject
export const getGamesBySubject = (subject) => {
  return GAMES.filter(game => game.subject === subject && game.published);
};

export default GAMES;
