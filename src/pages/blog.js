import React from "react"
import { Link, graphql } from "gatsby"
import Img from 'gatsby-image'
import Layout from "../components/layout"
import SEO from "../components/seo"



const Blog = ({data}) => (
  <Layout>
    <SEO title="Blog" keywords={[`drupal`, `gatsby`, `article`]} />
    <h1>Blog page</h1>
    {data.allNodeBlog.edges.map(({node}, i) => (
      <div className={`list-element`} key={i}>
        <Link to={node.fields.slug}>
          <h2>{node.title}</h2>
        </Link>
          {node.relationships.field_blog_image && node.relationships.field_blog_image.localFile.childImageSharp &&
            <Img fluid={node.relationships.field_blog_image.localFile.childImageSharp.fluid}/>
          }
        <p><i>{ node.created }</i></p>
        <p dangerouslySetInnerHTML={{ __html: node.body.processed.slice(0, 500).concat('...') }} />
        { node.relationships.field_blog_tags &&
          <ul>
            {node.relationships.field_blog_tags.map(({ name }, k) => (
              <li key={k}>#{name} </li>
            ))}
          </ul>
        }
      </div>
    ))}
    <Link to="/">Go to Homepage</Link>
  </Layout>
)

export const query = graphql`
  query allNodeBlog{
  allNodeBlog(limit: 10, skip: 0){
    totalCount
    edges{
      node{
        id
        title
        created(formatString: "MMM DD, YYYY")
        fields {
          slug
        }
        # path{
        #   alias
        # }
        body{
          value
          format
          processed
          summary
        }
        relationships{
          field_blog_tags{
            name
          }
          field_blog_image{
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
}`
export default Blog
