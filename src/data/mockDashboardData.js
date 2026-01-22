export const patientProfile = {
  id: "PAT-10291",
  name: "Nithin",
  age: 21,
  gender: "Male",
  hospital: "Apollo Hospital",
  condition: "Post-surgery recovery",
  dischargeDate: "2026-01-20",
  recoveryDay: 2,
};

export const recoveryOverview = {
  status: "normal",
  confidenceScore: 82, // %
  expectedRecoveryDays: 14,
  currentDay: 2,
};

export const medications = [
  {
    id: "MED-1",
    name: "Amoxicillin",
    category: "Antibiotic",
    dosage: "500 mg",
    frequency: "Twice daily",
    durationDays: 7,
    daysRemaining: 5,
    adherence: [
      { day: 1, taken: true },
      { day: 2, taken: true },
      { day: 3, taken: false },
    ],
    commonSideEffects: ["Nausea", "Loose stools"],
    riskLevel: "low",
  },
  {
    id: "MED-2",
    name: "Ibuprofen",
    category: "Pain relief",
    dosage: "400 mg",
    frequency: "As needed",
    durationDays: 10,
    daysRemaining: 8,
    adherence: [
      { day: 1, taken: true },
      { day: 2, taken: true },
    ],
    commonSideEffects: ["Stomach irritation", "Dizziness"],
    riskLevel: "medium",
  },
];

export const symptomHistory = [
  {
    day: 1,
    symptoms: [
      { type: "Pain", severity: 4 },
      { type: "Nausea", severity: 2 },
    ],
  },
  {
    day: 2,
    symptoms: [
      { type: "Pain", severity: 3 },
      { type: "Nausea", severity: 1 },
      { type: "Dizziness", severity: 1 },
    ],
  },
];

export const symptomTrends = {
  Pain: [4, 3, 3, 2, 2, 1],
  Nausea: [2, 1, 1, 0, 0, 0],
  Fever: [0, 0, 0, 0, 0, 0],
};

export const riskSignals = [
  {
    id: "RISK-1",
    title: "Medication adherence dip",
    level: "medium",
    description: "One antibiotic dose was missed on Day 3",
  },
  {
    id: "RISK-2",
    title: "Pain reducing as expected",
    level: "low",
    description: "Pain severity trending downwards",
  },
];

export const dailyInsights = [
  {
    id: "INS-1",
    type: "reassurance",
    title: "You’re recovering normally",
    description:
      "Patients at Day 2 typically report mild pain and low energy.",
  },
  {
    id: "INS-2",
    type: "action",
    title: "Stay hydrated",
    description:
      "Adequate fluids can reduce nausea linked to antibiotics.",
  },
];

export const educationalFeed = [
  {
    id: "EDU-1",
    category: "What to expect",
    title: "Day 2 after surgery: what’s normal?",
    readTime: "2 min",
  },
  {
    id: "EDU-2",
    category: "Medication tips",
    title: "How antibiotics affect digestion",
    readTime: "3 min",
  },
  {
    id: "EDU-3",
    category: "Warning signs",
    title: "Symptoms you should not ignore",
    readTime: "2 min",
  },
];

export const recoveryTimeline = [
  {
    phase: "Early recovery",
    range: "Day 1–3",
    normal: ["Pain", "Low appetite", "Fatigue"],
    redFlags: ["High fever", "Uncontrolled pain"],
  },
  {
    phase: "Stabilizing",
    range: "Day 4–7",
    normal: ["Improving appetite", "Reduced pain"],
    redFlags: ["No improvement"],
  },
  {
    phase: "Improving",
    range: "Day 8–14",
    normal: ["Energy returning"],
    redFlags: ["New symptoms"],
  },
];
