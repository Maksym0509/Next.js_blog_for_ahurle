import { GetStaticProps } from "next"
import removeUndefined from "rundef"
import { BlogMeta } from "@/helpers/schema"
import { BlogPostPath } from "@/helpers/BlogPostPath"
import { BlogLayoutProps, processRawBlogMeta } from "@/helpers/loader"
import type { AddArgument } from "@/helpers/AddArgument"

export type BlogStaticProps = { processedMeta: BlogMeta }

export const getBlogStaticProps: AddArgument<
  GetStaticProps<BlogStaticProps>,
  BlogLayoutProps
> = async (_context, layoutProps) => {
  const { meta, path: rawPath } = layoutProps
  if (!meta.published) {
    return { notFound: true }
  }
  const path = BlogPostPath.relativeToRoot(rawPath)
  return processRawBlogMeta({ module: layoutProps, path }).then(
    (processedMeta) => ({
      props: {
        // next doesn't like it when you have "undefined" because that can't serialize to JSON
        processedMeta: removeUndefined(processedMeta, false, true),
      },
    })
  )
}
