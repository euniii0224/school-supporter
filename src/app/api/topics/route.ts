import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "@/libs/mongodb";
import Topic from "@/models/topic";
import { auth } from "@/auth"; // 🔥 세션 불러오기

export async function POST(request: NextRequest) {
  try {
    const session = await auth(); // 🔥 로그인 정보
    if (!session) {
      return NextResponse.json(
        { message: "로그인이 필요합니다." },
        { status: 401 }
      );
    }

    const { title, description } = await request.json();
    if (!title || !description) {
      return NextResponse.json(
        { message: "Title and description are required" },
        { status: 400 }
      );
    }

    await connectMongoDB();

    const last = await Topic.findOne().sort({ index: -1 });
    const newIndex = last ? last.index + 1 : 1;

    await Topic.create({
      title,
      description,
      index: newIndex,
      views: 0,
      author: session.user?.name, // 🔥 작성자 저장
      createdAt: new Date(),
    });

    return NextResponse.json({ message: "Topic created" }, { status: 201 });
  } catch (error) {
    console.error("Error in POST /api/topics:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectMongoDB();
    const topics = await Topic.find();
    return NextResponse.json({ topics });
  } catch (error) {
    console.error("Error in GET /api/topics:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get("id");
    if (!id) {
      return NextResponse.json({ message: "ID is required" }, { status: 400 });
    }
    await connectMongoDB();
    const deletedTopic = await Topic.findByIdAndDelete(id);
    if (!deletedTopic) {
      return NextResponse.json({ message: "Topic not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Topic deleted" }, { status: 200 });
  } catch (error) {
    console.error("Error in DELETE /api/topics:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
