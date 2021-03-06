import gql from "graphql-tag";

export const GET_BLOG = gql`
  query getBlog {
    posts: productReviews(where: { featured: false }) {
      id
      slug
      name
      intro
      logo {
        url
      }
    }
    featured: productReviews(where: { featured: true }, orderBy: id_DESC) {
      id
      slug
      name
      intro
      heroImage {
        url
      }
    }
  }
`;
