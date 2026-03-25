<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <div class="flex flex-col md:flex-row gap-8">
        <!-- Sidebar Navigation -->
        <aside class="w-full md:w-64 space-y-1">
            <h2 class="text-2xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">Settings</h2>
            
            <button wire:click="setTab('general')" 
                class="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all {{ $tab === 'general' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-900 border border-transparent' }}">
                <span class="material-symbols-outlined text-[20px]">person</span>
                General
            </button>
            
            <button wire:click="setTab('security')" 
                class="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all {{ $tab === 'security' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-900 border border-transparent' }}">
                <span class="material-symbols-outlined text-[20px]">shield</span>
                Security
            </button>
            
            <button wire:click="setTab('preferences')" 
                class="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all {{ $tab === 'preferences' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-900 border border-transparent' }}">
                <span class="material-symbols-outlined text-[20px]">mail</span>
                Preferences
            </button>
        </aside>

        <!-- Main Content Area -->
        <div class="flex-1 bg-white dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800/60 rounded-3xl overflow-hidden">
            <div class="p-6 sm:p-8">
                @if (session()->has('success'))
                    <div class="mb-6 p-4 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 text-sm font-bold rounded-2xl flex items-center gap-2 border border-emerald-100 dark:border-emerald-900">
                        <span class="material-symbols-outlined text-[20px]">check_circle</span>
                        {{ session('success') }}
                    </div>
                @endif

                @if ($tab === 'general')
                    <div class="space-y-6">
                        <div>
                            <h3 class="text-lg font-black text-slate-900 dark:text-white mb-1">General Information</h3>
                            <p class="text-sm text-slate-500 dark:text-slate-400">Update your basic account details.</p>
                        </div>

                        <form wire:submit="updateProfile" class="space-y-4">
                            <div>
                                <label class="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5 ml-1">Full Name</label>
                                <input type="text" wire:model="name" class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-slate-900 dark:text-white">
                                @error('name') <span class="text-red-500 text-[10px] mt-1 ml-1 font-bold">{{ $message }}</span> @enderror
                            </div>

                            <div>
                                <label class="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5 ml-1">Email Address (Read-only)</label>
                                <input type="email" value="{{ $email }}" disabled class="w-full bg-slate-50/50 dark:bg-slate-900/50 border border-slate-200/50 dark:border-slate-800/50 rounded-xl px-4 py-3 text-sm font-medium text-slate-400 cursor-not-allowed">
                                <p class="text-[10px] text-slate-400 mt-2 ml-1 italic font-medium">To change your email, please contact support.</p>
                            </div>

                            <div class="pt-4">
                                <button type="submit" class="bg-slate-900 dark:bg-white text-white dark:text-slate-900 h-11 px-8 rounded-xl text-sm font-bold transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50">
                                    <span wire:loading.remove>Save Changes</span>
                                    <span wire:loading>Processing...</span>
                                </button>
                            </div>
                        </form>
                    </div>
                @endif

                @if ($tab === 'security')
                    <div class="space-y-6">
                        <div>
                            <h3 class="text-lg font-black text-slate-900 dark:text-white mb-1">Security Settings</h3>
                            <p class="text-sm text-slate-500 dark:text-slate-400">Manage your password and account protection.</p>
                        </div>

                        @if(!auth()->user()->password)
                            <div class="p-4 bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400 text-sm font-bold rounded-2xl flex items-center gap-2 border border-amber-100 dark:border-amber-900 mb-6 leading-relaxed">
                                <span class="material-symbols-outlined text-[20px] shrink-0">info</span>
                                Your account is currently linked with Google. Set a password below to enable standard login.
                            </div>
                        @endif

                        <form wire:submit="updateSecurity" class="space-y-4">
                            @if(auth()->user()->password)
                            <div>
                                <label class="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5 ml-1">Current Password</label>
                                <input type="password" wire:model="current_password" class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-slate-900 dark:text-white">
                                @error('current_password') <span class="text-red-500 text-[10px] mt-1 ml-1 font-bold">{{ $message }}</span> @enderror
                            </div>
                            @endif

                            <div>
                                <label class="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5 ml-1">New Password</label>
                                <input type="password" wire:model="new_password" class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-slate-900 dark:text-white">
                                @error('new_password') <span class="text-red-500 text-[10px] mt-1 ml-1 font-bold">{{ $message }}</span> @enderror
                            </div>

                            <div>
                                <label class="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5 ml-1">Confirm New Password</label>
                                <input type="password" wire:model="new_password_confirmation" class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-slate-900 dark:text-white">
                            </div>

                            <div class="pt-4 border-t border-slate-100 dark:border-slate-900 mt-8 flex items-center justify-between">
                                <div class="flex items-center gap-2">
                                    <span class="material-symbols-outlined text-[16px] text-slate-400">history</span>
                                    <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Last Account Access</span>
                                </div>
                                <span class="text-[10px] font-black text-slate-900 dark:text-white">{{ auth()->user()->last_login_at?->diffForHumans() ?? 'Never' }}</span>
                            </div>
                        </form>
                    </div>
@endif

                @if ($tab === 'preferences')
                    <div class="space-y-6">
                        <div>
                            <h3 class="text-lg font-black text-slate-900 dark:text-white mb-1">Communication Preferences</h3>
                            <p class="text-sm text-slate-500 dark:text-slate-400">Control how we stay in touch with you.</p>
                        </div>

                        <div class="space-y-4">
                            <div class="flex items-center justify-between p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 group hover:border-primary/20 transition-all">
                                <div class="flex items-center gap-4">
                                    <div class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                        <span class="material-symbols-outlined text-[20px]">notifications_active</span>
                                    </div>
                                    <div>
                                        <p class="text-sm font-bold text-slate-900 dark:text-white">Email Notifications</p>
                                        <p class="text-[11px] font-medium text-slate-500 dark:text-slate-400">Receive automated order updates and welcome emails.</p>
                                    </div>
                                </div>
                                <label class="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" wire:model.live="email_notifications" class="sr-only peer">
                                    <div class="w-11 h-6 bg-slate-200 peer-focus:outline-none dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                                </label>
                            </div>

                            <div class="p-4 bg-slate-100/50 dark:bg-slate-900/50 rounded-xl text-[11px] font-medium text-slate-500 dark:text-slate-400 text-center leading-relaxed">
                                <span class="font-black uppercase tracking-widest text-[9px] block mb-1">PRO-TIP</span>
                                Even if notifications are disabled, you'll still receive critical security alerts and legal notices regarding your account.
                            </div>

                            <div class="pt-4">
                                <button wire:click="updatePreferences" class="bg-slate-900 dark:bg-white text-white dark:text-slate-900 h-11 px-8 rounded-xl text-sm font-bold transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50">
                                    <span wire:loading.remove>Save Preferences</span>
                                    <span wire:loading>Saving...</span>
                                </button>
                            </div>
                        </div>
                    </div>
                @endif
            </div>
        </div>
    </div>
</div>
