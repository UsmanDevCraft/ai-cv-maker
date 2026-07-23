import { fetcher } from "@/src/lib/fetcher";
import { FinalTailoredOutput } from "../types/cv_template";

export const tailorCv = (formData: FormData) =>
  fetcher<FinalTailoredOutput>({
    endpoint: "/api/v1/tailor-cv",
    method: "POST",
    body: formData,
  });
