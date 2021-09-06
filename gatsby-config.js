module.exports = {
  flags: {
    DEV_SSR: false
  },
  plugins: [
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-transformer-sharp',
      options: {
        checkSupportedExtensions: false
      }
    },
    {
      resolve: `@robinmetral/gatsby-source-s3`,
      options: {
        aws: {
          region: 'us-east-1'
        },
        buckets: ["lightgallery-sample-s3"],
        expiration: 120,
      }
    }
  ],
};
