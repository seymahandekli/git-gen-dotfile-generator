import InstructionsGenerator from "./components/instructions-generator";

export default function Home() {
  return (
    <main className="container mx-auto flex flex-col p-4 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">
        <a
          href="https://github.com/seymahandekli/git-gen"
          target="_blank"
          rel="noopener noreferrer"
        >
          git-gen
        </a>'s AI Instructions/Rules File Generator
      </h1>
      <InstructionsGenerator />
    </main>
  );
}
