# Make Forms

A simple jquery plugin to make forms faster

## Getting Started

Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/lambda2/MakeForms/master/dist/jquery.makeforms.min.js
[max]: https://raw.github.com/lambda2/MakeForms/master/dist/jquery.makeforms.js

In your web page:

```html
<!-- the form which will countain the form elements -->
<form id="myForm">
</form>
<script src="jquery.js"></script>
<script src="dist/makeforms.min.js"></script>
<script>
jQuery(function($) {

var questions = {
        question_one: {
            title: "Do you like donuts ?",
            choices: {
                yes: {
                    label: "Yes"
                },
                no: {
                    label: "No"
                }
            }
        },

  $("#myForm").makeforms({
        components: questions
    });
});
</script>
```

## Documentation
_(Coming soon)_

## Examples
_(Coming soon)_

## Release History
_(Nothing yet)_
