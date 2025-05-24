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
      <div className="flex justify-center items-center w-screen h-screen bg-[#0D1224] text-white">
        <p className="text-center">Loading...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center w-screen h-screen bg-[#0D1224] text-white">
        <p className="text-center">{error}</p>
      </div>
    );

  if (!blog)
    return (
      <div className="flex justify-center items-center w-screen h-screen bg-[#0D1224] text-white">
        <p className="text-center">Blog not found.</p>
      </div>
    );

  const createdAtDate = blog?.createdAt?.seconds
    ? new Date(blog.createdAt.seconds * 1000)
    : new Date();

  const reactions = blog?.reactions || {
    heart: 20,
    unicorn: 1,
    wow: 1,
    clap: 1,
    fire: 1,
  };

  const tags = blog?.tags || [];

  return (
    <main className="min-h-screen mx-auto max-w-5xl p-4 bg-[#0D1224] text-white">
      <div className="w-full mb-6">
        <div className="w-full mb-6 flex justify-center">
          <Image
            src={blog.image}
            alt={blog.title}
            width={800}
            height={400}
            className="rounded-md object-contain max-h-[400px] w-full"
            unoptimized
          />
        </div>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <Image
          src="/assets/me.webp" // replace if dynamic
          alt="Author"
          width={40}
          height={40}
          className="rounded-full"
        />
        <div>
          <h3 className="font-bold uppercase text-sm">Abu Said</h3>
          <p className="text-sm text-gray-400">
            Posted on {format(createdAtDate, "PPP")}
          </p>
        </div>
      </div>

      <h1 className="text-3xl font-extrabold mb-4 text-white">{blog.title}</h1>

      <div className="flex flex-wrap gap-2 mb-6">
        {tags.map((tag, idx) => (
          <span
            key={idx}
            className="text-sm text-green-400 bg-green-900/30 px-2 py-1 rounded-full"
          >
            #{tag}
          </span>
        ))}
      </div>

      <div
        className="prose max-w-none prose-invert prose-lg"
        dangerouslySetInnerHTML={{ __html: blog.value }}
      />

      <p className="flex items-center gap-2 text-gray-400 mt-6">
        <SlCalender />
        <span>{format(createdAtDate, "PPP")}</span>
      </p>
    </main>
  );
}
