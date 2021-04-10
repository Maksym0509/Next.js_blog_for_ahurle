/** @jsxImportSource theme-ui */
import React from "react"
import { LazyImage } from "./LazyImage"

export const ImageRenderer: React.FC<React.ComponentPropsWithoutRef<"img">> = ({
  src,
  height,
  ...rest
}) => {
  const layout = height ? "responsive" : "fill"
  return (
    <a href={src} target="_blank" rel="noreferrer noopener">
      {/* // this wrapping div is necessary when layout == "fill", does no harm for responsive */}
      <div
        sx={{
          my: 3,
          "figure &": { my: 0 },
          mx: -3,
          position: "relative",
          height: layout === "fill" ? height || "25rem" : "auto",
        }}
      >
        {/*
        I'm passing props in from markdown so this is all inherently type-unsafe, hence the ts-ignores.
        These situations seem to be handled reasonably at runtime.
        @ts-ignore: doesn't like how width/height can come with layout=="fill"
      */}
        <LazyImage
          // @ts-ignore: src is required here but optional above
          src={src}
          height={height}
          {...rest}
          layout={layout}
          objectFit="contain"
          sx={{ borderRadius: "5px" }}
        />
      </div>
    </a>
  )
}
