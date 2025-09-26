type ContrastAssessment = {
  ratio: number;          // raw WCAG ratio (1–21)
  score: number;          // 0–100 normalized
  passes: {
    aaNormal: boolean;
    aaaNormal: boolean;
    aaLarge: boolean;
    aaaLarge: boolean;
    ui: boolean;          // UI components / graphics (AA)
  };
};

export function assessContrast(c1: string, c2: string): ContrastAssessment {
  const rgb1 = parseColor(c1);
  const rgb2 = parseColor(c2);
  const L1 = relLuminance(rgb1);
  const L2 = relLuminance(rgb2);
  const lighter = Math.max(L1, L2);
  const darker = Math.min(L1, L2);
  const ratio = (lighter + 0.05) / (darker + 0.05); // 1 .. 21
  const score = ((ratio - 1) / 20) * 100;

  return {
    ratio: +ratio.toFixed(2),
    score: +score.toFixed(2),
    passes: {
      aaNormal: ratio >= 4.5,
      aaaNormal: ratio >= 7,
      aaLarge: ratio >= 3,
      aaaLarge: ratio >= 4.5,
      ui: ratio >= 3
    }
  };
}

function relLuminance({ r, g, b }: { r: number; g: number; b: number }): number {
  const toLin = (v: number) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  };
  const R = toLin(r), G = toLin(g), B = toLin(b);
  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}

function parseColor(input: string): { r: number; g: number; b: number } {
  let s = input.trim().toLowerCase();
  if (s.startsWith('#')) {
    s = s.slice(1);
    if (s.length === 3) s = s.split('').map(c => c + c).join('');
    if (s.length !== 6) throw new Error('Invalid hex color');
    const n = parseInt(s, 16);
    return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
  }
  if (s.startsWith('rgb')) {
    const nums = s.replace(/rgba?|\(|\)|\s/g, '').split(',').map(Number);
    if (nums.length < 3) throw new Error('Invalid rgb() color');
    return { r: nums[0], g: nums[1], b: nums[2] };
  }
  throw new Error('Unsupported color format (hex or rgb only)');
}
