'use client';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-10 bg-[#233123] backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6">
        {/* 로고 / 이름 */}
        <Link href="/" className="text-xl font-bold text-gray-200">
          School Supporter
        </Link>

        {/* 메뉴 */}
        <div className="flex items-center gap-6 text-gray-200 font-medium">
          <Link
            href="/calendar"
            className="hover:text-black transition-colors duration-200"
          >
            시간표
          </Link>
          <Link
            href="/schedule"
            className="hover:text-black transition-colors duration-200"
          >
            일정
          </Link>
          <Link
            href="/board"
            className="hover:text-black transition-colors duration-200"
          >
            게시판
          </Link>
          <Link
            href="/library"
            className="hover:text-black transition-colors duration-200"
          >
            도서
          </Link>

          {/* 로그인/회원가입 버튼 */}
          <Link
            href="/login"
            className="ml-4 bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors duration-200"
          >
            로그인
          </Link>
          <Link
            href="/signup"
            className="ml-2 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-500 transition-colors duration-200"
          >
            회원가입
          </Link>
        </div>
      </div>
    </nav>
  );
}
