import { replaceInFile } from "replace-in-file";
import path from "path";

async function addJsExtensions() {
  try {
    const options = {
      files: path.join(path.resolve(), "dist/**/*.js"), // Ensure this path is correct
      from: /from\s+'(\..*?)';/g,
      to: (match, p1) => `from '${p1}.js';`,
    };

    const results = await replaceInFile(options);
    console.log(
      "Modified files:",
      results.filter((result) => result.hasChanged).map((result) => result.file)
    );
  } catch (error) {
    console.error("Error occurred:", error);
  }
}

addJsExtensions();
