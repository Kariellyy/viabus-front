'use client'

import { useEffect } from "react"

export default function BootstrapJs() {
  useEffect(() => {
    // @ts-ignore
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  return <></>
}