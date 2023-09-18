import { Blog } from "../../models/BlogModel";

const blogResolver = {
  Query: {
    async getBlog(_: any, { id }: any): Promise<any | null> {
      try {
        const blog = await Blog.findById(id);
        return blog;
      } catch (err) {
        throw new Error("Error fetching blog");
      }
    },
    async getAllBlogs(): Promise<any[]> {
      try {
        const blogs = await Blog.find();
        return blogs;
      } catch (err) {
        throw new Error("Error fetching blogs");
      }
    },
  },
  Mutation: {
    async createBlog(_: any, { blogInput }: any): Promise<any> {
      const { title, content } = blogInput;
      const blog = new Blog({
        title,
        content,
      });
      try {
        await blog.save();
        return blog;
      } catch (err) {
        throw new Error("Error creating blog");
      }
    },
    async updateBlog(_: any, { id, blogInput }: any): Promise<any | null> {
      const { title, content } = blogInput;
      try {
        const updatedBlog = await Blog.findByIdAndUpdate(
          id,
          { title, content },
          { new: true }
        );
        return updatedBlog;
      } catch (err) {
        throw new Error("Error updating blog");
      }
    },
    async deleteBlog(_: any, { id }: any): Promise<any | null> {
      try {
        const deletedBlog = await Blog.findByIdAndDelete(id);
        return deletedBlog;
      } catch (err) {
        throw new Error("Error deleting blog");
      }
    },
  },
};

export default blogResolver;
