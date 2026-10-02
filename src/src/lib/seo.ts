/** Meta tags de uma página, para não repetir o mesmo bloco em todas as rotas. */
export function pageHead(title: string, description: string, { internal = false } = {}) {
  const full = `${title} | PlastNatur Impact Engine`;
  return {
    meta: [
      { title: full },
      { name: "description", content: description },
      { property: "og:title", content: full },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      ...(internal ? [{ name: "robots", content: "noindex" }] : []),
    ],
  };
}
