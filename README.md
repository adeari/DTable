DTable
======

Requirements
------------

The built in template module uses [Nunjucks](http://jlongster.github.io/nunjucks/), and the library is built with
jQuery 1.10.2

Options
-------

* **definition**: table definition module options

  * __name__: <string>          # module name
  * __options__: {}             # module options (see individual modules for reference)

* **template**: table renderer module
  * __name__: <string>          # module name
  * __options__: {}             # module options

* **logger**: table renderer module
  * __name__: <string>          # module name
  * __options__: {}             # module options

Modules
-------

### Definition modules

**json_url**

Load table definition from url. Request is sent with POST or GET and the response must be in json format.


  **options**:

```
    url: <string>               # url to download the json data
    method: <"post"|"get">      # method for request
    data: {}                    # data to send
    timestamp: <true|false>     # if true, it will add timestamp at the end of the url like: ?121213123
```

  **json format**

``` text
{
    "title": <string>,             # table title
    "columns": {
        <column_id>: {
            "title":  <false||strinig>,                             # table title, if false no column title displayed and order and html_tag_attr disabled
            "filter": <false||true||{"placeholder": <string>}>,     # column filter, placeholder: input field placeholder
            "order":  <false||true||"desc"||"asc">,                 # column order
            "html_tag_attr":   <false||{                            # attr for column, for example: "style": "color: #f00" => <td style="color: #f00"></td>
              <attr_name>: <attr_value>
            }>
        }
    },
    "pagination": <false || {
        "show_first_last": <true|false>,      # show first and last page
        "pages": <int>,                       # how many page shown in the pager, odd number
        "rows_per_page": <int>                # number of rows in a page
    }>,
    "search": <false || {
        placeholder: <string>               # search input field placeholder text
        submit: <string>                    # submit button text
    }>
}
```

### Template modules

**nunjucks**

Requires [Nunjucks](http://jlongster.github.io/nunjucks/)

   **options**
``` text
    view_dir: <string>                  # url pointing to the view dir
    table_template: <string>            # table template filename
    rows_template: <string>             # rows template filename
    pagination_template: <string>       # pagination template filename
```

### Logger modules

**default**

   **options**
``` text
    debug: <true||false>                # in debug mode debug information logged to the console
```

Dev requirements
================

nodejs, yeoman

after clone, `npm install` and `bower update`
