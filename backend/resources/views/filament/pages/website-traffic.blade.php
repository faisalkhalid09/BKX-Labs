<x-filament-panels::page>
    <div class="space-y-6">
        <p class="text-gray-500">
            This page shows the traffic statistics for the main BKX Labs website (Home, Services, etc.), separate from the store traffic.
        </p>
        
        <div class="mt-6">
            <x-filament-widgets::widgets
                :widgets="$this->getVisibleHeaderWidgets()"
                :columns="$this->getHeaderWidgetsColumns()"
            />
        </div>
    </div>
</x-filament-panels::page>
