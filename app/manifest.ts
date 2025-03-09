import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Criptor.net - Your Ultimate Source for Cryptocurrency News",
    short_name: "Criptor.net",
    description:
      "Stay updated with the latest cryptocurrency news from around the globe with Criptor.net, your comprehensive RSS reader for all things crypto.",
    start_url: "/",
    display: "standalone",
    background_color: "#fff",
    theme_color: "#fff",
    icons: [
      {
        type: "image/png",
        sizes: "32x32",
        src: "/favicon/favicon-32x32.png",
      },
      {
        type: "image/png",
        sizes: "16x16",
        src: "/favicon/favicon-16x16.png",
      },
      {
        type: "image/png",
        sizes: "180x180",
        src: "/favicon/apple-touch-icon.png",
      },
      {
        type: "image/png",
        sizes: "192x192",
        src: "/favicon/android-chrome-192x192.png",
      },
      {
        type: "image/png",
        sizes: "512x512",
        src: "/favicon/android-chrome-512x512.png",
      },
    ],
  };
}
