import { Request, Response } from "express";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.SUPABASE_URL!;
const SUPABASE_KEY = process.env.SUPABASE_KEY!;
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export const getFile = async (req: Request, res: Response) => {
  try {
    const [bucketName, ...filePath] = req.url.split("/").slice(1);
    const { data, error } = await supabase.storage
      .from(bucketName)
      .download(filePath.join('/'));

    if (error) {
      if (
        error.name === "StorageApiError" &&
        error.message === "Object not found"
      ) {
        return res.status(404).send("File not found");
      } else {
        throw error;
      }
    }
    if (!data) {
      throw "Data not found"
    }

    const buffer = await data.arrayBuffer();

    res.set("Content-Type", data.type);
    res.send(Buffer.from(buffer));
  } catch (err) {
    console.error(err);
    res.send(err || "An error occurred");
  }
};
