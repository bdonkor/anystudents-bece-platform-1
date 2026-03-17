// ============================================
// BECE EXAM GENERATOR
// Uses Claude API to generate official-standard exams
// ============================================

export const JHS_SUBJECTS = {
  mathematics: 'Mathematics',
  english: 'English Language',
  science: 'Integrated Science',
  social: 'Social Studies',
  ict: 'Information and Communication Technology',
  rme: 'Religious and Moral Education',
  career_tech: 'Career Technology',
  creative_arts: 'Creative Arts and Design',
  ghanaian_language: 'Ghanaian Language (Asante Twi)',
  french: 'French'
}

export const SHS_SUBJECTS = {
  // Core
  core_math: 'Core Mathematics',
  english_shs: 'English Language',
  integrated_science: 'Integrated Science',
  social_studies_shs: 'Social Studies',
  // Science
  elective_math: 'Elective Mathematics',
  physics: 'Physics',
  chemistry: 'Chemistry',
  biology: 'Biology',
  // Business
  fin_accounting: 'Financial Accounting',
  cost_accounting: 'Cost Accounting',
  business_mgmt: 'Business Management',
  economics: 'Economics',
  // General Arts
  government: 'Government',
  geography: 'Geography',
  history: 'History',
  literature: 'Literature in English',
  crs: 'Christian Religious Studies',
  irs: 'Islamic Religious Studies',
  // Visual Arts
  gka: 'General Knowledge in Art',
  graphic_design: 'Graphic Design',
  picture_making: 'Picture Making',
  textiles: 'Textiles',
  sculpture: 'Sculpture',
  ceramics: 'Ceramics',
  // Home Economics
  mil: 'Management in Living',
  food_nutrition: 'Food and Nutrition',
  clothing_textiles: 'Clothing and Textiles',
  // Technical
  tech_drawing: 'Technical Drawing',
  building_const: 'Building Construction',
  metalwork: 'Metalwork',
  woodwork: 'Woodwork',
  applied_electricity: 'Applied Electricity'
}

export const SHS_PROGRAMS = {
  Science: ['elective_math', 'physics', 'chemistry', 'biology'],
  Business: ['fin_accounting', 'cost_accounting', 'business_mgmt', 'economics'],
  'General Arts': ['government', 'economics', 'geography', 'history', 'literature', 'crs', 'irs'],
  'Visual Arts': ['gka', 'graphic_design', 'picture_making', 'textiles', 'sculpture', 'ceramics'],
  'Home Economics': ['mil', 'food_nutrition', 'clothing_textiles'],
  Technical: ['tech_drawing', 'building_const', 'metalwork', 'woodwork', 'applied_electricity']
}

