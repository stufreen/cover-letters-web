export interface JobFormData {
  companyName: string;
  jobDescription: string;
  qualifications: string;
  tone: string;
  length: string;
}

export const TONE_OPTIONS = [
  {
    label: "Casual, clever and brief",
    value: "casual, clever and brief",
  },
  {
    label: "Positive and professional",
    value: "positive and professional",
  },
  {
    label: "Friendly but serious",
    value: "friendly but serious",
  },
];

export const LENGTH_OPTIONS = [
  {
    label: "Short",
    value: "short",
  },
  {
    label: "Medium",
    value: "medium",
  },
  {
    label: "Long",
    value: "long",
  },
];
