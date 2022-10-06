const path = require("path")

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  // Define a template for blog post
  const dynamicPage = path.resolve("./src/templates/dynamic-page.js")

  const result = await graphql(
    `
      {
        allStrapiPage {
          nodes {
            title
            slug
          }
        }
      }
    `
  )

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your Strapi pages`,
      result.errors
    )

    return
  }

  const pages = result.data.allStrapiPage.nodes

  if (pages.length > 0) {
    pages.forEach((page) => {
      createPage({
        path: `${page.slug}`,
        component: dynamicPage,
        context: {
          slug: page.slug,
        },
      })
    })
  }
}