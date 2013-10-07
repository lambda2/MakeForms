# Make Forms

A simple jquery plugin to make forms faster

## Getting Started

This plugin requires jQuery 1.7 or higher.
Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/lambda2/MakeForms/master/dist/jquery.makeforms.min.js
[max]: https://raw.github.com/lambda2/MakeForms/master/dist/jquery.makeforms.js

In your web page:

```html
<!-- the form that will contain the form elements -->
<form id="myForm">
</form>
<script src="jquery.js"></script>
<script src="dist/makeforms.min.js"></script>
<script>
jQuery(function($)
{
    var questions = {
        question_one: {
            title: "Do you like donuts ?",
            choices: {
                yes: {label: "Yes"},
                no: {label: "No"}
            }
        }
    };

    $("#myForm").makeforms({
        components: questions
    });
});
</script>
```

Will generate :

```html

<form id="myForm">
<p>Do you like donuts ?</p>
<input type="radio" name="question_one" id="question_one_yes" value="yes">
<input type="radio" name="question_one" id="question_one_no" value="no">
</form>
```

## Documentation
_(Coming soon)_

## Examples
_(Coming soon)_

## Release History
_(Nothing yet)_
