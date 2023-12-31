/**
 * Currently it's not possible to export data fetching functions from MDX pages
 * because MDX includes them in `layoutProps`, and Next.js removes them at some
 * point, causing a `ReferenceError`.
 *
 * https://github.com/mdx-js/mdx/issues/742#issuecomment-612652071
 *
 * This plugin can be removed once MDX removes `layoutProps`, at least that
 * seems to be the current plan.
 */

// https://nextjs.org/docs/basic-features/data-fetching
const DATA_FETCH_FNS = ["getStaticPaths", "getStaticProps", "getServerProps"]

module.exports = () => ({
  visitor: {
    ObjectProperty(path) {
      if (
        DATA_FETCH_FNS.includes(path.node.value.name) &&
        path.findParent(
          (p) => p.isVariableDeclarator() && p.node.id.name === "layoutProps"
        )
      ) {
        path.remove()
      }
    },
  },
})
