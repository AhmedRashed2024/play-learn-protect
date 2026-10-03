// Learning modules data
// Each module corresponds to game subjects and provides educational content

export const LEARNING_MODULES = [
  {
    id: 'math-addition-subtraction',
    title: 'Addition & Subtraction',
    titleAr: 'الجمع والطرح',
    description: 'Learn to add and subtract numbers!',
    descriptionAr: 'تعلم جمع وطرح الأرقام!',
    ageGroup: '6-8',
    subject: 'math',
    subjectAr: 'رياضيات',
    estimatedTime: 20,
    icon: '➕',
    difficulty: 'medium',
    published: true,
    relatedGames: ['math-sphinx-68', 'math-pyramids-35']
  },
  {
    id: 'literature-storytelling',
    title: 'Storytelling & Characters',
    titleAr: 'سرد القصص والشخصيات',
    description: 'Learn about stories, characters, and how to tell your own!',
    descriptionAr: 'تعلم عن القصص والشخصيات وكيف تحكي قصتك الخاصة!',
    ageGroup: '6-8',
    subject: 'language',
    subjectAr: 'لغة',
    estimatedTime: 25,
    icon: '📖',
    difficulty: 'medium',
    published: true,
    relatedGames: ['arabic-stories-68', 'tales-nile-68']
  }
];

// Get modules by age group
export const getModulesByAgeGroup = (ageGroup) => {
  return LEARNING_MODULES.filter(module => module.ageGroup === ageGroup && module.published);
};

// Get module by ID
export const getModuleById = (moduleId) => {
  return LEARNING_MODULES.find(module => module.id === moduleId);
};

// Get all published modules
export const getPublishedModules = () => {
  return LEARNING_MODULES.filter(module => module.published);
};

// Get modules by subject
export const getModulesBySubject = (subject) => {
  return LEARNING_MODULES.filter(module => module.subject === subject && module.published);
};

export default LEARNING_MODULES;

