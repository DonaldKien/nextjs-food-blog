"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import classes from "./NavLink.module.css";
import classNames from "classnames";

interface NavLink {
  href: string;
  children: React.ReactNode;
}

const NavLink = ({ href, children }: NavLink) => {
  const path = usePathname();

  return (
    <Link
      href={href}
      className={classNames(classes.link, {
        [classes.active]: path.startsWith(href),
      })}
    >
      {children}
    </Link>
  );
};

export default NavLink;
