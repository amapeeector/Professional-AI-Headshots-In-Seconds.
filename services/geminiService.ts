
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

/**
 * Service to handle image generation and editing using Gemini 2.5 Flash Image.
 */
export const geminiService = {
  /**
   * Generates or edits an image based on a prompt and source image.
   * @param base64Image The source image in base64 format.
   * @param prompt The instructions for the AI.
   * @returns The generated image as a base64 string.
   */
  async generateHeadshot(base64Image: string, prompt: string): Promise<string> {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    
    // Extract base64 data from potential data URL
    const imageData = base64Image.split(',')[1] || base64Image;
    const mimeType = base64Image.match(/data:(.*);base64/)?.[1] || 'image/jpeg';

    const imagePart = {
      inlineData: {
        data: imageData,
        mimeType: mimeType,
      },
    };

    const textPart = {
      text: prompt,
    };

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { parts: [imagePart, textPart] },
    });

    if (!response.candidates?.[0]?.content?.parts) {
      throw new Error("No response parts received from AI");
    }

    // Iterate through parts to find the image
    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
      }
    }

    throw new Error("AI returned text but no image data.");
  },

  /**
   * Refines an existing image based on user text instructions.
   */
  async editImage(base64Image: string, editPrompt: string): Promise<string> {
    const fullPrompt = `Take this image and apply the following edit: ${editPrompt}. Maintain the overall structure and identity of the person, focusing only on the requested change.`;
    return this.generateHeadshot(base64Image, fullPrompt);
  }
};
