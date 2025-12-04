'use client'
import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-10 bg-black backdrop-blur-md border-b border-gray-200">
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
            href="/scheduler"
            className="hover:text-black transition-colors duration-200"
          >
            일정{/* 과제•시험 일정 관리  */}
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
            도서 {/* 도서 대출 현황 관리 */}
          </Link>
        </div>
      </div>
    </nav>
  )
}
