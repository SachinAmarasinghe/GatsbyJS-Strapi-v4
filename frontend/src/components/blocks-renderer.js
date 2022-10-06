import React from "react"
import { graphql } from "gatsby"
import BlockRichText from "./block-rich-text"

const componentsMap = {
    STRAPI__COMPONENT_SHARED_RICH_TEXT: BlockRichText,
}

const Block = ({ block }) => {
    const Component = componentsMap[block.__typename]

    if (!Component) {
        return null
    }

    return <Component data={block} />
}

const BlocksRenderer = ({ blocks }) => {
    return (
        <div>
            {blocks.map((block, index) => (
                <Block key={`${index}${block.__typename}`} block={block} />
            ))}
        </div>
    )
}

export const query = graphql`
  fragment Blocks on STRAPI__COMPONENT_SHARED_RICH_TEXT {
    __typename
    ... on STRAPI__COMPONENT_SHARED_RICH_TEXT {
      richTextBody: body {
        __typename
        data {
          id
          childMarkdownRemark {
            html
          }
        }
      }
    }
  }
`

export default BlocksRenderer