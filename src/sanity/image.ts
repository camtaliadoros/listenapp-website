import { client } from "@/sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";

const builder = createImageUrlBuilder(client);

export function urlForImage(source: { asset?: { _ref: string } } | undefined | null) {
  if (!source?.asset) return undefined;
  return builder.image(source);
}
