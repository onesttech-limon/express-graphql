

const blogSchema = `#graphql
  type Blog {
    _id: ID!
    title: String!
    content: String!
  }

  input BlogInput {
    title: String!
    content: String!
  }

  type Query {
    getBlog(id: ID!): Blog
    getAllBlogs: [Blog]
  }

  type Mutation {
    createBlog(blogInput: BlogInput): Blog
    updateBlog(id: ID!, blogInput: BlogInput): Blog
    deleteBlog(id: ID!): Blog
  }
`;

export default blogSchema;
