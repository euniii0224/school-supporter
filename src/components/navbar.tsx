'use client'

import Link from 'next/link'
import Image from 'next/image'
import { signOut, useSession } from 'next-auth/react'

export default function Navbar() {
  const { status, data: session } = useSession()

  return (
    <nav className="fixed top-0 left-0 w-full z-10 bg-[#233123] backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6">
        {/* 로고 */}
        <Link href="/" className="text-xl font-bold text-gray-200">
          School Supporter
        </Link>

        {/* 메뉴 */}
        <div className="flex items-center gap-6 text-gray-200 font-medium">
          <Link href="/calendar" className="hover:text-[#121612] transition">
            시간표
          </Link>

          <Link href="/scheduler" className="hover:text-[#121612] transition">
            일정
          </Link>

          <Link href="/board" className="hover:text-[#121612] transition">
            게시판
          </Link>

          <Link
            href="/library/books"
            className="hover:text-[#121612] transition"
          >
            도서
          </Link>

          {/* ✅ 로그인 상태에 따른 UI */}
          {status === 'authenticated' ? (
            <>
              {/* 프로필 */}
              <div className="flex items-center gap-2 ml-4">
                <Image
                  className="rounded-full"
                  src={session?.user?.image || '/default-avatar.png'}
                  width={36}
                  height={36}
                  alt="profile"
                />
                <span className="font-bold">{session?.user?.name}</span>
              </div>

              {/* 로그아웃 버튼 */}
              <button
                onClick={() => signOut()}
                className="ml-2 bg-white hover:bg-gray-200 text-[#233123] px-3 py-1 rounded-md text-sm"
              >
                로그아웃
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="ml-4 bg-white hover:bg-gray-200 text-[#233123] px-3 py-1 rounded-md text-sm"
            >
              로그인
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}
