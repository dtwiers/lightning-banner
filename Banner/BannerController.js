/**
 * Created by Derek.Wiers on 5/14/2019.
 */
({
    parseContent: function(component, event, handler) {
        var content = component.get("v.content");
        var url = component.get('v.linkUrl');
        var linkText = component.get('v.linkText');
        var markupRegex = /{%\s*([(a-zA-Z0-9-_]+)\s*%}/gi;
        var matches = []
        if (content) {
            matches = matches.concat(Array.from(content.matchAll(markupRegex)));
        }
        if (url) {
            matches = matches.concat(Array.from(url.matchAll(markupRegex)));
        }
        if (linkText) {
            matches = matches.concat(Array.from(linkText.matchAll(markupRegex)));
        }
        matches = matches.map(function(element) {return element[1]});
        matches.forEach(function(value) {
            var pattern = new RegExp('{%\\s*' + value + '\\s*%}');
            var result = component.get('v.record.' + value);
            if (content) {
                content = content.replace(pattern, result, 'g');
            }
            if (url) {
                url = url.replace(pattern, result, 'g');
            }
            if (linkText) {
                linkText = linkText.replace(pattern, result, 'g');
            }
        });
        component.set('v.parsedContent', content);
        component.set('v.parsedLinkUrl', url);
        component.set('v.parsedLinkText', linkText);
    }
})