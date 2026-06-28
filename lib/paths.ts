const repoName = "black-sky-labs-portfolio-coming-soon";

export function assetPath(path: string) {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;

  if (process.env.NODE_ENV === "production") {
    return `/${repoName}${cleanPath}`;
  }

  return cleanPath;
}