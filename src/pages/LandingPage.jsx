import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import { Outlet } from "react-router-dom";

export default function LandingPage() {
  const location = useLocation();
  const isLandingPage = location.pathname === "/";

  return (
    <>
      <Navbar />
      {isLandingPage && <Hero />}
      <Outlet />
    </>
  );
}
