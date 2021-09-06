import * as React from "react"
import { useStaticQuery, graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import LightGallery from 'lightgallery/react';

// import styles
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';

const ImageGallery = () => {
  const data = useStaticQuery(graphql`
  query AllObjectsQuery {
    allS3Object {
      nodes {
        localFile {
          childImageSharp {
            gatsbyImageData(
              layout: FULL_WIDTH
              quality: 100
              placeholder: BLURRED
              formats: [AUTO, WEBP, AVIF]
            )
          }
        }
      }
    }
  }
`
  )

  const images = data.allS3Object.nodes.map(node => node.localFile.childImageSharp)

  return (
    <div className="App">
      <LightGallery
        elementClassNames="custom-wrapper-class"
      // onBeforeSlide={onBeforeSlide}
      >
        {images.map((node, index) => {
          return (
            <div key={index} data-src={getImage(node)} >
              <GatsbyImage image={getImage(node)} alt="" />
            </div>
          )
        })}
      </LightGallery>
    </div>
  );
}

const IndexPage = () => {
  return (
    <main>
      <title>Home Page</title>
      <h1>
        Example of LightGallery using Gatsby V3 with gatsby-image-plugin and S3 images with LightGallery
        <br />
      </h1>
      <ImageGallery />
    </main>
  )
}

export default IndexPage
