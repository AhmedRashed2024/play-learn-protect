import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { getModuleById } from '../../data/learningModules';

const LearnModule = () => {
  const { moduleId } = useParams();
  const { user } = useAuth();
  const [currentSection, setCurrentSection] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);

  const module = getModuleById(moduleId);

  if (!module) {
    return (
      <div className="page container animate-fade-in">
        <div
          className="card text-center"
          style={{ padding: 'var(--space-12)' }}
        >
          <h2>Module not found</h2>
          <Link to="/child/learn" className="btn btn-primary mt-4">
            Back to Learn
          </Link>
        </div>
      </div>
    );
  }

  // Get module-specific content
  const getModuleContent = () => {
    if (moduleId === 'math-addition-subtraction') {
      return getMathContent();
    } else if (moduleId === 'literature-storytelling') {
      return getLiteratureContent();
    }
    return [];
  };

  // Math: Addition and Subtraction content - Slide-based presentation
  const getMathContent = () => [
    {
      type: 'slide',
      slideNumber: 1,
      title: 'What is Addition?',
      titleAr: 'ما هو الجمع؟',
      content: 'Addition means putting things together to find the total.',
      contentAr: 'الجمع يعني وضع الأشياء معاً لإيجاد المجموع.',
      visualExample: {
        type: 'objects',
        item: '🍊',
        leftCount: 2,
        rightCount: 3,
        totalCount: 5,
        equation: '2 + 3 = 5'
      },
      explanation:
        'We have 2 oranges here, and 3 oranges there. When we put them together, we get 5 oranges in total!',
      explanationAr:
        'لدينا 2 برتقالة هنا، و 3 برتقالة هناك. عندما نضعهما معاً، نحصل على 5 برتقالات في المجموع!'
    },
    {
      type: 'slide',
      slideNumber: 2,
      title: 'How Addition Works',
      titleAr: 'كيف يعمل الجمع',
      content: "Let's count step by step:",
      contentAr: 'دعنا نعد خطوة بخطوة:',
      visualExample: {
        type: 'objects',
        item: '🍎',
        leftCount: 3,
        rightCount: 2,
        totalCount: 5,
        equation: '3 + 2 = 5'
      },
      explanation:
        'Step 1: Count the first group → 3 apples. Step 2: Count the second group → 2 apples. Step 3: Count all together → 5 apples!',
      explanationAr:
        'الخطوة 1: عد المجموعة الأولى → 3 تفاحات. الخطوة 2: عد المجموعة الثانية → 2 تفاحة. الخطوة 3: عد الكل معاً → 5 تفاحات!'
    },
    {
      type: 'slide',
      slideNumber: 3,
      title: 'Another Example',
      titleAr: 'مثال آخر',
      content: "Let's try with different objects:",
      contentAr: 'دعنا نجرب بأشياء مختلفة:',
      visualExample: {
        type: 'objects',
        item: '⭐',
        leftCount: 4,
        rightCount: 1,
        totalCount: 5,
        equation: '4 + 1 = 5'
      },
      explanation:
        'We have 4 stars on the left and 1 star on the right. When we combine them, we get 5 stars total!',
      explanationAr:
        'لدينا 4 نجوم على اليسار ونجمة واحدة على اليمين. عندما نجمعهما، نحصل على 5 نجوم في المجموع!'
    },
    {
      type: 'practice',
      title: 'Practice Addition',
      titleAr: 'تمرين على الجمع',
      questions: [
        {
          question:
            'Ahmed has 4 bananas and Fatima gives him 3 more. How many bananas does Ahmed have now?',
          questionAr:
            'أحمد لديه 4 موزات وأعطته فاطمة 3 أخرى. كم موزة أصبح لدى أحمد الآن؟',
          answer: '7',
          options: ['5', '6', '7', '8'],
          visualExample: { item: '🍌', leftCount: 4, rightCount: 3 }
        },
        {
          question:
            'There are 6 grapes in one bowl and 2 grapes in another. How many grapes are there in total?',
          questionAr: 'يوجد 6 عنب في وعاء و 2 عنب في آخر. كم عنب في المجموع؟',
          answer: '8',
          options: ['7', '8', '9', '10'],
          visualExample: { item: '🍇', leftCount: 6, rightCount: 2 }
        },
        {
          question:
            'Omar collected 5 strawberries in the morning and 4 more in the afternoon. How many strawberries did he collect?',
          questionAr:
            'جمع عمر 5 فراولات في الصباح و 4 أخرى في المساء. كم فراولة جمع؟',
          answer: '9',
          options: ['8', '9', '10', '11'],
          visualExample: { item: '🍓', leftCount: 5, rightCount: 4 }
        },
        {
          question:
            'If you have 3 apples and you get 2 more apples, what is the total?',
          questionAr:
            'إذا كان لديك 3 تفاحات وحصلت على 2 تفاحات أخرى، ما هو المجموع؟',
          answer: '5',
          options: ['4', '5', '6', '7'],
          visualExample: { item: '🍎', leftCount: 3, rightCount: 2 }
        },
        {
          question: 'Count: 2 + 6 = ?',
          questionAr: 'احسب: 2 + 6 = ؟',
          answer: '8',
          options: ['7', '8', '9', '10'],
          visualExample: { item: '⭐', leftCount: 2, rightCount: 6 }
        }
      ]
    },
    {
      type: 'slide',
      slideNumber: 4,
      title: 'What is Subtraction?',
      titleAr: 'ما هو الطرح؟',
      content: 'Subtraction means taking away some items from a group.',
      contentAr: 'الطرح يعني أخذ بعض العناصر من مجموعة.',
      visualExample: {
        type: 'subtraction',
        item: '🍪',
        startCount: 5,
        takeAway: 2,
        remainingCount: 3,
        equation: '5 - 2 = 3'
      },
      explanation:
        'We start with 5 cookies. We take away 2 cookies. How many cookies are left? 3 cookies!',
      explanationAr:
        'نبدأ بـ 5 بسكويتات. نأخذ 2 بسكويتة بعيداً. كم بسكويتة تبقى؟ 3 بسكويتات!'
    },
    {
      type: 'slide',
      slideNumber: 5,
      title: 'How Subtraction Works',
      titleAr: 'كيف يعمل الطرح',
      content: "Let's subtract step by step:",
      contentAr: 'دعنا نطرح خطوة بخطوة:',
      visualExample: {
        type: 'subtraction',
        item: '🎈',
        startCount: 8,
        takeAway: 3,
        remainingCount: 5,
        equation: '8 - 3 = 5'
      },
      explanation:
        "Step 1: Start with 8 balloons. Step 2: Take away 3 balloons. Step 3: Count what's left → 5 balloons!",
      explanationAr:
        'الخطوة 1: ابدأ بـ 8 بالونات. الخطوة 2: خذ 3 بالونات بعيداً. الخطوة 3: عد ما تبقى → 5 بالونات!'
    },
    {
      type: 'practice',
      title: 'Practice Subtraction',
      titleAr: 'تمرين على الطرح',
      questions: [
        {
          question:
            'Sara had 7 cookies. She ate 3 cookies. How many cookies are left?',
          questionAr:
            'كان لدى سارة 7 بسكويتات. أكلت 3 بسكويتات. كم بسكويتة تبقى؟',
          answer: '4',
          options: ['3', '4', '5', '6'],
          visualExample: {
            type: 'subtraction',
            item: '🍪',
            startCount: 7,
            takeAway: 3
          }
        },
        {
          question:
            'There were 9 birds on a tree. 2 birds flew away. How many birds are still on the tree?',
          questionAr:
            'كان هناك 9 طيور على شجرة. طار 2 طائر بعيداً. كم طائر لا يزال على الشجرة؟',
          answer: '7',
          options: ['6', '7', '8', '9'],
          visualExample: {
            type: 'subtraction',
            item: '🐦',
            startCount: 9,
            takeAway: 2
          }
        },
        {
          question:
            'Ahmed had 8 toy cars. He gave 5 toy cars to his friend. How many toy cars does Ahmed have now?',
          questionAr:
            'كان لدى أحمد 8 سيارات لعبة. أعطى 5 سيارات لصديقه. كم سيارة لعبة أصبح لدى أحمد الآن؟',
          answer: '3',
          options: ['2', '3', '4', '5'],
          visualExample: {
            type: 'subtraction',
            item: '🚗',
            startCount: 8,
            takeAway: 5
          }
        },
        {
          question:
            'There are 10 balloons. 4 balloons pop. How many balloons are left?',
          questionAr: 'يوجد 10 بالونات. انفجر 4 بالونات. كم بالون تبقى؟',
          answer: '6',
          options: ['5', '6', '7', '8'],
          visualExample: {
            type: 'subtraction',
            item: '🎈',
            startCount: 10,
            takeAway: 4
          }
        },
        {
          question: 'Calculate: 6 - 2 = ?',
          questionAr: 'احسب: 6 - 2 = ؟',
          answer: '4',
          options: ['3', '4', '5', '6'],
          visualExample: {
            type: 'subtraction',
            item: '🍊',
            startCount: 6,
            takeAway: 2
          }
        }
      ]
    }
  ];

  // Literature: Storytelling & Characters content - Slide-based presentation
  const getLiteratureContent = () => [
    {
      type: 'slide',
      slideNumber: 1,
      title: 'What is a Story?',
      titleAr: 'ما هي القصة؟',
      content:
        'A story is a tale with characters, a setting, and events that happen in order.',
      contentAr: 'القصة هي حكاية بها شخصيات ومكان وأحداث تحدث بالترتيب.',
      visualExample: {
        type: 'story',
        elements: {
          characters: ['👦', '👧', '🐱'],
          setting: '🏰',
          events: ['Once upon a time...', 'Then...', 'Finally...']
        }
      },
      explanation:
        "Every story has: Characters (who), Setting (where), and Events (what happens). Let's learn about each part!",
      explanationAr:
        'كل قصة تحتوي على: الشخصيات (من)، المكان (أين)، والأحداث (ماذا يحدث). دعنا نتعلم عن كل جزء!'
    },
    {
      type: 'slide',
      slideNumber: 2,
      title: 'Characters in Stories',
      titleAr: 'الشخصيات في القصص',
      content:
        'Characters are the people or animals in a story. They can be heroes, helpers, or even animals!',
      contentAr:
        'الشخصيات هم الناس أو الحيوانات في القصة. يمكن أن يكونوا أبطالاً أو مساعدين أو حتى حيوانات!',
      visualExample: {
        type: 'characters',
        examples: [
          {
            name: 'Ahmed',
            emoji: '👦',
            role: 'Hero',
            description: 'The brave boy who saves the day!'
          },
          {
            name: 'Fatima',
            emoji: '👧',
            role: 'Helper',
            description: 'The kind friend who helps others!'
          },
          {
            name: 'Mittens',
            emoji: '🐱',
            role: 'Pet',
            description: 'The clever cat who solves mysteries!'
          }
        ]
      },
      explanation:
        'Characters have names, personalities, and roles. The hero is usually the main character who faces challenges!',
      explanationAr:
        'الشخصيات لها أسماء وشخصيات وأدوار. البطل عادة هو الشخصية الرئيسية التي تواجه التحديات!'
    },
    {
      type: 'slide',
      slideNumber: 3,
      title: 'Setting: Where Stories Happen',
      titleAr: 'المكان: أين تحدث القصص',
      content:
        'The setting is WHERE and WHEN the story takes place. It can be a castle, a forest, or even your home!',
      contentAr:
        'المكان هو أين ومتى تحدث القصة. يمكن أن يكون قصراً أو غابة أو حتى منزلك!',
      visualExample: {
        type: 'settings',
        examples: [
          {
            place: 'Ancient Castle',
            emoji: '🏰',
            time: 'Long ago',
            description: 'A magical place from the past'
          },
          {
            place: 'Mysterious Forest',
            emoji: '🌲',
            time: 'One day',
            description: 'A place full of adventure'
          },
          {
            place: 'Your Home',
            emoji: '🏠',
            time: 'Today',
            description: 'A familiar and cozy place'
          }
        ]
      },
      explanation:
        'The setting helps us imagine where the story happens. It can be real or make-believe!',
      explanationAr:
        'المكان يساعدنا على تخيل أين تحدث القصة. يمكن أن يكون حقيقياً أو خيالياً!'
    },
    {
      type: 'slide',
      slideNumber: 4,
      title: 'Story Structure: Beginning, Middle, End',
      titleAr: 'هيكل القصة: البداية، الوسط، النهاية',
      content:
        'Every story has three parts: Beginning (start), Middle (problem), and End (solution).',
      contentAr:
        'كل قصة لها ثلاثة أجزاء: البداية (البدء)، الوسط (المشكلة)، والنهاية (الحل).',
      visualExample: {
        type: 'storyStructure',
        beginning: {
          emoji: '🌅',
          text: 'Once upon a time, there was a brave knight...'
        },
        middle: {
          emoji: '⚔️',
          text: 'The knight faced a dragon and needed to save the kingdom!'
        },
        end: {
          emoji: '🎉',
          text: 'The knight defeated the dragon and everyone lived happily ever after!'
        }
      },
      explanation:
        'Beginning: We meet the characters. Middle: A problem happens. End: The problem is solved!',
      explanationAr:
        'البداية: نتعرف على الشخصيات. الوسط: تحدث مشكلة. النهاية: يتم حل المشكلة!'
    },
    {
      type: 'slide',
      slideNumber: 5,
      title: 'Creating Your Own Story',
      titleAr: 'إنشاء قصتك الخاصة',
      content:
        'You can create stories too! Just think: Who? Where? What happens?',
      contentAr: 'يمكنك أيضاً إنشاء القصص! فقط فكر: من؟ أين؟ ماذا يحدث؟',
      visualExample: {
        type: 'createStory',
        steps: [
          { step: 1, emoji: '👤', text: 'Choose a character (Who?)' },
          { step: 2, emoji: '📍', text: 'Pick a setting (Where?)' },
          {
            step: 3,
            emoji: '🎬',
            text: 'Think of an adventure (What happens?)'
          }
        ]
      },
      explanation:
        'Step 1: Choose your character. Step 2: Decide where the story happens. Step 3: Create an exciting adventure!',
      explanationAr:
        'الخطوة 1: اختر شخصيتك. الخطوة 2: قرر أين تحدث القصة. الخطوة 3: أنشئ مغامرة مثيرة!'
    },
    {
      type: 'practice',
      title: 'Practice: Story Elements',
      titleAr: 'تمرين: عناصر القصة',
      questions: [
        {
          question: 'Who is usually the main character in a story?',
          answer: 'The hero',
          options: ['The hero', 'The setting', 'The problem', 'The end'],
          visualExample: {
            type: 'question',
            emoji: '👦',
            hint: 'This person faces challenges'
          }
        },
        {
          question: 'What do we call WHERE a story happens?',
          answer: 'The setting',
          options: ['The character', 'The setting', 'The problem', 'The hero'],
          visualExample: {
            type: 'question',
            emoji: '🏰',
            hint: 'It can be a place like a castle'
          }
        },
        {
          question: 'What are the three parts of a story?',
          answer: 'Beginning, Middle, End',
          options: [
            'Start, Problem, Solution',
            'Beginning, Middle, End',
            'Who, What, Where',
            'Hero, Helper, Pet'
          ],
          visualExample: {
            type: 'question',
            emoji: '📖',
            hint: 'Every story has these three parts'
          }
        }
      ]
    }
  ];

  const sections = getModuleContent();
  const currentSectionData = sections[currentSection];
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleAnswerSubmit = () => {
    if (currentSectionData.type === 'practice') {
      const question = currentSectionData.questions[currentQuestionIndex];
      const correct = userAnswer.trim() === question.answer;
      setIsCorrect(correct);
      setShowResult(true);
      if (correct) {
        setScore((prev) => prev + 10);
      }
    }
  };

  const handleNext = () => {
    if (currentSectionData.type === 'practice') {
      if (currentQuestionIndex < currentSectionData.questions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
        setUserAnswer('');
        setShowResult(false);
      } else {
        // Move to next section
        if (currentSection < sections.length - 1) {
          setCurrentSection((prev) => prev + 1);
          setCurrentQuestionIndex(0);
          setUserAnswer('');
          setShowResult(false);
        }
      }
    } else {
      // Move to next section for slides
      if (currentSection < sections.length - 1) {
        setCurrentSection((prev) => prev + 1);
        setCurrentQuestionIndex(0);
        setUserAnswer('');
        setShowResult(false);
      }
    }
  };

  const totalSlides = sections.filter((s) => s.type === 'slide').length;
  const currentSlideNumber = sections
    .slice(0, currentSection + 1)
    .filter((s) => s.type === 'slide').length;
  const progress = ((currentSection + 1) / sections.length) * 100;

  return (
    <div className="page container animate-fade-in">
      {/* Header */}
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 'var(--space-4)',
            flexWrap: 'wrap',
            gap: 'var(--space-4)'
          }}
        >
          <div>
            <h1 style={{ marginBottom: 'var(--space-2)' }}>
              {module.icon} {module.title}
            </h1>
            <p className="text-muted">
              {module.description}
              <span className="arabic" style={{ marginLeft: 'var(--space-2)' }}>
                • {module.descriptionAr}
              </span>
            </p>
          </div>
          <Link
            to="/child/learn"
            className="btn"
            style={{ background: 'var(--color-sand)' }}
          >
            ← Back to Learn
          </Link>
        </div>

        {/* Progress Bar */}
        <div
          style={{
            background: 'var(--color-sand-light)',
            borderRadius: 'var(--radius-md)',
            height: '8px',
            marginBottom: 'var(--space-2)'
          }}
        >
          <div
            style={{
              background: 'var(--color-gold)',
              height: '100%',
              borderRadius: 'var(--radius-md)',
              width: `${progress}%`,
              transition: 'width 0.3s ease'
            }}
          />
        </div>
        <p
          style={{
            fontSize: 'var(--font-size-sm)',
            color: 'var(--color-text-muted)'
          }}
        >
          {currentSectionData.type === 'slide'
            ? `Slide ${currentSlideNumber} of ${totalSlides}`
            : `Section ${currentSection + 1} of ${sections.length}`}{' '}
          • Score: {score} points
        </p>
      </div>

      {/* Content Card - Slide Presentation */}
      <div
        className="card"
        style={{
          padding: 'var(--space-8)',
          minHeight: '500px',
          display: 'flex',
          flexDirection: 'column',
          background: 'linear-gradient(135deg, #ffffff 0%, #f8f6f0 100%)'
        }}
      >
        {currentSectionData.type === 'slide' ? (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            {/* Slide Header */}
            <div
              style={{
                textAlign: 'center',
                marginBottom: 'var(--space-6)',
                borderBottom: '3px solid var(--color-gold)',
                paddingBottom: 'var(--space-4)'
              }}
            >
              <div
                style={{
                  fontSize: 'var(--font-size-sm)',
                  color: 'var(--color-text-muted)',
                  marginBottom: 'var(--space-2)'
                }}
              >
                Slide {currentSectionData.slideNumber}
              </div>
              <h2
                style={{
                  marginBottom: 'var(--space-2)',
                  color: 'var(--color-deep-blue)',
                  fontSize: 'var(--font-size-2xl)'
                }}
              >
                {currentSectionData.title}
              </h2>
              <p
                className="arabic"
                style={{
                  fontSize: 'var(--font-size-lg)',
                  color: 'var(--color-text-muted)'
                }}
              >
                {currentSectionData.titleAr}
              </p>
            </div>

            {/* Main Content */}
            <div
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}
            >
              {/* Introduction Text */}
              <div
                style={{
                  textAlign: 'center',
                  marginBottom: 'var(--space-6)'
                }}
              >
                <p
                  style={{
                    fontSize: 'var(--font-size-xl)',
                    fontWeight: 'bold',
                    color: 'var(--color-deep-blue)',
                    marginBottom: 'var(--space-2)'
                  }}
                >
                  {currentSectionData.content}
                </p>
                <p
                  className="arabic"
                  style={{
                    fontSize: 'var(--font-size-lg)',
                    color: 'var(--color-text-muted)'
                  }}
                >
                  {currentSectionData.contentAr}
                </p>
              </div>

              {/* Visual Example */}
              {currentSectionData.visualExample && (
                <div
                  style={{
                    background: 'white',
                    borderRadius: 'var(--radius-lg)',
                    padding: 'var(--space-6)',
                    marginBottom: 'var(--space-6)',
                    border: '3px solid var(--color-gold)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                  }}
                >
                  {currentSectionData.visualExample.type === 'objects' ? (
                    <div>
                      {/* Visual Representation */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: 'var(--space-6)',
                          marginBottom: 'var(--space-6)',
                          flexWrap: 'wrap'
                        }}
                      >
                        {/* Left Group */}
                        <div style={{ textAlign: 'center' }}>
                          <div
                            style={{
                              fontSize: '3rem',
                              marginBottom: 'var(--space-2)',
                              display: 'flex',
                              gap: '0.5rem',
                              justifyContent: 'center',
                              flexWrap: 'wrap'
                            }}
                          >
                            {Array(currentSectionData.visualExample.leftCount)
                              .fill(0)
                              .map((_, i) => (
                                <span key={i}>
                                  {currentSectionData.visualExample.item}
                                </span>
                              ))}
                          </div>
                          <div
                            style={{
                              fontSize: 'var(--font-size-2xl)',
                              fontWeight: 'bold',
                              color: 'var(--color-deep-blue)'
                            }}
                          >
                            {currentSectionData.visualExample.leftCount}
                          </div>
                        </div>

                        {/* Plus Sign */}
                        <div
                          style={{
                            fontSize: 'var(--font-size-4xl)',
                            fontWeight: 'bold',
                            color: 'var(--color-gold)'
                          }}
                        >
                          +
                        </div>

                        {/* Right Group */}
                        <div style={{ textAlign: 'center' }}>
                          <div
                            style={{
                              fontSize: '3rem',
                              marginBottom: 'var(--space-2)',
                              display: 'flex',
                              gap: '0.5rem',
                              justifyContent: 'center',
                              flexWrap: 'wrap'
                            }}
                          >
                            {Array(currentSectionData.visualExample.rightCount)
                              .fill(0)
                              .map((_, i) => (
                                <span key={i}>
                                  {currentSectionData.visualExample.item}
                                </span>
                              ))}
                          </div>
                          <div
                            style={{
                              fontSize: 'var(--font-size-2xl)',
                              fontWeight: 'bold',
                              color: 'var(--color-deep-blue)'
                            }}
                          >
                            {currentSectionData.visualExample.rightCount}
                          </div>
                        </div>

                        {/* Equals Sign */}
                        <div
                          style={{
                            fontSize: 'var(--font-size-4xl)',
                            fontWeight: 'bold',
                            color: 'var(--color-gold)'
                          }}
                        >
                          =
                        </div>

                        {/* Total Group */}
                        <div style={{ textAlign: 'center' }}>
                          <div
                            style={{
                              fontSize: '3rem',
                              marginBottom: 'var(--space-2)',
                              display: 'flex',
                              gap: '0.5rem',
                              justifyContent: 'center',
                              flexWrap: 'wrap'
                            }}
                          >
                            {Array(currentSectionData.visualExample.totalCount)
                              .fill(0)
                              .map((_, i) => (
                                <span key={i}>
                                  {currentSectionData.visualExample.item}
                                </span>
                              ))}
                          </div>
                          <div
                            style={{
                              fontSize: 'var(--font-size-2xl)',
                              fontWeight: 'bold',
                              color: 'var(--color-primary)'
                            }}
                          >
                            {currentSectionData.visualExample.totalCount}
                          </div>
                        </div>
                      </div>

                      {/* Equation */}
                      <div
                        style={{
                          textAlign: 'center',
                          fontSize: 'var(--font-size-3xl)',
                          fontWeight: 'bold',
                          color: 'var(--color-deep-blue)',
                          padding: 'var(--space-4)',
                          background: 'var(--color-gold-light)',
                          borderRadius: 'var(--radius-md)'
                        }}
                      >
                        {currentSectionData.visualExample.equation}
                      </div>
                    </div>
                  ) : currentSectionData.visualExample.type ===
                    'subtraction' ? (
                    <div>
                      {/* Subtraction Visual */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: 'var(--space-6)',
                          marginBottom: 'var(--space-6)',
                          flexWrap: 'wrap'
                        }}
                      >
                        {/* Start Group */}
                        <div style={{ textAlign: 'center' }}>
                          <div
                            style={{
                              fontSize: '3rem',
                              marginBottom: 'var(--space-2)',
                              display: 'flex',
                              gap: '0.5rem',
                              justifyContent: 'center',
                              flexWrap: 'wrap'
                            }}
                          >
                            {Array(currentSectionData.visualExample.startCount)
                              .fill(0)
                              .map((_, i) => (
                                <span key={i}>
                                  {currentSectionData.visualExample.item}
                                </span>
                              ))}
                          </div>
                          <div
                            style={{
                              fontSize: 'var(--font-size-lg)',
                              color: 'var(--color-text-muted)'
                            }}
                          >
                            Start: {currentSectionData.visualExample.startCount}
                          </div>
                        </div>

                        {/* Minus Sign */}
                        <div
                          style={{
                            fontSize: 'var(--font-size-4xl)',
                            fontWeight: 'bold',
                            color: 'var(--color-gold)'
                          }}
                        >
                          −
                        </div>

                        {/* Take Away Group */}
                        <div style={{ textAlign: 'center' }}>
                          <div
                            style={{
                              fontSize: '2rem',
                              marginBottom: 'var(--space-2)',
                              display: 'flex',
                              gap: '0.5rem',
                              justifyContent: 'center',
                              flexWrap: 'wrap',
                              opacity: 0.5
                            }}
                          >
                            {Array(currentSectionData.visualExample.takeAway)
                              .fill(0)
                              .map((_, i) => (
                                <span key={i}>
                                  {currentSectionData.visualExample.item}
                                </span>
                              ))}
                          </div>
                          <div
                            style={{
                              fontSize: 'var(--font-size-lg)',
                              color: 'var(--color-text-muted)'
                            }}
                          >
                            Take away:{' '}
                            {currentSectionData.visualExample.takeAway}
                          </div>
                        </div>

                        {/* Equals Sign */}
                        <div
                          style={{
                            fontSize: 'var(--font-size-4xl)',
                            fontWeight: 'bold',
                            color: 'var(--color-gold)'
                          }}
                        >
                          =
                        </div>

                        {/* Remaining Group */}
                        <div style={{ textAlign: 'center' }}>
                          <div
                            style={{
                              fontSize: '3rem',
                              marginBottom: 'var(--space-2)',
                              display: 'flex',
                              gap: '0.5rem',
                              justifyContent: 'center',
                              flexWrap: 'wrap'
                            }}
                          >
                            {Array(
                              currentSectionData.visualExample.remainingCount
                            )
                              .fill(0)
                              .map((_, i) => (
                                <span key={i}>
                                  {currentSectionData.visualExample.item}
                                </span>
                              ))}
                          </div>
                          <div
                            style={{
                              fontSize: 'var(--font-size-2xl)',
                              fontWeight: 'bold',
                              color: 'var(--color-primary)'
                            }}
                          >
                            {currentSectionData.visualExample.remainingCount}
                          </div>
                        </div>
                      </div>

                      {/* Equation */}
                      <div
                        style={{
                          textAlign: 'center',
                          fontSize: 'var(--font-size-3xl)',
                          fontWeight: 'bold',
                          color: 'var(--color-deep-blue)',
                          padding: 'var(--space-4)',
                          background: 'var(--color-gold-light)',
                          borderRadius: 'var(--radius-md)'
                        }}
                      >
                        {currentSectionData.visualExample.equation}
                      </div>
                    </div>
                  ) : currentSectionData.visualExample.type === 'story' ? (
                    <div style={{ textAlign: 'center' }}>
                      <div
                        style={{
                          fontSize: '4rem',
                          marginBottom: 'var(--space-4)'
                        }}
                      >
                        {currentSectionData.visualExample.elements.characters.map(
                          (char, i) => (
                            <span key={i} style={{ margin: '0 0.5rem' }}>
                              {char}
                            </span>
                          )
                        )}
                      </div>
                      <div
                        style={{
                          fontSize: '3rem',
                          marginBottom: 'var(--space-4)'
                        }}
                      >
                        {currentSectionData.visualExample.elements.setting}
                      </div>
                      <div
                        style={{
                          background: 'var(--color-gold-light)',
                          padding: 'var(--space-4)',
                          borderRadius: 'var(--radius-md)',
                          marginTop: 'var(--space-4)'
                        }}
                      >
                        {currentSectionData.visualExample.elements.events.map(
                          (event, i) => (
                            <p
                              key={i}
                              style={{
                                fontSize: 'var(--font-size-lg)',
                                marginBottom: 'var(--space-2)',
                                color: 'var(--color-deep-blue)'
                              }}
                            >
                              {event}
                            </p>
                          )
                        )}
                      </div>
                    </div>
                  ) : currentSectionData.visualExample.type === 'characters' ? (
                    <div>
                      {currentSectionData.visualExample.examples.map(
                        (char, idx) => (
                          <div
                            key={idx}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 'var(--space-4)',
                              padding: 'var(--space-4)',
                              background: 'var(--color-sand-light)',
                              borderRadius: 'var(--radius-md)',
                              marginBottom: 'var(--space-3)'
                            }}
                          >
                            <div style={{ fontSize: '3rem' }}>{char.emoji}</div>
                            <div style={{ flex: 1 }}>
                              <div
                                style={{
                                  fontSize: 'var(--font-size-xl)',
                                  fontWeight: 'bold',
                                  color: 'var(--color-deep-blue)',
                                  marginBottom: 'var(--space-1)'
                                }}
                              >
                                {char.name} - {char.role}
                              </div>
                              <p
                                style={{
                                  fontSize: 'var(--font-size-base)',
                                  color: 'var(--color-text-muted)'
                                }}
                              >
                                {char.description}
                              </p>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  ) : currentSectionData.visualExample.type === 'settings' ? (
                    <div>
                      {currentSectionData.visualExample.examples.map(
                        (setting, idx) => (
                          <div
                            key={idx}
                            style={{
                              textAlign: 'center',
                              padding: 'var(--space-4)',
                              background: 'var(--color-gold-light)',
                              borderRadius: 'var(--radius-md)',
                              marginBottom: 'var(--space-3)',
                              border: '2px solid var(--color-gold)'
                            }}
                          >
                            <div
                              style={{
                                fontSize: '3rem',
                                marginBottom: 'var(--space-2)'
                              }}
                            >
                              {setting.emoji}
                            </div>
                            <div
                              style={{
                                fontSize: 'var(--font-size-xl)',
                                fontWeight: 'bold',
                                color: 'var(--color-deep-blue)',
                                marginBottom: 'var(--space-1)'
                              }}
                            >
                              {setting.place}
                            </div>
                            <div
                              style={{
                                fontSize: 'var(--font-size-base)',
                                color: 'var(--color-text-muted)',
                                marginBottom: 'var(--space-1)'
                              }}
                            >
                              {setting.time}
                            </div>
                            <p
                              style={{
                                fontSize: 'var(--font-size-sm)',
                                color: 'var(--color-text-muted)'
                              }}
                            >
                              {setting.description}
                            </p>
                          </div>
                        )
                      )}
                    </div>
                  ) : currentSectionData.visualExample.type ===
                    'storyStructure' ? (
                    <div>
                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(3, 1fr)',
                          gap: 'var(--space-4)',
                          marginBottom: 'var(--space-4)'
                        }}
                      >
                        <div
                          style={{
                            textAlign: 'center',
                            padding: 'var(--space-4)',
                            background: 'var(--color-gold-light)',
                            borderRadius: 'var(--radius-md)',
                            border: '2px solid var(--color-gold)'
                          }}
                        >
                          <div
                            style={{
                              fontSize: '3rem',
                              marginBottom: 'var(--space-2)'
                            }}
                          >
                            {currentSectionData.visualExample.beginning.emoji}
                          </div>
                          <div
                            style={{
                              fontSize: 'var(--font-size-lg)',
                              fontWeight: 'bold',
                              color: 'var(--color-deep-blue)',
                              marginBottom: 'var(--space-2)'
                            }}
                          >
                            Beginning
                          </div>
                          <p
                            style={{
                              fontSize: 'var(--font-size-sm)',
                              color: 'var(--color-text-muted)'
                            }}
                          >
                            {currentSectionData.visualExample.beginning.text}
                          </p>
                        </div>
                        <div
                          style={{
                            textAlign: 'center',
                            padding: 'var(--space-4)',
                            background: 'var(--color-gold-light)',
                            borderRadius: 'var(--radius-md)',
                            border: '2px solid var(--color-gold)'
                          }}
                        >
                          <div
                            style={{
                              fontSize: '3rem',
                              marginBottom: 'var(--space-2)'
                            }}
                          >
                            {currentSectionData.visualExample.middle.emoji}
                          </div>
                          <div
                            style={{
                              fontSize: 'var(--font-size-lg)',
                              fontWeight: 'bold',
                              color: 'var(--color-deep-blue)',
                              marginBottom: 'var(--space-2)'
                            }}
                          >
                            Middle
                          </div>
                          <p
                            style={{
                              fontSize: 'var(--font-size-sm)',
                              color: 'var(--color-text-muted)'
                            }}
                          >
                            {currentSectionData.visualExample.middle.text}
                          </p>
                        </div>
                        <div
                          style={{
                            textAlign: 'center',
                            padding: 'var(--space-4)',
                            background: 'var(--color-gold-light)',
                            borderRadius: 'var(--radius-md)',
                            border: '2px solid var(--color-gold)'
                          }}
                        >
                          <div
                            style={{
                              fontSize: '3rem',
                              marginBottom: 'var(--space-2)'
                            }}
                          >
                            {currentSectionData.visualExample.end.emoji}
                          </div>
                          <div
                            style={{
                              fontSize: 'var(--font-size-lg)',
                              fontWeight: 'bold',
                              color: 'var(--color-deep-blue)',
                              marginBottom: 'var(--space-2)'
                            }}
                          >
                            End
                          </div>
                          <p
                            style={{
                              fontSize: 'var(--font-size-sm)',
                              color: 'var(--color-text-muted)'
                            }}
                          >
                            {currentSectionData.visualExample.end.text}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : currentSectionData.visualExample.type ===
                    'createStory' ? (
                    <div>
                      {currentSectionData.visualExample.steps.map(
                        (step, idx) => (
                          <div
                            key={idx}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 'var(--space-4)',
                              padding: 'var(--space-4)',
                              background: 'var(--color-gold-light)',
                              borderRadius: 'var(--radius-md)',
                              marginBottom: 'var(--space-3)',
                              border: '2px solid var(--color-gold)'
                            }}
                          >
                            <div
                              style={{
                                fontSize: 'var(--font-size-2xl)',
                                fontWeight: 'bold',
                                color: 'var(--color-deep-blue)',
                                minWidth: '40px',
                                textAlign: 'center'
                              }}
                            >
                              {step.step}
                            </div>
                            <div style={{ fontSize: '2.5rem' }}>
                              {step.emoji}
                            </div>
                            <div
                              style={{
                                fontSize: 'var(--font-size-lg)',
                                color: 'var(--color-deep-blue)',
                                fontWeight: 'bold'
                              }}
                            >
                              {step.text}
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  ) : null}
                </div>
              )}

              {/* Explanation */}
              <div
                style={{
                  background: 'var(--color-sand-light)',
                  padding: 'var(--space-4)',
                  borderRadius: 'var(--radius-md)',
                  textAlign: 'center'
                }}
              >
                <p
                  style={{
                    fontSize: 'var(--font-size-lg)',
                    marginBottom: 'var(--space-2)',
                    lineHeight: '1.6'
                  }}
                >
                  {currentSectionData.explanation}
                </p>
                <p
                  className="arabic"
                  style={{
                    fontSize: 'var(--font-size-base)',
                    color: 'var(--color-text-muted)',
                    lineHeight: '1.6'
                  }}
                >
                  {currentSectionData.explanationAr}
                </p>
              </div>
            </div>

            {/* Navigation */}
            <div
              style={{
                marginTop: 'var(--space-6)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <button
                onClick={() =>
                  currentSection > 0 && setCurrentSection((prev) => prev - 1)
                }
                className="btn"
                style={{ background: 'var(--color-sand)' }}
                disabled={currentSection === 0}
              >
                ← Previous
              </button>
              <div
                style={{
                  fontSize: 'var(--font-size-sm)',
                  color: 'var(--color-text-muted)'
                }}
              >
                Slide {currentSlideNumber} of {totalSlides}
              </div>
              <button onClick={handleNext} className="btn btn-primary btn-lg">
                {currentSection < sections.length - 1
                  ? 'Next →'
                  : 'Start Practice →'}
              </button>
            </div>
          </div>
        ) : (
          <div>
            <h2
              style={{
                marginBottom: 'var(--space-4)',
                color: 'var(--color-deep-blue)'
              }}
            >
              {currentSectionData.title}
              <span
                className="arabic"
                style={{
                  marginLeft: 'var(--space-2)',
                  fontSize: 'var(--font-size-lg)'
                }}
              >
                {currentSectionData.titleAr}
              </span>
            </h2>

            <div
              style={{
                background: 'var(--color-sand-light)',
                padding: 'var(--space-6)',
                borderRadius: 'var(--radius-md)',
                marginBottom: 'var(--space-4)',
                textAlign: 'center'
              }}
            >
              <p
                style={{
                  fontSize: 'var(--font-size-xl)',
                  marginBottom: 'var(--space-4)'
                }}
              >
                Question {currentQuestionIndex + 1} of{' '}
                {currentSectionData.questions.length}
              </p>

              <div
                style={{
                  fontSize: 'var(--font-size-3xl)',
                  fontWeight: 'bold',
                  marginBottom: 'var(--space-6)',
                  color: 'var(--color-deep-blue)'
                }}
              >
                {currentSectionData.questions[currentQuestionIndex].question}
              </div>

              {/* Visual Example for Practice Questions */}
              {currentSectionData.questions[currentQuestionIndex]
                .visualExample && (
                <div
                  style={{
                    background: 'white',
                    borderRadius: 'var(--radius-md)',
                    padding: 'var(--space-4)',
                    marginBottom: 'var(--space-6)',
                    border: '2px solid var(--color-gold)'
                  }}
                >
                  {currentSectionData.questions[currentQuestionIndex]
                    .visualExample.type === 'question' ? (
                    <div style={{ textAlign: 'center' }}>
                      <div
                        style={{
                          fontSize: '4rem',
                          marginBottom: 'var(--space-3)'
                        }}
                      >
                        {
                          currentSectionData.questions[currentQuestionIndex]
                            .visualExample.emoji
                        }
                      </div>
                      <p
                        style={{
                          fontSize: 'var(--font-size-base)',
                          color: 'var(--color-text-muted)',
                          fontStyle: 'italic'
                        }}
                      >
                        Hint:{' '}
                        {
                          currentSectionData.questions[currentQuestionIndex]
                            .visualExample.hint
                        }
                      </p>
                    </div>
                  ) : currentSectionData.questions[currentQuestionIndex]
                      .visualExample.type === 'subtraction' ? (
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 'var(--space-4)',
                        marginBottom: 'var(--space-4)',
                        flexWrap: 'wrap'
                      }}
                    >
                      <div style={{ textAlign: 'center' }}>
                        <div
                          style={{
                            fontSize: '2.5rem',
                            marginBottom: 'var(--space-2)'
                          }}
                        >
                          {Array(
                            currentSectionData.questions[currentQuestionIndex]
                              .visualExample.startCount
                          )
                            .fill(0)
                            .map((_, i) => (
                              <span key={i}>
                                {
                                  currentSectionData.questions[
                                    currentQuestionIndex
                                  ].visualExample.item
                                }
                              </span>
                            ))}
                        </div>
                        <div
                          style={{
                            fontSize: 'var(--font-size-sm)',
                            color: 'var(--color-text-muted)'
                          }}
                        >
                          Start:{' '}
                          {
                            currentSectionData.questions[currentQuestionIndex]
                              .visualExample.startCount
                          }
                        </div>
                      </div>
                      <div
                        style={{
                          fontSize: 'var(--font-size-3xl)',
                          fontWeight: 'bold',
                          color: 'var(--color-gold)'
                        }}
                      >
                        −
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <div
                          style={{
                            fontSize: '2rem',
                            marginBottom: 'var(--space-2)',
                            opacity: 0.5
                          }}
                        >
                          {Array(
                            currentSectionData.questions[currentQuestionIndex]
                              .visualExample.takeAway
                          )
                            .fill(0)
                            .map((_, i) => (
                              <span key={i}>
                                {
                                  currentSectionData.questions[
                                    currentQuestionIndex
                                  ].visualExample.item
                                }
                              </span>
                            ))}
                        </div>
                        <div
                          style={{
                            fontSize: 'var(--font-size-sm)',
                            color: 'var(--color-text-muted)'
                          }}
                        >
                          Take:{' '}
                          {
                            currentSectionData.questions[currentQuestionIndex]
                              .visualExample.takeAway
                          }
                        </div>
                      </div>
                      <div
                        style={{
                          fontSize: 'var(--font-size-3xl)',
                          fontWeight: 'bold',
                          color: 'var(--color-gold)'
                        }}
                      >
                        =
                      </div>
                      <div
                        style={{
                          fontSize: 'var(--font-size-2xl)',
                          fontWeight: 'bold',
                          color: 'var(--color-primary)'
                        }}
                      >
                        ?
                      </div>
                    </div>
                  ) : (
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 'var(--space-4)',
                        flexWrap: 'wrap'
                      }}
                    >
                      <div style={{ textAlign: 'center' }}>
                        <div
                          style={{
                            fontSize: '2.5rem',
                            marginBottom: 'var(--space-2)'
                          }}
                        >
                          {Array(
                            currentSectionData.questions[currentQuestionIndex]
                              .visualExample.leftCount
                          )
                            .fill(0)
                            .map((_, i) => (
                              <span key={i}>
                                {
                                  currentSectionData.questions[
                                    currentQuestionIndex
                                  ].visualExample.item
                                }
                              </span>
                            ))}
                        </div>
                        <div
                          style={{
                            fontSize: 'var(--font-size-lg)',
                            fontWeight: 'bold'
                          }}
                        >
                          {
                            currentSectionData.questions[currentQuestionIndex]
                              .visualExample.leftCount
                          }
                        </div>
                      </div>
                      <div
                        style={{
                          fontSize: 'var(--font-size-3xl)',
                          fontWeight: 'bold',
                          color: 'var(--color-gold)'
                        }}
                      >
                        +
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <div
                          style={{
                            fontSize: '2.5rem',
                            marginBottom: 'var(--space-2)'
                          }}
                        >
                          {Array(
                            currentSectionData.questions[currentQuestionIndex]
                              .visualExample.rightCount
                          )
                            .fill(0)
                            .map((_, i) => (
                              <span key={i}>
                                {
                                  currentSectionData.questions[
                                    currentQuestionIndex
                                  ].visualExample.item
                                }
                              </span>
                            ))}
                        </div>
                        <div
                          style={{
                            fontSize: 'var(--font-size-lg)',
                            fontWeight: 'bold'
                          }}
                        >
                          {
                            currentSectionData.questions[currentQuestionIndex]
                              .visualExample.rightCount
                          }
                        </div>
                      </div>
                      <div
                        style={{
                          fontSize: 'var(--font-size-3xl)',
                          fontWeight: 'bold',
                          color: 'var(--color-gold)'
                        }}
                      >
                        =
                      </div>
                      <div
                        style={{
                          fontSize: 'var(--font-size-2xl)',
                          fontWeight: 'bold',
                          color: 'var(--color-primary)'
                        }}
                      >
                        ?
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Show Arabic question if available */}
              {currentSectionData.questions[currentQuestionIndex]
                .questionAr && (
                <div
                  style={{
                    fontSize: 'var(--font-size-lg)',
                    color: 'var(--color-text-muted)',
                    marginBottom: 'var(--space-4)',
                    textAlign: 'center'
                  }}
                  className="arabic"
                >
                  {
                    currentSectionData.questions[currentQuestionIndex]
                      .questionAr
                  }
                </div>
              )}

              {!showResult ? (
                <div>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(2, 1fr)',
                      gap: 'var(--space-3)',
                      marginBottom: 'var(--space-4)'
                    }}
                  >
                    {currentSectionData.questions[
                      currentQuestionIndex
                    ].options.map((option, idx) => (
                      <button
                        key={idx}
                        onClick={() => setUserAnswer(option)}
                        className="btn"
                        style={{
                          padding: 'var(--space-4)',
                          fontSize: 'var(--font-size-xl)',
                          background:
                            userAnswer === option
                              ? 'var(--color-gold)'
                              : 'white',
                          border: `2px solid ${
                            userAnswer === option
                              ? 'var(--color-deep-blue)'
                              : 'var(--color-sand)'
                          }`
                        }}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={handleAnswerSubmit}
                    className="btn btn-primary btn-lg"
                    disabled={!userAnswer}
                  >
                    Check Answer ✓
                  </button>
                </div>
              ) : (
                <div>
                  <div
                    style={{
                      fontSize: 'var(--font-size-4xl)',
                      marginBottom: 'var(--space-4)'
                    }}
                  >
                    {isCorrect ? '✅ Correct!' : '❌ Try Again'}
                  </div>
                  {isCorrect && (
                    <p
                      style={{
                        fontSize: 'var(--font-size-lg)',
                        color: 'var(--color-primary)',
                        marginBottom: 'var(--space-4)'
                      }}
                    >
                      Great job! You earned 10 points! ⭐
                    </p>
                  )}
                  <button
                    onClick={handleNext}
                    className="btn btn-primary btn-lg"
                  >
                    {currentQuestionIndex <
                    currentSectionData.questions.length - 1
                      ? 'Next Question →'
                      : currentSection < sections.length - 1
                      ? 'Continue →'
                      : 'Finish Module ✓'}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Completion Message */}
      {currentSection === sections.length - 1 &&
        currentSectionData.type === 'practice' &&
        currentQuestionIndex === currentSectionData.questions.length - 1 &&
        showResult && (
          <div
            className="card card-gold"
            style={{
              marginTop: 'var(--space-6)',
              background:
                'linear-gradient(135deg, var(--color-gold) 0%, var(--color-gold-light) 100%)',
              textAlign: 'center',
              padding: 'var(--space-6)'
            }}
          >
            <div style={{ fontSize: '4rem', marginBottom: 'var(--space-4)' }}>
              🎉
            </div>
            <h2>Congratulations!</h2>
            <p
              style={{
                fontSize: 'var(--font-size-lg)',
                marginBottom: 'var(--space-4)'
              }}
            >
              You completed the Addition & Subtraction module!
            </p>
            <p
              style={{
                fontSize: 'var(--font-size-xl)',
                fontWeight: 'bold',
                color: 'var(--color-deep-blue)'
              }}
            >
              Total Score: {score} points ⭐
            </p>
          </div>
        )}
    </div>
  );
};

export default LearnModule;
