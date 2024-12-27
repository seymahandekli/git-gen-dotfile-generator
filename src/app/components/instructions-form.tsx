'use client'

import * as React from 'react'
import type { ChangeEvent } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Combobox } from "@/components/ui/combobox"
import { Checkbox } from "@/components/ui/checkbox"
import type { InstructionsInput } from "../../lib/generate-instructions"
import { generateInstructions } from "../../lib/generate-instructions"
import { Textarea } from '@/components/ui/textarea'

interface InstructionsFormProps {
  onChange: (instructions: string) => void
}

const projectRoleOptions = [
  { value: "Senior Full Stack Developer", label: "Senior Full Stack Developer" },
  { value: "Senior Front-End Developer", label: "Senior Front-End Developer" },
  { value: "Senior Back-End Developer", label: "Senior Back-End Developer" },
  { value: "Senior DevOps Engineer", label: "Senior DevOps Engineer" },
  { value: "Senior Data Engineer", label: "Senior Data Engineer" },
  { value: "Senior Machine Learning Engineer", label: "Senior Machine Learning Engineer" },
  { value: "Senior Test Engineer", label: "Senior Test Engineer" },
]

const expertiseOptions = [
  { id: 'reactjs', label: 'ReactJS' },
  { id: 'nextjs', label: 'NextJS' },
  { id: 'javascript', label: 'JavaScript' },
  { id: 'typescript', label: 'TypeScript' },
  { id: 'html', label: 'HTML' },
  { id: 'css', label: 'CSS' },
  { id: 'tailwind', label: 'TailwindCSS' },
  { id: 'shadcn', label: 'Shadcn' },
  { id: 'radix', label: 'Radix' },
  { id: 'golang', label: 'Go (Golang)' },
  { id: 'angular', label: 'Angular' },
  { id: 'vuejs', label: 'VueJS' },
  { id: 'svelte', label: 'Svelte' },
  { id: 'nodejs', label: 'NodeJS' },
  { id: 'deno', label: 'Deno' },
  { id: 'express', label: 'ExpressJS' },
  { id: 'graphql', label: 'GraphQL' },
  { id: 'apollo', label: 'Apollo' },
  { id: 'restapi', label: 'REST API' },
  { id: 'docker', label: 'Docker' },
  { id: 'kubernetes', label: 'Kubernetes' },
  { id: 'aws', label: 'AWS' },
  { id: 'gcp', label: 'Google Cloud Platform' },
  { id: 'azure', label: 'Azure' },
  { id: 'mongodb', label: 'MongoDB' },
  { id: 'postgresql', label: 'PostgreSQL' },
  { id: 'mysql', label: 'MySQL' },
  { id: 'prisma', label: 'Prisma' },
  { id: 'redux', label: 'Redux' },
]


const stylingOptions = [
  { value: 'tailwind', label: 'TailwindCSS' },
  { value: 'css-modules', label: 'CSS Modules' },
]

