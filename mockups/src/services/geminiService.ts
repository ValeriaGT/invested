import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function getPortfolioInsights(portfolioSummary: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `As a professional financial advisor, analyze this portfolio summary and provide 3 concise, actionable insights for the user. 
      Portfolio Summary: ${portfolioSummary}
      
      Format the response as a JSON array of objects with 'title' and 'description' properties.`,
      config: {
        responseMimeType: "application/json",
      }
    });

    return JSON.parse(response.text || "[]");
  } catch (error) {
    console.error("Error getting insights:", error);
    return [
      { title: "Diversification", description: "Consider increasing your exposure to international markets to reduce regional risk." },
      { title: "Rebalancing", description: "Your crypto allocation has grown significantly; it might be time to take some profits." },
      { title: "Cash Reserve", description: "Maintaining a 10% cash reserve is great for buying opportunities during market dips." }
    ];
  }
}
