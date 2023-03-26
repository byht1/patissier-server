export const nextWeekDate = () => {
  const today = new Date();
  const nextWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7);
  return nextWeek;
};
