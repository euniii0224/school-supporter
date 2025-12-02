import Image from 'next/image'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center text-center bg-white text-black px-4">
      {/* 이름 */}
      <h1 className="text-6xl font-bold mb-6 tracking-tight">
        <span className="text-black">팀 미정</span>
      </h1>

      {/* 소개 문구 */}
      <p className="text-lg md:text-xl text-gray-500 max-w-xl leading-relaxed">
        <strong className="text-black">
          Web Programming | School Supporter
        </strong>
      </p>
    </main>
  )
}
