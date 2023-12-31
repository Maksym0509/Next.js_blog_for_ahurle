import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentInitialProps,
} from "next/document"
import { extractCritical } from "@emotion/server"
import { preLoadClass } from "@/components/RemovePreLoadClass"

class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx)
    const styles = extractCritical(initialProps.html)

    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          <style
            // because of this emotion bug: https://github.com/emotion-js/emotion/issues/2158
            // it might be helpful to comment the next line when iterating on global styles
            data-emotion={`css ${styles.ids.join(" ")}`}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: styles.css }}
          />
        </>
      ),
    }
  }

  render(): JSX.Element {
    return (
      <Html lang="en-US" className={preLoadClass}>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
