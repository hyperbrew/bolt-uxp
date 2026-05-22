/** Temporary polyfill Global Error Handler until Adobe adds it natively to UXP
 *  Must be manually triggered with safe() or safeAsync() function */

export const polyFillGlobalErrorHandler = () => {
  if (!Object.hasOwn(window, "onerror")) {
    //@ts-ignore
    window.onerror = (error: {
      message: string;
      name: string;
      stack: string;
    }) => {
      console.error(error);
      //* Add any Global actions for Handlers like Sentry / Logging here
      return true;
    };
  }
};

/** Manually throw error to global error handler polyFillGlobalErrorHandler */
export const throwErr = (error: any) => {
  window.onerror!(error);
};

/** Run a sync function safely.
 * Errors will be caught and sent to the global error handler polyFillGlobalErrorHandler */
export const safe = <T>(func: () => T): T | Error => {
  try {
    return func();
  } catch (error: any) {
    throwErr(error);
    return error;
  }
};

/** Run an async function safely.
 * Errors will be caught and sent to the global error handler polyFillGlobalErrorHandler */
export const safeAsync = async <T>(
  func: () => Promise<T>,
): Promise<T | Error> => {
  try {
    return await func();
  } catch (error: any) {
    throwErr(error);
    return error;
  }
};
