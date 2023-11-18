interface ValidatorInterface {
  [key: string]: (value: string) => string | undefined;
}
