import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { Prisma, PrismaClient } from "../lib/db/generated/prisma/client";
import bcrypt from "bcrypt";
import { randomUUID } from "node:crypto";
import { Question } from "@/features/quiz-editor/validation/question";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

const makeId = () => `c${randomUUID().replaceAll("-", "")}`;

const image = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=85`;

const options = (...texts: string[]) =>
  texts.map((text) => ({ id: makeId(), text, explanation: "" }));

const accepted = (...values: string[]) =>
  values.map((value) => ({ id: makeId(), value }));

const base = {
  description: "",
  hint: "",
  required: true,
  media: {},
};

const questions: Question[] = [
  {
    type: "SINGLE_SELECT",
    title: "Which planet is known as the Red Planet?",
    explanation: "Iron oxide on Mars gives its surface a reddish appearance.",
    points: 1,
    tags: ["astronomy", "science"],
    difficulty: "EASY",
    content: {
      ...base,
      data: (() => {
        const opts = options("Venus", "Mars", "Jupiter", "Mercury");
        return {
          options: opts,
          correctOptionId: opts[1].id,
        };
      })(),
    },
    config: {
      randomizeOptions: false,
      layout: "VERTICAL",
      showOptionLetters: true,
    },
  },
  {
    type: "MULTIPLE_SELECT",
    title: "Which of these are programming languages?",
    explanation: "TypeScript, Python, and Rust are programming languages. HTML is a markup language.",
    points: 2,
    tags: ["programming"],
    difficulty: "EASY",
    content: {
      ...base,
      data: (() => {
        const opts = options("TypeScript", "HTML", "Python", "Rust");
        return {
          options: opts,
          correctOptionIds: [opts[0].id, opts[2].id, opts[3].id],
        };
      })(),
    },
    config: {
      randomizeOptions: false,
      layout: "VERTICAL",
      showOptionLetters: true,
      minSelections: 0,
      maxSelections: 0,
      allowPartialCredit: true,
    },
  },
  {
    type: "TRUE_FALSE",
    title: "Water boils at 100°C at standard atmospheric pressure.",
    explanation: "At one atmosphere of pressure, pure water boils at approximately 100°C.",
    points: 1,
    tags: ["science"],
    difficulty: "EASY",
    content: {
      ...base,
      data: { correctAnswer: true },
    },
    config: {
      trueLabel: "True",
      falseLabel: "False",
      randomizeOrder: false,
    },
  },
  {
    type: "DROPDOWN",
    title: "The capital of Japan is ____.",
    explanation: "Tokyo is the capital of Japan.",
    points: 1,
    tags: ["geography"],
    difficulty: "EASY",
    content: {
      ...base,
      data: (() => {
        const opts = options("Kyoto", "Tokyo", "Osaka", "Nagoya");
        return {
          options: opts,
          correctOptionId: opts[1].id,
        };
      })(),
    },
    config: {
      placeholder: "Select a city",
      randomizeOptions: false,
      searchable: false,
      clearable: true,
      showOptionLetters: false,
    },
  },
  {
    type: "ORDERING",
    title: "Arrange these stages of a butterfly's life cycle.",
    explanation: "A butterfly develops from an egg into a larva, then a pupa, and finally an adult.",
    points: 2,
    tags: ["biology"],
    difficulty: "MEDIUM",
    content: {
      ...base,
      data: {
        items: [
          { id: makeId(), text: "Egg" },
          { id: makeId(), text: "Larva (caterpillar)" },
          { id: makeId(), text: "Pupa (chrysalis)" },
          { id: makeId(), text: "Adult butterfly" },
        ],
      },
    },
    config: {
      randomizeItems: true,
      layout: "VERTICAL",
      showNumbers: true,
      allowRetry: true,
    },
  },
  {
    type: "MATCH",
    title: "Match each technology with its primary use.",
    explanation: "HTML structures pages, CSS styles them, JavaScript adds behavior, and SQL queries relational databases.",
    points: 4,
    tags: ["web-development"],
    difficulty: "MEDIUM",
    content: {
      ...base,
      data: {
        pairs: [
          {
            id: makeId(),
            left: { text: "HTML" },
            right: { text: "Page structure" },
          },
          {
            id: makeId(),
            left: { text: "CSS" },
            right: { text: "Visual styling" },
          },
          {
            id: makeId(),
            left: { text: "JavaScript" },
            right: { text: "Interactive behavior" },
          },
          {
            id: makeId(),
            left: { text: "SQL" },
            right: { text: "Database queries" },
          },
        ],
      },
    },
    config: {
      randomizeLeft: false,
      randomizeRight: true,
      layout: "DRAG_DROP",
      showImages: false,
      allowRetry: true,
    },
  },
  {
    type: "TYPE_ANSWER",
    title: "What is the name of the language that adds interactivity to web pages?",
    explanation: "JavaScript is commonly used to add dynamic behavior to web pages.",
    points: 2,
    tags: ["web-development"],
    difficulty: "EASY",
    content: {
      ...base,
      data: {
        answers: accepted("JavaScript", "JS"),
        placeholder: "Type your answer...",
      },
    },
    config: {
      caseSensitive: false,
      trimWhitespace: true,
      ignoreExtraSpaces: true,
      acceptRegex: false,
      maxLength: 255,
      multiline: false,
      autoComplete: false,
    },
  },
  {
    type: "FILL_BLANK",
    title: "Complete this sentence: The Earth revolves around the ____.",
    explanation: "Earth orbits the Sun approximately once every 365.25 days.",
    points: 2,
    tags: ["astronomy"],
    difficulty: "EASY",
    content: {
      ...base,
      data: (() => {
        const blankId = makeId();
        return {
          blocks: [
            { id: makeId(), type: "TEXT", text: "The Earth revolves around the " },
            { id: makeId(), type: "BLANK", blankId },
            { id: makeId(), type: "TEXT", text: "." },
          ],
          blanks: [
            {
              id: blankId,
              answers: accepted("Sun", "sun"),
              placeholder: "Enter a celestial body",
            },
          ],
        };
      })(),
    },
    config: {
      caseSensitive: false,
      trimWhitespace: true,
      ignoreExtraSpaces: true,
      allowAnyOrder: false,
      autoResizeInputs: true,
    },
  },
  {
    type: "FLASHCARDS",
    title: "Review essential computer science concepts.",
    explanation: "Review each concept and recall its definition.",
    points: 1,
    tags: ["computer-science", "revision"],
    difficulty: "EASY",
    content: {
      ...base,
      data: {
        cards: [
          {
            id: makeId(),
            front: { title: "Algorithm", content: "What is an algorithm?" },
            back: { title: "Definition", content: "A finite sequence of steps for solving a problem." },
          },
          {
            id: makeId(),
            front: { title: "Variable", content: "What is a variable?" },
            back: { title: "Definition", content: "A named reference used to store or represent a value." },
          },
          {
            id: makeId(),
            front: { title: "Database", content: "What is a database?" },
            back: { title: "Definition", content: "An organized collection of data that can be accessed and managed." },
          },
          {
            id: makeId(),
            front: { title: "API", content: "What does an API do?" },
            back: { title: "Definition", content: "Defines how software systems communicate with one another." },
          },
        ],
      },
    },
    config: {
      shuffleCards: false,
      flipDirection: "HORIZONTAL",
      startSide: "FRONT",
      allowFlip: true,
      loopCards: false,
      showProgress: true,
      autoFlip: false,
      autoFlipDelay: 3000,
    },
  },
  {
    type: "RANGE",
    title: "Select the range containing the typical human resting heart rate in beats per minute.",
    explanation: "A commonly cited adult resting heart-rate range is 60–100 beats per minute, though individual needs vary.",
    points: 2,
    tags: ["biology", "health-science"],
    difficulty: "MEDIUM",
    content: {
      ...base,
      data: {
        min: 0,
        max: 200,
        step: 1,
        answer: { min: 60, max: 100 },
        unit: "bpm",
      },
    },
    config: {
      showTicks: true,
      showLabels: true,
      showCurrentValue: true,
      showMinMaxLabels: true,
      orientation: "HORIZONTAL",
      snapToStep: true,
    },
  },
  {
    type: "LOCATION",
    title: "Locate the Eiffel Tower on the map.",
    explanation: "The Eiffel Tower is in Paris, France.",
    points: 2,
    tags: ["geography", "landmarks"],
    difficulty: "EASY",
    content: {
      ...base,
      data: {
        answer: [
          {
            coordinate: { lat: 48.8584, lng: 2.2945 },
            radius: 100,
          },
        ],
        initialCenter: { lat: 48.8584, lng: 2.2945 },
        initialZoom: 12,
      },
    },
    config: {
      mapType: "ROADMAP",
      allowZoom: true,
      allowPan: true,
      showMarker: false,
      showRadius: false,
      showCoordinates: false,
      lockMapBounds: false,
    },
  },
  {
    type: "GUESS",
    title: "Identify the famous landmark shown in this image.",
    explanation: "The Great Pyramid of Giza is one of the most recognizable ancient monuments in Egypt.",
    points: 2,
    tags: ["history", "landmarks"],
    difficulty: "EASY",
    content: {
      ...base,
      data: {
        asset: {
          type: "IMAGE",
          url: image("photo-1503177119275-0aa32b3a9368"),
        },
        answers: accepted("Great Pyramid of Giza", "Pyramid of Giza", "Giza Pyramid"),
      },
    },
    config: {
      caseSensitive: false,
      trimWhitespace: true,
      ignoreExtraSpaces: true,
      revealAnswerAfterSubmit: true,
      maxAttempts: 0,
      showHint: true,
      zoomable: true,
    },
  },
  {
    type: "TAP_FIND",
    title: "Tap the marked target area in the image.",
    explanation: "This example uses normalized image coordinates, from 0 to 1, for target placement.",
    points: 2,
    tags: ["visual-reasoning"],
    difficulty: "MEDIUM",
    content: {
      ...base,
      data: {
        image: image("photo-1470770841072-f978cf4d019e"),
        targets: [
          {
            id: makeId(),
            label: "Target",
            shape: "CIRCLE",
            coordinates: [{ x: 0.5, y: 0.5 }],
          },
        ],
      },
    },
    config: {
      showHints: true,
      showTargetOutline: false,
      allowMultipleClicks: false,
      tolerance: 5,
      zoomable: true,
      revealTargetsAfterSubmit: true,
    },
  },
];

async function main() {
  const email = "momen@gmail.com";
  const password = await bcrypt.hash("gggggggg", 12);

  const user = await prisma.user.upsert({
    where: { email },
    update: {
      name: "Momen Developer",
      password,
    },
    create: {
      name: "Momen Developer",
      email,
      password,
      emailVerified: new Date(),
    },
  });

  const title = "Quizora Development Playground";

  const info = {
    title,
    description:
      "A development quiz covering all Quizora question types, with realistic sample data for testing gameplay, answer evaluation, and result screens.",
    tags: ["development", "demo", "all-question-types"],
    language: "en",
    category: "Computer Science",
  };

  const settings = {
    visibility: "PRIVATE",
    shuffleQuestions: false,
    shuffleOptions: false,
    showCorrectAnswers: true,
    showScore: true,
    showExplanations: true,
    allowRetry: true,
    saveProgress: true,
    requireAllQuestions: false,
    passingScore: 60,
    attempts: 0,
    timeLimit: 0,
  };

  const appearance = {
    theme: "SYSTEM",
    primaryColor: "#6366F1",
    backgroundColor: "#FFFFFF",
    textColor: "#111827",
    font: "Inter",
    borderRadius: 12,
    showProgressBar: true,
    showQuestionNumber: true,
  };

  const totalPoints = questions.reduce((sum, question) => sum + question.points, 0);

  await prisma.$transaction(async (tx) => {
    const quiz = await tx.quiz.upsert({
      where: { id: "devquiz" },
      update: {
        title,
        description: info.description,
        ownerId: user.id,
        language: info.language,
        category: info.category,
        visibility: "PRIVATE",
        tags: info.tags,
        questionCount: questions.length,
        totalPoints,
        editorState: {
          info,
          settings,
          appearance,
        } as Prisma.InputJsonValue,
      },
      create: {
        id: "devquiz",
        slug: "devquiz",
        title,
        description: info.description,
        ownerId: user.id,
        language: info.language,
        category: info.category,
        visibility: "PRIVATE",
        tags: info.tags,
        questionCount: questions.length,
        totalPoints,
        editorState: {
          info,
          settings,
          appearance,
        } as Prisma.InputJsonValue,
      },
    });

    await tx.question.deleteMany({
      where: { quizId: quiz.id },
    });

    await tx.question.createMany({
      data: questions.map((question, index) => ({
        quizId: quiz.id,
        type: question.type,
        title: question.title,
        explanation: question.explanation,
        points: question.points,
        order: index,
        tags: question.tags,
        difficulty: question.difficulty,
        content: question.content as Prisma.InputJsonValue,
        config: question.config as Prisma.InputJsonValue,
      })) as Prisma.QuestionCreateManyInput[],
    });
  });

  console.log("Development seed completed.");
  console.log(`User: ${email}`);
  console.log("Password: gggggggg");
  console.log("Quiz ID: devquiz");
  console.log(`Questions: ${questions.length}`);
  console.log(`Total points: ${totalPoints}`);
}

main()
  .catch((error) => {
    console.error("Development seed failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
