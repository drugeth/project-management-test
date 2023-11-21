export const getPlaceholderImage = (
  baseUrl: string,
  width: number,
  height: number,
  text: string,
  bgColor: string,
  textColor: string,
  fontSize: number
) => {
  return `${baseUrl}/?width=${width}&height=${height}&text=${text}&bgColor=%23${bgColor}&textColor=%23${textColor}&fontSize=${fontSize}`;
};
