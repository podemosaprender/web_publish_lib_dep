'use client'
import React from "react";
import { Navbar as NextUINavbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, Input } from "@nextui-org/react";
import Image from "next/image";

import { getNavbarItems, siteConfig } from '@/config/site' 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

export function Navbar() {
	const navbar_items= getNavbarItems();

  return (
    <NextUINavbar>
      <NavbarBrand>
        <Link href={process.env.basePath + "/"} className="text-white">
          <Image src={process.env.basePath + "/logo.png"} alt="me" width={40} height={40} />
          <p className="font-bold text-inherit">{ siteConfig.brand || 'Home' }</p>
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {
          navbar_items.map(navbar_item => (
            <NavbarItem>
              <Link color="foreground" href={navbar_item.url}>
                {navbar_item.name}
              </Link>
            </NavbarItem>
          ))
        }
      </NavbarContent>

      <NavbarContent as="div" className="items-center" justify="end">
      </NavbarContent>
    </NextUINavbar>
  );
}