const SUBJECT_TOPICS = {
  // --- JHS TOPICS ---
  mathematics: ['Number', 'Algebra', 'Geometry', 'Statistics', 'Trigonometry', 'Sets', 'Probability', 'Vectors'],
  english: ['Comprehension', 'Summary', 'Grammar', 'Letter Writing', 'Narrative Essay', 'Argumentative', 'Literature'],
  science: ['Matter', 'Energy', 'Living Things', 'Ecology', 'Human Body', 'Electricity', 'Agric Science', 'Geology'],
  social: ['Mapping', 'Environment', 'Ghana History', 'Civics', 'Economics', 'International Relations', 'Social Issues'],
  ict: ['Fundamentals', 'Hardware', 'Software', 'Word Processing', 'Spreadsheets', 'Internet', 'Safety'],
  rme: ['God and Creation', 'Religious Leaders', 'Ethics', 'Social Values', 'Customs', 'Festivals'],
  career_tech: ['Technical Drawing', 'Woodwork', 'Metalwork', 'Building', 'Food', 'Clothing', 'Entrepreneurship'],
  creative_arts: ['Visual Arts', 'Performing Arts', 'Music', 'Design', 'Crafts', 'History of Art'],
  ghanaian_language: ['Comprehension', 'Summary', 'Grammar', 'Proverbs', 'Customs', 'Customary Practices'],
  french: ['Vocabulary', 'Verbs', 'Translation', 'Dialogue', 'Comprehension', 'Culture'],

  // --- SHS CORE TOPICS ---
  core_math: ['Sets and Operations', 'Algebraic Expressions', 'Equations and Inequalities', 'Logarithms', 'Trigonometry', 'Coordinate Geometry', 'Statistics', 'Probability', 'Consumer Mathematics', 'Logic'],
  english_shs: ['Reading Comprehension', 'Summary Writing', 'Directed Writing (Formal letters)', 'Creative Writing', 'Lexis and Structure', 'Oral English', 'Critical Appraisal'],
  integrated_science: ['Safety in the Lab', 'Acid-Base Reactions', 'Cells and Genetics', 'Chemical Bonding', 'Forces and Motion', 'Thermal Energy', 'Water and Sanitation', 'Animal Production', 'Inorganic Chemistry', 'Soil Science'],
  social_studies_shs: ['Self and Identity', 'Family and Culture', 'National Development', 'Governance and Politics', 'Population Growth', 'Globalization', 'Science and Tech', 'Environment'],

  // --- ELECTIVE TOPICS ---
  elective_math: ['Calculus', 'Coordinate Geometry', 'Vectors and Mechanics', 'Matrices and Transformations', 'Complex Numbers', 'Series and Sequences', 'Probability Distributions', 'Trigonometric Identities'],
  physics: ['Mechanics', 'Thermodynamics', 'Waves and Optics', 'Electricity and Magnetism', 'Atomic and Nuclear Physics', 'Electronics', 'Fields', 'Modern Physics'],
  chemistry: ['Atomic Structure', 'Chemical Equilibrium', 'Thermochemistry', 'Electrochemistry', 'Organic Chemistry', 'Periodic Table', 'Redox Reactions', 'Chemical Kinetics'],
  biology: ['Biological Molecules', 'Cell Biology', 'Human Anatomy', 'Plant Physiology', 'Genetics', 'Evolution', 'Ecology', 'Reproductive Biology'],
  fin_accounting: ['Principles of Accounts', 'Final Accounts', 'Partnerships', 'Joint Ventures', 'Company Accounts', 'Single Entry', 'Departmental Accounts', 'Manufacturing Accounts'],
  cost_accounting: ['Material Costing', 'Labor Costing', 'Overheads', 'Cost Classification', 'Job Costing', 'Process Costing', 'Budgeting', 'Standard Costing'],
  business_mgmt: ['Management Principles', 'Human Resources', 'Marketing', 'Finance', 'Production', 'Communication', 'Legal Environment', 'Planning'],
  economics: ['Demand and Supply', 'Production Theory', 'Market Structures', 'National Income', 'Money and Banking', 'Public Finance', 'International Trade', 'Development Planning'],
  government: ['Forms of Government', 'Political Systems', 'Constitutions', 'Public Administration', 'Foreign Policy', 'International Orgs', 'Electoral Systems', 'Nationalism'],
  geography: ['Geomorphology', 'Climatology', 'Economic Geography', 'Map Reading', 'Regional Geography of Ghana/Africa', 'Settlements', 'Environmental Management'],
  history: ['Pre-colonial Ghana', 'Trans-Saharan Trade', 'European Contact', 'Colonial Rule', 'Independence Struggle', 'Post-independence Politics'],
  literature: ['Shakespearean Play', 'African Drama', 'Non-African Drama', 'African Poetry', 'Non-African Poetry', 'Literary Techniques', 'Characterization'],
  crs: ['Old Testament Roots', 'Jesus\' Ministry', 'The Early Church', 'Ethics in Christianity', 'Prophecy', 'Biblical Interpretation'],
  gka: ['Principles of Art', 'Art History of Africa/Ghana', 'Appreciation and Criticism', 'Marketing Art', 'Health and Safety in Art', 'Tools and Materials'],
  graphic_design: ['Typography', 'Layout Design', 'Color Theory', 'Illustration', 'Corporate Identity', 'Advertising Design', 'Packaging'],
  picture_making: ['Drawing Techniques', 'Painting', 'Composition', 'Anatomy/Proportion', 'Landscape', 'Still Life'],
  textiles: ['Fibre Science', 'Spinning and Weaving', 'Dyeing and Printing', 'Design Concepts', 'Apparel Design', 'Textile Marketing'],
  mil: ['Resource Management', 'Family Dynamics', 'Consumer Education', 'Housing and Interior', 'Health and Hygiene', 'Standard of Living'],
  food_nutrition: ['Nutrients and Dietetics', 'Meal Planning', 'Food Storage', 'Cookery Processes', 'Beverages', 'Catering Management'],
  tech_drawing: ['Geometric Construction', 'Isometric Projection', 'Orthographic Projection', 'Sectional Views', 'Fasteners', 'Assembly Drawing'],
  applied_electricity: ['Circuits', 'Electronics', 'Power Generation', 'Electrical Installation', 'Magnetism', 'Measurements', 'Safety Protocols']
}

