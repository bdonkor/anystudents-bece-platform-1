// ============================================
// BECE EXAM GENERATOR
// Uses Claude API to generate official-standard exams
// ============================================

export const SUBJECTS = {
  mathematics: 'Mathematics',
  english: 'English Language',
  science: 'Integrated Science',
  social: 'Social Studies',
  ict: 'Information and Communication Technology',
  rme: 'Religious and Moral Education',
  career_tech: 'Career Technology',
  creative_arts: 'Creative Arts and Design',
  ghanaian_language: 'Ghanaian Language',
  french: 'French'
}

const SUBJECT_TOPICS = {
  mathematics: [
    'Number and Numeration', 'Fractions and Decimals', 'Percentages',
    'Ratios and Proportions', 'Algebra and Equations', 'Geometry',
    'Mensuration', 'Statistics', 'Probability', 'Set Theory',
    'Indices and Logarithms', 'Matrices', 'Vectors', 'Trigonometry'
  ],
  english: [
    'Comprehension', 'Summary Writing', 'Vocabulary', 'Grammar and Usage',
    'Letter Writing', 'Narrative Essays', 'Argumentative Essays',
    'Descriptive Writing', 'Oral English', 'Literature'
  ],
  science: [
    'Living Things', 'Human Body Systems', 'Plant Biology',
    'Matter and Properties', 'Forces and Motion', 'Energy',
    'Electricity', 'Chemical Changes', 'Environmental Science',
    'Health and Disease', 'Reproduction', 'Ecology'
  ],
  social: [
    'Ghana History', 'West African History', 'Physical Geography',
    'Human Geography', 'Civics and Government', 'Economic Activities',
    'Natural Resources', 'Climate and Weather', 'Population',
    'Culture and Society', 'International Relations'
  ],
  ict: [
    'Computer Fundamentals', 'Operating Systems', 'Word Processing',
    'Spreadsheets', 'Internet and Email', 'Databases',
    'Programming Basics', 'Cybersecurity', 'Digital Communication',
    'Multimedia', 'Computer Networks'
  ],
  rme: [
    'Christianity', 'Islam', 'African Traditional Religion',
    'Religious Ethics', 'Moral Values', 'Human Rights',
    'Social Responsibility', 'Leadership', 'Family Life',
    'Environmental Care', 'Peace and Conflict Resolution'
  ],
  career_tech: [
    'Materials and Processing', 'Tools and Equipment', 'Basic Electronics',
    'Technical Drawing', 'Woodwork', 'Metalwork', 'Building Construction',
    'Food and Nutrition', 'Clothing and Textiles', 'Entrepreneurship'
  ],
  creative_arts: [
    'Visual Arts', 'Performing Arts', 'Drawing and Shading', 'Color Theory',
    'Pattern Making', 'Music Theory', 'Dance and Drama', 'Local Crafts',
    'Art History', 'Appreciation of Art'
  ],
  ghanaian_language: [
    'Comprehension', 'Summary Writing', 'Grammar', 'Proverbs and Idioms',
    'Customs and Institutions', 'Oral Literature', 'Written Literature',
    'Essay Writing', 'Translation', 'Phonology'
  ],
  french: [
    'Vocabulary', 'Grammar', 'Comprehension', 'Translation',
    'Dialogue and Conversation', 'Creative Writing', 'Verbs and Tenses',
    'Articles and Prepositions', 'French Culture', 'Dictation'
  ]
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

function buildExamPrompt(subject, subjectKey, version = 'A') {
  const topics = SUBJECT_TOPICS[subjectKey] || []
  const shuffled = [...topics].sort(() => 0.5 - Math.random())
  const selectedTopics = shuffled.slice(0, 7)
  const seed = Math.floor(Math.random() * 99999)
  const year = new Date().getFullYear()

  return `You are a senior Ghana BECE examination setter with expert knowledge of national standards for JHS 3 students.

Generate a complete, unique BECE mock examination for ${subject} - Version ${version}.
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
7. Questions must match real BECE difficulty for JHS 3

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
  "title": "BASIC EDUCATION CERTIFICATE EXAMINATION",
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

export async function generateBECEExam(subject, subjectKey, version = 'A', maxRetries = 3) {
  const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY

  if (!apiKey) {
    throw new Error('Anthropic API key not configured. Check your .env file.')
  }

  let lastError = null

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const prompt = buildExamPrompt(subject, subjectKey, version)

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
