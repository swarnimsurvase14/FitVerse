import { GoogleGenAI, Type } from "@google/genai";

// Initialization with environment variable
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY as string });

export interface WorkoutPlan {
  name: string;
  exercises: {
    name: string;
    description: string;
    sets: number;
    reps: number;
    rest: string;
  }[];
  tips: string[];
}

export async function generateWorkoutPlan(goal: string, level: string, duration: number): Promise<WorkoutPlan> {
  const prompt = `Generate a highly personalized workout plan for a college student.
  Goal: ${goal}
  Fitness Level: ${level}
  Workout Duration: ${duration} minutes.
  
  Provide a list of exercises with sets, reps, and a brief description why this fits their profile.
  Also include 3 pro tips for university-aged athletes.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-latest",
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          exercises: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                description: { type: Type.STRING },
                sets: { type: Type.NUMBER },
                reps: { type: Type.NUMBER },
                rest: { type: Type.STRING }
              },
              required: ["name", "sets", "reps"]
            }
          },
          tips: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          }
        },
        required: ["name", "exercises", "tips"]
      }
    }
  });

  const text = response.text;
  if (!text) throw new Error("AI failed to generate a plan.");
  
  return JSON.parse(text) as WorkoutPlan;
}
