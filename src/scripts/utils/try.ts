export const Try = async <T>(func: () => T | Promise<T>): Promise<[Error?, T?]> => {
  try {
    const res = await func();
    return [undefined, res];
  } catch (error) {
    return [error as Error, undefined];
  }
};
