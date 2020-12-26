export const formatDate = (date) => {
  const [d, M, D, Y] = new Date(`${date}T05:00:00`).toString().split(' ');
  return `${M} ${D}, ${Y}`;
}