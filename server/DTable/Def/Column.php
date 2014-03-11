<?php

namespace DTable\Def;

class Column extends Options
{
    /**
     * Create new column, $title is required
     *
     * if false, no title displayed (work if all column title false),
     *
     * @param bool|string $title false or string
     * @internal param array $id
     */
    public function __construct($title)
    {
        parent::__construct(
            ["id", "title", "filter", "filter.placeholder", "order", "html_tag_attr", "formatter"],
            [
                "title" => $title,
                "filter" => false,
                "order" => false,
                "html_tag_attr" => false,
                "formatter" => false,
            ]
        );
    }

    /**
     * set the formatter options for this column.
     * Options depend on selected formatter module.
     *
     * @param $value
     * @return $this
     */
    public function formatter($value)
    {
        $this->set("formatter", $value);

        return $this;
    }

    /**
     * Enable filter
     *
     * @param bool|string $placeholder  false or string
     * @return $this
     */
    public function filter($placeholder = false)
    {
        if ($placeholder)
        {
            $this->set("filter.placeholder", $placeholder);
        }
        else
        {
            $this->set("filter", true);
        }

        return $this;
    }

    /**
     * Enable order
     *
     * @param bool $order  true | "desc" | "asc"
     * @return $this
     */
    public function order($order = true)
    {
        if (!in_array($order, ["asc", "desc"]))
        {
            $order = true;
        }

        $this->set("order", $order);

        return $this;
    }

    /**
     * Set html attribute
     *
     * @param array $attr
     */
    public function attributes(array $attr)
    {
        $this->set("html_tag_attr", $attr);
    }
}
