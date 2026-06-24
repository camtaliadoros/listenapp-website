import { client } from "@/sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(client);

export function urlForImage(source: { asset?: { _ref: string } } | undefined | null) {
  if (!source?.asset) return undefined;
  return builder.image(source);
}
