export function extractScripts(html: string) {
  const scripts: string[] = [];

  const regex = /<script[\s\S]*?>[\s\S]*?<\/script>/gi;
  let match;

  while ((match = regex.exec(html)) !== null) {
    scripts.push(match[0]);
  }

  return scripts;
}
