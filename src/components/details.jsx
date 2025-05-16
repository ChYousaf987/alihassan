"use client";

import { useEffect, useState } from "react";
import { db } from "../../config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "next/navigation";
import { format } from "date-fns";
import { SlCalender } from "react-icons/sl";
import Image from "next/image";

export default function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchBlog = async () => {
      try {
        const docRef = doc(db, "blogs", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setBlog({ id: docSnap.id, ...docSnap.data() });
        } else {
          setError("Blog not found");
        }
      } catch (error) {
        setError("Error fetching blog");
        console.error("Error fetching blog:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center w-screen h-screen">
        <p className="text-center">Loading...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center w-screen h-screen">
        <p className="text-center">{error}</p>
      </div>
    );

  if (!blog)
    return (
      <div className="flex justify-center items-center w-screen h-screen">
        <p className="text-center">Blog not found.</p>
      </div>
    );

  const createdAtDate = blog?.createdAt?.seconds
    ? new Date(blog.createdAt.seconds * 1000)
    : new Date();

  return (
    <main className="min-h-screen mx-auto p-6 md:p" role="main">
      <Image
        src={blog.image}
        alt={blog.title}
        width={800}
        height={400}
        className="rounded-md mb-4 object-contain"
        unoptimized // remove if your image domain is configured in next.config.js
      />
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
      <div className="p-3">
        <div
          dangerouslySetInnerHTML={{ __html: blog.value }}
          className="w-full"
        />
      </div>
      <p className="flex items-center gap-3 text-gray-600 mt-4">
        <SlCalender />
        <span>{format(createdAtDate, "PPP")}</span>
      </p>
    </main>
  );
}
