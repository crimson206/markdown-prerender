import React from 'react';
import { useDynamicComponents } from './useDynamicComponents';

type BlockType = 'json' | 'ts';

/**
 * ---
 * A custom React hook that hydrates dynamic components in the DOM.
 * 
 * This hook is a crucial part of the dynamic rendering system. It takes an array
 * of {@link ComponentPair}s and renders each component in its corresponding
 * placeholder in the DOM. This allows for seamless integration of dynamically
 * generated content with React components.
 * 
 * ---
 * @param components An array of {@link ComponentPair}s to be rendered
 * 
 * ---
 * @see 
 * - {@link ComponentPair} for more details on the structure of each component pair
 * 
 * ---
 * @example
 * const dynamicComponents: ComponentPair[] = [
 *   { 
 *     id: 'component-1', 
 *     useComponent: () => <DynamicComponent1 />
 *   },
 *   { 
 *     id: 'component-2', 
 *     useComponent: () => <DynamicComponent2 />
 *   }
 * ];
 * 
 * function MyComponent() {
 *   useDynamicComponents(dynamicComponents);
 *   
 *   return (
 *     <div>
 *       <div id="component-1"></div>
 *       <div id="component-2"></div>
 *     </div>
 *   );
 * }
 * 
 */
export interface ComponentPair {
  /** Unique identifier for the component */
  id: string;
  /** React hook that returns the component's JSX */
  useComponent: () => JSX.Element;
}

/**
 * Defines the structure for component configuration.
 */
interface ComponentConfig {
  /** Type of the component, usually 'dynamicRenderer' */
  type: string;
  /** Unique identifier for the component */
  id: string;
  /** Props to be passed to the component */
  props: Record<string, any>;
}

/**
 * Represents the result of dynamic rendering process.
 */
export interface DynamicRenderResult {
  /** Content after transformation */
  transformedContent: DynamicContent;
  /** Array of component pairs for rendering */
  componentPairs: ComponentPair[];
}

/**
 * ---
 * @summary
 * ---
 * A unique identifier that links a {@link DynamicComponent} with its corresponding {@link Block} in {@link DynamicContent}.
 *
 * ---
 * @description
 * ---
 * The ComponentID serves as a crucial connection point in the dynamic rendering process:
 * 
 * 1. In the {@link DynamicContent}, the {@link Block} associated with this ComponentID 
 *    is replaced by a placeholder div element: '<div id="${{@link ComponentID}}"></div>'.
 * 
 * 2. This placeholder div acts as a container for the {@link DynamicComponent}.
 * 
 * 3. The {@link useDynamicComponents} hook utilizes this ComponentID to inject 
 *    the corresponding {@link DynamicComponent} into its designated container.
 *
 * This mechanism enables seamless integration of dynamic components within static content,
 * allowing for flexible and powerful content rendering capabilities.
 *
 * ---
 * @see
 * ---
 * - {@link DynamicComponent}
 * - {@link Block}
 * - {@link DynamicContent}
 * - {@link useDynamicComponents}
 */
export type ComponentID = string;

/**
 * ---
 * @summary
 * ---
 * A `dynamic-capable` react component that can be injected to the markdown content called {@link DynamicContent} 
 * 
 * ---
 * @description
 * ---
 * This component is independently implemented including dynamic logics,\
 * and injected to the rendered {@link DynamicContent}.
 * 
 * All the {@link DynamicComponent}s are activated by {@link useDynamicComponents } in a markdown renderer.
 * 
 */
export type DynamicComponent = React.FC<any>;

/**
 * Defines the structure for a component definition.
 */
export interface ComponentDefinition {
  /** Unique identifier for the component */
  id: ComponentID;
  /** React functional component */
  Component: DynamicComponent;
}

/**
 * Represents the content to be processed by DynamicRenderer.
 * This is typically a markdown string that may include embedded {@link JsonSyntax} or {@link TSSyntax} blocks.
 */
