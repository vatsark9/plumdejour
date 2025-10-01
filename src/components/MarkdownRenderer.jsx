import { marked } from "marked";

function MarkdownRenderer({ content, className = "", inline = false }) {
  const renderMarkdown = (markdown) => {
    try {
      if (inline) {
        // For inline rendering, use parseInline
        const html = marked.parseInline(markdown);
        return { __html: html };
      } else {
        const html = marked.parse(markdown);
        return { __html: html };
      }
    } catch (error) {
      return { __html: inline ? markdown : `<pre>${markdown}</pre>` };
    }
  };

  const Component = inline ? 'span' : 'div';

  return (
    <Component
      className={`markdown-content ${className}`}
      dangerouslySetInnerHTML={renderMarkdown(content)}
    />
  );
}

export default MarkdownRenderer;
