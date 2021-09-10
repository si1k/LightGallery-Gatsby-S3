import * as React from "react"
import { useStaticQuery, graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import LightGallery from 'lightgallery/react';
// import plugins if you need
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
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
            thumbnail: gatsbyImageData(
              width: 400
              placeholder: BLURRED
              formats: [AUTO, WEBP, AVIF]
            )
            large: gatsbyImageData(
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
        plugins={[lgThumbnail, lgZoom]}
      // onBeforeSlide={onBeforeSlide}
      >
        {images.map((node, index) => {
          return (
            <div
							key={index}
							data-srcset={getImage(node.large).images.fallback.srcSet}
							data-sizes={getImage(node.large).images.fallback.sizes}
							data-src={getImage(node.large).images.fallback.src}
							data-sources={JSON.stringify(
								getImage(node.large).images.sources
							)}
						>
              <GatsbyImage image={getImage(node.thumbnail)} alt="" />
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
