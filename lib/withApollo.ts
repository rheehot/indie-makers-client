import withApollo from "next-with-apollo";
import ApolloClient from "apollo-boost";
import Cookie from "js-cookie";
import { GRAPHQL_URL } from "../configs";

export default withApollo(
  ({ headers }) =>
    new ApolloClient({
      uri: GRAPHQL_URL,
      credentials: "include",
      onError: ({ graphQLErrors }) => {
        if (graphQLErrors) {
          graphQLErrors.forEach(error => {
            try {
              const JSONError = JSON.parse(error.message);
              if (JSONError.status === 401) {
                Cookie.remove("X-JWT", {
                  domain: ".localtunnel.me"
                });
                window.location.href = "/";
              }
            } catch (error) {
              console.log(error);
            }
          });
        }
      },
      headers: {
        cookie: headers && headers.cookie
      }
    })
);