export default function InstructionsForm(props: InstructionsFormProps) {
  const [name, setName] = React.useState('');
  const [projectRole, setProjectRole] = React.useState('');
  const [debug, setDebug] = React.useState(false);
  const [expertise, setExpertise] = React.useState<string[]>(['ReactJS', 'NextJS']);
  const [styling, setStyling] = React.useState<'tailwind' | 'css-modules'>('tailwind');
  const [accessibility, setAccessibility] = React.useState(true);
  const [codeStyle, setCodeStyle] = React.useState({
    earlyReturns: true,
    useConst: true,
    descriptiveNaming: true,
  });
  const [desc, setDesc] = React.useState('');
  const [code, setCode] = React.useState('');

  const updateConfig = (updates: Partial<InstructionsInput>) => {
    const formInput: InstructionsInput = {
      name,
      projectRole,
      debug,
      expertise,
      guidelines: [
        'Follow requirements carefully',
        'Think step-by-step',
        'Write correct, best practice code',
        'Focus on readability over performance',
      ],
      accessibility,
      styling,
      codeStyle,
      desc,
      ...updates,
    };

    const instructions = generateInstructions(formInput);
    props.onChange(instructions);
  }

  return (
    <form className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Project Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const newValue = e.target.value;
            setName(newValue);
            updateConfig({ name: newValue });
          }}
          placeholder="e.g., my-awesome-project"
        />
        <p className="text-sm text-muted-foreground">
          Enter the name of your project. This will be used as your project's name.
        </p>
      </div>
      <div className="space-y-2">
        <Label htmlFor="projectRole">Project Role</Label>
        <Combobox
          options={projectRoleOptions}
          value={projectRole}
          onValueChange={(value: string) => {
            setProjectRole(value);
            updateConfig({ projectRole: value });
          }}
          placeholder="Select role..."
          searchPlaceholder="Search role..."
        />
        <p className="text-sm text-muted-foreground">
          Choose the runtime environment for your project.
        </p>
      </div>
      <div className="flex items-center space-x-2">
        <Switch
          id="debug"
          checked={debug}
          onCheckedChange={(checked: boolean) => {
            setDebug(checked);
            updateConfig({ debug: checked });
          }}
        />
        <div className="space-y-1">
          <Label htmlFor="debug">Debug Mode</Label>
          <p className="text-sm text-muted-foreground">
            Enable debug mode for additional logging and error information.
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Expertise Areas</Label>
        <div className="grid grid-cols-2 gap-2">
          {expertiseOptions.map((option) => (
            <div key={option.id} className="flex items-center space-x-2">
              <Checkbox
                id={option.id}
                checked={expertise.includes(option.label)}
                onCheckedChange={(checked) => {
                  const newExpertise = checked
                    ? [...expertise, option.label]
                    : expertise.filter(e => e !== option.label);
                  setExpertise(newExpertise);
                  updateConfig({ expertise: newExpertise });
                }}
              />
              <Label htmlFor={option.id}>{option.label}</Label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label>Code Style Preferences</Label>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Switch
              id="earlyReturns"
              checked={codeStyle.earlyReturns}
              onCheckedChange={(checked) => {
                const newCodeStyle = { ...codeStyle, earlyReturns: checked };
                setCodeStyle(newCodeStyle);
                updateConfig({ codeStyle: newCodeStyle });
              }}
            />
            <Label htmlFor="earlyReturns">Use Early Returns</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="accessibility"
              checked={accessibility}
              onCheckedChange={(checked) => {
                setAccessibility(checked);
                updateConfig({ accessibility: checked });
              }}
            />
            <Label htmlFor="accessibility">Implement Accessibility Features</Label>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="styling">Styling Approach</Label>
        <Combobox
          options={stylingOptions}
          value={styling}
          onValueChange={(value: 'tailwind' | 'css-modules') => {
            setStyling(value);
            updateConfig({ styling: value });
          }}
          placeholder="Select styling approach..."
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="desc">Project Description</Label>
        <Input
          id="desc"
          value={desc}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const newValue = e.target.value;
            setDesc(newValue);
            updateConfig({ name: newValue });
          }}
          placeholder="e.g., a cli tool to generate commit messages, code reviews, test cases, unit tests, and more"
        />
        <p className="text-sm text-muted-foreground">
          Enter the detailes of your project. This will be used as your project's description.
        </p>
      </div>
      <div className="space-y-2">
  <Label htmlFor="code">Example Code</Label>
  <Textarea
    id="code"
    value={code}
    onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value;
      setCode(newValue);
      updateConfig({ code: newValue });
    }}
    placeholder={`e.g.,
function add(a, b) {
  return a + b;
}

export default add;`}
    rows={6}
    className="font-mono text-sm p-3 rounded border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-300 focus:outline-none"
  />
  <p className="text-sm text-muted-foreground">
    Enter the example code for your project. This will be included as a reference for your project's usage or implementation.
  </p>
</div>

    </form>
  )
}
