import Link from "next/link";

export default function LinkWrapper({
  article,
  children,
}: {
  article: TArticle;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={
        article.slug
          ? `/publisher/${article.source}/${article.slug}`
          : article.url
      }
      target={article.slug ? "" : "_blank"}
    >
      {children}
    </Link>
  );
}
