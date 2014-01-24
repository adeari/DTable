<?php

class Options
{
    protected $values = [];
    protected $available = [];

    /**
     * Constructor
     *
     * @param array $available
     * @param array $default
     */
    public function __construct(array $available, array $default = [])
    {
        $this->available = $available;

        foreach ($default as $name => $value)
        {
            $this->set($name, $value);
        }
    }

    protected function check($name)
    {
        return in_array($name, $this->available);
    }

    protected function set($name, $value)
    {
        if (!$this->check($name))
        {
            throw new Exception("Invalid option {$name}");
        }

        $name = explode(".", $name);
        $count = count($name);
        $i = 0;
        $values = &$this->values;

        foreach ($name as $part)
        {
            $i++;

            if ($i == $count)
            {
                $values[$part] = $value;
            }
            else
            {
                if (!isset($values[$part]) || !is_array($values[$part]))
                {
                    $values[$part] = array();
                }
            }

            $values = &$values[$part];
        }

        return $this;
    }

    protected function build(&$values)
    {
        $result = [];

        foreach ($values as $key => $value)
        {
            if (is_object($value) && ($value instanceof Options))
            {
                $result[$key] = $value->toArray();
            }
            else if (is_array($value))
            {
                $result[$key] = $this->build($values[$key]);
            }
            else
            {
                $result[$key] = $value;
            }
        }

        return $result;
    }

    public function toArray()
    {
        return $this->build($this->values);
    }
}