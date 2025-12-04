'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useLibrary, Book } from '../context/LibraryContext';
import toast from 'react-hot-toast';

export default function BooksPage() {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState<Book[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const { borrowBook, reserveBook } = useLibrary();

  // 도서 검색
  const searchBooks = async (resetPage = true) => {
    if (!query) return;
    if (resetPage) setPage(1);
    setLoading(true);

    try {
      const res = await fetch(
        `/api/aladin?q=${query}&page=${resetPage ? 1 : page}`
      );
      const data = await res.json();
      setBooks(data);
    } catch (err) {
      console.error(err);
      toast.error('검색 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 페이지 변경 시 자동 재검색
  useEffect(() => {
    if (!query) return;
    searchBooks(false);
  }, [page]);

  return (
    <main className="min-h-screen bg-gray-50 text-gray-50 pb-10 -mt-4">
      <header className="bg-[#233123] py-8 px-4 shadow-sm text-white -mt-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">
              도서 검색
            </h1>
            <p className="text-gray-100 text-sm mt-1">
              원하는 도서를 검색하세요.
            </p>
          </div>
          <Link
            href="/library/mybooks"
            className="bg-white text-[#233123] px-4 py-2 rounded-lg font-semibold shadow hover:bg-gray-100 transition"
          >
            📚 내 서재
          </Link>
        </div>
      </header>

      {/* 검색 */}
      <form
        className="flex gap-2 mt-15 mb-8 justify-center"
        onSubmit={(e) => {
          e.preventDefault();
          searchBooks();
        }}
      >
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border text-[#233123] p-3 rounded w-80"
          placeholder="도서 제목 검색"
        />
        <button
          type="submit"
          className="bg-[#233123] text-white px-5 rounded hover:opacity-90"
        >
          검색
        </button>
      </form>

      {/* 검색 결과 */}
      <section className="text-center">
        <h2 className="text-xl font-semibold mb-4">검색 결과</h2>

        {loading && <p className="text-gray-500">불러오는 중...</p>}
        {!loading && books.length === 0 && (
          <p className="text-gray-500">검색 결과가 없습니다.</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 justify-items-center mx-19">
          {books.map((book) => (
            <div
              key={book.isbn}
              className="bg-white text-[#233123] p-4 rounded shadow h-[300px] w-[400px] flex flex-col"
            >
              <a href={book.link} target="_blank" rel="noopener noreferrer">
                <img
                  src={book.cover}
                  alt={book.title}
                  className="h-32 w-full object-contain mb-3 hover:scale-105 transition"
                />
              </a>

              <a
                href={book.link}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                <h3 className="font-bold line-clamp-2 overflow-hidden">
                  {book.title}
                </h3>
              </a>

              <p className="text-sm text-gray-600">{book.author}</p>

              {/* 대출 / 예약 버튼 */}
              <div className="flex gap-2 mt-auto">
                <button
                  onClick={() => {
                    borrowBook(book);
                    toast.success(`${book.title} 📖 대출 완료!`);
                  }}
                  className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
                >
                  대출
                </button>

                <button
                  onClick={() => {
                    reserveBook(book);
                    toast.success(`${book.title} ⏳ 예약 완료!`);
                  }}
                  className="bg-yellow-500 text-white px-3 py-1 rounded text-sm"
                >
                  예약
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 페이지 컨트롤 */}
        {books.length > 0 && (
          <div className="flex justify-center items-center gap-6 mt-10 mb-10">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="px-4 py-2 text-[#233123] bg-gray-300 rounded hover:bg-gray-400"
            >
              ◀ 이전
            </button>

            <span className="font-bold text-[#233123]">{page}</span>

            <button
              onClick={() => setPage((p) => p + 1)}
              className="px-4 py-2 text-[#233123] bg-gray-300 rounded hover:bg-gray-400"
            >
              다음 ▶
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
