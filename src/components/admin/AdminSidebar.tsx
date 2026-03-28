"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { LayoutDashboard, Package, PlusCircle, LogOut, Home } from "lucide-react";

const links = [
  { href: "/", label: "Home", icon: Home },
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/products/new", label: "Add product", icon: PlusCircle },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function signOut() {
    const supabase = createClient();
    if (supabase) {
      await supabase.auth.signOut();
    }
    router.push("/login");
    router.refresh();
  }

  return (
    <aside className="flex w-full flex-col border-b border-stone-200 bg-white md:w-56 md:border-b-0 md:border-r">
      <div className="flex items-center gap-2 border-b border-stone-100 px-4 py-4 md:border-0">
        <span className="text-sm font-semibold text-stone-900">Admin</span>
      </div>
      <nav className="flex flex-1 flex-row gap-1 overflow-x-auto px-2 py-2 md:flex-col md:overflow-visible">
        {links.map(({ href, label, icon: Icon }) => {
          const active =
            href === "/"
              ? pathname === "/"
              : href === "/admin"
                ? pathname === "/admin"
                : href === "/admin/products/new"
                  ? pathname === "/admin/products/new"
                  : href === "/admin/products"
                    ? pathname === "/admin/products" ||
                      /^\/admin\/products\/[^/]+\/edit$/.test(pathname)
                    : false;
          return (
            <Link
              key={href}
              href={href}
              className={`flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${
                active
                  ? "bg-amber-100 text-amber-950"
                  : "text-stone-600 hover:bg-stone-100 hover:text-stone-900"
              }`}
            >
              <Icon className="h-4 w-4" aria-hidden />
              {label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-stone-100 p-2">
        <button
          type="button"
          onClick={() => void signOut()}
          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-stone-600 hover:bg-stone-100"
        >
          <LogOut className="h-4 w-4" aria-hidden />
          Sign out
        </button>
      </div>
    </aside>
  );
}