<x-filament-widgets::widget>
    <x-filament::section heading="Revenue — Last 30 Days">
        <div style="height: 260px; position: relative;">
            <canvas id="revenue-chart-{{ $this->getId() }}"></canvas>
        </div>
    </x-filament::section>

    @push('scripts')
    <script src="https://cdn.jsdelivr.net/npm/chart.js@4/dist/chart.umd.min.js"></script>
    <script>
        (function() {
            const ctx = document.getElementById('revenue-chart-{{ $this->getId() }}');
            if (!ctx) return;
            @php $chart = $this->getChartData(); @endphp
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: {!! json_encode($chart['labels']) !!},
                    datasets: [{
                        label: 'Revenue ($)',
                        data: {!! json_encode($chart['data']) !!},
                        borderColor: '#1e3a8a',
                        backgroundColor: 'rgba(30,58,138,.08)',
                        borderWidth: 2,
                        pointRadius: 3,
                        pointBackgroundColor: '#1e3a8a',
                        fill: true,
                        tension: 0.35
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: {
                        x: { grid: { display: false }, ticks: { maxTicksLimit: 10, font: { size: 11 } } },
                        y: { beginAtZero: true, ticks: { callback: v => '$' + v.toFixed(0), font: { size: 11 } }, grid: { color: 'rgba(0,0,0,.06)' } }
                    }
                }
            });
        })();
    </script>
    @endpush
</x-filament-widgets::widget>
