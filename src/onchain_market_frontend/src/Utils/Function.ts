export function truncateText(text: string) {
  let words = text.split(" ");
  let max_words = 5;

  if (words.length <= max_words) {
    return text;
  }

  return words.slice(0, max_words).join(" ") + "...";
}
