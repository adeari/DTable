(function(IFace){

    IFace.add('definition', {
        /**
         * get the table title
         *
         * @returns {string}
         */
        getTitle: function () {
        },
        /**
         * get the columns definition,
         * must return the following format
         *
         * {
         *   <column_id> : {
         *     title: <title||flase>,                                       # column title, if false no column title will shown and order and html attr will not work
         *     filter: <false||{placeholder: <placeholder_text>}>,          # enable filter for column, placeholder shown in the input field
         *     order:  <false||true||"desc"||"asc">,                        # enable order for column, if "desc" or "asc" the column will be ordered
         *     html_tag_attr: <false || {                                             # html attributes, can be false
         *       <attr_name_1>: <attr_value_1},                             # style: "color: #f00" => <td style="color: #f00">{{ column_title }}</td>
         *       <attr_name_2>: <attr_value_3},
         *       ...
         *     }>
         *   }
         * }
         *
         *
         *
         * @returns {{}}
         */
        getColumns: function () {
        },
        /**
         *  get the pagination definition
         *  must return the following format or false:
         *
         *  {
         *      show_first_last: <true|false>,      # show first and last page
         *      pages: <int>,                       # how many page shown in the pager, odd number
         *      rows_per_page: <int>                # number of rows in a page
         *  }
         *
         *  if false returned, no pagination used
         *
         * @returns {{}}||false
         */
        getPagination: function () {
        },
        /**
         * get the global search definition
         * must return the following format or false:
         *
         * {
         *      placeholder: <string>               # search input field placeholder text
         *      submit: <string>                    # submit button text
         * }
         *
         * @returns {{}}
         */
        getSearch: function () {
        },
        /**
         * return true if one of the column deff has filter enabled
         */
        hasColumnFilter: function () {
        },
        /**
         * return true if one of the column has title
         */
        hasColumnTitle: function () {
        }

    });


}(DTableInterfaces));