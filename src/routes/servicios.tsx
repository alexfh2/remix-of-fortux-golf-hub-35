import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/servicios")({
  head: () => ({
    meta: [
      { title: "Servicios — Fortux" },
      { name: "description", content: "Servicios profesionales para tus palos de golf en Fortux." },
    ],
    links: [{ rel: "canonical", href: "/servicios" }],
  }),
  component: () => <Outlet />,
});
