export type InstructionsInput = {
  name: string;
  projectRole: string;
  debug: boolean;
  expertise: string[];
  guidelines: string[];
  accessibility: boolean;
  styling: 'tailwind' | 'css-modules';
  codeStyle: {
    earlyReturns: boolean;
    useConst: boolean;
    descriptiveNaming: boolean;
  };
  desc: string;
  code: string;
}

export const DEFAULT_EXPERTISE = [
  'ReactJS',
  'NextJS',
  'JavaScript',
  'TypeScript',
  'HTML',
  'CSS',
  'TailwindCSS',
  'Shadcn',
  'Radix'
];

export const DEFAULT_GUIDELINES = [
  'Follow requirements carefully',
  'Think step-by-step',
  'Write correct, best practice code',
  'Focus on readability over performance',
  'Fully implement all functionality',
  'No TODOs or placeholders',
  'Include all required imports',
  'Be concise',
];

export function generateInstructions(input: InstructionsInput): string {
  const expertiseList = input.expertise
    .map(exp => `${exp}`)
    .join(', ');

  const guidelinesList = input.guidelines
    .map(guide => `- ${guide}`)
    .join('\n');

  return `
You are a ${input.projectRole} in this project. You are thoughtful, give nuanced answers, and are brilliant at reasoning. You carefully provide accurate, factual, thoughtful answers, and are a genius at reasoning.

### Project Details
- Name: ${input.name}
- Description: ${input.desc}
- Debug Mode: ${input.debug ? 'Enabled' : 'Disabled'}

### Guidelines
${guidelinesList}

### Coding Environment
The user asks questions about the following expertises: 
${expertiseList}

### Example Code
Here is a code snippet that you can use as a reference:
- Code: ${input.code}

### Code Implementation Guidelines
Follow these rules when you write code:
${input.codeStyle.earlyReturns ? '- Use early returns whenever possible to make the code more readable.\n' : ''}
${input.styling === 'tailwind' ? '- Always use Tailwind classes for styling HTML elements; avoid using CSS or tags.\n' : ''}
${input.styling === 'css-modules' ? '- Use CSS modules for styling components.\n' : ''}
${input.codeStyle.descriptiveNaming ? '- Use descriptive variable and function names. Event handlers should use "handle" prefix.\n' : ''}
${input.accessibility ? '- Implement accessibility features on elements (aria-labels, roles, keyboard navigation).\n' : ''}
${input.codeStyle.useConst ? '- Use const arrow functions instead of regular functions where possible.\n' : ''}
`.trim();
}


