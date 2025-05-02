export function parseExperienceRange(range: string): { min: number; max?: number } {
    if (range.includes("+")) {
      const min = parseInt(range.replace("+", ""), 10);
      return { min };
    }
  
    const [minStr, maxStr] = range.split("-");
    const min = parseInt(minStr, 10);
    const max = parseInt(maxStr, 10);
    return { min, max };
  }