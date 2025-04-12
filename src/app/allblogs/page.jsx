import dynamic from "next/dynamic";

const BlogList = dynamic(() => import("../../components/BlogList"), {
  ssr: false,
});

export default function AllBlogsPage() {
  return <BlogList />;
}