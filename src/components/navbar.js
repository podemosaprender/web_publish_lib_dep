'use client'
import React from "react";
import {Navbar as NextUINavbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, Input} from "@nextui-org/react";
import Image from "next/image";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'


export function Navbar() {

  return (
    <NextUINavbar>
      <NavbarBrand>
        <Link href="/" className="text-white">
          <Image src={process.env.basePath + "/logo.png"} alt="me" width={40} height={40} />
          <p className="font-bold text-inherit">HOME</p>
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#">
            Features
          </Link>
        </NavbarItem>
      </NavbarContent>

			<NavbarContent as="div" className="items-center" justify="end">
			</NavbarContent>
    </NextUINavbar>
  );
}


