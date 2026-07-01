import fs from "fs/promises";

const FILE = "./data/issues.json";

export async function getIssues() {
  const data = await fs.readFile(FILE, "utf8");
  return JSON.parse(data);
}

export async function saveIssues(issues) {
  await fs.writeFile(FILE, JSON.stringify(issues, null, 2));
}