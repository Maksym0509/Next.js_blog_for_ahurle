/** @jsxImportSource theme-ui */
import React from "react"
import { Box, Container, Themed } from "theme-ui"
import Image from "next/image"
import { PostData } from "helpers/loader"
import { Author } from "./Author"
import { Markdown } from "./Markdown"
import { PostMeta } from "./PostMeta"

const BannerPhoto: React.FC<{
  src: string
  alt?: string
  unsplash?: string
}> = ({ src, alt, unsplash }) => (
  <Box as="figure" mt={3} mx={-3}>
    <Image
      src={src}
      alt={alt}
      width={900}
      height={452}
      layout="responsive"
      objectFit="contain"
      loading="eager"
      sx={{ borderRadius: "5px" }}
    />
    {unsplash && (
      <figcaption
        sx={{
          textAlign: "center",
          fontSize: 1,
          color: "tertiary",
          marginTop: "0.25em",
        }}
      >
        Photo by{" "}
        <Themed.a href={`https://unsplash.com/${unsplash}`}>
          {unsplash}
        </Themed.a>{" "}
        on <Themed.a href="https://unsplash.com">Unsplash</Themed.a>
      </figcaption>
    )}
  </Box>
)

const Thanks: React.FC = () => (
  <Themed.p
    sx={{
      textAlign: "center",
      display: "block",
      fontFamily: "cursive",
    }}
  >
    🙏{" "}
    <Themed.em
      sx={{
        textShadow: "-4px -4px 5px yellow, 4px 0px 5px blue, -4px 4px 4px red",
        marginX: 2,
        fontWeight: "heading",
      }}
    >
      Thank You For Reading My Blog
    </Themed.em>{" "}
    👋
  </Themed.p>
)

const HeaderText: React.FC<{ post: PostData }> = ({ post }) => {
  const { title, subtitle } = post
  return (
    <>
      {title && <Themed.h1>{title}</Themed.h1>}
      {subtitle && (
        <Themed.h3
          sx={{ color: "tertiary", fontWeight: "body", marginY: 2 }}
          as="p"
          role="doc-subtitle"
        >
          {subtitle}
        </Themed.h3>
      )}
      <Author post={post} />
    </>
  )
}

export const BlogPost: React.FunctionComponent<{ post: PostData }> = ({
  post,
}) => (
  <main>
    <article>
      <PostMeta post={post} />

      <Container as="section" paddingX={3} marginY={4} mt={3}>
        <HeaderText post={post} />
        {post.bannerPhoto && (
          <BannerPhoto
            src={post.bannerPhoto}
            alt={post.bannerPhotoAlt}
            unsplash={post.bannerPhotoUnsplash}
          />
        )}
      </Container>

      <Container as="section" paddingX={3} marginY={4}>
        <Markdown source={post.content} />
      </Container>

      <Container as="section" paddingX={3} marginY={4} marginTop={0}>
        <Themed.hr />
        <Thanks />
      </Container>
    </article>
  </main>
)
