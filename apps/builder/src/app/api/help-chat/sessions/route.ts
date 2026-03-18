import { auth } from "@typebot.io/auth/lib/nextAuth";
import prisma from "@typebot.io/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const latestSession = await prisma.helpChatSession.findFirst({
    where: { userId: session.user.id },
    orderBy: { updatedAt: "desc" },
    include: {
      messages: {
        orderBy: { createdAt: "asc" },
      },
    },
  });

  if (!latestSession) {
    return NextResponse.json({ session: null });
  }

  return NextResponse.json({
    session: {
      id: latestSession.id,
      messages: latestSession.messages.map((m) => ({
        role: m.role,
        content: m.content,
      })),
    },
  });
}
