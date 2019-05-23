import { Link, graphql } from "gatsby"
import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Img from 'gatsby-image'

const BlogPost = ({ data }) => {
  const tags = data.nodeBlog.relationships.field_blog_tags.map(({ name }) => name)

  return (
    <Layout>
      <SEO title={data.nodeBlog.title.concat(' | Article')} keywords={tags} />
      <h1>{data.nodeBlog.title}</h1>
      <article>
        <p className="publication-date"><i>{data.nodeBlog.created}</i></p>
        {data.nodeBlog.relationships.field_blog_image.relationships.field_media_image &&
          data.nodeBlog.relationships.field_blog_image.relationships.field_media_image.localFile.childImageSharp !== null &&
          <Img fluid={data.nodeBlog.relationships.field_blog_image.relationships.field_media_image.localFile.childImageSharp.fluid} />
        }
        <p dangerouslySetInnerHTML={{__html: data.nodeBlog.body.processed}} />
        { data.nodeBlog.relationships.field_blog_tags &&
          <ul>
            {data.nodeBlog.relationships.field_blog_tags.map(({ name }, k) => (
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
    nodeBlog (fields: { slug: { eq: $slug } }) {
      title
      created(formatString: "MMM DD, YYYY")
      changed
      body {
        processed
        summary
      }
      relationships{
        field_blog_tags{
          name
        }
        field_blog_image{
          name
          relationships{
            field_media_image{
              filename
              localFile{
                childImageSharp{
                  fluid(sizes: "(max-width: 1200px) 100vw, 800px") {
                  src
                  ...GatsbyImageSharpFluid_noBase64
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`
