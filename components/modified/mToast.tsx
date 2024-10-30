// "use client";
// import { useToast } from "@/hooks/use-toast";
// import { useEffect } from "react";

// export default function MToast({ x }: { x: any }) {
//   const { toast } = useToast();

//   useEffect(() => {
//     if (x.error) {
//       toast({
//         title: "Error",
//         description:
//           x.error.originalError?.info?.message || "An unexpected error occurred.",
//       });
//     } else if (Array.isArray(x) && x.length > 0) {
//       toast({
//         title: x[0].title,
//         description: x[0].sms,
//         variant: x[0].variant,
//       });
//     } else {
//       toast({
//         title: "Info",
//         description: "No error or messages provided.",
//       });
//     }
//   }, [x, toast]);

//   return null; // No UI, just triggers the toast
// }
