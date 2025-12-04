"use client";
import { useRouter } from "next/navigation";
import { HiOutlineTrash } from "react-icons/hi";

export default function RemoveBtn({ id }: { id: string }) {
  const router = useRouter();

  async function removeTopic() {
    const confirmed = confirm(`이 글을 삭제하시겠습니까? `);

    if (!confirmed) return;

    const res = await fetch(`/api/topics?id=${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      alert("삭제되었습니다.");
      router.push("/board"); // 🔥 삭제 후 /board 페이지로 이동
      router.refresh(); // 페이지 데이터 새로고침 (선택)
    }
  }

  return (
    <button
      className="px-3 py-1 rounded-md bg-red-50 border border-red-200 text-sm text-red-600 hover:bg-red-100"
      onClick={removeTopic}
    >
      삭제
    </button>
  );
}
