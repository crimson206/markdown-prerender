import type { Meta, StoryObj } from '@storybook/react';
import { ExampleDynamicComponent, HighlightDisplayComponent } from "../DynamicComponents";
import { MarkdownHolder } from "../MarkdownHolder";
import { DynamicRenderer } from "../../DynamicRenderer";
import { useDynamicComponents } from "../../useDynamicComponents";
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

export default {
    title: 'UseDynamicRendererDirectly',
    tags: ['autodocs'],
    source: "hi"
}

/**
[
    {id:'dynamicComponent', Component: ExampleDynamicComponent},
    {id:'highlighted', Component: HighlightDisplayComponent}
  ]
 */

const markdownString = new MarkdownHolder().getIntegrated()

const dynamicRenderer = new DynamicRenderer({
    id: 'dynamicComponent',
    Component: ExampleDynamicComponent
})

const renderedMarkdown = dynamicRenderer.processInjectionBlocks(markdownString)
let componentPairs = dynamicRenderer.generateComponentPairs(markdownString)

const dynamicRendere2 = new DynamicRenderer({
    id: 'highlighted',
    Component: HighlightDisplayComponent
})

const renderedMarkdown2 = dynamicRendere2.processInjectionBlocks(renderedMarkdown)
componentPairs = componentPairs.concat(dynamicRendere2.generateComponentPairs(renderedMarkdown))

export const WithoutIntegration = () => {
    

    
    useDynamicComponents(componentPairs)

    return (
            <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                {renderedMarkdown2}
            </ReactMarkdown>
    )
}