export function generateExamSeed(userId, subject) {
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(2, 8)
  return `${subject}-${userId.substring(0, 8)}-${timestamp}-${random}`
}

export function generateBrowserFingerprint() {
  try {
    const { userAgent, language, platform } = navigator
    const { width, height, colorDepth } = window.screen
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
    const raw = `${userAgent}|${language}|${platform}|${width}x${height}|${colorDepth}|${timezone}`
    let hash = 0
    for (let i = 0; i < raw.length; i++) {
      const char = raw.charCodeAt(i)
      hash = ((hash << 5) - hash) + char
      hash = hash & hash
    }
    return Math.abs(hash).toString(36)
  } catch {
    return Math.random().toString(36).substring(2)
  }
}

function buildExamPrompt(subject, subjectKey, version = 'A', level = 'jhs') {
  const topics = SUBJECT_TOPICS[subjectKey] || []
  const shuffled = [...topics].sort(() => 0.5 - Math.random())
  const selectedTopics = shuffled.slice(0, 7)
  const seed = Math.floor(Math.random() * 99999)
  const year = new Date().getFullYear()

  const levelLong = level === 'shs' ? 'WASSCE (Senior High School)' : 'BECE (Junior High School)'
  const difficulty = level === 'shs' ? 'WASSCE SHS 3 standards' : 'BECE JHS 3 standards'
  const officialTitle = level === 'shs' ? 'WEST AFRICAN SENIOR SCHOOL CERTIFICATE EXAMINATION' : 'BASIC EDUCATION CERTIFICATE EXAMINATION'

  return `You are a senior Ghana ${level.toUpperCase()} examination setter with expert knowledge of national standards for ${level === 'shs' ? 'SHS 3' : 'JHS 3'} students.

Generate a complete, unique ${level.toUpperCase()} mock examination for ${subject} - Version ${version}.
Level: ${levelLong}
Uniqueness seed: ${seed}
Focus topics: ${selectedTopics.join(', ')}

CRITICAL INSTRUCTION: Your response must be ONLY valid JSON. No other text allowed.

CRITICAL RULES:
1. Generate EXACTLY 40 multiple choice questions in Section A
2. Generate EXACTLY 5 structured questions in Section B
3. Every question must have options A, B, C, D
4. Include a complete marking scheme with all answers
5. Use Ghana-relevant contexts: names like Kofi, Ama, Kwame, Akosua; currency in cedis (GH₵); Ghanaian towns and scenarios
6. Vary numerical values uniquely for this version
7. Questions must match real ${level.toUpperCase()} difficulty for ${level === 'shs' ? 'SHS 3' : 'JHS 3'}
8. Ensure ${level === 'shs' ? 'WASSCE' : 'BECE'} academic standards and curriculum markers are strictly followed.

CRITICAL OUTPUT FORMATTING - EXTREMELY IMPORTANT:
1. Return VALID JSON ONLY - nothing else.
2. NO markdown blocks, NO \`\`\`json wrapper, NO backticks.
3. NO explanations, NO comments, NO text before or after the JSON.
4. Start with { and end with } - nothing more.
5. All strings MUST be properly escaped - use \\" for quotes inside strings.
6. All arrays MUST have proper commas between elements.
7. NO trailing commas in arrays or objects.
8. Test your JSON is valid before responding.

YOUR ENTIRE RESPONSE MUST BE ONLY THIS JSON STRUCTURE:

{
  "title": "${officialTitle}",
  "subject": "${subject}",
  "version": "Version ${version}",
  "year": "Practice ${year}",
  "duration": "2 hours",
  "totalMarks": 100,
  "instructions": "Answer ALL questions in Section A. Answer THREE questions in Section B. Write your answers clearly.",
  "sectionA": {
    "title": "SECTION A — OBJECTIVE TEST",
    "instructions": "Each question is followed by four options lettered A to D. Choose the BEST answer and shade the corresponding letter on your answer sheet.",
    "marks": "40 marks (1 mark each)",
    "questions": [
      {
        "number": 1,
        "question": "Question text here",
        "options": {
          "A": "option text",
          "B": "option text",
          "C": "option text",
          "D": "option text"
        },
        "topic": "topic name"
      }
    ]
  },
  "sectionB": {
    "title": "SECTION B — ESSAY / STRUCTURED",
    "instructions": "Answer THREE questions only from this section. Each question carries 20 marks.",
    "marks": "60 marks",
    "questions": [
      {
        "number": 1,
        "question": "Full structured question here",
        "parts": [
          {"part": "a", "question": "part question", "marks": 5},
          {"part": "b", "question": "part question", "marks": 8},
          {"part": "c", "question": "part question", "marks": 7}
        ],
        "totalMarks": 20,
        "topic": "topic name"
      }
    ]
  },
  "markingScheme": {
    "sectionA": [
      {"number": 1, "answer": "B", "explanation": "brief explanation"}
    ],
    "sectionB": [
      {
        "number": 1,
        "answers": [
          {"part": "a", "answer": "Model answer here", "marks": 5},
          {"part": "b", "answer": "Model answer here", "marks": 8},
          {"part": "c", "answer": "Model answer here", "marks": 7}
        ]
      }
    ]
  }
}`
}

