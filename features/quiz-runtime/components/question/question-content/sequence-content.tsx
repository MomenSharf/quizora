// "use client";

// import { DragDropProvider } from "@dnd-kit/react";
// import { OrderingContent } from "./ordering-content";
// import { MatchContent } from "./match-content";
// import { RuntimeQuestion } from "@/features/quiz-runtime/types/runtime-types";

// type SequenceContentProps = {
//   runtimeQuestion: RuntimeQuestion;
//   isLocked: boolean;
//   isSubmitted: boolean;
//   isTimeout: boolean;
//   shouldAnimateFeedback: boolean;
// };

// export function SequenceContent(props: SequenceContentProps) {
//   const { question } = props.runtimeQuestion;

//   switch (question.type) {
//     case "ORDERING":
//       return (
//         <DragDropProvider>
//           <OrderingContent {...props} />
//         </DragDropProvider>
//       );

//     case "MATCH":
//       return (
//         <DragDropProvider>
//           <MatchContent {...props} />
//         </DragDropProvider>
//       );

//     default:
//       return null;
//   }
// }