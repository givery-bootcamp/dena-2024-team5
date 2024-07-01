"use client";
import { editCommentFormSchema } from "@/lib/zod";
import { createComment } from "@/utils/createComment";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";
import {} from "./ui/tabs";
import { Textarea } from "./ui/textarea";

type Props = {
  jwtToken: string;
  postId: number;
};

// export const CommentForm = ({ jwtToken, postId }: Props) => {
//   const router = useRouter();
//   const { toast } = useToast();
//   return (
//     <div className="grid gap-8">
//       <AutoForm
//         formSchema={commentFormSchema}
//         onSubmit={async (formdata) => {
//           try {
//             await createComment({ formdata, jwtToken, postId });
//             toast({
//               description: "コメントに成功しました!",
//             });
//             router.push(`/posts/${postId.toString()}`);
//           } catch (error) {
//             console.error(error);
//             toast({
//               variant: "destructive",
//               description: "コメントに失敗しました...",
//             });
//           }
//         }}
//         fieldConfig={{
//           body: {
//             fieldType: "textarea",
//             inputProps: {
//               placeholder: "あなたは正しい",
//             },
//           },
//         }}
//       >
//         {/* TODO nesPrimaryに変える */}
//         <AutoFormSubmit className="w-full">応援する</AutoFormSubmit>
//       </AutoForm>
//     </div>
//   );
// };

type onSubmitType = z.infer<typeof editCommentFormSchema>;

export const CommentForm = ({ jwtToken, postId }: Props) => {
  const router = useRouter();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(editCommentFormSchema),
    defaultValues: {
      body: "",
    },
  });
  const onSubmit = async (formdata: onSubmitType) => {
    try {
      await createComment({ formdata, jwtToken, postId });
      reset();
      toast.info("応援に成功しました!");
      router.push(`/posts/${postId.toString()}`);
    } catch (error) {
      console.error(error);
      toast.error("応援に失敗しました...");
    }
  };

  return (
    <form
      className="flex-1 grid gap-4 h-36"
      id="comment-form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <span className="text-sm">
        コメント
        {errors.body && (
          <span className="text-sm text-red-500">*{errors.body.message}*</span>
        )}
      </span>
      <Textarea
        {...register("body")}
        className="nes-textarea is-dark resize-none"
      />
    </form>
  );
};
