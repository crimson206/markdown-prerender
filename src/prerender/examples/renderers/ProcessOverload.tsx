import { ExampleDynamicComponent, HighlightDisplayComponent } from "../DynamicComponents";
import { MarkdownHolder } from "../MarkdownHolder";
import { processDynamicComponents } from "../../DynamicRenderer";
import { useDynamicComponents } from "../../useDynamicComponents";
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

const markdownHolder = new MarkdownHolder()

const markdownExample1 = markdownHolder.getExample1()
const markdownExample2 = markdownHolder.getExample2()
const integratedMarkdown = markdownExample1 + markdownExample2


// Example1

const dynamicRenderResultOverload1 = processDynamicComponents(
    integratedMarkdown,
    [
      {id:'dynamicComponent', Component: ExampleDynamicComponent},
      {id:'highlighted', Component: HighlightDisplayComponent}
    ]
)

export const MarkDownRender1 = () => {
  const rehypePlugins = [
    rehypeRaw, 
  ];
  
  useDynamicComponents(
    dynamicRenderResultOverload1.componentPairs
  )

  return (
    <ReactMarkdown 
      rehypePlugins={rehypePlugins}>
        {dynamicRenderResultOverload1.transformedContent}
      </ReactMarkdown>
    )
}

// Example12

const dynamicRenderResultOverload2 = processDynamicComponents({
  initialContent: integratedMarkdown,
  componentDefinitions: [
    {id:'dynamicComponent', Component: ExampleDynamicComponent},
    {id:'highlighted', Component: HighlightDisplayComponent}
  ]
})


export const MarkDownRender2 = () => {
  const rehypePlugins = [
    rehypeRaw, 
  ];
  
  useDynamicComponents(
    dynamicRenderResultOverload2.componentPairs
  )

  return (
    <ReactMarkdown 
      rehypePlugins={rehypePlugins}>
        {dynamicRenderResultOverload2.transformedContent}
      </ReactMarkdown>
    )
}
