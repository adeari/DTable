DTable
======

This is a data table plugin, using jQuery 1.10.2 and [Nunjucks](http://jlongster.github.io/nunjucks/) for templating.
Highly customizable, you can modify the template and use your own designe.

DTable is module based, you can add/extend modules if you want to change default behaviors. You can even change the template
engine by creating a new template module.

The built in template is bootstrap 3 based table, but you can use anything.

How to use
----------

This branch is used to develop DTable, you can find the plugin in the build directory.

For some examples, see server/web/index.php file in this branch.

You can find soruce files in the src folder, you dont need to use it in dev, in the build folder you will find a js source map file.

Plans
-------

- advanced formatter (string, partial, image)
- editable rows
-- column types (int, string. select, multiselect, boolean)

Options
-------

``` text
  {
    definition: {
        name: <module_name>,            # default: json_url
        options: <module_options>
    },
    template: {
        name: <module_name>,            # default: nunjucks
        options: <module_options>
    },
    logger: {
        name: <module_name>,            # default: default
        options: <module_options>
    },
    source: {
        name: <module_name>,            # default: json_url
        options: <module_options>
    },
    search: {
        name: <module_name>,            # default: default
        options: <module_options>
    },
    pagination: {
        name: <module_name>,            # default: default
        options: <module_options>
    },
    loading: {
        name: <module_name>,            # default: default
        options: <module_options>
    },
    order: {
        name: <module_name>,            # default: default
        options: <module_options>
    },
    formatter: {
        name: <module_name>,
        options: <module_options>       # default: default
    }
  }
```


Modules
-------

### Definition modules

**json_url**

Load table definition from url. Request is sent with POST or GET and the response must be in json format.


  **options**:

```
    url: <string>               # url to download the json data, default: ""
    method: <"post"|"get">      # method for request, default: "get"
    data: {}                    # extra data to send, default: {}
    timestamp: <true|false>     # if true, it will add timestamp to prevent caching the page
```

  **response json format**

``` text
{
    "title": <string||false>,                                       # table title
    "columns": {
        <column_id>: {
            "title":  <false||string>,                              # table title, if false no column title displayed,
                                                                    # its work if all column title is false
            "filter": <false||true||{"placeholder": <string>}>,     # column filter, placeholder: input field placeholder
            "order":  <false||true>,                                # column order enable/disable
            "html_tag_attr":   <false||{                            # attr for column, for example: "style": "color: #f00" => <td style="color: #f00"></td>
              <attr_name>: <attr_value>
            }>,
            // not required, used by formatter module
            "formatter": <formatter module specified options>       # here you can set column option for formatter
        }
    },
    # this generated from search, you dont have to add to json
    "search": <false || {
        placeholder: <string>               # search input field placeholder text
    }>
}
```

### Template modules

**nunjucks**

Requires [Nunjucks](http://jlongster.github.io/nunjucks/)

   **options**
``` text
    view_dir: <string>                  # url pointing to the view dir, default: "/view"
    table_template: <string>            # table template filename, default: "table.html"
    rows_template: <string>             # rows template filename, default: "rows.html"
    pagination_template: <string>       # pagination template filename, default: "pagination.html"
```

### Logger modules

**default**

   **options**
``` text
    debug: <true||false>                # in debug mode debug information logged to the console
```

### Source modules (data source)

**json_url**

The module will put with post or get the query paramters. The response must be a json with the table rows.

    **options**
``` text
    url: <string>                       # url to put query paramters, default: ""
    method: <"post"|"get">              # method to use, default: "post"
```
    **query parameters**
```
    search: <string>,
    filter: "" || {
        <column_id>: <filter_text>,
        ...
    },
    per_page: <int>,
    offset: <int>,
    order: "" || {                      # currently only one order by column supported, but its possible to have more than one
        <column_id>: "asc"||"desc",
        ...
    }
```

    **response json format**
```
    [
        {
            <col_id> : <value>,
            ....
        },
        ....
    ]
```

### Search modules

**default**

``` text
    placeholder:                            # serch input field placeholder, default: "search...",
    waiting: <int>                          # time in ms to wait after last modification in search paramters before submitting, default: 600
```

### Pagination modules

**default**

    **options**
``` text
    show_first_and_last: <boolean>          # in pager, first and last page shown? default: true
    pages: <int>                            # how many page in the pager, odd number, default: 5
    rows_per_page: <int>                    # results per page, default: 20
```

### Loading modules

Show loading message when the table refresh

** default **

There is no options. It's uses html tag with data-dtable="loading" attr.

### Formatter modules

This modules used to format data, you can add formatter options in column definition.

** default **

default formatter does nothing, its just simple write out the given cell as string.

Dev requirements
================

nodejs, php5.4+ (for built in server), grunt, npm, bower

after clone, run update.sh

`grunt build`: build the library
`grunt server`: start server with live reloading on http://127.0.0.1:8080