export type DynamicContent = string;

/**
 * Represents a JSON syntax block for dynamic rendering.
 * 
 * The JSON block should follow this structure:
 * @example
 * ```json
 * ```json
 * {
 *     "type": "dynamicRenderer",
 *     "id": "<unique-identifier>",
 *     "props": {
 *         // Component-specific props
 *     }
 * }
 * ```<type>
 * ```
 * 
 * Note: Ignore `<type>`
 *  
 * ---
 * @see
 * - {@link ComponentConfig}
 * - {@link DynamicRenderer.extractBlocks}
 */
export type JsonSyntax = string;

/**
 * Represents a TypeScript syntax block for dynamic rendering.
 * 
 * The TypeScript block should follow this structure:
 * @example
 * ```ts
 * ```ts
 * const spec = {
 *     type: "dynamicRenderer",
 *     id: "<unique-identifier>",
 *     props: {
 *         // Component-specific props
 *     }
 * }
 * ```<type>
 * ```
 * 
 * Note: Ignore `<type>`
 * 
 * ---
 * @see
 * - {@link ComponentConfig}
 * - {@link DynamicRenderer.extractBlocks}
 */
export type TSSyntax = string;

/**
 * Represents a block of code that can be dynamically rendered.\
 * This can be either a {@link JsonSyntax} or a {@link TSSyntax} block.
 * 
 * ---
 * @see
 * - {@link ComponentConfig}
 * - {@link DynamicRenderer.extractBlocks}
 */
export type Block = JsonSyntax | TSSyntax;

/**
 * Type guard to check if a string is valid DynamicContent.
 * @param content - The string to check
 * @returns True if the content is valid DynamicContent, false otherwise
 */
function isDynamicContent(content: string): content is DynamicContent {
  // Implementation would depend on specific validation rules
  // For example, checking for the presence of code blocks
  return content.includes('```json') || content.includes('```ts');
}

export class DynamicRenderer {
  private id: string;
  private Component: React.FC<any>;

  constructor(id: string, Component: React.FC<any>);
  constructor(componentDefinition: ComponentDefinition);
  constructor(idOrComponentDefinition: string | ComponentDefinition, Component?: React.FC<any>) {
    if (typeof idOrComponentDefinition === 'string') {
      this.id = idOrComponentDefinition;
      this.Component = Component!;
    } else {
      this.id = idOrComponentDefinition.id;
      this.Component = idOrComponentDefinition.Component;
    }
  }

/**
 * ---
 * Transforms the {@link DynamicContent} by processing injection {@link Block}s and generates {@link componentPairs}.
 * 
 * ---
 * This method serves as a shortcut for calling {@link processInjectionBlocks} and 
 * {@link generateComponentPairs} in sequence. It combines the functionality of both 
 * methods to provide a comprehensive transformation of the input content.
 *
 * ---
 * @param {DynamicContent} content - The {@link DynamicContent} to be processed
 * @returns {DynamicRenderResult} An object containing the transformed {@link DynamicContent} and {@link componentPairs} 
 * 
 * ---
 * @example
 * const renderer = new DynamicRenderer('example-id', ExampleComponent);
 * const { transformedContent, componentPairs } = renderer.transformContentAndGetComponents(inputContent);
 */
  public transformContentAndGetComponents(content: DynamicContent): DynamicRenderResult {
    const transformedContent = this.processInjectionBlocks(content);
    const componentPairs = this.generateComponentPairs(content);
    return { transformedContent, componentPairs };
  }

