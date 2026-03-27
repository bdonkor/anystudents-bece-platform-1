import{r as m,j as e,h as p,ao as y,L as g,i as u,p as v}from"./framework-Dx3Qxv-b.js";import{u as k}from"./index-DfFFCOSy.js";import{N as h}from"./Navbar-BSIVuEvd.js";import{F as b}from"./Footer-DNzt4b6S.js";import"./vendor-CIYvVnD_.js";import"./supabase-D4iqXWAT.js";const w=`
  #sd-root {
    --sd-primary: #0f172a;
    --sd-gold: #f5b400;
    --sd-success: #057A55;
    --sd-warning: #D97706;
    --sd-danger: #E02424;
    --sd-locked: #9CA3AF;
    --sd-bg: #fffdf7;
    --sd-card-bg: #FFFFFF;
    --sd-text: #111827;
    --sd-muted: #6B7280;
    --sd-border: #E5E7EB;
    --sd-radius: 16px;
    --sd-shadow: 0 10px 15px -3px rgba(15, 23, 42, 0.15);
    font-family: 'Source Serif 4', Georgia, serif;
    color: var(--sd-text);
    background: var(--sd-bg);
    padding: 2rem 1rem;
    line-height: 1.6;
  }
  .sd-intro-text { 
    max-width: 800px; 
    margin-top: 1rem; 
    font-size: 1.1rem; 
    color: #475569; 
    line-height: 1.6; 
    background: #fff;
    padding: 1rem 1.5rem;
    border-radius: 12px;
    border-left: 4px solid var(--sd-gold);
    box-shadow: 0 4px 6px -1px rgba(15,23,42,0.08);
  }
  @media (max-width: 768px) {
    .sd-intro-text { font-size: 1rem; text-align: left; }
  }
  .sd-header { max-width: 1200px; margin: 0 auto 3rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1.5rem; }
  .sd-badge { padding: 0.25rem 0.75rem; border-radius: 999px; font-size: 0.875rem; font-weight: 700; text-transform: uppercase; }
  .sd-jhs { background: rgba(245,180,0,0.15); color: #92650a; border: 1px solid rgba(245,180,0,0.3); }
  .sd-shs { background: rgba(15,23,42,0.08); color: #0f172a; border: 1px solid rgba(15,23,42,0.15); }
  .sd-progress-container { flex: 1; min-width: 300px; max-width: 500px; }
  .sd-progress-bar-bg { height: 16px; background: #E5E7EB; border-radius: 999px; overflow: hidden; margin-top: 0.75rem; border: 1px solid #D1D5DB; }
  .sd-progress-bar-fill { height: 100%; background: linear-gradient(90deg, #f5b400 0%, #d97706 100%); transition: width 0.8s cubic-bezier(0.34, 1.56, 0.64, 1); }
  .sd-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; max-width: 1200px; margin: 0 auto; }
  @media (max-width: 1024px) { .sd-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 640px) { .sd-grid { grid-template-columns: 1fr; } }
  
  .sd-card { 
    background: var(--sd-card-bg); 
    border: 2px solid #F1F5F9; 
    border-radius: var(--sd-radius); 
    overflow: hidden; 
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); 
    cursor: pointer; 
    display: flex; 
    flex-direction: column;
    box-shadow: 0 4px 6px rgba(0,0,0,0.02);
  }
  .sd-card:hover:not(.sd-locked-card) { 
    transform: translateY(-8px) scale(1.02); 
    box-shadow: 0 20px 25px -5px rgba(15, 23, 42, 0.12);
    border-color: var(--sd-gold);
  }
  .sd-card-active { 
    border: 3px solid #f5b400 !important; 
    box-shadow: 0 0 25px rgba(245, 180, 0, 0.25) !important;
    background: #fffdf7 !important;
  }
  .sd-card-completed { 
    border: 2px solid #10B981 !important; 
    box-shadow: 0 0 15px rgba(16, 185, 129, 0.1) !important;
  }
  .sd-locked-card { 
    opacity: 0.6; 
    cursor: not-allowed; 
    background: #F8FAFC; 
    border-style: dashed !important;
    border-color: #CBD5E1 !important;
  }
  .sd-card-image-wrap { height: 180px; overflow: hidden; position: relative; border-bottom: 1px solid #F1F5F9; }
  .sd-card-img { width: 100%; height: 100%; object-fit: cover; transition: 0.6s; }
  .sd-card:hover .sd-card-img { scale: 1.15; }
  .sd-card-content { padding: 1.5rem; flex: 1; }
  
  .sd-card-num { font-weight: 900; color: #94A3B8; font-size: 0.75rem; margin-bottom: 0.25rem; letter-spacing: 0.05em; }
  .sd-card-title { font-family: 'Playfair Display', serif; font-size: 1.4rem; font-weight: 700; color: #0f172a; margin-bottom: 0.75rem; line-height: 1.2; }
  .sd-status-badge { padding: 6px 12px; border-radius: 8px; font-size: 0.7rem; font-weight: 900; display: inline-block; letter-spacing: 0.02em; }
  .sd-status-locked { background: #F1F5F9; color: #64748B; }
  .sd-status-active { background: rgba(245,180,0,0.15); color: #92650a; border: 1px solid rgba(245,180,0,0.3); }
  .sd-status-completed { background: #D1FAE5; color: #065F46; }
  .sd-dots { display: flex; gap: 6px; margin-top: 1.5rem; }
  .sd-dot { width: 10px; height: 10px; border-radius: 50%; border: 1px solid #E2E8F0; transition: 0.3s; }
  .sd-dot-filled { background: #f5b400; border-color: #f5b400; box-shadow: 0 0 8px rgba(245, 180, 0, 0.4); }
  
  .sd-detail-view { max-width: 1100px; margin: 0 auto; background: var(--sd-card-bg); border-radius: var(--sd-radius); border: 1px solid var(--sd-border); display: none; overflow: hidden; box-shadow: var(--sd-shadow); }
  .sd-detail-header { padding: 3rem; border-bottom: 1px solid var(--sd-border); background: #fdfdfd; }
  .sd-tabs { display: flex; border-bottom: 1px solid var(--sd-border); overflow-x: auto; background: #fff; }
  .sd-tab { padding: 1.25rem 2rem; background: none; border: none; font-weight: 800; cursor: pointer; color: var(--sd-muted); font-size: 0.9rem; border-bottom: 4px solid transparent; transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1); flex: 1; text-align: center; white-space: nowrap; }
  .sd-tab-active { color: #fff !important; border-bottom-color: var(--skill-color, #f5b400) !important; background: var(--skill-color, #f5b400) !important; box-shadow: 0 4px 12px rgba(0,0,0,0.15); }
  .sd-tab:hover:not(.sd-tab-active):not(.sd-tab-disabled) { background: var(--skill-color, rgba(245,180,0,0.08)); opacity: 0.8; }
  .sd-tab-disabled { opacity: 0.4; cursor: not-allowed; }
  .sd-content-pane { padding: 3rem; min-height: 500px; font-size: 1.15rem; }
  .sd-callout { background: rgba(245,180,0,0.07); border-left: 5px solid #f5b400; padding: 2rem; margin: 2rem 0; border-radius: 8px; }
  .sd-btn { padding: 1rem 2rem; border-radius: 12px; font-weight: 800; cursor: pointer; border: none; transition: 0.2s; }
  .sd-btn-primary { background: #0f172a; color: white; }
  .sd-btn-primary:hover { background: #1e293b; transform: scale(1.02); }
  .sd-btn-gold { background: #f5b400; color: #0f172a; font-weight: 900; }
  .sd-btn-gold:hover { background: #fbbf24; transform: scale(1.02); box-shadow: 0 4px 15px rgba(245, 180, 0, 0.4); }
  .sd-timer { background: #0f172a; color: #f5b400; padding: 0.75rem; font-family: 'JetBrains Mono', monospace; font-weight: 900; text-align: center; font-size: 1.5rem; border-bottom: 3px solid #f5b400; }
  .sd-task-card { background: #f8fafc; border: 1px solid var(--sd-border); padding: 2rem; border-radius: 12px; margin-bottom: 1.5rem; }
  .sd-input { width: 100%; padding: 1rem; border: 1px solid var(--sd-border); border-radius: 8px; font-family: inherit; margin-top: 1rem; }
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Source+Serif+4:wght@400;700;800;900&display=swap');

  #sd-certificate { display: none; background: white; padding: 40px; border: 20px double #0f172a; text-align: center; max-width: 1100px; margin: 3rem auto; box-sizing: border-box; }
  .sd-modal { position: fixed; inset: 0; background: rgba(15,23,42,0.9); backdrop-filter: blur(8px); display: none; align-items: center; justify-content: center; z-index: 1000; }
  .sd-modal-content { background: white; padding: 4rem; border-radius: 32px; text-align: center; max-width: 600px; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5); }

  @media print {
    @page { size: landscape; margin: 0; }
    html, body { height: 100%; margin: 0 !important; padding: 0 !important; overflow: hidden !important; background: white !important; }
    #sd-root > *:not(#sd-certificate) { display: none !important; }
    #sd-root { padding: 0 !important; margin: 0 !important; }
    nav, footer, .sd-header, .sd-title-area, .sd-progress-container, #sd-grid-view, #sd-detail-view, #sd-celebration-modal { display: none !important; }
    
    #sd-certificate { 
      display: flex !important; 
      align-items: center !important;
      justify-content: center !important;
      position: fixed !important; 
      inset: 0 !important;
      width: 100% !important; 
      height: 100% !important; 
      margin: 0 !important; 
      padding: 0 !important; 
      background: white !important;
      -webkit-print-color-adjust: exact;
      z-index: 99999;
      box-sizing: border-box;
    }
    #sd-certificate > div { 
      width: 210mm !important;
      height: 140mm !important;
      border: 3px solid black !important; 
      background: white !important;
      outline: 15px double var(--sd-primary) !important;
      outline-offset: 8px !important;
      padding: 30px !important;
      box-sizing: border-box;
      position: relative;
    }
    #sd-print-btn { display: none !important; }
      .sd-cert-verification-wrap { flex-direction: column; gap: 20px; align-items: center !important; text-align: center !important; }
      .sd-cert-verification-item { text-align: center !important; }
    }
  }
  @media (max-width: 768px) {
    #sd-root { padding: 1rem 0.5rem; overflow-x: hidden; }
    .sd-header { flex-direction: column; align-items: stretch; gap: 1rem; text-align: center; margin-bottom: 2rem; }
    .sd-title-area h1 { font-size: 2rem !important; }
    .sd-student-meta { justify-content: center; flex-wrap: wrap; }
    .sd-progress-container { min-width: 0; max-width: none; }
    .sd-grid { gap: 1rem; }
    .sd-detail-header { padding: 1.5rem; text-align: center; }
    .sd-detail-header h2 { font-size: 1.75rem !important; }
    .sd-content-pane { padding: 1.5rem; font-size: 1rem; }
    .sd-tab { padding: 1rem 0.5rem; font-size: 0.65rem; }
    .sd-modal-content { padding: 2rem 1rem; width: 95%; box-sizing: border-box; }
    .sd-modal-content h2 { font-size: 1.75rem !important; }
    
    #sd-certificate { padding: 8px; border: 4px solid var(--sd-primary); margin: 0.5rem auto; width: 98%; max-width: 400px; box-sizing: border-box; }
    .sd-cert-inner { padding: 12px !important; border: 1px solid #000 !important; width: 100%; box-sizing: border-box; }
    .sd-cert-title { font-size: 1.1rem !important; margin: 2px 0 !important; }
    .sd-cert-subtitle { font-size: 0.8rem !important; margin: 8px 0 !important; }
    #sd-cert-name { font-size: 1.25rem !important; padding: 0 4px !important; width: 100% !important; border-bottom-width: 1px !important; margin: 4px 0 !important; }
    .sd-cert-body { font-size: 0.7rem !important; margin: 8px 0 !important; line-height: 1.4 !important; }
    .sd-cert-footer { flex-direction: column !important; gap: 8px !important; align-items: center !important; padding: 0 5px !important; margin-top: 15px !important; }
    .sd-cert-footer > div { text-align: center !important; width: 100%; }
    .sd-cert-footer p { font-size: 0.65rem !important; margin: 0 !important; }
    .sd-cert-footer p:last-child { font-size: 0.55rem !important; color: #9CA3AF !important; }
    #sd-cert-back { padding: 0.5rem 1rem !important; font-size: 0.8rem !important; margin-bottom: 1rem !important; }
    #sd-print-btn { padding: 0.75rem 1rem !important; font-size: 0.9rem !important; margin-top: 1.5rem !important; }
  }
  #sd-root {
    transition: background 0.6s ease;
  }
  .sd-skill-view-active #sd-root {
    background: var(--sd-skill-bg, var(--sd-bg));
  }
`;function I(){var l,d;const{profile:s,isSubscriptionActive:f,loading:o}=k(),n=m.useRef(!1),a=f();if(m.useEffect(()=>{if(o||!a||n.current)return;const t=[{id:1,title:"Study Techniques",image:"/images/skills/study_tech.png",duration:"12 mins",rating:"4.9",color:"#6366f1"},{id:2,title:"Time Management",image:"/images/skills/time_mgmt.png",duration:"15 mins",rating:"5.0",color:"#10b981"},{id:3,title:"Exam Strategy",image:"/images/skills/exam_strategy.png",duration:"10 mins",rating:"4.8",color:"#f59e0b"},{id:4,title:"Critical Thinking",image:"/images/skills/critical_thinking.png",duration:"18 mins",rating:"4.9",color:"#8b5cf6"},{id:5,title:"Reading & Comprehension",image:"/images/skills/reading_comp.png",duration:"20 mins",rating:"5.0",color:"#ec4899"},{id:6,title:"Writing & Communication",image:"/images/skills/writing_comm.png",duration:"25 mins",rating:"4.9",color:"#06b6d4"},{id:7,title:"Digital Learning Skills",image:"/images/skills/digital_skills.png",duration:"15 mins",rating:"4.8",color:"#f43f5e"},{id:8,title:"Discipline & Focus",image:"/images/skills/discipline_focus.png",duration:"12 mins",rating:"5.0",color:"#14b8a6"},{id:9,title:"Collaboration",image:"/images/skills/collaboration.png",duration:"10 mins",rating:"4.9",color:"#f97316"}],r={learn:[{jhs:"<h4>🚀 The Mastery Loop: Active Recall</h4><p>Reading your textbook 10 times is <strong>not</strong> studying—it's just looking at paper! To get a <strong>Grade 1</strong>, you must force your brain to 'dig out' information.</p><ul><li><strong>The 'Blank Sheet' Hack:</strong> After reading a chapter in Science, close the book and write everything you remember on a blank paper. Use a red pen to fill in what you missed.</li><li><strong>Subject Focus:</strong> In <strong>Social Studies</strong>, don't just memorize dates. Explain <em>why</em> an event happened to a friend or even a mirror!</li></ul><div class='sd-callout'><strong>Action Step:</strong> Spend 70% of your time testing yourself and only 30% reading.</div>",shs:"<h4>⚡ Advanced Cognitive Resilience</h4><p>WASSCE examiners aren't looking for what you know; they are looking for how you <strong>apply</strong> it. Master the <strong>Feynman Technique</strong> for Distinction.</p><ul><li><strong>Spaced Repetition:</strong> Your brain forgets 50% of a lesson within 24 hours unless you review it. Review your Elective Maths notes 1 day, 3 days, and 7 days after the first lesson.</li><li><strong>Deep Work Protocol:</strong> Calculus and Physics require 90-minute 'Deep Work' sessions. One single TikTok or WhatsApp notification costs you 20 minutes of focus.</li></ul><div class='sd-callout'><strong>Goal:</strong> Transform recognition into total retrieval mastery.</div>"},{jhs:"<h4>📅 The 'Big Rocks' Priority System</h4><p>Success isn't about having more time; it's about making time for what matters most for your BECE results.</p><ul><li><strong>Maths/Science First:</strong> These are your 'Big Rocks'. Do them when your brain is freshest—usually early in the morning.</li><li><strong>The 15-Minute Rule:</strong> If a task (like checking a formula) takes less than 2 minutes, do it NOW. If it takes longer, schedule it.</li></ul>",shs:"<h4>📊 Strategic Energy Management</h4><p>Planning for WASSCE is about managing <strong>energy</strong>, not just minutes. Use the **Eisenhower Matrix** to win your day.</p><ul><li><strong>Biological Prime Time:</strong> Find your 4-hour window where you are a 'Genius'. Use it for Elective subjects. Use your 'low energy' times for filing or simple reading.</li><li><strong>Context Switching:</strong> Moving from English Literature to Integrated Science takes a 15% toll on your brain. Stick to one 'flavor' of subject per 3-hour block.</li></ul>"},{jhs:"<h4>📝 Tactical Exam Room Control</h4><p>High grades are often won by how you <strong>handle</strong> the paper, not just what you studied. Don't be a 'Question 1' slave!</p><ul><li><strong>The 5-Minute Scan:</strong> Look at the whole paper. Your subconscious will start solving the hard questions while you handle the easy ones.</li><li><strong>Keyword Marking:</strong> Circle words like 'Except', 'Not', and 'Only' in your BECE English and Science papers. They are traps!</li></ul>",shs:"<h4>🎯 Mastering the Examiner's Mindset</h4><p>WASSCE markers use a strict <strong>Rubric</strong>. You must feed them exactly what they want to see.</p><ul><li><strong>Directive Verbs:</strong> Know the difference between 'Describe' (what) and 'Analyze' (why and how). Failure to distinguish these is the #1 cause of lost marks.</li></ul><div class='sd-callout' style='background:#fdf4ff; border-left-color:#C026D3;'><h4>🧠 The PEEL Masterclass: Writing A1 Essays</h4><p>Use the **PEEL** formula to build 'unbreakable' arguments that lock in full marks.</p><ul><li><strong>P - Point:</strong> Start with a clear sentence. <br/><em>(e.g. 'One major cause of inflation in Ghana is the increase in fuel prices.')</em></li><li><strong>E - Evidence:</strong> Provide a fact or statistic. <br/><em>(e.g. 'For instance, recent data shows a 15% rise in transport costs last year.')</em></li><li><strong>E - Explanation:</strong> Explain <strong>HOW</strong> the evidence proves your point. <br/><em>(e.g. 'As transport costs rise, manufacturers pass these costs to consumer, pushing up the price of bread and other staples.')</em></li><li><strong>L - Link:</strong> Connect it back to the main question. <br/><em>(e.g. 'Therefore, fuel price stability is essential for controlling overall inflation.')</em></li></ul></div>"},{jhs:"<h4>🧠 Developing The 'Inquiry' Lens</h4><p>Distinction students don't ask 'What is this?'. They ask 'How does this work?'.</p><ul><li><strong>Pattern Recognition:</strong> Notice how Maths concepts like Percentages apply to your everyday shopping. This makes the info 'stick' forever.</li><li><strong>Fact vs Opinion:</strong> In English comprehension, always look for proof before you believe what a character says.</li></ul>",shs:"<h4>🔥 Critical Synthesis (Level A1 Only)</h4><p>To reach the top 1%, you must <strong>synthesize</strong> information across different subjects.</p><ul><li><strong>Cross-Pollination:</strong> Use Economics principles to explain Geography case studies. Show the examiner you see the 'Big Picture'.</li><li><strong>Logical Fallacies:</strong> Spot weak arguments in comprehension passages. Look for 'Hasty Generalizations' and 'Circular Reasoning'.</li></ul>"},{jhs:"<h4>📖 Reading for Gold (Literal & Inferential)</h4><p>Grade 1 comprehension requires reading <strong>between the lines</strong>, not just the words on the page.</p><ul><li><strong>Skimming vs Scanning:</strong> Skim for the 'vibe' of the story, scan for names, dates, and hard facts.</li><li><strong>Context Clues:</strong> Don't reach for a dictionary first. Use the words <em>around</em> the hard word to guess its meaning.</li></ul>",shs:"<h4>🔍 Mastery of Academic Discourse</h4><p>WASSCE Lexis & Structure is a test of your <strong>Academic Dictionary</strong>. Expand your range daily.</p><ul><li><strong>Inference & Tone:</strong> Identify if the writer is being Sarcastic, Informative, or Angry. Look for 'Charged Words'.</li><li><strong>Syntactic Maturity:</strong> Use complex sentence structures. Don't say 'It was bad', say 'The repercussions were catastrophic'.</li></ul>"},{jhs:"<h4>✍️ Persuasive Writing Architecture</h4><p>Your writing is your voice to the examiner. Make it powerful and clear.</p><ul><li><strong>The Hook:</strong> Start your BECE essay with a strong sentence that grabs attention immediately.</li><li><strong>Format Mastery:</strong> Know your Formal vs Informal letter formats by heart. A wrong address position can cost you 2 marks!</li></ul>",shs:"<h4>🎓 Rhetorical Excellence in Composition</h4><p>A1 essays demonstrate <strong>Coherence, Cohesion, and Register</strong>.</p><ul><li><strong>Transition Mastery:</strong> Use words like 'Moreover', 'Inadvertently', and 'Consequently' to glue your ideas together.</li><li><strong>Vocabulary Precision:</strong> Use the exact word for the context (Register). In a Business essay, don't say 'money', say 'capital' or 'revenue'.</li></ul>"},{jhs:"<h4>🌐 The Literate Digital Citizen</h4><p>The internet can be your best tutor or your biggest distraction. Choose wisely.</p><ul><li><strong>Search Mastery:</strong> Use Google like a pro. Search 'BECE Science past questions [Year]' to find exactly what you need.</li><li><strong>Digital Integrity:</strong> Never copy-paste. Plagiarism is like cheating on yourself—you lose the chance to actually learn.</li></ul>",shs:"<h4>📊 Information Literacy & Analytics</h4><p>Data is the currency of modern academic success.</p><ul><li><strong>AnyStudents Hub Strategy:</strong> If your dashboard shows a low score in 'Chemistry: Organic', that is a signal! Don't study what you already know. Target your weaknesses ruthlessly.</li><li><strong>Sourcing:</strong> Use .edu and .gov websites. Avoid random blogs that might give outdated WASSCE info.</li></ul>"},{jhs:"<h4>💪 Building Discipline & Resilience</h4><p>Motivation gets you started. Discipline gets you the Grade 1.</p><ul><li><strong>The Phone Jail:</strong> Place your phone in another room (or with your parents) during your 2-hour study block. No exceptions.</li><li><strong>Small Wins:</strong> Tick off 3 small tasks every day. This chemical 'hit' of dopamine keeps you coming back tomorrow.</li></ul>",shs:"<h4>🏦 Attention Capital Mastery</h4><p>In the age of distraction, <strong>focus</strong> is your most valuable competitive advantage.</p><ul><li><strong>Deep Work Protocol:</strong> Work for 90 minutes with zero distractions. No phone, no music with lyrics, just math.</li><li><strong>Identity Shift:</strong> Don't say 'I am trying to study'. Say 'I am a Distinction Student'. Your actions will follow your identity.</li></ul>"},{jhs:"<h4>🤝 Group Study: Peer Mentorship</h4><p>The fastest way to learn a BECE topic is to teach it to someone else.</p><ul><li><strong>The Protege Effect:</strong> Explain 'Respiration' to a friend. If they don't understand it, you haven't mastered it yet.</li><li><strong>Accountability:</strong> Find a 'Distinction Partner'. Text each other when you start and finish your study blocks.</li></ul>",shs:"<h4>👑 Strategic Academic Syndicates</h4><p>A high-performance study group is a **Force Multiplier** for your WASSCE results.</p><ul><li><strong>Peer Review:</strong> Trade your essays. Mark them using the official marking scheme. Be ruthless! It’s better to fail now than in the exam room.</li><li><strong>Division of Labor:</strong> In broad subjects like History, have each person master one era and teach the others.</li></ul>"}],practice:[{jhs:["What is Active Recall?","Pomodoro study time?","Pomodoro break time?"],shs:["Explain Feynman Technique","How does Attention Residue occur?","Best interval for Spaced Repetition?"]},{jhs:["What is a 'Big Rock'?","First thing in your timetable?","Goal of a study block?"],shs:["Urgent vs Important","Context switching impact","Biological Prime Time definition"]},{jhs:["What is a 'Big Rock'?","First thing in your timetable?","Goal of a study block?"],shs:["Urgent vs Important","Context switching impact","Biological Prime Time definition"]},{jhs:["First step in an exam?","Why scan the paper?","What to do in last 5 mins?"],shs:["Explain 'Directive Verbs'","Process of Elimination benefit","What is PEE structure?"]},{jhs:["What is evidence?","Ask 'Why?' for?","Goal of thinking?"],shs:["Logical fallacy example","Primary source bias","Synthesizing info meaning"]},{jhs:["What are 5 Ws?","How to guess word meaning?","What is Scanning?"],shs:["Define 'Inference'","Role of Discourse Markers","Skimming vs Scanning"]},{jhs:["Formal letter recipient?","Informal writing style?","Comma usage?"],shs:["What is Cohesion?","Register definition","Topic sentence role"]},{jhs:["What is Plagiarism?","URL check for school?","Protect passwords by?"],shs:["Credible source indicator","Analytics-driven study","Digital footprint meaning"]},{jhs:["Define Discipline","Rule for phones?","Morning goal value?"],shs:["Attention Capital","Shallow vs Deep Work","Consistency benefit"]},{jhs:["Best way to learn?","Role of peer feedback?","Group study rule #1?"],shs:["Force Multiplier meaning","Syndicate dynamics","Peer reviewing vs Criticism"]}],apply:[{jhs:{mcqs:[{q:"Which technique involves testing yourself?",a:["Skimming","Active Recall","Highlighting"],c:1}],structured:"Explain why regular breaks help focus."},shs:{mcqs:[{q:"What is Myelination triggered by?",a:["Sugar","Deep Work","Sleep deprivation"],c:1}],structured:"Differentiate between 'Recognition' and 'Recall' in academic performance."}},{jhs:{mcqs:[{q:"Best way to avoid exam fever?",a:["Cramming","Daily consistency","Skipping subjects"],c:1}],structured:"Create a 3-step plan for your next Saturday."},shs:{mcqs:[{q:"Where does 'Maths Revision' fit in the Matrix?",a:["Not Urgent","Urgent/Important","Delegate"],c:1}],structured:"Analyze how digital distractions create time poverty in SHS life."}},{jhs:{mcqs:[{q:"Answer only 2 questions means?",a:["Choose 3","Choose 2","Choose any"],c:1}],structured:"Describe how to handle a question you don't understand."},shs:{mcqs:[{q:"Which verb asks for a judgment?",a:["Evaluate","Describe","Identify"],c:0}],structured:"Propose a time-management strategy for a 2.5 hour WASSCE paper with 5 sections."}},{jhs:{mcqs:[{q:"A fact must have?",a:["A loud speaker","Evidence","A wish"],c:1}],structured:"Explain why we must look at two sides of an argument."},shs:{mcqs:[{q:"Higher Order Thinking involves?",a:["Memorization","Analysis","Copying"],c:1}],structured:"Evaluate the impact of 'Confirmation Bias' on student research."}},{jhs:{mcqs:[{q:"Questions usually follow?",a:["Text order","Reverse order","Random"],c:0}],structured:"Summarize the last book you read in 3 sentences."},shs:{mcqs:[{q:"Tone is determined by?",a:["Font","Word choice","Page length"],c:1}],structured:"Explain how 'Context Clues' assist in understanding SAT-level vocabulary."}},{jhs:{mcqs:[{q:"Formal letter closure?",a:["Yours sincerely","Cheers","Later"],c:0}],structured:"Write the first paragraph of a letter regarding school uniforms."},shs:{mcqs:[{q:"Which word is more 'Academic'?",a:["Good","Exemplary","Nice"],c:1}],structured:"Construct a 150-word argument for or against the use of mobile phones in SHS."}},{jhs:{mcqs:[{q:"Copying online text is?",a:["Sharing","Learning","Plagiarism"],c:2}],structured:"List 3 safe ways to use the internet for homework."},shs:{mcqs:[{q:"Weakest source for an essay?",a:["Wiki","Journal","Textbook"],c:0}],structured:"Describe how to use AnyStudents analytics to improve your Elective Maths grade."}},{jhs:{mcqs:[{q:"Motivation comes and goes, but ____ stays?",a:["Sleep","Discipline","Games"],c:1}],structured:"What is your biggest distraction and how will you stop it?"},shs:{mcqs:[{q:"Shallow work leads to?",a:["Mastery","A1 Grade","Surface learning"],c:2}],structured:"Develop a 'Deep Work' protocol for your evening study session."}},{jhs:{mcqs:[{q:"Helping others helps you ___?",a:["Lose time","Learn better","Forget info"],c:1}],structured:"How would you handle a friend who talks too much during group study?"},shs:{mcqs:[{q:"A high-quality syndicate uses?",a:["Music","Marking schemes","Jokes"],c:1}],structured:"Explain the 'Protege Effect' — why teaching others solidifies your own mastery."}}]},i=document.createElement("script");return i.id="sd-hub-logic",i.innerHTML=`
      (function() {
        const SKILL_DATA = ${JSON.stringify(t)};
        const CONTENT_DB = ${JSON.stringify(r)};
        
        let currentSkillObj, activeTab, timerInterval, remainingTime;
        let student = {
          name: "${(s==null?void 0:s.full_name)||"Student"}",
          level: "${(s==null?void 0:s.level)||"JHS"}",
          currentSkillIndex: 0,
          completedCount: 0,
          skills: SKILL_DATA.map((s, i) => ({
            id: s.id,
            title: s.title,
            status: i === 0 ? "active" : "locked",
            stages: { learn: false, practice: false, apply: false, feedback: false, improve: false },
            applyScore: null,
            applyTimeSeconds: null,
            attempts: 0
          })),
          celebrated: false
        };

        const saved = localStorage.getItem('sd_student');
        if (saved) {
          const parsed = JSON.parse(saved);
          student = {...student, ...parsed};
        }

        const save = () => localStorage.setItem('sd_student', JSON.stringify(student));

        const updateHubUI = () => {
          const nameEl = document.getElementById('sd-student-name');
          const badgeEl = document.getElementById('sd-student-level');
          const textEl = document.getElementById('sd-progress-text');
          const barEl = document.getElementById('sd-progress-bar');
          
          if (nameEl) nameEl.textContent = student.name;
          if (badgeEl) {
            const lvl = (student.level || "").toUpperCase().trim();
            badgeEl.textContent = lvl + (lvl === 'SHS' ? ' (A1 Track)' : ' (Grade 1 Track)');
            badgeEl.className = 'sd-badge ' + (lvl === 'JHS' ? 'sd-jhs' : 'sd-shs');
          }
          const comp = student.skills.filter(s => s.status === 'completed').length;
          if (textEl) textEl.textContent = comp + ' of 9 skills completed';
          if (barEl) barEl.style.width = (comp / 9 * 100) + '%';
          
          if (comp === 9) {
            if (!student.celebrated) {
              document.getElementById('sd-celebration-modal').style.display = 'flex';
            }
            
            if (!document.getElementById('sd-header-cert-btn')) {
              const btn = document.createElement('button');
              btn.id = 'sd-header-cert-btn';
              btn.className = 'sd-btn sd-btn-primary';
              btn.style = 'margin-top: 1rem; font-size: 0.85rem; padding: 0.6rem 1rem; width: 100%; display: flex; align-items: center; justify-content: center; gap: 8px;';
              btn.innerHTML = '<span>🏅 View Earned Certificate</span>';
              btn.onclick = showCert;
              document.querySelector('.sd-progress-container').appendChild(btn);
            }
          }
        };

        const renderGrid = () => {
          const grid = document.getElementById('sd-grid-view');
          if (!grid) return;
          grid.innerHTML = '';
          student.skills.forEach((s, idx) => {
            const card = document.createElement('div');
            const isActive = s.status === 'active';
            const isComp = s.status === 'completed';
            const isLock = s.status === 'locked';
            
            card.className = 'sd-card ' + (isLock ? 'sd-locked-card' : isActive ? 'sd-card-active' : 'sd-card-completed');
            
            const skillColor = SKILL_DATA[idx].color;
            card.style.borderTop = '5px solid ' + skillColor;
            card.style.background = skillColor + '15'; // Stronger tinted background
            if (isActive) card.style.boxShadow = '0 0 30px ' + skillColor + '22';
            
            let statusHtml = '<span class="sd-status-badge sd-status-locked">🔒 Locked</span>';
            if (isActive) statusHtml = '<span class="sd-status-badge" style="background:' + skillColor + '33; color:' + skillColor + '; border: 1.2px solid ' + skillColor + '55; font-weight:900;">▶ In Progress</span>';
            if (isComp) statusHtml = '<span class="sd-status-badge sd-status-completed" style="background:#10B98122; color:#10B981; border: 1.2px solid #10B98155; font-weight:900;">✅ Completed</span>';
            
            const doneCount = Object.values(s.stages).filter(v => v).length;
            let dotsHtml = '<div class="sd-dots">';
            for(let i=0; i<5; i++) dotsHtml += '<div class="sd-dot ' + (i < doneCount ? 'sd-dot-filled' : '') + '" style="' + (i < doneCount ? 'background:' + skillColor + '; border-color:' + skillColor + '; box-shadow: 0 0 10px ' + skillColor + '66;' : '') + '"></div>';
            dotsHtml += '</div>';

            card.innerHTML = '               <div class="sd-card-image-wrap" style="background:' + skillColor + '10;">                 <img src="' + SKILL_DATA[idx].image + '" alt="' + s.title + '" class="sd-card-img">               </div>               <div class="sd-card-content" style="background:' + skillColor + '15; backdrop-filter: blur(20px);">                 <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.4rem;">                   <div class="sd-card-num" style="color:' + skillColor + '; font-weight: 900; background:' + skillColor + '22; padding:2px 8px; border-radius:4px;">SKILL 0' + s.id + '</div>                   <div style="font-size:0.65rem; font-weight:900; color:#475569; background:#fff; border:1px solid #E2E8F0; padding:2px 8px; border-radius:4px; text-transform:uppercase;">⏱ ' + SKILL_DATA[idx].duration + '</div>                 </div>                 <div class="sd-card-title">' + s.title + '</div>                 <div style="display:flex; align-items:center; gap:4px; margin-bottom:1.5rem;">                   <div style="display:flex; gap:1px;">' + Array(5).fill().map((_, i) => '<span style="color:#FACC15; font-size:0.8rem;">' + (i < Math.floor(SKILL_DATA[idx].rating) ? '★' : '☆') + '</span>').join('') + '</div>                   <span style="font-size:0.75rem; font-weight:800; color:#475569;">' + SKILL_DATA[idx].rating + '</span>                 </div>                 ' + statusHtml + '                 ' + dotsHtml + '                 <button class="sd-btn sd-btn-primary" style="margin-top: 1.5rem; width: 100%; border-radius: 6px; font-size: 0.8rem; box-shadow: 0 4px 12px ' + (isActive ? skillColor + '44' : 'rgba(0,0,0,0.1)') + ';' + (isActive ? 'background:' + skillColor + ';' : '') + '" ' + (s.status === 'locked' ? 'disabled' : '') + '>                   ' + (s.status === 'completed' ? 'Review' : s.status === 'active' ? 'Continue' : 'Locked') + '                 </button>               </div>';
            
            if (s.status !== 'locked') card.onclick = () => openSkill(idx);
            grid.appendChild(card);
          });
        };

        const openSkill = (idx) => {
          student.currentSkillIndex = idx;
          currentSkillObj = student.skills[idx];
          const skillColor = SKILL_DATA[idx].color;
          
          // Immersive Page Theme
          const root = document.getElementById('sd-root');
          root.style.background = skillColor + '08'; // Very light tint for the whole page
          
          document.getElementById('sd-grid-view').style.display = 'none';
          document.getElementById('sd-detail-view').style.display = 'block';
          document.getElementById('sd-skill-title').textContent = (idx + 1) + '. ' + currentSkillObj.title;
          document.getElementById('sd-skill-title').style.color = skillColor;
          
          // Theme the Detail View Header
          const detailHeader = document.querySelector('.sd-detail-header');
          detailHeader.style.background = skillColor + '10';
          detailHeader.style.borderBottom = '2px solid ' + skillColor + '22';
          
          // Theme the Tabs
          document.querySelectorAll('.sd-tab').forEach((tab, i) => {
             tab.style.setProperty('--skill-color', skillColor);
             // Unique active tab style for this skill
             if (tab.classList.contains('sd-tab-active')) {
                tab.style.background = skillColor;
                tab.style.color = '#fff';
             }
          });

          const stages = ['learn', 'practice', 'apply', 'feedback', 'improve'];
          let lastTrue = -1;
          stages.forEach((st, i) => { if (currentSkillObj.stages[st]) lastTrue = i; });
          switchTab(stages[Math.min(lastTrue + 1, 4)]);
          updateTabStates();
        };

        const switchTab = (tabId) => {
          activeTab = tabId;
          renderTabContent();
          document.querySelectorAll('.sd-tab').forEach(t => t.classList.toggle('sd-tab-active', t.dataset.tab === tabId));
          const nextBtn = document.getElementById('sd-nav-next');
          if (tabId === 'practice' || tabId === 'apply') nextBtn.textContent = "Submit →";
          else if (tabId === 'feedback') nextBtn.textContent = "Next →";
          else if (tabId === 'improve') nextBtn.textContent = currentSkillObj.status === 'completed' ? "Back to Hub" : "Done Improving & Unlock Next";
          else nextBtn.textContent = "Mark as Read →";
        };

        const updateTabStates = () => {
          const stages = ['learn', 'practice', 'apply', 'feedback', 'improve'];
          const tabs = document.querySelectorAll('.sd-tab');
          let reachedIncomplete = false;
          tabs.forEach((tab, i) => {
            const stage = stages[i];
            if (reachedIncomplete) { tab.classList.add('sd-tab-disabled'); tab.onclick = null; }
            else { 
              tab.classList.remove('sd-tab-disabled'); 
              tab.onclick = () => switchTab(stage); 
              if (!currentSkillObj.stages[stage] && stage !== 'improve') reachedIncomplete = true; 
            }
          });
        };

        const renderTabContent = () => {
          const pane = document.getElementById('sd-content-pane');
          const idx = student.currentSkillIndex;
          const isJHS = student.level === 'JHS';
          document.getElementById('sd-active-timer').style.display = 'none';
          clearInterval(timerInterval);
          
          if (activeTab === 'learn') {
            pane.innerHTML = '<div style="font-size: 1.1rem; line-height: 1.8;">' + CONTENT_DB.learn[idx][isJHS ? 'jhs' : 'shs'] + '<div class="sd-callout"><h4>Why This Matters for Your Distinction Goal</h4><p>' + (isJHS ? "To achieve Grade 1, focus alone isn't enough; you need tactical depth. Mastering this skill gives you a 20% advantage over students who just 'read' their books." : "A1 mastery requires high-level cognitive resilience. This module builds the strategic foundation required for standard academic performance.") + '</p></div></div>';
          } else if (activeTab === 'practice') {
            const tasks = isJHS ? CONTENT_DB.practice[idx].jhs : CONTENT_DB.practice[idx].shs;
            pane.innerHTML = '<h3>Interactive Practice</h3><p>Complete these tasks to proceed.</p>';
            tasks.forEach((t, i) => pane.innerHTML += '<div class="sd-task-card"><strong>Task ' + (i+1) + ':</strong> ' + t + '<input type="text" class="sd-input sd-practice-input" placeholder="Type your answer here...">' + (isJHS ? '<button class="sd-btn" style="margin-top:0.5rem; background:#EEE; font-size:0.75rem;" onclick="alert(\\'Hint: Think about consistency!\\')">Show Hint</button>' : '') + '</div>');
          } else if (activeTab === 'apply') {
            const timer = document.getElementById('sd-active-timer');
            timer.style.display = 'block';
            remainingTime = (isJHS ? 12 : 18) * 60;
            const updateDisplay = () => {
              const m = Math.floor(remainingTime / 60); const s = remainingTime % 60;
              timer.textContent = m + ':' + (s < 10 ? '0' : '') + s;
              if (remainingTime <= 0) { clearInterval(timerInterval); handleApplySubmit(); }
              remainingTime--;
            };
            updateDisplay(); timerInterval = setInterval(updateDisplay, 1000);
            const questions = isJHS ? CONTENT_DB.apply[idx].jhs : CONTENT_DB.apply[idx].shs;
            pane.innerHTML = '<h3>Distinction Assessment (' + student.level + ')</h3>';
            questions.mcqs.forEach((q, i) => {
              let opts = ''; q.a.forEach((opt, oi) => opts += '<label style="display:block; margin: 0.5rem 0;"><input type="radio" name="mcq_' + i + '" value="' + oi + '"> ' + opt + '</label>');
              pane.innerHTML += '<div class="sd-task-card"><strong>Q' + (i+1) + ':</strong> ' + q.q + opts + '</div>';
            });
            pane.innerHTML += '<div class="sd-task-card"><strong>Structured Question:</strong> ' + questions.structured + '<textarea class="sd-input" style="height:100px" placeholder="Your academic response..."></textarea></div>';
          } else if (activeTab === 'feedback') {
            const score = currentSkillObj.applyScore || 0; let rank = "Needs work", cls = "sd-needs-work";
            if (score >= 80) { rank = "Great Distinction Rank"; cls = "sd-excellent"; } else if (score >= 60) { rank = "Good — keep improving"; cls = "sd-good"; }
            pane.innerHTML = '<div class="sd-score-card ' + cls + '" style="background:#f8fafc; padding:2rem; text-align:center; border-radius:12px;"><div style="font-size: 3rem; font-weight: 900; color:#1A56DB">' + score + '%</div><div style="font-size: 1.5rem; font-weight: 700;">' + rank + '</div></div><div class="sd-grid" style="margin-top:2rem"><div class="sd-task-card"><strong>Time Taken</strong><div style="font-size:1.5rem">' + Math.floor(currentSkillObj.applyTimeSeconds / 60) + 'm ' + (currentSkillObj.applyTimeSeconds % 60) + 's</div></div><div class="sd-task-card"><strong>Average Peer Score</strong><div style="font-size:1.5rem">72%</div></div></div><h4 style="margin-top:2rem">Self-Assessment Rubric</h4><p>Did you use specific evidence from the lesson? If yes, award yourself full marks for the written part.</p>';
          } else if (activeTab === 'improve') {
            if ((currentSkillObj.applyScore || 0) >= 80) pane.innerHTML = '<h3>Extension Tasks</h3><ul><li>Teach a friend today to lock in your mastery.</li><li>Plan how you would use this skill in your best subject.</li></ul>';
            else pane.innerHTML = '<h3>Micro-Lessons</h3><p>Review the main lesson and try the practice tasks once more to solidify your base before the next attempt.</p>';
          }
        };

        const handleApplySubmit = () => {
          clearInterval(timerInterval);
          const isJHS = student.level === 'JHS';
          const questions = isJHS ? CONTENT_DB.apply[student.currentSkillIndex].jhs : CONTENT_DB.apply[student.currentSkillIndex].shs;
          let correct = 0; 
          questions.mcqs.forEach((q, i) => { 
            const sel = document.querySelector('input[name="mcq_' + i + '"]:checked'); 
            if (sel && parseInt(sel.value) === q.c) correct++; 
          });
          currentSkillObj.applyScore = Math.round(correct / questions.mcqs.length * 100);
          currentSkillObj.applyTimeSeconds = (isJHS ? 12 : 18) * 60 - remainingTime;
          currentSkillObj.stages.apply = true; currentSkillObj.attempts++;
          save(); switchTab('feedback'); updateTabStates();
        };

        const showCert = () => {
          student.celebrated = true;
          save();
          document.getElementById('sd-grid-view').style.display = 'none';
          document.getElementById('sd-detail-view').style.display = 'none';
          document.getElementById('sd-celebration-modal').style.display = 'none';
          const cert = document.getElementById('sd-certificate'); cert.style.display = 'block';
          document.getElementById('sd-cert-name').textContent = student.name;
          document.getElementById('sd-cert-level').textContent = student.level;
          document.getElementById('sd-cert-date').textContent = "Awarded on " + new Date().toLocaleDateString('en-GB', {day:'numeric', month:'long', year:'numeric'});
          document.getElementById('sd-cert-id').textContent = 'ID: SDH-' + student.level + '-' + new Date().getFullYear() + '-' + Math.floor(100000 + Math.random()*900000);
        };

        document.getElementById('sd-nav-next').onclick = () => {
          if (activeTab === 'learn') { currentSkillObj.stages.learn = true; switchTab('practice'); }
          else if (activeTab === 'practice') { currentSkillObj.stages.practice = true; switchTab('apply'); }
          else if (activeTab === 'apply') { handleApplySubmit(); }
          else if (activeTab === 'feedback') { switchTab('improve'); }
          else if (activeTab === 'improve') {
            if (currentSkillObj.applyScore < 60 && currentSkillObj.status !== 'completed') { alert("Please achieve >60% to unlock next skill!"); switchTab('apply'); return; }
            currentSkillObj.stages.improve = true;
            if (currentSkillObj.status !== 'completed') {
              currentSkillObj.status = 'completed';
              if (student.currentSkillIndex + 1 < 9) student.skills[student.currentSkillIndex + 1].status = 'active';
            }
            save(); document.getElementById('sd-detail-view').style.display = 'none';
            document.getElementById('sd-grid-view').style.display = 'grid'; updateHubUI(); renderGrid();
          }
          updateTabStates(); save();
        };

        document.getElementById('sd-back-to-grid').onclick = () => { 
          document.getElementById('sd-detail-view').style.display = 'none'; 
          document.getElementById('sd-grid-view').style.display = 'grid'; 
          document.getElementById('sd-root').style.background = '#fffdf7'; // Reset back to default cream
          updateHubUI(); 
          renderGrid(); 
        };
        document.getElementById('sd-nav-prev').onclick = () => { const ss = ['learn', 'practice', 'apply', 'feedback', 'improve']; const idx = ss.indexOf(activeTab); if (idx > 0) switchTab(ss[idx - 1]); };
        document.getElementById('sd-view-cert').onclick = () => { showCert(); };
        document.getElementById('sd-dismiss-modal').onclick = () => { 
          student.celebrated = true;
          save();
          document.getElementById('sd-celebration-modal').style.display = 'none'; 
        };
        document.getElementById('sd-cert-back').onclick = () => {
          document.getElementById('sd-certificate').style.display = 'none';
          document.getElementById('sd-grid-view').style.display = 'grid';
          updateHubUI();
          renderGrid();
        };
        document.getElementById('sd-print-btn').onclick = () => window.print();

        updateHubUI(); renderGrid();
      })();
    `,document.body.appendChild(i),n.current=!0,()=>{const c=document.getElementById("sd-hub-logic");c&&c.remove()}},[a,o,s]),o)return e.jsx("div",{className:"min-h-screen bg-cream flex items-center justify-center font-body text-brand-600",children:"Checking credentials..."});const x=[{icon:"🎯",title:"Study Techniques",desc:"Active recall & the mastery loop",color:"#6366f1"},{icon:"⏰",title:"Time Management",desc:"Big Rocks priority system",color:"#10b981"},{icon:"📝",title:"Exam Strategy",desc:"Tactical exam room control",color:"#f59e0b"},{icon:"🧠",title:"Critical Thinking",desc:"Develop the inquiry lens",color:"#8b5cf6"},{icon:"📖",title:"Reading & Comprehension",desc:"Read between the lines",color:"#ec4899"},{icon:"✍️",title:"Writing & Communication",desc:"Persuasive writing architecture",color:"#06b6d4"},{icon:"💻",title:"Digital Learning Skills",desc:"Information literacy & analytics",color:"#f43f5e"},{icon:"💪",title:"Discipline & Focus",desc:"Attention capital mastery",color:"#14b8a6"},{icon:"🤝",title:"Collaboration",desc:"Strategic academic syndicates",color:"#f97316"}];return a?e.jsxs("div",{className:"min-h-screen bg-cream flex flex-col",children:[e.jsx(p,{children:e.jsx("title",{children:"Distinction Hub | AnyStudents"})}),e.jsx(h,{}),e.jsxs("main",{className:"flex-1",children:[e.jsx("style",{dangerouslySetInnerHTML:{__html:w}}),e.jsxs("div",{id:"sd-root",children:[e.jsxs("div",{className:"sd-header",children:[e.jsxs("div",{className:"sd-title-area",children:[e.jsxs("h1",{style:{fontFamily:"Playfair Display, serif",color:"#0f172a",margin:0,fontWeight:900},children:["Distinction ",e.jsx("span",{style:{color:"#f5b400"},children:"Skills Hub"})]}),e.jsxs("div",{className:"sd-student-meta",style:{display:"flex",alignItems:"center",gap:"12px",marginTop:"4px"},children:[e.jsx("span",{id:"sd-student-name",style:{fontWeight:800,fontSize:"1.2rem"},children:s==null?void 0:s.full_name}),e.jsx("span",{id:"sd-student-level",className:`sd-badge ${(((l=s==null?void 0:s.level)==null?void 0:l.toUpperCase())||"")==="SHS"?"sd-shs":"sd-jhs"}`,children:(((d=s==null?void 0:s.level)==null?void 0:d.toUpperCase())||"")==="SHS"?"WASSCE (A1 Track)":"BECE (Grade 1 Track)"})]}),e.jsx("p",{className:"sd-intro-text",children:'Welcome to your Distinction journey. This advanced 9-module curriculum is specifically designed to bridge the gap between "hard work" and "Grade 1 or A1 results." Master these core academic skills to accelerate your performance and unlock your true potential.'})]}),e.jsxs("div",{className:"sd-progress-container",children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontSize:"0.95rem",fontWeight:800},children:[e.jsx("span",{children:"Course Completion Progress"}),e.jsx("span",{id:"sd-progress-text",children:"0 of 9 completed"})]}),e.jsx("div",{className:"sd-progress-bar-bg",children:e.jsx("div",{id:"sd-progress-bar",className:"sd-progress-bar-fill",style:{width:"0%"}})})]})]}),e.jsx("div",{id:"sd-grid-view",className:"sd-grid"}),e.jsxs("div",{id:"sd-detail-view",className:"sd-detail-view",children:[e.jsxs("div",{className:"sd-detail-header",children:[e.jsx("button",{id:"sd-back-to-grid",className:"sd-btn sd-btn-gold",style:{marginBottom:"1.5rem",padding:"0.75rem 1.5rem"},children:"← Return to Skills Hub"}),e.jsx("h2",{id:"sd-skill-title",style:{fontFamily:"Playfair Display, serif",margin:0}})]}),e.jsxs("div",{className:"sd-tabs",children:[e.jsx("button",{className:"sd-tab","data-tab":"learn",children:"1. STUDY"}),e.jsx("button",{className:"sd-tab","data-tab":"practice",children:"2. PRACTICE"}),e.jsx("button",{className:"sd-tab","data-tab":"apply",children:"3. ASSESS"}),e.jsx("button",{className:"sd-tab","data-tab":"feedback",children:"4. ANALYSIS"}),e.jsx("button",{className:"sd-tab","data-tab":"improve",children:"5. MASTERY"})]}),e.jsx("div",{id:"sd-active-timer",className:"sd-timer",style:{display:"none"}}),e.jsx("div",{className:"sd-content-pane",id:"sd-content-pane"}),e.jsxs("div",{style:{padding:"2rem 3rem",borderTop:"1px solid #E5E7EB",display:"flex",justifyContent:"space-between",background:"#f8fafc"},children:[e.jsx("button",{id:"sd-nav-prev",className:"sd-btn",style:{background:"#e2e8f0"},children:"Previous"}),e.jsx("button",{id:"sd-nav-next",className:"sd-btn sd-btn-primary",style:{minWidth:"200px"},children:"Next →"})]})]}),e.jsx("div",{id:"sd-celebration-modal",className:"sd-modal",children:e.jsxs("div",{className:"sd-modal-content",children:[e.jsx("div",{style:{fontSize:"5rem"},children:"🏆"}),e.jsx("h2",{style:{fontFamily:"Playfair Display, serif"},children:"Distinction Attained!"}),e.jsx("p",{style:{color:"#64748b",marginBottom:"2rem"},children:"You have mastered all 9 essential skills for academic success."}),e.jsx("button",{id:"sd-view-cert",className:"sd-btn sd-btn-primary",style:{width:"100%"},children:"Claim Certificate"}),e.jsx("button",{id:"sd-dismiss-modal",className:"sd-btn sd-btn-gold",style:{width:"100%",marginTop:"1rem"},children:"Review My Skills"})]})}),e.jsxs("div",{id:"sd-certificate",children:[e.jsx("button",{id:"sd-cert-back",className:"sd-btn sd-btn-gold",style:{marginBottom:"2rem",padding:"1rem 2rem"},children:"← Back to Skills Hub"}),e.jsxs("div",{className:"sd-cert-inner",style:{border:"2px solid black",padding:"30px",position:"relative",background:"#fff"},children:[e.jsx("h2",{className:"sd-cert-title",style:{fontFamily:"Playfair Display, serif",fontSize:"2.5rem",textTransform:"uppercase",letterSpacing:"2px",color:"#0f172a"},children:"AnyStudents"}),e.jsx("div",{style:{width:"60px",height:"3px",background:"#f5b400",margin:"10px auto"}}),e.jsx("h3",{className:"sd-cert-subtitle",style:{fontSize:"1.8rem",fontStyle:"italic",margin:"20px 0",color:"#0f172a"},children:"Certificate of Academic Distinction"}),e.jsx("p",{style:{fontSize:"1rem",color:"#64748b"},children:"This award is presented to"}),e.jsx("h1",{id:"sd-cert-name",style:{fontFamily:"Playfair Display, serif",fontSize:"3rem",color:"#0f172a",margin:"10px 0",borderBottom:"3px solid #f5b400",display:"inline-block",padding:"0 30px"}}),e.jsxs("p",{className:"sd-cert-body",style:{fontSize:"1.1rem",margin:"20px 0"},children:["for achieving total mastery of the 9-skill Distinction Hub curriculum ",e.jsx("br",{})," specifically for ",e.jsx("strong",{id:"sd-cert-level",style:{textTransform:"uppercase"}})," board standards."]}),e.jsxs("div",{className:"sd-cert-footer",style:{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginTop:"30px",padding:"0 40px"},children:[e.jsxs("div",{style:{textAlign:"left"},children:[e.jsx("p",{id:"sd-cert-date",style:{fontWeight:800,margin:0,fontSize:"0.9rem"}}),e.jsx("p",{style:{fontSize:"0.7rem",color:"#6B7280"},children:"Date of Completion"})]}),e.jsxs("div",{style:{textAlign:"center",opacity:.8},children:[e.jsx("p",{style:{fontWeight:900,color:"#0f172a",margin:0,fontSize:"1rem"},children:"mockexams.anystudents.com"}),e.jsx("p",{style:{fontSize:"0.7rem",color:"#6B7280"},children:"Electronic Verification Seal"})]}),e.jsxs("div",{style:{textAlign:"right"},children:[e.jsx("p",{id:"sd-cert-id",style:{fontFamily:"monospace",fontWeight:800,margin:0,fontSize:"0.9rem"}}),e.jsx("p",{style:{fontSize:"0.7rem",color:"#6B7280"},children:"Verification ID"})]})]})]}),e.jsx("button",{id:"sd-print-btn",className:"sd-btn sd-btn-primary",style:{marginTop:"2.5rem",width:"100%",maxWidth:"300px"},children:"Print / Save Certificate"})]}),e.jsxs("div",{className:"max-w-4xl mx-auto py-16 px-6 text-center border-t-2 border-slate-900/5 mt-10",children:[e.jsx("h3",{className:"font-display font-black text-slate-900 text-2xl mb-4 uppercase tracking-tighter",children:"Mastered a Skill? Share the Knowledge!"}),e.jsx("p",{className:"font-body text-slate-500 mb-8 max-w-lg mx-auto",children:"Mastering these skills is easier together. Help your classmates level up their prep for BECE and WASSCE results."}),e.jsxs("a",{href:`https://wa.me/?text=${encodeURIComponent("I'm mastering the essential skills for Grade 1 and A1 results at AnyStudents Distinction Skills Hub! Check it out: https://mockexams.anystudents.com/distinction-hub")}`,target:"_blank",rel:"noopener noreferrer",className:"inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#22c35e] text-white px-10 py-5 rounded-[2rem] font-black font-body text-lg shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] border-2 border-slate-950 transition-all hover:-translate-y-1 active:translate-x-1 active:translate-y-1 active:shadow-none",children:[e.jsx("svg",{className:"w-6 h-6 fill-current",viewBox:"0 0 24 24",children:e.jsx("path",{d:"M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.067 2.877 1.215 3.076.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"})}),"Spread the word on WhatsApp"]})]})]})]}),e.jsx(b,{})]}):e.jsxs("div",{className:"min-h-screen flex flex-col",style:{background:"linear-gradient(135deg, #0d1629 0%, #0f2447 50%, #1a0a2e 100%)"},children:[e.jsx(p,{children:e.jsx("title",{children:"Unlock Distinction | AnyStudents"})}),e.jsx(h,{}),e.jsxs("div",{className:"fixed inset-0 overflow-hidden pointer-events-none",children:[e.jsx("div",{style:{position:"absolute",top:"10%",left:"5%",width:"400px",height:"400px",background:"radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)",borderRadius:"50%",animation:"pulse 6s ease-in-out infinite"}}),e.jsx("div",{style:{position:"absolute",bottom:"15%",right:"8%",width:"500px",height:"500px",background:"radial-gradient(circle, rgba(234,179,8,0.1) 0%, transparent 70%)",borderRadius:"50%",animation:"pulse 8s ease-in-out infinite 2s"}}),e.jsx("div",{style:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:"600px",height:"600px",background:"radial-gradient(circle, rgba(139,92,246,0.07) 0%, transparent 70%)",borderRadius:"50%"}})]}),e.jsxs("main",{className:"flex-1 relative z-10",children:[e.jsxs("div",{className:"max-w-5xl mx-auto px-6 pt-16 pb-10 text-center",children:[e.jsxs("div",{className:"inline-flex items-center gap-2 mb-8",style:{background:"rgba(234,179,8,0.15)",border:"1px solid rgba(234,179,8,0.4)",borderRadius:"999px",padding:"8px 20px"},children:[e.jsx(y,{size:14,className:"text-yellow-400 animate-pulse"}),e.jsx("span",{style:{color:"#FACC15",fontSize:"11px",fontWeight:900,letterSpacing:"0.15em",textTransform:"uppercase"},children:"VIP — Premium Access Only"})]}),e.jsxs("h1",{style:{fontFamily:'"Playfair Display", serif',fontSize:"clamp(2.5rem, 6vw, 4.5rem)",fontWeight:900,color:"#ffffff",lineHeight:1.1,marginBottom:"1.5rem"},children:["The"," ",e.jsx("span",{style:{background:"linear-gradient(135deg, #FACC15, #F59E0B, #EF4444)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"},children:"Distinction Track"})]}),e.jsxs("p",{style:{color:"rgba(255,255,255,0.65)",fontSize:"1.2rem",maxWidth:"560px",margin:"0 auto 2.5rem",lineHeight:1.7},children:["A 9-skill mastery programme built specifically for students who want"," ",e.jsx("strong",{style:{color:"#FACC15"},children:"Grade 1 or A1"})," — not just a pass."]}),e.jsx("div",{className:"flex flex-wrap justify-center gap-4 mb-10",children:[{val:"9",label:"Expert Skills"},{val:"5",label:"Stages Per Skill"},{val:"100%",label:"Exam Focused"},{val:"🏅",label:"Certificate"}].map((t,r)=>e.jsxs("div",{style:{background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.12)",borderRadius:"16px",padding:"14px 24px",textAlign:"center",backdropFilter:"blur(10px)",minWidth:"100px"},children:[e.jsx("div",{style:{fontSize:"1.75rem",fontWeight:900,color:"#FACC15",lineHeight:1},children:t.val}),e.jsx("div",{style:{fontSize:"0.7rem",color:"rgba(255,255,255,0.5)",marginTop:"4px",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.08em"},children:t.label})]},r))}),e.jsxs(g,{to:"/pricing",style:{display:"inline-flex",alignItems:"center",gap:"10px",background:"linear-gradient(135deg, #FACC15, #F59E0B)",color:"#0d1629",fontWeight:900,fontSize:"1.05rem",padding:"16px 40px",borderRadius:"999px",textDecoration:"none",boxShadow:"0 0 40px rgba(250,204,21,0.35)",transition:"all 0.3s ease"},onMouseEnter:t=>t.currentTarget.style.transform="translateY(-3px) scale(1.03)",onMouseLeave:t=>t.currentTarget.style.transform="none",children:["Unlock the Distinction Track ",e.jsx(u,{size:18})]}),e.jsx("p",{style:{color:"rgba(255,255,255,0.35)",fontSize:"0.8rem",marginTop:"12px"},children:"Upgrade your plan to get instant access"})]}),e.jsxs("div",{className:"max-w-5xl mx-auto px-6 pb-6",children:[e.jsxs("div",{className:"text-center mb-8",children:[e.jsx("h2",{style:{color:"rgba(255,255,255,0.9)",fontWeight:800,fontSize:"1.1rem",textTransform:"uppercase",letterSpacing:"0.1em"},children:"What's Inside the Track"}),e.jsx("div",{style:{width:"40px",height:"3px",background:"linear-gradient(90deg, #FACC15, #F59E0B)",borderRadius:"999px",margin:"8px auto 0"}})]}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(260px, 1fr))",gap:"16px"},children:x.map((t,r)=>e.jsxs("div",{style:{background:t.color+"25",border:"1px solid "+t.color+"44",borderLeft:"6px solid "+t.color,borderRadius:"24px",padding:"24px",backdropFilter:"blur(20px)",display:"flex",alignItems:"flex-start",gap:"16px",transition:"all 0.4s ease",cursor:"default",position:"relative",overflow:"hidden",boxShadow:"0 10px 20px -5px "+t.color+"22"},onMouseEnter:i=>{i.currentTarget.style.background=t.color+"44",i.currentTarget.style.boxShadow="0 15px 30px -5px "+t.color+"44",i.currentTarget.style.transform="translateY(-5px)"},onMouseLeave:i=>{i.currentTarget.style.background=t.color+"25",i.currentTarget.style.boxShadow="0 10px 20px -5px "+t.color+"22",i.currentTarget.style.transform="none"},children:[e.jsx("div",{style:{position:"absolute",top:"12px",right:"14px",opacity:.3},children:e.jsx(v,{size:14,color:"#fff"})}),e.jsx("div",{style:{fontSize:"1.75rem",lineHeight:1,flexShrink:0,marginTop:"2px"},children:t.icon}),e.jsxs("div",{children:[e.jsx("div",{style:{color:"#ffffff",fontWeight:800,fontSize:"0.95rem",marginBottom:"4px"},children:t.title}),e.jsx("div",{style:{color:"rgba(255,255,255,0.45)",fontSize:"0.8rem",lineHeight:1.4},children:t.desc}),e.jsxs("div",{style:{display:"inline-block",marginTop:"10px",background:t.color+"22",border:"1px solid "+t.color+"44",borderRadius:"999px",padding:"3px 10px",fontSize:"0.65rem",color:t.color,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase"},children:["Skill ",String(r+1).padStart(2,"0")]})]})]},r))})]}),e.jsx("div",{className:"max-w-5xl mx-auto px-6 py-10",children:e.jsxs("div",{style:{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:"24px",padding:"36px 32px"},children:[e.jsx("h3",{style:{color:"rgba(255,255,255,0.85)",fontWeight:800,fontSize:"1rem",textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:"24px",textAlign:"center"},children:"How Each Skill Works"}),e.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:"12px",justifyContent:"center"},children:[{step:"01",label:"Study",color:"#60A5FA",desc:"Deep-dive content"},{step:"02",label:"Practice",color:"#34D399",desc:"Interactive tasks"},{step:"03",label:"Assess",color:"#FACC15",desc:"Timed assessment"},{step:"04",label:"Analysis",color:"#F87171",desc:"Score breakdown"},{step:"05",label:"Mastery",color:"#A78BFA",desc:"Unlock next skill"}].map((t,r)=>e.jsxs("div",{style:{textAlign:"center",minWidth:"110px",flex:"1 1 110px"},children:[e.jsx("div",{style:{width:"48px",height:"48px",borderRadius:"50%",background:`${t.color}22`,border:`1px solid ${t.color}44`,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 8px",fontSize:"0.75rem",fontWeight:900,color:t.color},children:t.step}),e.jsx("div",{style:{color:"#fff",fontWeight:800,fontSize:"0.85rem"},children:t.label}),e.jsx("div",{style:{color:"rgba(255,255,255,0.4)",fontSize:"0.72rem",marginTop:"2px"},children:t.desc})]},r))})]})}),e.jsxs("div",{className:"text-center pb-20 px-6",children:[e.jsx("h2",{style:{fontFamily:'"Playfair Display", serif',fontSize:"clamp(1.7rem, 4vw, 2.5rem)",fontWeight:900,color:"#fff",marginBottom:"1rem"},children:"Ready to Become a Distinction Student?"}),e.jsx("p",{style:{color:"rgba(255,255,255,0.5)",marginBottom:"2rem",maxWidth:"400px",margin:"0 auto 2rem"},children:"Join students who upgraded their mindset, mastered their craft, and walked into the exam hall with confidence."}),e.jsxs(g,{to:"/pricing",style:{display:"inline-flex",alignItems:"center",gap:"10px",background:"linear-gradient(135deg, #FACC15, #F59E0B)",color:"#0d1629",fontWeight:900,fontSize:"1.05rem",padding:"16px 40px",borderRadius:"999px",textDecoration:"none",boxShadow:"0 0 40px rgba(250,204,21,0.35)"},children:["Upgrade & Unlock Now ",e.jsx(u,{size:18})]})]})]}),e.jsx(b,{})]})}export{I as default};
