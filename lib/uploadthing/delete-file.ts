"use server";

import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

export async function deleteFile(key: string) {
  if (!key) return;

  await utapi.deleteFiles(key);
}