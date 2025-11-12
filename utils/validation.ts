/**
 * If the user touched and fill data for the fields, which defined on array requiredFields and without errors message
 * The submit button should enable.
 * @param requiredFields [] The required fields on form
 * @param dirtyFields [] The fields, which the users touched and fill data on
 * @param errors {} The errors fields
 */
export const isEnableSubmitButton = (
  requiredFields: string[] = [],
  dirtyFields: string[] = [],
  errors: Record<string, unknown>,
): boolean => {
  console.log('isEnableSubmitButton_____dirtyFields', dirtyFields);

  const isMatchAllRequiredFields: boolean = requiredFields.every(field =>
    dirtyFields.includes(field),
  );

  return isMatchAllRequiredFields && !Object.keys(errors).length;
};
