"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import RemoveBtn from "@/components/RemoveBtn";
import Link from "next/link";
import { useSession } from "next-auth/react"; // 🔥 추가
import ContentBox from "@/components/contentbox";
import CommentList from "@/components/CommentList";

interface Topic {
  index: number;
  _id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  views: number;
  author: string; // 🔥 DB 작성자 이름
}

export default function Readpage() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session } = useSession(); // 🔥 로그인 정보
  const [topic, setTopic] = useState<Topic | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTopic() {
      try {
        const res = await fetch(`/api/topics/${id}`);
        const data = await res.json();
        setTopic(data.topic);
      } catch (err) {
        console.error("읽기 오류:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchTopic();
  }, [id]);

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (!topic)
    return <p className="text-center py-10">존재하지 않는 글입니다.</p>;

  const isOwner = session?.user?.name === topic.author; // 🔥 본인 글인지 체크

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      {/* 상단 버튼 */}
      <div className="flex items-center justify-between mb-6">
        <button
          type="button"
          className="px-3 py-1 rounded-md border border-slate-300 text-sm hover:bg-slate-50 transition"
          onClick={() => router.push("/board")}
        >
          목록으로
        </button>

        {isOwner && ( // 🔥 본인 글일 경우에만 수정/삭제 보임
          <div className="flex gap-2">
            <Link
              href={`/edit/${topic._id}`}
              className="px-3 py-1 rounded-md bg-white border border-black text-sm text-black hover:bg-slate-50"
            >
              수정
            </Link>

            <RemoveBtn id={topic._id} />
          </div>
        )}
      </div>

      {/* 글 영역 */}
      <article className="bg-white border border-slate-100 rounded-lg shadow-sm">
        <header className="px-6 py-5 border-b">
          <h1 className="text-2xl font-semibold text-slate-900 break-all">
            {topic.title}
          </h1>

          <div className="mt-2 flex items-center gap-4 text-sm text-slate-500">
            <time>{new Date(topic.createdAt).toLocaleString()}</time>
            <span className="hidden sm:inline">&middot;</span>

            <span className="flex items-center gap-1">👁 {topic.views}</span>
          </div>
        </header>

        <section className="px-6 py-6 prose prose-sm sm:prose-lg max-w-none">
          <div style={{ whiteSpace: "pre-wrap" }}>{topic.description}</div>
        </section>
      </article>
      <CommentList />
      <ContentBox />
    </main>
  );
}
