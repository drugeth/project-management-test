export const getInitials = (name: string): string => {
  return name
    .split(" ")
    .splice(0, 2)
    .map((el) => el.charAt(0))
    .join("")
    .toUpperCase();
};
