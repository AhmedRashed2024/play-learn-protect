import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { getGameById } from '../../data/games';

// Simulated game content - in production, this would be actual game logic
const GamePlay = () => {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [game, setGame] = useState(null);
  const [gameState, setGameState] = useState('intro'); // intro, playing, paused, completed
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [progress, setProgress] = useState(0);
  const [questions, setQuestions] = useState([]);
  // FR-13: Track incorrect attempts for current question
  const [incorrectAttempts, setIncorrectAttempts] = useState(0);
  const [showWrongFeedback, setShowWrongFeedback] = useState(false);
  const [showStuckHint, setShowStuckHint] = useState(false);

  // Get game-specific questions
  const getGameQuestions = (gameId) => {
    if (gameId === 'math-sphinx-68') {
      // All addition questions for Sphinx's Math Riddles
      return [
        {
          question: 'What is 5 + 3?',
          questionAr: 'ما هو 5 + 3؟',
          answers: ['6', '7', '8', '9'],
          correct: 2,
          hint: 'Count: 5, then add 3 more!'
        },
        {
          question:
            'Ahmed has 4 oranges and gets 2 more. How many oranges does he have?',
          questionAr: 'لدى أحمد 4 برتقالات وحصل على 2 أخرى. كم برتقالة لديه؟',
          answers: ['5', '6', '7', '8'],
          correct: 1,
          hint: 'Start with 4, then add 2!'
        },
        {
          question: 'What is 6 + 4?',
          questionAr: 'ما هو 6 + 4؟',
          answers: ['8', '9', '10', '11'],
          correct: 2,
          hint: '6 plus 4 equals...'
        },
        {
          question:
            'Fatima has 3 apples and finds 5 more. How many apples in total?',
          questionAr: 'لدى فاطمة 3 تفاحات ووجدت 5 أخرى. كم تفاحة في المجموع؟',
          answers: ['7', '8', '9', '10'],
          correct: 1,
          hint: '3 + 5 = ?'
        },
        {
          question: 'What is 7 + 6?',
          questionAr: 'ما هو 7 + 6؟',
          answers: ['12', '13', '14', '15'],
          correct: 1,
          hint: '7 plus 6 equals...'
        },
        {
          question:
            'Omar collected 8 stars. He found 3 more stars. How many stars does he have now?',
          questionAr: 'جمع عمر 8 نجوم. وجد 3 نجوم أخرى. كم نجمة لديه الآن؟',
          answers: ['10', '11', '12', '13'],
          correct: 1,
          hint: '8 + 3 = ?'
        },
        {
          question: 'What is 9 + 2?',
          questionAr: 'ما هو 9 + 2؟',
          answers: ['10', '11', '12', '13'],
          correct: 1,
          hint: '9 plus 2 equals...'
        },
        {
          question:
            'There are 5 pyramids. 4 more pyramids are built. How many pyramids are there now?',
          questionAr:
            'يوجد 5 أهرامات. تم بناء 4 أهرامات أخرى. كم هرم يوجد الآن؟',
          answers: ['8', '9', '10', '11'],
          correct: 1,
          hint: '5 + 4 = ?'
        }
      ];
    }

    // Obelisk Coding - Coding/Logic questions
    if (gameId === 'coding-obelisk-68') {
      return [
        {
          question: 'What comes next in the pattern: 🔴 🔵 🔴 🔵 🔴 ?',
          questionAr: 'ما الذي يأتي بعد ذلك في النمط: 🔴 🔵 🔴 🔵 🔴 ؟',
          answers: ['🔴', '🔵', '🟢', '🟡'],
          correct: 1,
          hint: 'Look at the alternating pattern - red, blue, red, blue...'
        },
        {
          question: 'In coding, what do we call a step-by-step set of instructions?',
          questionAr: 'في البرمجة، ماذا نسمي مجموعة التعليمات خطوة بخطوة؟',
          answers: ['A picture', 'An algorithm', 'A song', 'A game'],
          correct: 1,
          hint: 'It starts with the letter A!'
        },
        {
          question: 'If we repeat "clap" 3 times, how many claps do we make?',
          questionAr: 'إذا كررنا "التصفيق" 3 مرات، كم عدد التصفيقات؟',
          answers: ['1', '2', '3', '4'],
          correct: 2,
          hint: 'Repeat means do the same thing again!'
        },
        {
          question: 'What is a "loop" in coding?',
          questionAr: 'ما هي "الحلقة" في البرمجة؟',
          answers: ['A type of bug', 'Repeating instructions', 'A computer part', 'A game level'],
          correct: 1,
          hint: 'Think about doing something over and over!'
        },
        {
          question: 'Complete the sequence: 2, 4, 6, ?',
          questionAr: 'أكمل التسلسل: 2، 4، 6، ؟',
          answers: ['7', '8', '9', '10'],
          correct: 1,
          hint: 'Each number increases by 2!'
        },
        {
          question: 'Which command makes a robot move forward?',
          questionAr: 'أي أمر يجعل الروبوت يتحرك للأمام؟',
          answers: ['STOP', 'FORWARD', 'SLEEP', 'SING'],
          correct: 1,
          hint: 'The answer describes the direction of movement!'
        },
        {
          question: 'What happens if you give a robot wrong instructions?',
          questionAr: 'ماذا يحدث إذا أعطيت الروبوت تعليمات خاطئة؟',
          answers: ['It does the wrong thing', 'It becomes smarter', 'It turns gold', 'Nothing'],
          correct: 0,
          hint: 'Robots only do exactly what you tell them!'
        },
        {
          question: 'If "A = 1" and "B = 2", what is A + B?',
          questionAr: 'إذا كان "أ = 1" و "ب = 2"، ما هو أ + ب؟',
          answers: ['1', '2', '3', '12'],
          correct: 2,
          hint: 'Replace the letters with their values and add!'
        }
      ];
    }

    // Tales of the Nile - Arabic Language/Story questions
    if (gameId === 'arabic-stories-68') {
      return [
        {
          question: 'The Nile is the _____ river in the world.',
          questionAr: 'النيل هو _____ نهر في العالم.',
          answers: ['Shortest', 'Longest', 'Widest', 'Coldest'],
          correct: 1,
          hint: 'It flows through many countries in Africa!'
        },
        {
          question: 'What animal is famous in Egyptian Nile stories?',
          questionAr: 'أي حيوان مشهور في قصص النيل المصرية؟',
          answers: ['Polar bear', 'Crocodile', 'Penguin', 'Kangaroo'],
          correct: 1,
          hint: 'This reptile lives in the Nile water!'
        },
        {
          question: 'What did ancient Egyptians use the Nile for?',
          questionAr: 'ما الذي استخدمه المصريون القدماء من النيل؟',
          answers: ['Skiing', 'Farming and drinking', 'Building pyramids', 'Flying'],
          correct: 1,
          hint: 'Think about water and growing food!'
        },
        {
          question: 'What plant grows along the Nile and was used for paper?',
          questionAr: 'ما النبات الذي ينمو على طول النيل واستخدم للورق؟',
          answers: ['Rose', 'Papyrus', 'Cactus', 'Tulip'],
          correct: 1,
          hint: 'Ancient Egyptians wrote on this plant!'
        },
        {
          question: 'What color is the Nile water in calm areas?',
          questionAr: 'ما لون مياه النيل في المناطق الهادئة؟',
          answers: ['Red', 'Purple', 'Blue/Green', 'Orange'],
          correct: 2,
          hint: 'Think about the colors of calm water!'
        },
        {
          question: 'The Nile flows from _____ to north.',
          questionAr: 'يتدفق النيل من _____ إلى الشمال.',
          answers: ['East', 'West', 'South', 'North'],
          correct: 2,
          hint: 'It starts in central Africa and flows to the Mediterranean!'
        },
        {
          question: 'What did Egyptian children do by the Nile?',
          questionAr: 'ماذا فعل الأطفال المصريون بجانب النيل؟',
          answers: ['Played and swam', 'Built cars', 'Watched TV', 'Used phones'],
          correct: 0,
          hint: 'Think about fun activities near water in ancient times!'
        },
        {
          question: 'Which city is on the Nile River?',
          questionAr: 'أي مدينة تقع على نهر النيل؟',
          answers: ['Paris', 'Cairo', 'London', 'Tokyo'],
          correct: 1,
          hint: 'This is the capital of Egypt!'
        }
      ];
    }

    // Mummy Science Lab - Ancient Egyptian Science questions
    if (gameId === 'science-mummy-68') {
      return [
        {
          question: 'What did ancient Egyptians use to preserve mummies?',
          questionAr: 'ما الذي استخدمه المصريون القدماء لحفظ المومياوات؟',
          answers: ['Ice', 'Salt and natron', 'Sugar', 'Honey only'],
          correct: 1,
          hint: 'This substance dries things out!'
        },
        {
          question: 'What organ did Egyptians think was most important?',
          questionAr: 'أي عضو اعتقد المصريون أنه الأهم؟',
          answers: ['Brain', 'Heart', 'Stomach', 'Lungs'],
          correct: 1,
          hint: 'They believed it held your soul!'
        },
        {
          question: 'What material did Egyptians use to wrap mummies?',
          questionAr: 'ما المادة التي استخدمها المصريون للف المومياوات؟',
          answers: ['Plastic', 'Linen cloth', 'Paper', 'Leather'],
          correct: 1,
          hint: 'It is a type of fabric made from plant fibers!'
        },
        {
          question: 'What did ancient Egyptians invent for writing?',
          questionAr: 'ماذا اخترع المصريون القدماء للكتابة؟',
          answers: ['Computers', 'Hieroglyphics', 'Telephones', 'Printers'],
          correct: 1,
          hint: 'These are picture symbols carved in stone!'
        },
        {
          question: 'What tool did Egyptians use to measure floods?',
          questionAr: 'أي أداة استخدمها المصريون لقياس الفيضانات؟',
          answers: ['Thermometer', 'Nilometer', 'Clock', 'Compass'],
          correct: 1,
          hint: 'The name includes the river name!'
        },
        {
          question: 'What metal did Egyptians use for jewelry?',
          questionAr: 'أي معدن استخدمه المصريون للمجوهرات؟',
          answers: ['Plastic', 'Aluminum', 'Gold', 'Steel'],
          correct: 2,
          hint: 'This shiny yellow metal is very valuable!'
        },
        {
          question: 'What shape are the famous Egyptian tombs?',
          questionAr: 'ما شكل المقابر المصرية الشهيرة؟',
          answers: ['Circle', 'Square', 'Pyramid', 'Rectangle'],
          correct: 2,
          hint: 'They have a pointy top!'
        },
        {
          question: 'What did Egyptians use to make black eyeliner?',
          questionAr: 'ماذا استخدم المصريون لصنع كحل العين الأسود؟',
          answers: ['Charcoal and minerals', 'Flowers', 'Water', 'Sand'],
          correct: 0,
          hint: 'They ground up dark substances!'
        }
      ];
    }

    // Pharaohs of Egypt - Egyptian History questions
    if (gameId === 'history-pharaohs-68') {
      return [
        {
          question: 'Who was the famous boy pharaoh?',
          questionAr: 'من كان الفرعون الصبي الشهير؟',
          answers: ['Ramses II', 'Tutankhamun', 'Cleopatra', 'Khufu'],
          correct: 1,
          hint: 'His golden mask is world famous! His nickname is "King Tut".'
        },
        {
          question: 'What did pharaohs wear on their heads?',
          questionAr: 'ماذا كان يرتدي الفراعنة على رؤوسهم؟',
          answers: ['Baseball cap', 'Crown', 'Helmet', 'Turban'],
          correct: 1,
          hint: 'Kings and queens wear this!'
        },
        {
          question: 'Who was the last pharaoh of Egypt?',
          questionAr: 'من كان آخر فرعون لمصر؟',
          answers: ['Tutankhamun', 'Ramses II', 'Cleopatra', 'Khufu'],
          correct: 2,
          hint: 'She was a famous queen!'
        },
        {
          question: 'What animal was sacred to the pharaohs?',
          questionAr: 'أي حيوان كان مقدساً عند الفراعنة؟',
          answers: ['Dog', 'Cat', 'Horse', 'Elephant'],
          correct: 1,
          hint: 'This pet was treated like royalty!'
        },
        {
          question: 'Who built the Great Pyramid of Giza?',
          questionAr: 'من بنى هرم الجيزة الأكبر؟',
          answers: ['Tutankhamun', 'Cleopatra', 'Khufu', 'Ramses II'],
          correct: 2,
          hint: 'He is also called Cheops!'
        },
        {
          question: 'What did pharaohs carry as a symbol of power?',
          questionAr: 'ماذا حمل الفراعنة كرمز للسلطة؟',
          answers: ['Sword only', 'Crook and flail', 'Book', 'Shield'],
          correct: 1,
          hint: 'One looks like a shepherd\'s tool!'
        },
        {
          question: 'How long did Ramses II rule Egypt?',
          questionAr: 'كم سنة حكم رمسيس الثاني مصر؟',
          answers: ['About 10 years', 'About 30 years', 'About 66 years', 'About 5 years'],
          correct: 2,
          hint: 'He was one of the longest-ruling pharaohs!'
        },
        {
          question: 'What was built to protect the pyramids?',
          questionAr: 'ما الذي بني لحماية الأهرامات؟',
          answers: ['A wall', 'The Sphinx', 'A river', 'A forest'],
          correct: 1,
          hint: 'It has a lion body and a human head!'
        }
      ];
    }

    // ==================== AGES 3-5 GAMES ====================

    // Math Pyramids - Simple counting for Ages 3-5
    if (gameId === 'math-pyramids-35') {
      return [
        {
          question: 'Count the pyramids: 🔺🔺🔺',
          questionAr: 'عد الأهرامات: 🔺🔺🔺',
          answers: ['1', '2', '3', '4'],
          correct: 2,
          hint: 'Point at each pyramid and count!'
        },
        {
          question: 'How many blocks? 🧱🧱',
          questionAr: 'كم عدد الكتل؟ 🧱🧱',
          answers: ['1', '2', '3', '4'],
          correct: 1,
          hint: 'Count each block!'
        },
        {
          question: 'Count the stars: ⭐⭐⭐⭐',
          questionAr: 'عد النجوم: ⭐⭐⭐⭐',
          answers: ['2', '3', '4', '5'],
          correct: 2,
          hint: 'There are four stars!'
        },
        {
          question: 'How many camels? 🐪🐪🐪🐪🐪',
          questionAr: 'كم جمل؟ 🐪🐪🐪🐪🐪',
          answers: ['3', '4', '5', '6'],
          correct: 2,
          hint: 'Count all the camels: one, two, three, four, five!'
        },
        {
          question: 'What comes after 2?',
          questionAr: 'ما الذي يأتي بعد 2؟',
          answers: ['1', '2', '3', '4'],
          correct: 2,
          hint: 'Count: 1, 2, then what?'
        }
      ];
    }

    // Nile Colors - Color recognition for Ages 3-5
    if (gameId === 'colors-nile-35') {
      return [
        {
          question: 'What color is the Nile water? 💙',
          questionAr: 'ما لون مياه النيل؟ 💙',
          answers: ['Red', 'Blue', 'Yellow', 'Green'],
          correct: 1,
          hint: 'Look at this emoji: 💙'
        },
        {
          question: 'What color is the desert sand? 🏜️',
          questionAr: 'ما لون رمال الصحراء؟ 🏜️',
          answers: ['Blue', 'Green', 'Yellow/Tan', 'Purple'],
          correct: 2,
          hint: 'Sand is a warm color!'
        },
        {
          question: 'What color is the crocodile? 🐊',
          questionAr: 'ما لون التمساح؟ 🐊',
          answers: ['Red', 'Blue', 'Green', 'Pink'],
          correct: 2,
          hint: 'Crocodiles are the color of plants!'
        },
        {
          question: 'What color is the sun? ☀️',
          questionAr: 'ما لون الشمس؟ ☀️',
          answers: ['Blue', 'Green', 'Yellow', 'Purple'],
          correct: 2,
          hint: 'The sun is bright and warm colored!'
        },
        {
          question: 'What color is a flamingo? 🦩',
          questionAr: 'ما لون طائر الفلامنجو؟ 🦩',
          answers: ['Blue', 'Pink', 'Green', 'Brown'],
          correct: 1,
          hint: 'This bird is a pretty light red color!'
        }
      ];
    }

    // Hieroglyphic Letters - Arabic letters for Ages 3-5
    if (gameId === 'arabic-letters-35') {
      return [
        {
          question: 'Which letter makes the "A" sound in Arabic? (أ)',
          questionAr: 'أي حرف يصدر صوت "أ"؟',
          answers: ['أ', 'ب', 'ت', 'ث'],
          correct: 0,
          hint: 'It is the first letter of the alphabet!'
        },
        {
          question: 'Which letter is "Ba" (ب)?',
          questionAr: 'أي حرف هو "باء"؟',
          answers: ['أ', 'ب', 'ت', 'ن'],
          correct: 1,
          hint: 'It has one dot underneath!'
        },
        {
          question: 'How many dots does "Ta" (ت) have?',
          questionAr: 'كم نقطة في حرف "تاء" (ت)؟',
          answers: ['0', '1', '2', '3'],
          correct: 2,
          hint: 'Look at the top of the letter!'
        },
        {
          question: 'Which letter looks like a smile? (ن)',
          questionAr: 'أي حرف يشبه الابتسامة؟ (ن)',
          answers: ['ب', 'ت', 'ن', 'ي'],
          correct: 2,
          hint: 'Noon has a curve like a happy face!'
        },
        {
          question: 'What is the first letter in "مصر" (Egypt)?',
          questionAr: 'ما هو الحرف الأول في "مصر"؟',
          answers: ['م', 'ص', 'ر', 'ن'],
          correct: 0,
          hint: 'Look at the beginning of the word!'
        }
      ];
    }

    // Pharaoh's Shapes - Shape recognition for Ages 3-5
    if (gameId === 'shapes-pharaoh-35') {
      return [
        {
          question: 'What shape is a pyramid? 🔺',
          questionAr: 'ما شكل الهرم؟ 🔺',
          answers: ['Circle', 'Square', 'Triangle', 'Star'],
          correct: 2,
          hint: 'It has 3 sides and a pointy top!'
        },
        {
          question: 'What shape is a wheel? ⭕',
          questionAr: 'ما شكل العجلة؟ ⭕',
          answers: ['Triangle', 'Circle', 'Square', 'Rectangle'],
          correct: 1,
          hint: 'It is round like the sun!'
        },
        {
          question: 'How many sides does a square have? ⬛',
          questionAr: 'كم ضلع للمربع؟ ⬛',
          answers: ['2', '3', '4', '5'],
          correct: 2,
          hint: 'Count each side!'
        },
        {
          question: 'Which shape has 5 points? ⭐',
          questionAr: 'أي شكل له 5 نقاط؟ ⭐',
          answers: ['Circle', 'Triangle', 'Square', 'Star'],
          correct: 3,
          hint: 'You can see these in the night sky!'
        },
        {
          question: 'What shape is a door?',
          questionAr: 'ما شكل الباب؟',
          answers: ['Circle', 'Triangle', 'Rectangle', 'Star'],
          correct: 2,
          hint: 'It is like a square but taller!'
        }
      ];
    }

    // ==================== AGES 9-12 GAMES ====================

    // Pyramid Architect - Advanced math for Ages 9-12
    if (gameId === 'math-architect-912') {
      return [
        {
          question: 'A pyramid base is 230m x 230m. What is the perimeter?',
          questionAr: 'قاعدة الهرم 230م × 230م. ما هو المحيط؟',
          answers: ['460m', '690m', '920m', '1150m'],
          correct: 2,
          hint: 'Perimeter = 4 × side length'
        },
        {
          question: 'If each stone block weighs 2.5 tons, how much do 4 blocks weigh?',
          questionAr: 'إذا كان وزن كل كتلة 2.5 طن، كم يزن 4 كتل؟',
          answers: ['8 tons', '10 tons', '12 tons', '15 tons'],
          correct: 1,
          hint: 'Multiply 2.5 × 4'
        },
        {
          question: 'The Great Pyramid was built in 20 years. How many months is that?',
          questionAr: 'بني الهرم الأكبر في 20 سنة. كم شهراً ذلك؟',
          answers: ['120', '180', '240', '360'],
          correct: 2,
          hint: 'Multiply years by 12 months'
        },
        {
          question: 'If 100 workers move 10 stones each day, how many stones in 5 days?',
          questionAr: 'إذا نقل 100 عامل 10 أحجار يومياً، كم حجراً في 5 أيام؟',
          answers: ['500', '2500', '5000', '10000'],
          correct: 2,
          hint: '100 × 10 × 5 = ?'
        },
        {
          question: 'A ramp has a 30° angle. What type of angle is this?',
          questionAr: 'منحدر بزاوية 30 درجة. ما نوع هذه الزاوية؟',
          answers: ['Right angle', 'Acute angle', 'Obtuse angle', 'Straight angle'],
          correct: 1,
          hint: 'Is 30° less than or greater than 90°?'
        }
      ];
    }

    // Catapult Physics - Physics for Ages 9-12
    if (gameId === 'physics-catapult-912') {
      return [
        {
          question: 'What force pulls objects back to Earth?',
          questionAr: 'ما القوة التي تسحب الأجسام نحو الأرض؟',
          answers: ['Friction', 'Gravity', 'Magnetism', 'Electricity'],
          correct: 1,
          hint: 'This force keeps you on the ground!'
        },
        {
          question: 'If you pull a catapult arm back further, the stone will fly:',
          questionAr: 'إذا سحبت ذراع المنجنيق أكثر، سيطير الحجر:',
          answers: ['Slower', 'The same', 'Farther', 'Backwards'],
          correct: 2,
          hint: 'More stretch = more energy!'
        },
        {
          question: 'What is the best angle to launch for maximum distance?',
          questionAr: 'ما أفضل زاوية للإطلاق لأقصى مسافة؟',
          answers: ['15°', '45°', '75°', '90°'],
          correct: 1,
          hint: 'It is exactly halfway between flat and straight up!'
        },
        {
          question: 'What type of energy is stored in a stretched catapult?',
          questionAr: 'ما نوع الطاقة المخزنة في منجنيق مشدود؟',
          answers: ['Heat energy', 'Light energy', 'Potential energy', 'Sound energy'],
          correct: 2,
          hint: 'This energy is waiting to be released!'
        },
        {
          question: 'Friction makes moving objects:',
          questionAr: 'الاحتكاك يجعل الأجسام المتحركة:',
          answers: ['Speed up', 'Slow down', 'Turn around', 'Float'],
          correct: 1,
          hint: 'Friction works against motion'
        }
      ];
    }

    // Papyrus Chemistry - Chemistry for Ages 9-12
    if (gameId === 'chemistry-papyrus-912') {
      return [
        {
          question: 'What is everything made of?',
          questionAr: 'مما يتكون كل شيء؟',
          answers: ['Rocks', 'Atoms', 'Water', 'Air'],
          correct: 1,
          hint: 'These tiny particles are the building blocks of matter!'
        },
        {
          question: 'What happens when you mix baking soda and vinegar?',
          questionAr: 'ماذا يحدث عند خلط صودا الخبز والخل؟',
          answers: ['Nothing', 'It bubbles', 'It freezes', 'It disappears'],
          correct: 1,
          hint: 'This creates a gas reaction!'
        },
        {
          question: 'What is H2O?',
          questionAr: 'ما هو H2O؟',
          answers: ['Salt', 'Sugar', 'Water', 'Oil'],
          correct: 2,
          hint: '2 Hydrogen atoms + 1 Oxygen atom'
        },
        {
          question: 'Egyptians made blue pigment from which mineral?',
          questionAr: 'صنع المصريون الصبغة الزرقاء من أي معدن؟',
          answers: ['Gold', 'Silver', 'Copper', 'Iron'],
          correct: 2,
          hint: 'This reddish-brown metal turns blue in certain compounds!'
        },
        {
          question: 'What state of matter is ice?',
          questionAr: 'ما حالة المادة للثلج؟',
          answers: ['Solid', 'Liquid', 'Gas', 'Plasma'],
          correct: 0,
          hint: 'Ice has a fixed shape!'
        }
      ];
    }

    // Hieroglyph Decoder - Advanced coding for Ages 9-12
    if (gameId === 'coding-hieroglyphs-912') {
      return [
        {
          question: 'In coding, what stores a value that can change?',
          questionAr: 'في البرمجة، ما الذي يخزن قيمة يمكن تغييرها؟',
          answers: ['A constant', 'A variable', 'A function', 'A loop'],
          correct: 1,
          hint: 'The name suggests it can vary!'
        },
        {
          question: 'What does "if-else" do in programming?',
          questionAr: 'ماذا يفعل "if-else" في البرمجة؟',
          answers: ['Repeats code', 'Makes decisions', 'Stores data', 'Deletes files'],
          correct: 1,
          hint: 'It checks a condition and chooses what to do!'
        },
        {
          question: 'A function that calls itself is called:',
          questionAr: 'الدالة التي تستدعي نفسها تسمى:',
          answers: ['Looping', 'Recursion', 'Iteration', 'Branching'],
          correct: 1,
          hint: 'It is like looking into a mirror that reflects itself!'
        },
        {
          question: 'What is the output of: 10 % 3?',
          questionAr: 'ما ناتج: 10 % 3؟',
          answers: ['3', '3.33', '1', '0'],
          correct: 2,
          hint: '% gives the remainder after division. 10 ÷ 3 = 3 remainder ?'
        },
        {
          question: 'Which data structure uses FIFO (First In, First Out)?',
          questionAr: 'أي هيكل بيانات يستخدم FIFO (الأول يدخل، الأول يخرج)؟',
          answers: ['Stack', 'Queue', 'Array', 'Tree'],
          correct: 1,
          hint: 'Like waiting in line at a store!'
        }
      ];
    }

    // Egyptian Ambassador - English for Ages 9-12
    if (gameId === 'english-ambassador-912') {
      return [
        {
          question: 'Choose the correct greeting: "Good morning, _____"',
          questionAr: 'اختر التحية الصحيحة: "صباح الخير، _____"',
          answers: ['sir or madam', 'you', 'hey', 'yo'],
          correct: 0,
          hint: 'Diplomats use formal, polite language!'
        },
        {
          question: 'What is the past tense of "speak"?',
          questionAr: 'ما هو الماضي من "speak"؟',
          answers: ['speaked', 'spoke', 'speaking', 'speaks'],
          correct: 1,
          hint: 'This is an irregular verb!'
        },
        {
          question: '"I would like to introduce myself" is used when:',
          questionAr: '"أود أن أقدم نفسي" تستخدم عندما:',
          answers: ['Saying goodbye', 'Meeting someone new', 'Ordering food', 'Asking directions'],
          correct: 1,
          hint: 'This phrase comes at the beginning of meeting someone!'
        },
        {
          question: 'Which is more formal: "Can I" or "May I"?',
          questionAr: 'أيهما أكثر رسمية: "Can I" أو "May I"؟',
          answers: ['Can I', 'May I', 'Both are the same', 'Neither'],
          correct: 1,
          hint: 'Ambassadors use the most polite option!'
        },
        {
          question: 'Complete: "Egypt is famous _____ its pyramids"',
          questionAr: 'أكمل: "Egypt is famous _____ its pyramids"',
          answers: ['for', 'to', 'at', 'in'],
          correct: 0,
          hint: 'Famous + for = the correct combination!'
        }
      ];
    }

    // Cleopatra's Kingdom - Advanced history for Ages 9-12
    if (gameId === 'history-cleopatra-912') {
      return [
        {
          question: 'Cleopatra was the last ruler of which dynasty?',
          questionAr: 'كانت كليوباترا آخر حاكمة لأي سلالة؟',
          answers: ['Roman', 'Greek/Ptolemaic', 'Persian', 'Nubian'],
          correct: 1,
          hint: 'Her family came from Greece!'
        },
        {
          question: 'Which Roman leader was Cleopatra allied with first?',
          questionAr: 'مع أي قائد روماني تحالفت كليوباترا أولاً؟',
          answers: ['Augustus', 'Julius Caesar', 'Mark Antony', 'Nero'],
          correct: 1,
          hint: 'He was famously assassinated in 44 BC!'
        },
        {
          question: 'How many languages could Cleopatra reportedly speak?',
          questionAr: 'كم لغة يقال أن كليوباترا كانت تتحدث؟',
          answers: ['2', '5', '9 or more', 'Only 1'],
          correct: 2,
          hint: 'She was very educated for her time!'
        },
        {
          question: 'What sea battle ended Cleopatra\'s power?',
          questionAr: 'أي معركة بحرية أنهت سلطة كليوباترا؟',
          answers: ['Battle of the Nile', 'Battle of Actium', 'Battle of Giza', 'Battle of Memphis'],
          correct: 1,
          hint: 'This battle was in 31 BC against Octavian!'
        },
        {
          question: 'What was the capital of Egypt during Cleopatra\'s reign?',
          questionAr: 'ما كانت عاصمة مصر في عهد كليوباترا؟',
          answers: ['Cairo', 'Memphis', 'Thebes', 'Alexandria'],
          correct: 3,
          hint: 'This city was founded by Alexander the Great!'
        }
      ];
    }

    // Default fallback - should not reach here if all games are covered
    return [
      { question: 'Welcome! This game is coming soon.', answers: ['OK', 'Great', 'Awesome', 'Cool'], correct: 0, hint: 'Any answer works!' }
    ];
  };

  useEffect(() => {
    const gameData = getGameById(gameId);
    if (gameData) {
      setGame(gameData);
      // Update questions when game changes
      const gameQuestions = getGameQuestions(gameId);
      setQuestions(gameQuestions);
      // Check for saved progress (FR-11)
      const savedProgress = localStorage.getItem(
        `plp_progress_${user.id}_${gameId}`
      );
      if (savedProgress) {
        const parsed = JSON.parse(savedProgress);
        setScore(parsed.score || 0);
        setCurrentQuestion(parsed.currentQuestion || 0);
        setProgress(parsed.progress || 0);
      }
    } else {
      navigate('/child/games');
    }
  }, [gameId, user.id, navigate]);

  // Save progress (FR-11)
  const saveProgress = () => {
    localStorage.setItem(
      `plp_progress_${user.id}_${gameId}`,
      JSON.stringify({
        score,
        currentQuestion,
        progress: ((currentQuestion + 1) / questions.length) * 100,
        timestamp: new Date().toISOString()
      })
    );
  };

  // Auto-save every 30 seconds
  useEffect(() => {
    if (gameState === 'playing') {
      const interval = setInterval(saveProgress, 30000);
      return () => clearInterval(interval);
    }
  }, [gameState, score, currentQuestion]);

  const startGame = (resume = false) => {
    if (!resume) {
      setScore(0);
      setCurrentQuestion(0);
      setProgress(0);
    }
    setGameState('playing');
  };

  const answerQuestion = (answerIndex) => {
    if (!questions[currentQuestion]) return;
    const isCorrect = answerIndex === questions[currentQuestion].correct;

    if (isCorrect) {
      // Award points: full points if no hints used, reduced if hints used, further reduced if had wrong attempts
      let pointsEarned = 10;
      if (hintsUsed > 0) pointsEarned = 5;
      if (incorrectAttempts > 0) pointsEarned = Math.max(2, pointsEarned - incorrectAttempts);
      setScore((prev) => prev + pointsEarned);

      // Clear feedback states and move to next question
      setShowWrongFeedback(false);
      setShowStuckHint(false);
      setIncorrectAttempts(0);

      setProgress(((currentQuestion + 1) / questions.length) * 100);

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion((prev) => prev + 1);
        setShowHint(false);
      } else {
        // Game complete
        setGameState('completed');
        // Clear saved progress
        localStorage.removeItem(`plp_progress_${user.id}_${gameId}`);
      }
    } else {
      // FR-13: Handle incorrect answer
      const newIncorrectAttempts = incorrectAttempts + 1;
      setIncorrectAttempts(newIncorrectAttempts);
      setShowWrongFeedback(true);

      // FR-13 SP-13.1: After 3 incorrect attempts, show stuck hint
      if (newIncorrectAttempts >= 3) {
        setShowStuckHint(true);
      }

      // Clear wrong feedback after 1.5 seconds
      setTimeout(() => {
        setShowWrongFeedback(false);
      }, 1500);
    }
  };

  const useHint = () => {
    if (hintsUsed < 3) {
      setShowHint(true);
      setHintsUsed((prev) => prev + 1);
      setShowStuckHint(false); // Hide the stuck hint prompt after using hint
    }
  };

  if (!game) {
    return (
      <div className="page flex-center">
        <div className="animate-pulse">
          <span style={{ fontSize: '3rem' }}>🏛️</span>
          <p>Loading game...</p>
        </div>
      </div>
    );
  }

  // Check if game is for the correct age group
  if (game.ageGroup !== user.ageGroup) {
    return (
      <div className="page container">
        <div
          className="card text-center"
          style={{ padding: 'var(--space-12)' }}
        >
          <div style={{ fontSize: '4rem', marginBottom: 'var(--space-4)' }}>
            🚫
          </div>
          <h2>Oops! This game is for a different age group</h2>
          <p className="text-muted arabic">هذه اللعبة لفئة عمرية مختلفة</p>
          <p className="mt-4">
            This game is for ages {game.ageGroup}, but you are {user.age} years
            old.
          </p>
          <Link to="/child/games" className="btn btn-primary mt-6">
            Back to Games
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page container animate-fade-in">
      {/* Game Header */}
      <div
        className="card mb-6"
        style={{
          background:
            'linear-gradient(135deg, var(--color-turquoise) 0%, var(--color-nile-blue) 100%)',
          color: 'white'
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 'var(--space-4)'
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-4)'
            }}
          >
            <span style={{ fontSize: '3rem' }}>{game.icon}</span>
            <div>
              <h1 style={{ color: 'white', marginBottom: 'var(--space-1)' }}>
                {game.title}
              </h1>
              <p style={{ opacity: 0.9 }} className="arabic">
                {game.titleAr}
              </p>
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              gap: 'var(--space-4)',
              alignItems: 'center'
            }}
          >
            <div className="points-display">
              <span>⭐</span>
              <span>{score} pts</span>
            </div>
            <Link
              to="/child/games"
              className="btn"
              style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}
            >
              ← Back
            </Link>
          </div>
        </div>

        {/* Progress Bar */}
        {gameState !== 'intro' && (
          <div style={{ marginTop: 'var(--space-4)' }}>
            <div
              className="progress-bar"
              style={{ background: 'rgba(255,255,255,0.3)' }}
            >
              <div
                className="progress-bar-fill"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p
              style={{
                fontSize: 'var(--font-size-sm)',
                marginTop: 'var(--space-2)',
                opacity: 0.9
              }}
            >
              Question {currentQuestion + 1} of {questions.length}
            </p>
          </div>
        )}
      </div>

      {/* Game Content */}
      <div
        className="card text-center"
        style={{
          padding: 'var(--space-8)',
          minHeight: '400px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}
      >
        {/* Intro State */}
        {gameState === 'intro' && (
          <>
            <div style={{ fontSize: '5rem', marginBottom: 'var(--space-6)' }}>
              {game.icon}
            </div>
            <h2 className="mb-4">{game.title}</h2>
            <p className="text-muted mb-6">{game.description}</p>

            <div
              style={{
                display: 'flex',
                gap: 'var(--space-2)',
                justifyContent: 'center',
                marginBottom: 'var(--space-6)',
                flexWrap: 'wrap'
              }}
            >
              <span className={`age-badge age-badge-${game.ageGroup}`}>
                Ages {game.ageGroup}
              </span>
              <span
                className="age-badge"
                style={{ background: 'var(--color-gold)' }}
              >
                ⭐ {game.points} points
              </span>
              <span
                className="age-badge"
                style={{ background: 'var(--color-nile-blue)' }}
              >
                ⏱️ {game.estimatedTime} min
              </span>
            </div>

            <div
              style={{
                display: 'flex',
                gap: 'var(--space-4)',
                justifyContent: 'center'
              }}
            >
              <button
                onClick={() => startGame(false)}
                className="btn btn-primary btn-xl"
              >
                🎮 Start Game
              </button>
              {progress > 0 && (
                <button
                  onClick={() => startGame(true)}
                  className="btn btn-secondary btn-xl"
                >
                  ▶️ Continue
                </button>
              )}
            </div>
          </>
        )}

        {/* Playing State */}
        {gameState === 'playing' &&
          questions.length > 0 &&
          currentQuestion < questions.length && (
            <>
              <h2 className="mb-6">{questions[currentQuestion]?.question}</h2>
              {questions[currentQuestion]?.questionAr && (
                <p
                  className="arabic text-muted mb-4"
                  style={{ fontSize: 'var(--font-size-lg)' }}
                >
                  {questions[currentQuestion].questionAr}
                </p>
              )}

              {/* FR-13: Wrong Answer Feedback */}
              {showWrongFeedback && (
                <div
                  className="alert alert-danger mb-4"
                  style={{ 
                    display: 'inline-flex',
                    animation: 'shake 0.5s ease-in-out'
                  }}
                >
                  <span>❌</span>
                  <span>Try again! That&apos;s not correct.</span>
                </div>
              )}

              {/* FR-13 SP-13.1: Stuck Hint Prompt after 3 wrong attempts */}
              {showStuckHint && !showHint && hintsUsed < 3 && (
                <div
                  className="alert alert-warning mb-4"
                  style={{ 
                    display: 'inline-flex',
                    animation: 'pulse 1s ease-in-out infinite'
                  }}
                >
                  <span style={{ fontSize: '1.5rem' }}>💡</span>
                  <span>
                    Need help? Click the hint button below!
                    <br />
                    <span className="arabic">هل تحتاج مساعدة؟ اضغط على زر التلميح!</span>
                  </span>
                </div>
              )}

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: 'var(--space-4)',
                  maxWidth: '500px',
                  margin: '0 auto var(--space-6)'
                }}
              >
                {questions[currentQuestion]?.answers.map((answer, index) => (
                  <button
                    key={index}
                    onClick={() => answerQuestion(index)}
                    className="btn btn-lg"
                    style={{
                      background:
                        showHint &&
                        index !== questions[currentQuestion]?.correct
                          ? 'var(--color-sand)'
                          : 'var(--color-turquoise-light)',
                      color: 'var(--color-deep-blue)',
                      opacity:
                        showHint &&
                        index !== questions[currentQuestion]?.correct
                          ? 0.5
                          : 1,
                      pointerEvents:
                        showHint &&
                        index !== questions[currentQuestion]?.correct
                          ? 'none'
                          : 'auto'
                    }}
                    disabled={showHint && index !== questions[currentQuestion]?.correct}
                  >
                    {answer}
                  </button>
                ))}
              </div>

              {/* Hint System (FR-13) */}
              <div style={{ marginTop: 'var(--space-4)' }}>
                {hintsUsed < 3 ? (
                  <button
                    onClick={useHint}
                    className="btn"
                    style={{ 
                      background: showStuckHint ? 'var(--color-gold)' : 'var(--color-gold-light)',
                      animation: showStuckHint ? 'pulse 1s ease-in-out infinite' : 'none'
                    }}
                  >
                    💡 Use Hint ({3 - hintsUsed} left)
                  </button>
                ) : (
                  <p className="text-muted">No more hints available</p>
                )}

                {showHint && (
                  <div
                    className="alert alert-warning mt-4"
                    style={{ display: 'inline-flex' }}
                  >
                    <span>🦁</span>
                    <span>
                      The Sphinx says: {questions[currentQuestion]?.hint || "I've removed some wrong answers for you!"}
                    </span>
                  </div>
                )}
              </div>
            </>
          )}

        {/* Completed State */}
        {gameState === 'completed' && (
          <>
            <div
              style={{ fontSize: '5rem', marginBottom: 'var(--space-4)' }}
              className="animate-bounce"
            >
              🎉
            </div>
            <h2 className="mb-2">Congratulations!</h2>
            <p
              className="arabic text-gold mb-6"
              style={{ fontSize: 'var(--font-size-xl)' }}
            >
              مبروك!
            </p>

            <div
              className="stat-card"
              style={{ maxWidth: '300px', margin: '0 auto var(--space-6)' }}
            >
              <div className="stat-card-icon">⭐</div>
              <div className="stat-card-value text-gold">{score}</div>
              <div className="stat-card-label">Points Earned</div>
            </div>

            <div
              style={{
                display: 'flex',
                gap: 'var(--space-4)',
                justifyContent: 'center'
              }}
            >
              <button
                onClick={() => {
                  setGameState('intro');
                  setHintsUsed(0);
                }}
                className="btn btn-primary btn-lg"
              >
                🔄 Play Again
              </button>
              <Link to="/child/games" className="btn btn-secondary btn-lg">
                📚 More Games
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default GamePlay;
