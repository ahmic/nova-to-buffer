<?php

namespace Ahmic\NovaToBuffer;

use Laravel\Nova\ResourceTool;

class NovaToBuffer extends ResourceTool
{
    public function __construct()
    {
        parent::__construct();

        $this->addMeta();
    }
    /**
     * Get the displayable name of the resource tool.
     *
     * @return string
     */
    public function name()
    {
        return 'Nova To Buffer';
    }

    /**
     * Get the component name for the resource tool.
     *
     * @return string
     */
    public function component()
    {
        return 'nova-to-buffer';
    }

    public function addMeta()
    {
        $profileIdsConfig = str_replace(' ', '', config('services.buffer.profile_ids'));
        if(strlen($profileIdsConfig) == 0) {
            $profileIds = [];
        } else {
            $profileIds = explode(',', $profileIdsConfig);
        }

        $this->withMeta([
            'profile_ids' => $profileIds
        ]);

        return $this;
    }
}
