import Link from "next/link";
import { Logo } from "@/components/shared/Logo";
import { NavLink } from "@/components/shared/NavLink";
import { StudentAvatar } from "@/components/shared/StudentAvatar";
import { getStudentById, currentStudentId } from "@/lib/mock-data";
import { LayoutDashboard } from "lucide-react";

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  const student = getStudentById(currentStudentId)!;

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-6xl items-center gap-4 px-4 sm:px-6">
          <Logo />
          <nav className="flex items-center gap-1">
            <NavLink href="/student" exact>
              Dashboard
            </NavLink>
            <NavLink href="/student/challenges">Challenges</NavLink>
            <NavLink href="/student/portfolio">Portfolio</NavLink>
            <NavLink href="/student/leaderboard">Leaderboard</NavLink>
          </nav>
          <div className="ml-auto flex items-center gap-3">
            <Link
              href="/admin"
              className="hidden items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground sm:flex"
            >
              <LayoutDashboard className="size-3.5" />
              Switch to Admin view
            </Link>
            <Link href="/student/portfolio" className="flex items-center gap-2">
              <span className="hidden text-right sm:block">
                <span className="block text-sm leading-tight font-medium">{student.name}</span>
                <span className="block text-xs leading-tight text-muted-foreground">
                  {student.grade}
                </span>
              </span>
              <StudentAvatar name={student.name} seed={student.avatarSeed} />
            </Link>
          </div>
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6">{children}</main>
    </div>
  );
}