  /**
   * ---
   * 
   * Processes the {@link DynamicContent} by identifying {@link Block}s \
   * that define dynamic components, and replaces them with placeholder elements.
   * 
   * ---
   * 
   * This function performs the following steps:
   * 1. Extracts all {@link Block}s from the content using {@link extractBlocks}
   * 2. For each block, parses it using either {@link parseJsonBlock} or {@link parseTsBlock}
   * 3. Checks if the parsed block defines a dynamic component matching this renderer's ID
   * 4. If a match is found, replaces the block with a placeholder `<div>` element
   * 
   * ---
   * 
   * The placeholder elements serve as mounting points for the dynamic components
   * during the rendering phase. Each placeholder is assigned a unique ID based on 
   * the renderer's ID and an incremental index.
   * 
   * ---
   * 
   * @param {DynamicContent} content - The {@link DynamicContent} to process
   * @returns {DynamicContent} The transformed {@link DynamicContent}
   */
  public processInjectionBlocks(content: DynamicContent): DynamicContent {
    const jsonBlocks = this.extractBlocks(content, 'json');
    const tsBlocks = this.extractBlocks(content, 'ts');

    let renderedContent = content;
    let index = 0;

    const processBlock = (block: Block, type: BlockType) => {
      const config = type === 'json' ? this.parseJsonBlock(block) : this.parseTsBlock(block);
      if (config && config.type === 'dynamicRenderer' && config.id === this.id) {
        const dynamicId = `${this.id}-${index}`;
        const placeholder = `<div id="${dynamicId}"></div>`;
        const blockRegex = new RegExp(`\`\`\`${type}\\n${block.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\n\`\`\``, 'g');
        renderedContent = renderedContent.replace(blockRegex, placeholder);
        index++;
      }
    };

    jsonBlocks.forEach(block => processBlock(block, 'json'));
    tsBlocks.forEach(block => processBlock(block, 'ts'));

    return renderedContent;
  }

/**
 * ---
 * Generates {@link ComponentPair} objects from the given {@link DynamicContent}.
 * 
 * ---
 * This function performs the following steps:
 * 1. Extracts all {@link Block}s from the content using {@link extractBlocks}
 * 2. Parses each block using either {@link parseJsonBlock} or {@link parseTsBlock}
 * 3. Filters the parsed configurations to match this renderer's ID
 * 4. Creates a {@link ComponentPair} for each matching configuration
 * 
 * ---
 * The resulting {@link ComponentPair} objects contain:
 * - A unique `id` for the component, based on the renderer's ID and an incremental index
 * - A `useComponent` function that returns the component's JSX with the parsed props
 * 
 * These pairs are used to hydrate the placeholder elements created by {@link processInjectionBlocks}
 * during the rendering phase.
 * 
 * ---
 * @param {DynamicContent} content - The {@link DynamicContent} to process
 * @returns {ComponentPair[]} An array of {@link ComponentPair} objects for rendering
 */
  public generateComponentPairs(content: DynamicContent): ComponentPair[] {
    const jsonBlocks = this.extractBlocks(content, 'json');
    const tsBlocks = this.extractBlocks(content, 'ts');

    const componentConfigs = [
      ...jsonBlocks.map(block => this.parseJsonBlock(block)),
      ...tsBlocks.map(block => this.parseTsBlock(block))
    ];

    return this.createComponentPairs(componentConfigs);
  }

/**
 * ---
 * Extracts code {@link Block}s of a specified type from the given {@link DynamicContent}.\
 * This function searches for code {@link Block}s delimited by triple backticks (```) \
 * followed immediately by the specified {@link BlockType}).
 * 
 * ---
 * Important Note:
 * The function strictly requires the opening delimiter to be in the format:
 * ```<type>
 * WITHOUT ANY SPACE between the backticks and the type identifier.
 * 
 * - ✅ Correct: '```json'<type>
 * - ❌ Incorrect: '``` json'<type>
 * - ❌ Incorrect: '```json '<type>
 * 
 * ---
 * The function performs the following steps:
 * 1. Creates a regex pattern based on the specified block type
 * 2. Finds all matches in the content using this pattern
 * 3. Extracts the content within each matched block
 * 
 * ---
 * TODO:
 * @todo Improve regex pattern to allow for optional spaces after or before the opening backticks
 * 
 * ---
 * @param {DynamicContent} content - The {@link DynamicContent} to process, containing code blocks
 * @param {BlockType} type - The type of code block to extract (e.g., 'json' or 'ts')
 * @returns {Block[]} An array of extracted {@link Block}s matching the specified type
 */
  private extractBlocks(content: DynamicContent, type: BlockType): Block[] {
    const regex = new RegExp(`\`\`\`${type}\\n([\\s\\S]*?)\\n\`\`\``, 'g');
    const matches = [];
    let match;
    while ((match = regex.exec(content)) !== null) {
      matches.push(match[1]);
    }
    return matches;
  }

