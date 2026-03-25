<?php

namespace App\Livewire;

use Livewire\Component;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;

class ProfileSettings extends Component
{
    public $name;
    public $email;
    public $current_password;
    public $new_password;
    public $new_password_confirmation;
    public $email_notifications;
    
    public $tab = 'general';

    public function mount()
    {
        $user = auth()->user();
        $this->name = $user->name;
        $this->email = $user->email;
        $this->email_notifications = (bool) $user->email_notifications;
        
        $requestedTab = request()->query('tab', 'general');
        if (in_array($requestedTab, ['general', 'security', 'preferences'])) {
            $this->tab = $requestedTab;
        }
    }

    public function setTab($tab)
    {
        $this->tab = $tab;
    }

    public function updateProfile()
    {
        $this->validate([
            'name' => 'required|string|max:255',
        ]);

        auth()->user()->update([
            'name' => $this->name,
        ]);

        session()->flash('success', 'Profile updated successfully!');
    }

    public function updateSecurity()
    {
        $user = auth()->user();
        
        // If user has a password, they must provide the current one
        if ($user->password) {
            $this->validate([
                'current_password' => ['required', 'current_password'],
                'new_password' => ['required', 'confirmed', Password::defaults()],
            ]);
            
            $user->update([
                'password' => Hash::make($this->new_password),
            ]);
        } else {
            // Socialite user setting a password for the first time
            $this->validate([
                'new_password' => ['required', 'confirmed', Password::defaults()],
            ]);
            
            $user->update([
                'password' => Hash::make($this->new_password),
            ]);
        }

        $this->reset(['current_password', 'new_password', 'new_password_confirmation']);
        session()->flash('success', 'Security settings updated successfully!');
    }

    public function updatePreferences()
    {
        auth()->user()->update([
            'email_notifications' => $this->email_notifications,
        ]);

        session()->flash('success', 'Preferences updated successfully!');
    }

    public function render()
    {
        return view('livewire.profile-settings')
            ->layout('store.layout');
    }
}
