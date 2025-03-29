"use client";
import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import SectionHead from "./SectionHead";
import {  useState } from "react";
import { db } from "../../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/navigation";


const BlogSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const animationControl = useAnimation();
  const router = useRouter()

  useEffect(() => {
    if (isInView) {
      animationControl.start("visible");
    }
  }, [isInView, animationControl]);

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "blogs"));
        let blogList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))

        blogList.sort(
          (a, b) => (b?.createdAt?.toMillis?.() || 0) - (a?.createdAt?.toMillis?.() || 0)
        );
        blogList = blogList.slice(0, 3)
        setBlogs(blogList);
        console.log(blogList)
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  console.log(blogs)

  return (
    <section id="blogs" className=" scroll-mt-[80px] min-h-[60vh] px-4 md:px-8">
      <SectionHead>Blogs</SectionHead>

      <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-white">Latest Blogs</h2>

      {loading ? (
        <p className="text-center">Loading blogs...</p>
      ) : blogs.length === 0 ? (
        <p className="text-center">No blogs available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <Link href={`/blog/${blog.id}`} key={blog.id}>
              <div className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-40 object-cover rounded-md mb-2"
                />
                <h3 className="text-lg font-semibold">{blog.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      )}
      <div className="flex justify-center mt-5">
      <button onClick={() => {
        router.push("/allblogs")
      }} className="bg-blue-400 px-8 py-3 text-white rounded-sm">View More</button>

      </div>
    </div>
    </section>
  );
};

export default BlogSection;
