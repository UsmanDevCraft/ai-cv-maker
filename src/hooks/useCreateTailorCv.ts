import { useMutation } from "@tanstack/react-query";
import { tailorCv } from "@/src/service/tailorCv.service";

export const useTailorCv = () =>
  useMutation({
    mutationFn: tailorCv,
  });
