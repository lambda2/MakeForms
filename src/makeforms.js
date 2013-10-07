/* 
 * Copyright 2013 - lambdaweb (www.lambdaweb.fr).
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */




(function($) {
	$.fn.makeForms = function(params)
	{
		var item, option, i, elt, htmlItems, finalHtmlItems, totalSize;

		params = $.extend(
			{
				components: {},
				groupSize: 4,
				templates: {}
			}, params);

		params.templates = $.extend(
			{
				item: "{{item}}",
				title: "<p>{{title}}</p>",
				group: "{{group}}",
				label: '<label for="{{id}}">{{label}}</label>',
				radio: '<input type="radio" name="{{name}}"\
	id="{{id}}" value="{{value}}">',
				text: '<input type="text" name="{{name}}"\
	id="{{id}}" value="{{value}}">',
				input: '<input type="{{type}}" name="{{name}}"\
	id="{{id}}" value="{{value}}">',
				select: '<select id="{{id}}" name="{{name}}">{{options}}</select>',
				option: '<option id="{{id}}" value="{{value}}">{{label}}</option>'
			}, params.templates)

		/**
		 * Will fill a template with the given data, and return it.
		 * @param {String} template
		 * @param {Object} data
		 * @returns {String}
		 */
		var applyTemplate = function(template, data)
		{
			var code;

			code = template;

			for (query in data)
			{
				if (code.search("{{" + query + "}}") !== -1
					&& data.hasOwnProperty(query))
				{
					code = code.replace("{{" + query + "}}", data[query]);
					code = applyTemplate(code, data);
				}
			}
			return (code);
		};

		/**
		 * Will return the number of items in the givent data.
		 * @param {Object} data
		 * @returns {Number}
		 */
		var getSize = function(data)
		{
			var count;

			count = 0;
			for (query in data)
			{
				count = count + 1;
			}
			return (count);
		};

		/**
		 * 
		 * @param {Object} data
		 * @returns {String}
		 */
		var getGoodType = function(data)
		{
			var type, size;

			if (data.hasOwnProperty("type"))
			{
				type = data.type;
			}
			else
			{
				size = getSize(data.choices);
				if (size <= 1)
					type = "text";
				else if (size < 18)
					type = "radio";
				else
					type = "option";
			}

			return (type);
		};

		/**
		 * Will contains the html code of each form element.
		 * @type {Array}
		 */
		htmlItems = [];
		finalHtmlItems = [];

		totalSize = getSize(params.components);

		/**
		 * We want to keep a reference on the current jQuery object.
		 */
		elt = $(this);
		i = 0;

		for (item in params.components)
		{
			var eltName, eltLabel, eltType, currentTemplate, titleHtml,
				html, groupTemplate;

			html = "";
			groupTemplate = "";
			eltName = item;
			eltLabel = params.components[item].label;
			eltType = getGoodType(params.components[item]);

			currentTemplate = params.templates[eltType];

				groupTemplate = params.templates.group;

			if (params.components[item].hasOwnProperty("title"))
			{
				titleHtml = applyTemplate(
					params.templates.title,
					{
						title: params.components[item].title
					}
				);
				htmlItems.push(titleHtml);
			}

			i = i + 1;
			for (option in params.components[item].choices)
			{
				var obj, itemId, labelTemplate, labelHtml, currentHtml, nt;

				obj = params.components[item].choices[option];

				if (obj.hasOwnProperty("type"))
				{
					nt = params.templates[obj.type];
				}
				else
				{
					nt = currentTemplate;
				}
				/**
				 * First, we will set the text of the label.
				 */
				itemId = eltName + "_" + option;
				labelTemplate = params.templates.label;
				if (eltType !== "option" && eltType !== "radio")
				{
					labelHtml = applyTemplate(
						labelTemplate,
						{
							label: obj.label,
							id: itemId
						}
					);
				}
				else
				{
					labelHtml = "";
				}
				if (!obj.hasOwnProperty("value"))
				{
					obj.value = option;
				}
				currentHtml = applyTemplate(
					nt,
					{
						name: eltName,
						id: itemId,
						value: obj.value,
						label: obj.label
					});
					
				if ( obj.hasOwnProperty("before") )
				{
					currentHtml = obj["before"] + currentHtml;
				}
				if ( obj.hasOwnProperty("after") )
				{
					currentHtml = currentHtml + obj["after"];
				}

				html = html + labelHtml + currentHtml;
			}
			if (eltType === "option")
			{
				html = applyTemplate(
					params.templates.select,
					{
						name: eltName,
						id: eltName,
						options: html
					});
			}
			htmlItems.push(html);
			html = "";

			if (params.groupSize != 0 && 
				(i % params.groupSize === 0 || i === totalSize))
			{
				var groupHtml = applyTemplate(
					groupTemplate,
					{
						group: htmlItems.join('\n')
					}
				);
				finalHtmlItems.push(groupHtml);
				if (params.groupSize > 0)
				{
					htmlItems = [];
				}
			}

		}



		if (params.groupSize === 0)
		{
			groupHtml = applyTemplate(
				groupTemplate,
				{
					group: htmlItems.join('\n')
				}
			);
			finalHtmlItems.push(groupHtml);
		}
		elt.html(finalHtmlItems.join('\n'));

		return (this);
	};
})(jQuery);