function validateExam(exam) {
  const errors = []

  if (!exam.sectionA?.questions || exam.sectionA.questions.length !== 40) {
    errors.push(`Section A must have exactly 40 questions (got ${exam.sectionA?.questions?.length || 0})`)
  }

  if (!exam.sectionB?.questions || exam.sectionB.questions.length !== 5) {
    errors.push(`Section B must have exactly 5 questions (got ${exam.sectionB?.questions?.length || 0})`)
  }

  if (exam.sectionA?.questions) {
    exam.sectionA.questions.forEach((q, i) => {
      if (!q.options?.A || !q.options?.B || !q.options?.C || !q.options?.D) {
        errors.push(`Question ${i + 1} missing options`)
      }
    })
  }

  if (!exam.markingScheme?.sectionA || exam.markingScheme.sectionA.length !== 40) {
    errors.push('Marking scheme for Section A incomplete')
  }

  return { valid: errors.length === 0, errors }
}

export async function generateExam(subject, subjectKey, level = 'jhs', version = 'A', maxRetries = 3) {
  const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY

  if (!apiKey) {
    throw new Error('Anthropic API key not configured. Check your .env file.')
  }

  let lastError = null

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const prompt = buildExamPrompt(subject, subjectKey, version, level)

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true'
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-5-20250929',
          max_tokens: 16000,
          temperature: 0.7,
          messages: [
            {
              role: 'user',
              content: prompt
            }
          ]
        })
      })

      if (!response.ok) {
        const errData = await response.json()
        throw new Error(`API Error: ${errData.error?.message || response.statusText}`)
      }

      const data = await response.json()
      const rawText = data.content?.[0]?.text || ''

      // Robust JSON extraction and cleaning
      let jsonText = rawText.trim()

      // Remove any markdown blocks around the JSON
      jsonText = jsonText.replace(/^```[a-z]*\s*\n?/gi, '')
      jsonText = jsonText.replace(/\n?```$/gi, '')

      // Match the first '{' and the last '}' to strip leading/trailing conversational text
      const jsonStart = jsonText.indexOf('{')
      const jsonEnd = jsonText.lastIndexOf('}')

      if (jsonStart !== -1 && jsonEnd !== -1 && jsonEnd > jsonStart) {
        jsonText = jsonText.substring(jsonStart, jsonEnd + 1)
      }

      // Final string escapes cleaning for robust parsing
      jsonText = jsonText.replace(/[\u0000-\u001F]+/g, ' ') // Strip unsafe control characters

      // Remove trailing commas before closing brackets/braces
      jsonText = jsonText.replace(/,(\s*[}\]])/g, '$1')
      
      let exam
      try {
        exam = JSON.parse(jsonText)
      } catch (parseError) {
        console.error("JSON parsing error:", parseError)
        console.error("Error position:", parseError.message)
        console.error("Failed JSON start:", jsonText.substring(0, 300))
        console.error("Failed JSON end:", jsonText.substring(jsonText.length - 300))

        // Try to show the problematic area
        const match = parseError.message.match(/position (\d+)/)
        if (match) {
          const pos = parseInt(match[1])
          const start = Math.max(0, pos - 100)
          const end = Math.min(jsonText.length, pos + 100)
          console.error("Problematic area:", jsonText.substring(start, end))
        }

        throw new Error(`Could not parse exam JSON from API response: ${parseError.message}`)
      }

      const validation = validateExam(exam)

      if (!validation.valid && attempt < maxRetries) {
        console.warn(`Attempt ${attempt} validation failed:`, validation.errors)
        lastError = new Error(validation.errors.join('; '))
        continue
      }

      return { exam, validation, attempt }

    } catch (err) {
      lastError = err
      console.error(`Exam generation attempt ${attempt} failed:`, err)
      if (attempt === maxRetries) break
      await new Promise(r => setTimeout(r, 1000 * attempt))
    }
  }

  throw lastError || new Error('Failed to generate exam after multiple attempts')
}
