import * as fg from "fast-glob";

/**
 * List files in a directory matching include patterns and excluding exclude patterns.
 *
 * @param includes - Array of glob patterns to include.
 * @param excludes - Array of glob patterns to exclude.
 * @param rootDir - The root directory to search within.
 * @returns A Promise resolving to an array of file paths.
 */
export const listFiles = async (
  includes: string[],
  excludes: string[],
  rootDir: string
): Promise<string[]> => {
  // Prepend root directory to the patterns
  const includePatterns = includes.map((pattern) => `${rootDir}/${pattern}`);
  const excludePatterns = excludes.map((pattern) => `!${rootDir}/${pattern}`);

  // Combine include and exclude patterns
  const patterns = [...includePatterns, ...excludePatterns];

  try {
    const files = await fg(patterns, {
      onlyFiles: true,
      followSymbolicLinks: true, // Set to false to not follow symlinks
    });
    return files;
  } catch (error) {
    console.error("Error occurred while listing files:", error);
    throw error; // or return []; to just return an empty array on error
  }
};
