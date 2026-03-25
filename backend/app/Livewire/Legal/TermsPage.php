<?php

namespace App\Livewire\Legal;

use Livewire\Component;

class TermsPage extends Component
{
    public $tab = 'terms';

    public function mount()
    {
        $requestedTab = request()->query('tab', 'terms');
        if (in_array($requestedTab, ['terms', 'privacy', 'dmca'])) {
            $this->tab = $requestedTab;
        }
    }

    public function setTab($tab)
    {
        $this->tab = $tab;
        $this->dispatch('tab-updated');
    }

    public function render()
    {
        return view('livewire.legal.terms-page')
            ->layout('store.layout', [
                'isLegalPage' => true
            ]);
    }
}
