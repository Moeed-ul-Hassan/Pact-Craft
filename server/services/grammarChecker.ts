interface GrammarSuggestion {
  message: string;
  offset: number;
  length: number;
  rule?: string;
  replacements?: string[];
}

export async function checkGrammar(text: string): Promise<GrammarSuggestion[]> {
  // Simple grammar checks for demonstration
  // In production, integrate with services like LanguageTool, Grammarly API, etc.
  
  const suggestions: GrammarSuggestion[] = [];

  // Check for double spaces
  const doubleSpaceRegex = /  +/g;
  let match;
  while ((match = doubleSpaceRegex.exec(text)) !== null) {
    suggestions.push({
      message: "Remove extra spaces",
      offset: match.index,
      length: match[0].length,
      rule: "double_space",
      replacements: [" "]
    });
  }

  // Check for missing punctuation at end of sentences
  const sentences = text.split(/[.!?]+/);
  for (let i = 0; i < sentences.length - 1; i++) {
    const sentence = sentences[i].trim();
    if (sentence.length > 20 && !sentence.match(/[.!?]$/)) {
      const offset = text.indexOf(sentence) + sentence.length;
      suggestions.push({
        message: "Consider ending sentence with proper punctuation",
        offset,
        length: 0,
        rule: "missing_punctuation",
        replacements: ["."]
      });
    }
  }

  // Check for common typos
  const commonTypos: Record<string, string> = {
    'teh': 'the',
    'recieve': 'receive',
    'occurance': 'occurrence',
    'seperate': 'separate',
    'definately': 'definitely'
  };

  for (const [typo, correction] of Object.entries(commonTypos)) {
    const regex = new RegExp(`\\b${typo}\\b`, 'gi');
    let match;
    while ((match = regex.exec(text)) !== null) {
      suggestions.push({
        message: `Possible spelling mistake: "${match[0]}" -> "${correction}"`,
        offset: match.index,
        length: match[0].length,
        rule: "spelling",
        replacements: [correction]
      });
    }
  }

  return suggestions;
}

// For production integration with external grammar services:
/*
export async function checkGrammarWithLanguageTool(text: string): Promise<GrammarSuggestion[]> {
  try {
    const response = await fetch('https://api.languagetool.org/v2/check', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        text,
        language: 'en-US',
        enabledOnly: 'false'
      })
    });

    const data = await response.json();
    
    return data.matches.map((match: any) => ({
      message: match.message,
      offset: match.offset,
      length: match.length,
      rule: match.rule.id,
      replacements: match.replacements.map((r: any) => r.value)
    }));
  } catch (error) {
    console.error('LanguageTool API error:', error);
    return [];
  }
}
*/