  private parseJsonBlock(jsonString: string): ComponentConfig {
    return JSON.parse(jsonString);
  }

  private parseTsBlock(tsString: string): ComponentConfig {
    // TypeScript 코드 블록을 실행하여 spec 객체를 얻습니다.
    const wrappedCode = `
      ${tsString}
      return spec;
    `;
    const fn = new Function(wrappedCode);
    return fn();
  }

  private createComponentPairs(configs: ComponentConfig[]): ComponentPair[] {
    return configs
      .filter(config => config && config.type === 'dynamicRenderer' && config.id === this.id)
      .map((config, index) => {
        const dynamicId = `${this.id}-${index}`;
        const props = config.props || {};
        const useComponent = () => <this.Component {...props} />;
        return { id: dynamicId, useComponent };
      });
  }
}

/**
 * Processes dynamic components in the given content using provided component definitions.
 * 
 * This function supports two calling conventions:
 * 1. Passing an object with named parameters
 * 2. Passing parameters individually
 *
 * @param initialContentOrOptions - Either the initial content string or an options object
 * @param componentDefinitions - An array of component definitions (if using the second syntax)
 * @returns An object containing the transformed content and component pairs
 *
 * ---
 * Examples:
 * ---
 * - Example with more complex content
 * ```ts
 * const result = processDynamicComponents({
 *   initialContent: defaultMarkdownString,
 *   componentDefinitions: [
 *     {id:'dynamicComponent', Component: DynamicComponent},
 *     {id:'highlighted', Component: HighlightDisplayComponent}
 *   ]
 * });
 * ```
 * 
 * ---
 * 
 * - Usage with individual parameters:
 * ```ts 
 * const result = processDynamicComponents(
 *   defaultMarkdownString,
 *   [
 *     {id:'dynamicComponent', Component: DynamicComponent},
 *     {id:'highlighted', Component: HighlightDisplayComponent}
 *   ]
 * );
 * ```
 */
export function processDynamicComponents(
  options: {
    initialContent: string;
    componentDefinitions: ComponentDefinition[];
  }
): DynamicRenderResult;
export function processDynamicComponents(
  initialContent: string,
  componentDefinitions: ComponentDefinition[]
): DynamicRenderResult;
export function processDynamicComponents(
  initialContentOrOptions: string | { initialContent: string; componentDefinitions: ComponentDefinition[] },
  componentDefinitions?: ComponentDefinition[]
): DynamicRenderResult {
  let content: string;
  let definitions: ComponentDefinition[];

  if (typeof initialContentOrOptions === 'string') {
    content = initialContentOrOptions;
    definitions = componentDefinitions!;
  } else {
    content = initialContentOrOptions.initialContent;
    definitions = initialContentOrOptions.componentDefinitions;
  }

  // process actual algorism
  let currentContent = content;
  let allComponentPairs: ComponentPair[] = [];

  for (const { id, Component } of definitions) {
    const renderer = new DynamicRenderer(id, Component);
    const result = renderer.transformContentAndGetComponents(currentContent);
    currentContent = result.transformedContent;
    allComponentPairs = allComponentPairs.concat(result.componentPairs);
  }

  return {
    transformedContent: currentContent,
    componentPairs: allComponentPairs
  };
}