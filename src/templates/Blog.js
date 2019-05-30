import React, { Fragment } from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const NavLink = props => {
  if (!props.test) {
    return <Link to={props.url}>{props.text}</Link>
  } else {
    return <span>{props.text}</span>
  }
}

const BlogPage = ({ pageContext }) => {
  const { group, index, first, last, pageCount, pathPrefix } = pageContext
  const previousUrl = index - 1 === 1 ? `${pathPrefix}`: `${pathPrefix}/${index - 1}`
  const nextUrl = `${pathPrefix}/${index + 1}`
  const firstUrl = pathPrefix
  const lastUrl = `${pathPrefix}/${pageCount}`

  const Paginator = () => (
    <div className="paginator">
      {index > 1 &&
        <Fragment>
          <NavLink className="firstLink" test={first} url={firstUrl} text="First Page" />
          <span> | </span>
          <NavLink className="previousLink" test={first} url={previousUrl} text="Previous Page" />
        </Fragment>
      }
      {index > 1 && index < pageCount &&
        <span> | </span>
      }
      { index < pageCount &&
        <Fragment>
          <NavLink className="nextLink" test={last} url={nextUrl} text="Next Page" />
          <span> | </span>
          <NavLink className="lastLink" test={last} url={lastUrl} text="Last Page" />
        </Fragment>
      }
    </div>
  )

  return (
    <Layout>
      <SEO title="Blog" keywords={[`drupal`, `gatsby`, `blog`]} />
      <h1>Blog</h1>
      <p><i>Page {index} | {pageCount} pages</i></p>

      {group.map(({node}, i) => (
        <div className={`list-element`} key={i}>
          <Link
            to={node.fields.slug}>
            <h2>{node.title}</h2>
          </Link>

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

      <Paginator />

      <Link to="/">Go to Homepage</Link>
    </Layout>
  )
}

export default BlogPage
