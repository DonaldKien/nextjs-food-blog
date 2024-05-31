import Image from "next/image";
import { Fragment } from "react";
import Link from "next/link";
import logoImg from "@/assets/logo.png";
import classes from "./MainHeader.module.css";
import MainHeaderBackground from "@/components/MainHeaderBackground/MainHeaderBackground";
import NavLink from "@/components/NavLink/NavLink";

const MainHeader = () => {
  return (
    <Fragment>
      <MainHeaderBackground />
      <header className={classes.header}>
        <Link className={classes.logo} href="/">
          <Image src={logoImg} alt="A plate with food on it" priority />
          NextLevel Food
        </Link>

        <nav className={classes.nav}>
          <ul>
            <li>
              <NavLink href="/meals">Brows Meals</NavLink>
            </li>
            <li>
              <NavLink href="/community">Foodies Community</NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </Fragment>
  );
};

export default MainHeader;
