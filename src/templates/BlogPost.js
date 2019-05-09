import { Link, graphql } from "gatsby"
import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Img from 'gatsby-image'

const BlogPost = ({ data }) => {
  const tags = data.nodeArticle.relationships.field_tags.map(({ name }) => name)

  return (
    <Layout>
      <SEO title={data.nodeArticle.title.concat(' | Article')} keywords={tags} />
      <h1>{data.nodeArticle.title}</h1>
      <article>
        <p className="publication-date"><i>{data.nodeArticle.created}</i></p>
      {console.log(data.nodeArticle.relationships.field_image)}
        {data.nodeArticle.relationships.field_image &&
          data.nodeArticle.relationships.field_image.localFile.childImageSharp !== null &&
          <Img fluid={data.nodeArticle.relationships.field_image.localFile.childImageSharp.fluid} />
        }
        <p dangerouslySetInnerHTML={{__html: data.nodeArticle.body.processed}} />
        { data.nodeArticle.relationships.field_tags &&
          <ul>
            {data.nodeArticle.relationships.field_tags.map(({ name }, k) => (
              <li key={k}>#{name} </li>
            ))}
          </ul>
        }
      </article>
      <Link to="/blog/">Go to Blog</Link><br />
      <Link to="/">Go to Homepage</Link>
    </Layout>
  )
}
export default BlogPost

export const query = graphql`
  query($slug: String!) {
    nodeArticle (fields: { slug: { eq: $slug } }) {
      title
      created(formatString: "MMM DD, YYYY")
      changed
      body {
        processed
        summary
      }
      relationships{
        field_tags{
          name
        }
        field_image{
          filename
          localFile{
            childImageSharp{
              fluid(sizes: "(max-width: 1200px) 100vw, 800px") {
                src
                ...GatsbyImageSharpFluid_noBase64
              }
            }
            relativePath
            absolutePath
          }
        }
      }
    }
  }
`
