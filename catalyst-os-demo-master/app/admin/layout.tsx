import Link from "next/link";
import { Logo } from "@/components/shared/Logo";
import { NavLink } from "@/components/shared/NavLink";
import { defaultSchool } from "@/lib/mock-data";
import { GraduationCap } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-6xl items-center gap-4 px-4 sm:px-6">
          <Logo href="/admin" />
          <nav className="flex items-center gap-1">
            <NavLink href="/admin" exact>
              Dashboard
            </NavLink>
            <NavLink href="/admin/challenges">Challenges</NavLink>
          </nav>
          <div className="ml-auto flex items-center gap-3">
            <Link
              href="/student"
              className="hidden items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground sm:flex"
            >
              <GraduationCap className="size-3.5" />
              Switch to Student view
            </Link>
            <span className="flex items-center gap-2 rounded-full bg-secondary py-1 pr-3 pl-1 text-xs font-medium">
              <span
                className="flex size-6 items-center justify-center rounded-full text-[10px] font-bold text-white"
                style={{
                  background: `linear-gradient(135deg, ${defaultSchool.colorFrom}, ${defaultSchool.colorTo})`,
                }}
              >
                {defaultSchool.shortName[0]}
              </span>
              {defaultSchool.shortName}
            </span>
          </div>
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6">{children}</main>
    </div>
  );
}
