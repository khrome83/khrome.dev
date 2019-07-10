export function getUndrawColor(theme: string) {
  const regex = /--undraw: (#([a-f0-9]{3}){1,2}\b)/igm;
  const matches = regex.exec(theme);
  return (matches && matches[0]) ? matches[1] : '#e49c56';
};

export function getPatternColor(theme: string) {
  const regex = /--pattern: (#([a-f0-9]{3}){1,2}\b)/igm;
  const matches = regex.exec(theme);
  return (matches && matches[0]) ? matches[1] : '#284569';
};
