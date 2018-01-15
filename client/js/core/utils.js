angular.module('app').factory('utils', ['$injector', ($injector) => {
  const $sce = $injector.get('$sce');

  return {

    /**
     * Converts the passed plain text to HTML and returns the result.
     *
     * @param text
     *
     * @return <HTML>
     */
    text2HTML(text) {
        if (!text) {
          return null
        }

        // 1: Plain Text Search
        text = text.replace(/&/g, "&amp;").
        replace(/</g, "&lt;").
        replace(/>/g, "&gt;");

        // 2: Line Breaks
        text = text.replace(/\r\n?|\n/g, "<br>");

        // 3: Paragraphs
        text = text.replace(/<br>\s*<br>/g, "</p><p>");

        // 4. Convert links
        text = text.replace(/(\s|>|^)(https?:[^\s<]*)/igm,'$1<a href="$2" class="oembed" >$2</a>');

        // 5: Wrap in Paragraph Tags
        text = "<p>" + text + "</p>";

        return $sce.trustAsHtml(text);
    }

  };
}]);
